import 'fastify'
import { PrismaClient } from '@prisma/client'
import type { SocketStream } from '@fastify/websocket'
import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
    connections: Record<string, SocketStream['socket']>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; tokenVersion: number }
    user: { userId: string }
  }
}
