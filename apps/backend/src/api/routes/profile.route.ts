import { FastifyPluginAsync } from 'fastify'
import { validateBody } from '@utils/zodValidate'
import { ProfileSchema } from '@zod/generated'
import { CreateProfileSchema, UpdateProfileSchema } from '@zod/profile.schema'

import { UserService } from '../../services/user.service'

const profileRoutes: FastifyPluginAsync = async (fastify) => {

  const userService = UserService.getInstance()

  // Get current user's profile
  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    const profile = await fastify.prisma.profile.findUnique({
      where: { userId: req.user.userId },
    })
    console.debug('Fetched profile for user:', req.user.userId, profile)
    if (!profile) {
      // Create empty profile record with required fields
      const profile = await fastify.prisma.profile.create({
        data: {
          userId: req.user.userId,
          isActive: false,
          publicName: '',
          intro: '',  // Adding required intro field with empty string as default
        }
      })
    }
    return reply.status(200).send({ success: true, profile: profile })
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

    const profile = await fastify.prisma.profile.findUnique({
      where: { id },
      include: {
        user: false,
        profileImage: true,
      },
    })

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

    const profile = await fastify.prisma.profile.update({
      where: { id },
      data,
    })

    return { profile }
  })


  fastify.post('/initialize', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {
    if (req.user === null) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }
    const data = validateBody(CreateProfileSchema, req, reply)
    console.log('Creating profiles with data:', data)
    const { profile, datingProfile } = await userService.initializeProfiles(req.user.userId, data.lookingFor)
    return reply.status(200).send({ success: true, profile, datingProfile })
  })
}

export default profileRoutes