import fp from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import Redis from 'ioredis'

import { type SessionData } from '@zod/user.schema'

import { UserService, type UserWithProfileId } from 'src/services/user.service'
import { SessionService } from '../services/session.service'
import { sendUnauthorizedError } from 'src/api/helpers'
import { appConfig } from '@shared/config/appconfig'

// Extend Fastify types
declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis
  }
  interface FastifyRequest {
    session: SessionData
    deleteSession: () => Promise<void>
  }
}

const redisUrl = appConfig.REDIS_URL
if (!redisUrl) {
  throw new Error('REDIS_URL environment variable is not defined')
}

export default fp(async (fastify: FastifyInstance) => {

  fastify.register(fastifyJwt, {
    secret: appConfig.JWT_SECRET
  })

  // Initialize Redis client
  const redis = new Redis(redisUrl)
  fastify.decorate('redis', redis)
  const sessionService = new SessionService(redis)

  // Auth hook reads Bearer token as session ID
  fastify.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {

    try {
      await req.jwtVerify()
    } catch (err) {
      return sendUnauthorizedError(reply)
    }

    const auth = req.headers.authorization
    if (!auth) {
      return sendUnauthorizedError(reply, 'Missing Authorization header')
    }
    const [scheme, sessionId] = auth.split(' ')
    if (scheme !== 'Bearer' || !sessionId) {
      return sendUnauthorizedError(reply, 'Invalid Authorization format')
    }

    // Try to fetch an existing session from Redis
    let sess = await sessionService.get(sessionId)
    if (!sess) {

      const userId = req.user?.userId
      if (!userId) {
        return sendUnauthorizedError(reply, 'Invalid session')
      }

      let user

      try {
        user = await UserService.getInstance().getUserById(userId, {
          include: {
            profile: {
              select: { id: true }
            }
          },
        }) as UserWithProfileId
        if (!user) return sendUnauthorizedError(reply, 'User not found')
      } catch (error) {
        fastify.log.error('Error fetching user for session refresh:', error)
        return sendUnauthorizedError(reply, 'Session refresh failed')
      }

      const sessionData: SessionData = {
        lang: user.language || 'en', // Default to 'en' if no language is set
        roles: user.roles,
        userId: user.id,
        profileId: user.profile?.id || '',
        isOnboarded: user.isOnboarded || false,
        hasActiveProfile: user.hasActiveProfile || false,
      }
      sess = await sessionService.getOrCreate(sessionId, sessionData)
      // console.log(`Created new session for user ${user.id} with session ID ${sessionId}`)
    } else {
      // Refresh TTL on simple reads
      await sessionService.refreshTtl(sessionId)
    }
    req.session = sess
    req.deleteSession = async () => {
      return await sessionService.delete(sessionId)
    }
  })
})