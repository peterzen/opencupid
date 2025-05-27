import { FastifyPluginAsync } from 'fastify'
import multipart, { MultipartValue } from '@fastify/multipart';

import {
  IdLookupParamsSchema,
  OwnerProfileSchema,
  UpdateProfilePayloadSchema
} from '@zod/profile.schema'

import { ProfileService } from 'src/services/profile.service'
import { ImageGalleryService } from 'src/services/image.service'
import { validateBody } from '@utils/zodValidate'
import { uploadTmpDir } from 'src/lib/media';
import { sendError } from '../helpers';
import env from 'src/env';
import { mapProfileImagesToOwner, mapProfileToOwner, mapProfileToPublic } from 'src/services/mappers';
import { ReorderProfileImagesPayloadSchema } from '@zod/profileimage.schema';



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
  const imageService = ImageGalleryService.getInstance();

  /**
   * Get the current user's profile
   * @description This route retrieves the current user's social and dating profiles.
   */
  fastify.get('/me', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    try {
      const fetched = await profileService.getProfileByUserId(req.user.userId)
      if (!fetched) return sendError(reply, 404, 'Social profile not found')

      const profile = mapProfileToOwner(fetched)
      return reply.code(200).send({ success: true, profile })

    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to load profiles')
    }
  })


  /**
   * Get a profile by ID
   * @param {string} id - The ID of the profile to retrieve
   */
  fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {

    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }

    const { id: profileId } = IdLookupParamsSchema.parse(req.params)

    try {
      const raw = await profileService.getProfileById(profileId)
      console.log('Raw profile data:', raw)
      if (!raw) return sendError(reply, 404, 'Profile not found')
      const profile = mapProfileToPublic(raw)
      // const profile = publicProfileSchema.parse(raw)
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
    const data = await validateBody(UpdateProfilePayloadSchema, req, reply)
    if (!data) return

    try {
      const updated = await profileService.updateProfile(req.user.userId, data)
      if (!updated) return sendError(reply, 404, 'Profile not found')
      const profile = OwnerProfileSchema.parse(updated)
      return reply.code(200).send({ success: true, profile })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to update profile')
    }
  })


  /**
   * Upload an image to the user's profile
   */
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
      const stored = await imageService.storeImage(req.user.userId, fileUpload, captionText)
      if (!stored) {
        return sendError(reply, 500, 'Failed to store image')
      }
      const updated = await profileService.addProfileImage(profile, stored.id)
      const profileImages = mapProfileImagesToOwner(updated.profileImages)
      return reply.code(200).send({ success: true, profile: { profileImages } })
    } catch (err) {
      fastify.log.error('Error storing image:', err)
      return sendError(reply, 500, 'Failed to store image')
    }
  })

  /**
   * Delete a profile image
   */
  fastify.delete('/image/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }
    const { id: profileImageId } = IdLookupParamsSchema.parse(req.params)

    try {
      await imageService.deleteImage(req.user.userId, profileImageId)
      const updated = await profileService.getProfileByUserId(req.user.userId)
      if (!updated) {
        return sendError(reply, 400, 'No user profile found to update after image deletion')
      }
      const profileImages = mapProfileImagesToOwner(updated.profileImages)
      return reply.code(200).send({ success: true, profile: { profileImages } })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to delete image')
    }
  })

  /**
   * Reorder profile images
   */
  fastify.patch('/image/order', { onRequest: [fastify.authenticate] }, async (req, reply) => {

    if (!req.user.userId) {
      return sendError(reply, 401, 'Unauthorized')
    }

    const { images } = ReorderProfileImagesPayloadSchema.parse(req.body)

    try {
      const updated = await imageService.reorderImages(req.user.userId, images)
      const profileImages = mapProfileImagesToOwner(updated)
      return reply.code(200).send({ success: true, profile: { profileImages } })
    } catch (err) {
      fastify.log.error(err)
      return reply.code(500).send({ success: false })
    }
  })

}

export default profileRoutes