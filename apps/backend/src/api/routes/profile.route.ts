import { FastifyPluginAsync } from 'fastify'
import multipart, { MultipartValue } from '@fastify/multipart';

import { validateBody } from '@utils/zodValidate'
import {
  ownerDatingProfileSchema,
  ownerProfileSchema,
  ProfileScope,
  publicProfileSchema,
  UpdateDatingProfileSchema,
  UpdateProfileSchema
} from '@zod/profile.schema'

import { ProfileService } from 'src/services/profile.service'
import { ImageGalleryService } from 'src/services/gallery.service'
import { uploadTmpDir } from 'src/lib/media';
import { sendError } from '../helpers';
import env from 'src/env';
import { z } from 'zod';



const imageScopeParamsSchema = z.object({
  imageId: z.string().uuid(),        // or whatever format your IDs are
  profileScope: z.nativeEnum(ProfileScope)
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

  /**
   * Get the current user's profile
   * @description This route retrieves the current user's social and dating profiles.
   */
  fastify.get('/me', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    try {
      const { profile, datingProfile } = await profileService.getAllProfilesByUserId(req.user.userId)
      if (!profile) return sendError(reply, 404, 'Social profile not found')
      if (!datingProfile) return sendError(reply, 404, 'Dating profile not found')

      const safeProfile = ownerProfileSchema.parse(profile)
      const safeDatingProfile = ownerDatingProfileSchema.parse(datingProfile)
      return reply.code(200).send({ success: true, profile: safeProfile, datingProfile: safeDatingProfile })
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
  fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const raw = await profileService.getProfileById(id)
      if (!raw) return sendError(reply, 404, 'Profile not found')
      const profile = publicProfileSchema.parse(raw)
      return reply.code(200).send({ success: true, profile })
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
    const data = await validateBody(UpdateProfileSchema, req, reply)
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

  // Update an existing profile
  fastify.patch('/dating', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    const data = await validateBody(UpdateDatingProfileSchema, req, reply)
    if (!data) return
    try {
      const updated = await profileService.updateDatingProfile(req.user.userId, data)
      if (!updated) return sendError(reply, 404, 'Dating profile not found')
      const datingProfile = ownerDatingProfileSchema.parse(updated)
      return reply.code(200).send({ success: true, datingProfile })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to update dating profile')
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
      ).value ?? '')


    try {
      const stored = await imageGalleryService.storeImage(req.user.userId, fileUpload, captionText)
      const publicImage = imageGalleryService.toOwnerProfileImage(stored)
      return reply.code(200).send({ success: true, profileImage: publicImage })
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
    '/image/:imageId/:profileScope/other',
    { onRequest: [fastify.authenticate] },
    async (req, reply) => {
      if (!req.user.userId) {
        return sendError(reply, 401, 'Unauthorized')
      }
      const { imageId, profileScope } = imageScopeParamsSchema.parse(req.params)

      const schema = profileScope === ProfileScope.SOCIAL ? ownerProfileSchema : ownerDatingProfileSchema

      try {
        const updated = profileService.addImageToProfile(req.user.userId, profileScope, imageId)
        if (!updated) return sendError(reply, 404, 'Profile not found')
        const profile = schema.parse(updated)
        // return only the newly‐attached images
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
    '/image/:imageId/:profileScope/primary',
    { onRequest: [fastify.authenticate] },
    async (req, reply) => {
      if (!req.user.userId) {
        return sendError(reply, 401, 'Unauthorized')
      }
      const { imageId, profileScope } = imageScopeParamsSchema.parse(req.params)

      let schema
      switch (profileScope) {
        case ProfileScope.SOCIAL:
          schema = ownerProfileSchema
          break
        case ProfileScope.DATING:
          schema = ownerDatingProfileSchema
          break
      }

      try {
        const updated = profileService.setProfileImage(req.user.userId, profileScope, imageId)
        // validate with your ownerProfileSchema so the shape is safe
        const safe = schema.parse(updated)
        return reply
          .code(200)
          .send({ success: true, profile: safe })
      } catch (err) {
        fastify.log.error('Error setting main profile image:', err)
        return sendError(reply, 500, 'Failed to set profile image')
      }
    }
  )

  /***
   * Get all images for a user
   */
  fastify.get('/user-images', { onRequest: [fastify.authenticate] }, async (req, reply) => {
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
}

export default profileRoutes