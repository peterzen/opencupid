// src/plugins/session-auth.ts
import fp from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fastifyJwt from '@fastify/jwt'

import Redis from 'ioredis'
import { SessionService } from '../services/session.service'

import { sendUnauthorizedError } from 'src/api/helpers'

// Extend Fastify types
declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis
  }
  interface FastifyRequest {
    session: {
      userId: string
      lang: string
      isDatingActive: boolean
    }
  }
}

const redisUrl = process.env.REDIS_URL
if (!redisUrl) {
  throw new Error('REDIS_URL environment variable is not defined')
}

export default fp(async (fastify: FastifyInstance) => {

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret'
  })

  // Initialize Redis client
  const redis = new Redis(redisUrl)
  fastify.decorate('redis', redis)
  const sessions = new SessionService(redis)

  // Auth hook reads Bearer token as session ID
  fastify.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {

    try {
      await req.jwtVerify()
    } catch (err) {
      sendUnauthorizedError(reply)
    }

    const auth = req.headers.authorization
    if (!auth) {
      return sendUnauthorizedError(reply, 'Missing Authorization header')
    }
    const [scheme, sessionId] = auth.split(' ')
    if (scheme !== 'Bearer' || !sessionId) {
      return sendUnauthorizedError(reply, 'Invalid Authorization format')
    }

    // Try to fetch an existing session
    let sess = await sessions.get(sessionId)
    if (!sess) {
      // If it doesn’t exist, fall back to DB to “recreate” it
      // (you’ll need a way to derive userId—e.g. via a short-lived JWT or another header)
      // const { userId, isDatingActive, lang } = await fastify.prisma.user.findUnique({
      //   where: {
      //     id: req.user?.userId
      //   }
      // })
      const userId = req.user?.userId
      const isDatingActive = true // Mocked for example purposes
      const lang = 'en' // Mocked for example purposes

      if (!userId) {
        return sendUnauthorizedError(reply, 'Invalid session')
      }
      sess = await sessions.getOrCreate(sessionId, { userId, isDatingActive, lang })
    } else {
      // Refresh TTL on simple reads
      await sessions.refreshTtl(sessionId)
    }
    req.session = sess

  })
})