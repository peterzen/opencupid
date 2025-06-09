import fp from 'fastify-plugin'
import { MessageService } from '../services/messaging.service'

export default fp(async (fastify) => {
  const service = MessageService.getInstance()
  fastify.decorate('messageService', service)
})

// type declarations
declare module 'fastify' {
  interface FastifyInstance {
    messageService: MessageService
  }
}
