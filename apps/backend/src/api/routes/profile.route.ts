import { FastifyPluginAsync } from 'fastify'
import { validateBody } from '@utils/zodValidate'
import { ownerDatingProfileSchema, ownerProfileSchema, publicProfileSchema, UpdateProfileSchema } from '@zod/profile.schema'

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
  fastify.patch('/:id', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const data = validateBody(UpdateProfileSchema, req, reply)
    if (!data) return

    // TODO Verify ownership correctly - userId isn't checked ATM
    const existingProfile = await fastify.prisma.profile.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!existingProfile) {
      return reply.status(404).send({ error: 'Profile not found' })
    }

    if (existingProfile.userId !== req.user.userId) {
      return reply.status(403).send({ error: 'Not authorized to update this profile' })
    }

    const profile = await profileService.updateProfile(id, data)
    return reply.status(200).send({ success: true, profile })
  })


}

export default profileRoutes