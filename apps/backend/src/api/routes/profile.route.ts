import { FastifyPluginAsync } from 'fastify'
import { validateBody } from '@utils/zodValidate'
import { ownerDatingProfileSchema, ownerProfileSchema, publicProfileSchema, UpdateDatingProfileSchema, UpdateProfileSchema } from '@zod/profile.schema'

import { ProfileService } from 'src/services/profile.service'

const profileRoutes: FastifyPluginAsync = async (fastify) => {

  const profileService = ProfileService.getInstance()

  // Get current user's profile
  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    const { profile, datingProfile } = await profileService.getAllProfilesByUserId(req.user.userId)
    console.debug('Fetched profiles for user:', req.user.userId, profile, datingProfile)

    if (!profile) {
      return reply.status(404).send({ error: 'Profile not found' })
    }
    const safeProfile = ownerProfileSchema.parse(profile)
    const safeDatingProfile = ownerDatingProfileSchema.parse(datingProfile)
    return reply.status(200).send({
      success: true,
      profile: safeProfile,
      datingProfile: safeDatingProfile
    })
  })

  // Get all profiles

  fastify.get('/', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {
    const profiles = await fastify.prisma.profile.findMany({
      include: {
        user: true, // Include related user data if needed
      },
    })
    return { profiles }
  })

  // Get a single profile by ID
  fastify.get('/:id', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {
    const { id } = req.params as { id: string }

    const profile = await profileService.getProfileById(id)

    if (!profile) {
      return reply.status(404).send({ error: 'Profile not found' })
    }

    return { profile }
  })

  // Update an existing profile
  fastify.patch('/profile', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (!req.user.userId) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const data = validateBody(UpdateProfileSchema, req, reply)
    if (!data) return

    const profile = profileService.updateProfile(req.user.userId, data)

    return reply.status(200).send({ success: true, profile })
  })

  // Update an existing profile
  fastify.patch('/dating', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (!req.user.userId) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const data = validateBody(UpdateDatingProfileSchema, req, reply)
    if (!data) return

    const profile = profileService.updateDatingProfile(req.user.userId, data)

    return reply.status(200).send({ success: true, profile })
  })



}

export default profileRoutes