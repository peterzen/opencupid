import { FastifyPluginAsync } from 'fastify'

const messageRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return { messages: [] }
  })
}

export default messageRoutes
