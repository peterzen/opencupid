import { FastifyPluginAsync } from 'fastify'

import {
  UpdatedProfileFragmentSchema,
  UpdateProfilePayload,
  UpdateProfilePayloadSchema
} from '@zod/profile/profile.dto'

import { ProfileService } from 'src/services/profile.service'
import { validateBody } from '@/utils/zodValidate'
import { getUserRoles, sendError, sendForbiddenError, sendUnauthorizedError } from '../helpers'
import {
  mapProfileTags,
  mapProfileToOwner,
  mapProfileToPublic,
} from 'src/api/mappers'
import { UserService } from 'src/services/user.service'
import { Prisma } from '@prisma/client'
import type {
  GetMyProfileResponse,
  GetPublicProfileResponse,
  GetProfilesResponse,
  UpdateProfileResponse,
} from '@shared/dto/apiResponse.dto'
import { z } from 'zod'

// Route params for ID lookups
const IdLookupParamsSchema = z.object({
  id: z.string().cuid(),
})


const profileRoutes: FastifyPluginAsync = async fastify => {


  // instantiate services
  const profileService = ProfileService.getInstance()
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
      const response: GetMyProfileResponse = { success: true, profile }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to load profile')
    }
  })

  /**
   * Get a profile by ID
   * @param {string} id - The id of the profile to retrieve
   */
  fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {

    const myProfileId = req.session.profileId
    const roles = getUserRoles(req)

    const { id } = IdLookupParamsSchema.parse(req.params)

    try {
      const raw = await profileService.getProfileById(id, myProfileId)
      if (!raw) return sendError(reply, 404, 'Profile not found')

      if (raw.userId !== req.user.userId && !req.session.hasActiveProfile) {
        return sendForbiddenError(reply, 'You do not have access to this profile')
      }

      const profile = mapProfileToPublic(raw, roles)
      // const profile = publicProfileSchema.parse(raw)
      const response: GetPublicProfileResponse = { success: true, profile }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch profile')
    }
  })

  fastify.get('/', { onRequest: [fastify.authenticate] }, async (req, reply) => {

    if (!req.session.hasActiveProfile) return sendForbiddenError(reply)
    const myProfileId = req.session.profileId

    try {
      const profiles = await profileService.findProfilesFor(myProfileId)
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

    const data = await validateBody(UpdateProfilePayloadSchema, req, reply) as UpdateProfilePayload
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

}

export default profileRoutes
