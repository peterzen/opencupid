import { FastifyPluginAsync } from 'fastify'

const messageRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:userId', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const { userId } = req.params as { userId: string }
    const current = req.user!.userId
    const messages = await fastify.messageService.getConversation(current, userId)
    reply.send({ messages })
  })
}

export default messageRoutes
