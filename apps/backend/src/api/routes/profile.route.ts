import { FastifyPluginAsync } from 'fastify'
import multipart from '@fastify/multipart';

import { validateBody } from '@utils/zodValidate'
import { ownerDatingProfileSchema, ownerProfileSchema, publicProfileSchema, UpdateDatingProfileSchema, UpdateProfileSchema } from '@zod/profile.schema'

import { ProfileService } from 'src/services/profile.service'
import { ImageGalleryService } from 'src/services/gallery.service'

const profileRoutes: FastifyPluginAsync = async (fastify) => {

  await fastify.register(multipart);
  const profileService = ProfileService.getInstance()
  const imageGalleryService = ImageGalleryService.getInstance();

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

  // Single file upload route
  fastify.post('/image', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (!req.user.userId) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }
    // const { profileId } = req.params as { profileId: string }

    // const data = validateBody(UploadImageSchema, req, reply)
    // if (!data) return
    const fileUpload = await req.file();
    if (!fileUpload) {
      return reply.status(500).send({ error: 'No file uploaded' });
    }
    // Validate file type
    if (!fileUpload.mimetype.startsWith('image/')) {
      return reply.status(500).send({ error: 'File must be an image' });
    }

    let profileImage = null

    try {
      profileImage = await imageGalleryService.storeImage(req.user.userId, fileUpload)
    }
    catch (error) {
      console.error('Error storing image:', error);
      return reply.status(500).send({ error: 'Failed to store image' });
    }
    return reply.status(200).send({ success: true, profileImage: profileImage })
  })

  // Delete a profile image
  fastify.delete('/image/:profileImageId', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (!req.user.userId) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const { profileImageId } = req.params as { profileImageId: string }
    await imageGalleryService.deleteImage(req.user.userId, profileImageId)
    return reply.status(200).send({ success: true })
  })


  fastify.get('/user-images', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (!req.user.userId) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const images = await imageGalleryService.listImages(req.user.userId)
    return reply.status(200).send({ success: true, images })
  })


}

export default profileRoutes