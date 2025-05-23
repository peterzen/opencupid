import { FastifyPluginAsync } from 'fastify'
import multipart, { } from '@fastify/multipart';

import { validateBody } from '@utils/zodValidate'
import { ownerDatingProfileSchema, ownerProfileSchema, UpdateDatingProfileSchema, UpdateProfileSchema } from '@zod/profile.schema'

import { ProfileService } from 'src/services/profile.service'
import { ImageGalleryService } from 'src/services/gallery.service'
import env from 'src/env';
import { uploadTmpDir } from 'src/lib/media';

const uploadTmp = env.MEDIA_UPLOAD_DIR + '/uploads'

const profileRoutes: FastifyPluginAsync = async (fastify) => {

  // --- Helper to send uniform error responses ---
  const sendError = (
    reply: FastifyPluginAsync['prototype']['reply'],
    statusCode: number,
    message: string,
    fieldErrors?: Record<string, string[]>
  ) => {
    const payload: any = { success: false, message }
    if (fieldErrors) payload.fieldErrors = fieldErrors
    return reply.code(statusCode).send(payload)
  }

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
      return sendError(
        reply,
        400,
        `The image is too large ${err.code === 'FST_ERR_MULTIPART_FILE_TOO_LARGE' ? ` ${env.IMAGE_MAX_SIZE}MB max` : ''}`
      )
    }

    if (files.length === 0) {
      return sendError(reply, 400, 'No file uploaded')
    }

    // each entry is a MultipartFile with .filepath, .fieldname, .filename, .mimetype, .encoding
    const fileUpload = files[0]
    // Validate file type
    if (!fileUpload.mimetype.startsWith('image/')) {
      return sendError(reply, 400, 'Uploaded file must be an image')
    }

    const captionText = fileUpload.fields.captionText?.value || ''

    try {
      const stored = await imageGalleryService.storeImage(req.user.userId, fileUpload, captionText)
      const publicImage = imageGalleryService.toOwnerProfileImage(stored)
      return reply.code(200).send({ success: true, profileImage: publicImage })
    } catch (err) {
      fastify.log.error('Error storing image:', err)
      return sendError(reply, 500, 'Failed to store image')
    }
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
    const safeImages = images.map((image) => {
      return imageGalleryService.toOwnerProfileImage(image)
    })
    return reply.status(200).send({ success: true, images: safeImages })
  })
}

export default profileRoutes