import { FastifyPluginAsync } from 'fastify'
import { validateBody } from '../../utils/zodValidate'
import { ProfileSchema } from '@opencupid/shared/zod/generated'
import { CreateProfileSchema, UpdateProfileSchema } from '@opencupid/shared/zod/profile.schema'

const profileRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all profiles
  fastify.get('/', async (req, reply) => {
    const profiles = await fastify.prisma.profile.findMany({
      include: {
        user: true, // Include related user data if needed
      },
    })
    return { profiles }
  })

  // Get a single profile by ID
  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params as { id: string }

    const profile = await fastify.prisma.profile.findUnique({
      where: { id },
      include: {
        user: false,
      },
    })

    if (!profile) {
      return reply.status(404).send({ error: 'Profile not found' })
    }

    return { profile }
  })

  // Create a new profile
  fastify.post('/', async (req, reply) => {
    const data = validateBody(CreateProfileSchema, req, reply)
    if (!data) return

    const profile = await fastify.prisma.profile.create({
      data: {
        ...data,
        userId: req.user.userId, // Assuming userId is available from JWT
      },
    })

    return { profile }
  })

  // Update an existing profile
  fastify.patch('/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const data = validateBody(UpdateProfileSchema, req, reply)
    if (!data) return

    // Verify ownership
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
}

export default profileRoutes