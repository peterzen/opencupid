import 'fastify'
import { PrismaClient } from '@prisma/client'
import type { MessageService } from '../services/message.service'
import type { SocketStream } from '@fastify/websocket'
import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
    connections: Record<string, SocketStream['socket']>
    messageService: MessageService
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; tokenVersion: number }
    user: { userId: string }
  }
}
