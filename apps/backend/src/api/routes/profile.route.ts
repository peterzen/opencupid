import { FastifyPluginAsync } from 'fastify'
import multipart, { MultipartValue } from '@fastify/multipart';
import { z } from 'zod';

import { validateBody } from '@utils/zodValidate'
import {
  OwnerProfile,
  ownerProfileSchema,
  ownerScalarSchema,
  ProfileWithImages,
  PublicProfile,
  publicProfileSchema,
  publicScalarsSchema,
  updateProfileSchema
} from '@zod/profile.schema'
import { ProfileImage, ProfileTag, Tag } from '@zod/generated';

import { ProfileService } from 'src/services/profile.service'
import { ImageGalleryService } from 'src/services/gallery.service'
import { uploadTmpDir } from 'src/lib/media';
import { sendError } from '../helpers';
import env from 'src/env';
import { PublicTag, publicTagSearchSchema, TagParamsSchema } from '@zod/tags.schema';



const setProfileImageParamsSchema = z.object({
  imageId: z.string().nullable() // empty id means clear the profile image
})

const attachImageParamsSchema = z.object({
  imageId: z.string().cuid()
})

const profileRoutes: FastifyPluginAsync = async (fastify) => {

  await fastify.register(multipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100,     // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: env.IMAGE_MAX_SIZE, // Max file size in bytes
      files: 1,           // Max number of file fields
      headerPairs: 2000,  // Max number of header key=>value pairs
      parts: 1000         // For multipart forms, the max number of parts (fields + files)
    },
    attachFieldsToBody: false,
  });

  // instantiate services
  const profileService = ProfileService.getInstance()
  const imageGalleryService = ImageGalleryService.getInstance();

  function mapToOwner(profile: ProfileWithImages): OwnerProfile {
    const safe = ownerScalarSchema.parse(profile)

    // Transform each image using the service
    const transformedProfileImage = profile.profileImage
      ? imageGalleryService.toOwnerProfileImage(profile.profileImage)
      : null

    const transformedOtherImages = profile.otherImages.map((img: ProfileImage) =>
      imageGalleryService.toOwnerProfileImage(img)
    )

    const publicTags: PublicTag[] = profile.tags.map((tag: ProfileTag) => publicTagSearchSchema.parse(tag.tag))

    // Merge scalars (from safe) with your newly-shaped images
    return {
      ...safe,
      profileImage: transformedProfileImage,
      otherImages: transformedOtherImages,
      tags: publicTags,
    }
  }

  function mapToPublic(profile: ProfileWithImages): PublicProfile {
    // a) Strip private fields from the *scalars* (guaranteeing tags: string[])
    const safe = publicScalarsSchema.parse(profile)

    // b) Build the image bits
    const transformedProfileImage = profile.profileImage
      ? imageGalleryService.toPublicProfileImage(profile.profileImage)
      : null

    const transformedOtherImages = profile.otherImages.map((img: ProfileImage) =>
      imageGalleryService.toPublicProfileImage(img)
    )
    const publicTags: PublicTag[] = profile.tags.map((tag: ProfileTag) => publicTagSearchSchema.parse(tag.tag))

    return {
      ...safe,
      profileImage: transformedProfileImage,
      otherImages: transformedOtherImages,
      tags: publicTags, // Add the tags property from the safe object
    }
  }

  /**
   * Get the current user's profile
   * @description This route retrieves the current user's social and dating profiles.
   */
  fastify.get('/me', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    try {
      const profile = await profileService.getProfileByUserId(req.user.userId)
      if (!profile) return sendError(reply, 404, 'Social profile not found')

      const safeProfile = mapToOwner(profile)
      console.log('Returning profile:', safeProfile)
      return reply.code(200).send({ success: true, profile: safeProfile })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to load profiles')
    }
  })

  /**
   * Get all profiles
   * @description This route retrieves all profiles in the system.
   */
  fastify.get('/', { onRequest: [fastify.authenticate] }, async (_req, reply) => {
    try {
      const profiles = await fastify.prisma.profile.findMany({
        include: { profileImage: true, tags: { include: { tag: true } } }
      })
      return reply.code(200).send({ success: true, profiles })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to list profiles')
    }
  })

  /**
   * Get a profile by ID
   * @param {string} id - The ID of the profile to retrieve
   */
  fastify.get('/:profileId', { onRequest: [fastify.authenticate] }, async (req, reply) => {

    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    const { profileId } = z.object({ profileId: z.string().cuid() }).parse(req.params)
    try {
      const raw = await profileService.getProfileById(profileId)
      console.log('Raw profile data:', raw)
      if (!raw) return sendError(reply, 404, 'Profile not found')
      const profile = mapToPublic(raw)
      // const profile = publicProfileSchema.parse(raw)
      return reply.code(200).send({ success: true, profile: raw })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch profile')
    }
  })

  /**
   * Update the current user's profile
   */
  fastify.patch('/profile', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    const data = await validateBody(updateProfileSchema, req, reply)
    if (!data) return
    try {
      const updated = await profileService.updateProfile(req.user.userId, data)
      console.log('Updated profile:', updated)
      if (!updated) return sendError(reply, 404, 'Profile not found')
      const profile = ownerProfileSchema.parse(updated)
      return reply.code(200).send({ success: true, profile })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to update profile')
    }
  })


  // Single file upload route
  fastify.post('/image', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }

    let files

    try {
      files = await req.saveRequestFiles({
        tmpdir: uploadTmpDir(),
        limits: {
          fileSize: env.IMAGE_MAX_SIZE * 1024 * 1024, // Convert MB to bytes
          files: 1,
          fields: 1,
        },
      })
    } catch (err: any) {
      fastify.log.warn('Upload error:', err)
      return sendError(reply, 400,
        `The image is too large ${err.code === 'FST_ERR_MULTIPART_FILE_TOO_LARGE' ? ` ${env.IMAGE_MAX_SIZE}MB max` : ''}`
      )
    }

    if (files.length === 0) return sendError(reply, 400, 'No file uploaded')

    const fileUpload = files[0]
    // Validate file type
    if (!fileUpload.mimetype.startsWith('image/')) {
      return sendError(reply, 400, 'Uploaded file must be an image')
    }

    const captionText = (
      ((Array.isArray(fileUpload.fields.captionText)
        ? fileUpload.fields.captionText[0]
        : fileUpload.fields.captionText) as MultipartValue
      ).value ?? '') as string

    const profile = await profileService.getProfileByUserId(req.user.userId)
    if (!profile) {
      return sendError(reply, 404, 'No user profile to link the image to')
    }

    try {
      const stored = await imageGalleryService.storeImage(req.user.userId, fileUpload, captionText)
      if (!stored) {
        return sendError(reply, 500, 'Failed to store image')
      }
      const updated = await profileService.addProfileImage(profile, stored.id)
      console.log('Image stored and profile updated:', updated)
      // const image = imageGalleryService.toOwnerProfileImage(stored)
      return reply.code(200).send({ success: true, profile: updated })
    } catch (err) {
      fastify.log.error('Error storing image:', err)
      return sendError(reply, 500, 'Failed to store image')
    }
  })

  /**
   * Delete a profile image
   */
  fastify.delete('/image/:profileImageId', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    const { profileImageId } = req.params as { profileImageId: string }
    try {
      await imageGalleryService.deleteImage(req.user.userId, profileImageId)
      return reply.code(200).send({ success: true })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to delete image')
    }
  })

  // Attach an image to the profile’s “otherImages” list
  fastify.post(
    '/image/:imageId/other',
    { onRequest: [fastify.authenticate] },
    async (req, reply) => {
      if (!req.user.userId) {
        return sendError(reply, 401, 'Unauthorized')
      }
      const { imageId } = attachImageParamsSchema.parse(req.params)

      try {
        const updated = profileService.addOtherImageToProfile(req.user.userId, imageId)
        if (!updated) return sendError(reply, 404, 'Profile not found')
        const profile = ownerProfileSchema.parse(updated)
        return reply
          .code(200)
          .send({ success: true, profile })
      } catch (err) {
        fastify.log.error('Error adding image to otherImages:', err)
        return sendError(reply, 500, 'Failed to attach image')
      }
    }
  )

  // Set the primary profileImage
  fastify.post(
    '/image/:imageId/primary',
    { onRequest: [fastify.authenticate] },
    async (req, reply) => {
      if (!req.user.userId) {
        return sendError(reply, 401, 'Unauthorized')
      }
      // console.log('Setting profile image for user:', req.params)
      const { imageId } = setProfileImageParamsSchema.parse(req.params)

      try {
        await profileService.setProfileImage(req.user.userId, imageId)
        return reply
          .code(200)
          .send({ success: true })
      } catch (err) {
        fastify.log.error('Error setting main profile image:', err)
        return sendError(reply, 500, 'Failed to set profile image')
      }
    }
  )

  /***
   * Get all images for a user
   */
  fastify.get('/image/list', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    try {
      const images = await imageGalleryService.listImages(req.user.userId)
      const safeImages = images.map(img => imageGalleryService.toOwnerProfileImage(img))
      return reply.code(200).send({ success: true, images: safeImages })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to list images')
    }
  })


  /**
  * Add a tag to a profile
  */
  fastify.post(
    '/:id/tags/:tagId',
    { onRequest: [fastify.authenticate] },
    async (req, reply) => {
      const { id: profileId, tagId } = TagParamsSchema.merge(
        z.object({ tagId: z.string().cuid() })
      ).parse(req.params);
      try {
        await profileService.addTagToProfile(profileId, tagId);
        return reply.code(204).send();
      } catch (err) {
        fastify.log.error(err);
        return sendError(reply, 500, 'Failed to attach tag');
      }
    }
  );

  /**
   * Remove a tag from a profile
   */
  fastify.delete(
    '/:id/tags/:tagId',
    { onRequest: [fastify.authenticate] },
    async (req, reply) => {
      const { id: profileId, tagId } = TagParamsSchema.merge(
        z.object({ tagId: z.string().cuid() })
      ).parse(req.params);
      try {
        await profileService.removeTagFromProfile(profileId, tagId);
        return reply.code(204).send();
      } catch (err) {
        fastify.log.error(err);
        return sendError(reply, 500, 'Failed to remove tag');
      }
    }
  );

}

export default profileRoutes