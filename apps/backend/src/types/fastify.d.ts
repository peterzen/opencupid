// apps/backend/src/types/fastify.d.ts
import { PrismaClient } from '@prisma/client'
import '@fastify/jwt'
import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; email: string, tokenVersion: number }
    user: { userId: string; email: string }
  }
}
