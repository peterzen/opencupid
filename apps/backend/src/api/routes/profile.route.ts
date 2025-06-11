import { FastifyPluginAsync } from 'fastify'
import multipart, { MultipartValue } from '@fastify/multipart'

import {
  IdLookupParamsSchema, UpdatedProfileFragmentSchema,
  UpdateProfilePayloadSchema
} from '@zod/profile.schema'

import { ProfileService } from 'src/services/profile.service'
import { ImageGalleryService } from 'src/services/image.service'
import { validateBody } from '@/utils/zodValidate'
import { uploadTmpDir } from '@/lib/media'
import { getUserRoles, sendError, sendForbiddenError, sendUnauthorizedError } from '../helpers'
import {
  mapProfileImagesToOwner,
  mapProfileTags,
  mapProfileToOwner,
  mapProfileToPublic,
} from 'src/api/mappers'
import { ReorderProfileImagesPayloadSchema } from '@zod/profileimage.schema'
import { UserService } from 'src/services/user.service'
import { appConfig } from '@shared/config/appconfig'
import { Prisma } from '@prisma/client'
import type {
  GetMyProfileResponse,
  GetPublicProfileResponse,
  GetProfilesResponse,
  UpdateProfileResponse,
  ProfileImagesResponse,
} from '@shared/dto/apiResponse.dto'

const profileRoutes: FastifyPluginAsync = async fastify => {
  await fastify.register(multipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: appConfig.IMAGE_MAX_SIZE, // Max file size in bytes
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
      parts: 1000, // For multipart forms, the max number of parts (fields + files)
    },
    attachFieldsToBody: false,
  })

  // instantiate services
  const profileService = ProfileService.getInstance()
  const imageService = ImageGalleryService.getInstance()
  const userService = UserService.getInstance()

  /**
   * Get the current user's profile
   * @description This route retrieves the current user's social and dating profiles.
   */
  fastify.get('/me', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) return sendUnauthorizedError(reply)

    try {
      const fetched = await profileService.getProfileByUserId(req.user.userId)
      if (!fetched) return sendError(reply, 404, 'Social profile not found')

      const profile = mapProfileToOwner(fetched)
      const response: GetMyProfileResponse = { success: true, profile}
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to load profile')
    }
  })

  /**
   * Get a profile by slug
   * @param {string} slug - The slug of the profile to retrieve
   */
  fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) return sendUnauthorizedError(reply)

    const roles = getUserRoles(req)

    const { id } = IdLookupParamsSchema.parse(req.params)

    try {
      const raw = await profileService.getProfileById(id)
      if (!raw) return sendError(reply, 404, 'Profile not found')

      if (raw.userId !== req.user.userId && !req.session.hasActiveProfile) {
        return sendForbiddenError(reply, 'You do not have access to this profile')
      }

      const profile = mapProfileToPublic(raw, roles)
      // const profile = publicProfileSchema.parse(raw)
      const response : GetPublicProfileResponse = { success: true, profile }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch profile')
    }
  })

  fastify.get('/', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) return sendUnauthorizedError(reply)

    console.log('session', req.session)
    if (!req.session.hasActiveProfile) return sendForbiddenError(reply)

    try {
      const profiles = await profileService.findProfilesFor(req.user.userId)
      const mappedProfiles = profiles.map(p => mapProfileToPublic(p, getUserRoles(req)))
      const response: GetProfilesResponse = { success: true, profiles: mappedProfiles }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch profiles')
    }
  })

  /**
   * Update the current user's profile
   */
  fastify.patch('/profile', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) return sendUnauthorizedError(reply)

    const data = await validateBody(UpdateProfilePayloadSchema, req, reply)
    if (!data) return

    const user = await userService.getUserById(req.user.userId)
    if (!user) return sendUnauthorizedError(reply)

    // set flags on user object (these are used in authorization)
    if (data.isDatingActive) {
      userService.addRole(user, 'user_dating')
    } else {
      userService.removeRole(user, 'user_dating')
    }
    user.hasActiveProfile = data.isActive || false

    try {
      const updated = await fastify.prisma.$transaction(async tx => {
        const updatedProfile = await profileService.updateProfile(tx, req.user.userId, data)
        // if (!updatedProfile) return sendError(reply, 404, 'Profile not found')

        // Mark user as onboarded
        user.isOnboarded = true
        const updatedUser = await userService.updateUser(tx, user)
        if (!updatedUser) return sendError(reply, 500, 'Failed to update user')
        return updatedProfile
      })

      const { tags, profileImages, ...rest } = updated

      const profile = UpdatedProfileFragmentSchema.parse({
        tags: mapProfileTags(updated.tags),
        ...rest,
      })

      // Clear session to force re-fetch on next request, we need the roles updated
      await req.deleteSession()
      const response: UpdateProfileResponse = { success: true, profile }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      // profileService.updateProfile() returned null, which means the profile was not found
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        return sendError(reply, 404, 'Profile not found')
      }
      return sendError(reply, 500, 'Failed to update profile')
    }
  })

  /**
   * Upload an image to the user's profile
   */
  fastify.post(
    '/image',
    {
      onRequest: [fastify.authenticate],
    },
    async (req, reply) => {
      if (!req.user.userId) return sendUnauthorizedError(reply)

      let files

      try {
        files = await req.saveRequestFiles({
          tmpdir: uploadTmpDir(),
          limits: {
            fileSize: appConfig.IMAGE_MAX_SIZE,
            files: 1,
            fields: 1,
          },
        })
      } catch (err: any) {
        fastify.log.warn('Upload error:', err, err.code)
        const maxSizeMiB = appConfig.IMAGE_MAX_SIZE / (1024 * 1024) // Convert bytes to MB

        const reason =
          err.code === 'FST_ERR_MULTIPART_FILE_TOO_LARGE'
            ? `The uploaded image is too large. Maximum size is ${maxSizeMiB}MB.`
            : 'Failed to upload image.'

        return sendError(reply, 400, reason)
      }

      if (files.length === 0) return sendError(reply, 400, 'No file uploaded')

      const fileUpload = files[0]
      // Validate file type
      if (!fileUpload.mimetype.startsWith('image/')) {
        return sendError(reply, 400, 'Uploaded file must be an image')
      }

      const captionText = ((
        (Array.isArray(fileUpload.fields.captionText)
          ? fileUpload.fields.captionText[0]
          : fileUpload.fields.captionText) as MultipartValue
      ).value ?? '') as string

      const profile = await profileService.getProfileByUserId(req.user.userId)
      if (!profile) {
        return sendError(reply, 404, 'No user profile to link the image to')
      }

      try {
        const stored = await imageService.storeImage(
          req.user.userId,
          fileUpload.filepath,
          captionText
        )
        if (!stored) {
          return sendError(reply, 500, 'Failed to store image')
        }
        const updated = await profileService.addProfileImage(profile, stored.id)
        const profileImages = mapProfileImagesToOwner(updated.profileImages)
        const response: ProfileImagesResponse = { success: true, profile: { profileImages } }
        return reply.code(200).send(response)
      } catch (err) {
        fastify.log.error('Error storing image:', err)
        return sendError(reply, 500, 'Failed to store image')
      }
    }
  )

  /**
   * Delete a profile image
   */
  fastify.delete('/image/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) return sendUnauthorizedError(reply)

    const { id: profileImageId } = IdLookupParamsSchema.parse(req.params)

    try {
      const ok = await imageService.deleteImage(req.user.userId, profileImageId)
      if (!ok) {
        return sendError(reply, 500, 'Failed to delete image')
      }
      const updated = await profileService.getProfileByUserId(req.user.userId)
      if (!updated) {
        return sendError(reply, 400, 'No user profile found to update after image deletion')
      }
      const profileImages = mapProfileImagesToOwner(updated.profileImages)
      const response: ProfileImagesResponse = { success: true, profile: { profileImages } }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to delete image')
    }
  })

  /**
   * Reorder profile images
   */
  fastify.patch('/image/order', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (!req.user.userId) return sendUnauthorizedError(reply)

    const { images } = ReorderProfileImagesPayloadSchema.parse(req.body)

    try {
      const updated = await imageService.reorderImages(req.user.userId, images)
      const profileImages = mapProfileImagesToOwner(updated)
      const response: ProfileImagesResponse = { success: true, profile: { profileImages } }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return reply.code(500).send({ success: false })
    }
  })
}

export default profileRoutes
