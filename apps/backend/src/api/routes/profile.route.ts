import { FastifyPluginAsync } from 'fastify'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

import {
  type UpdateProfilePayload,
  UpdateProfilePayloadSchema
} from '@zod/profile/profile.dto'

import { ProfileService } from 'src/services/profile.service'
import { validateBody } from '@/utils/zodValidate'
import {
  getUserRoles,
  sendError,
  sendForbiddenError,
  sendUnauthorizedError
} from '../helpers'
import {
  DbProfileToOwnerProfileTransform,
  mapProfileTags,
  mapProfileToPublic,
} from 'src/api/mappers'
import { UserService } from 'src/services/user.service'
import type {
  GetMyProfileResponse,
  GetPublicProfileResponse,
  GetProfilesResponse,
  UpdateProfileResponse,
} from '@shared/dto/apiResponse.dto'
import { DbProfileSchema } from '@zod/profile/profile.db'

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

    try {
      const fetched = await profileService.getProfileByUserId(req.user.userId)
      if (!fetched) return sendError(reply, 404, 'Social profile not found')

      const profile = DbProfileToOwnerProfileTransform.parse(fetched)
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
      const raw = await profileService.getProfileWithConversationsById(id, myProfileId)
      if (!raw) return sendError(reply, 404, 'Profile not found')

      if (raw.userId !== req.user.userId && !req.session.hasActiveProfile) {
        return sendForbiddenError(reply, 'You do not have access to this profile')
      }

      const profile = mapProfileToPublic(raw, roles.includes('user_dating'))
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
      const roles = getUserRoles(req)
      const hasDatingPermission = roles.includes('user_dating')
      const mappedProfiles = profiles.map(p => mapProfileToPublic(p, hasDatingPermission))
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
    user.hasActiveProfile = [data.isDatingActive, data.isSocialActive].some(Boolean)

    try {
      const updated = await fastify.prisma.$transaction(async tx => {
        const updatedProfile = await profileService.updateProfile(tx, req.user.userId, data)
        // if (!updatedProfile) return sendError(reply, 404, 'Profile not found')
        const profile = DbProfileToOwnerProfileTransform.parse(updatedProfile)

        // Mark user as onboarded
        user.isOnboarded = true
        const updatedUser = await userService.updateUser(tx, user)
        if (!updatedUser) return sendError(reply, 500, 'Failed to update user')
        return profile
      })

      // Clear session to force re-fetch on next request, we need the roles updated
      await req.deleteSession()
      const response: UpdateProfileResponse = { success: true, profile: updated }
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
