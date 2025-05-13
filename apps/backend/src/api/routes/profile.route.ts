import { FastifyPluginAsync } from 'fastify'

const profileRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return { profiles: [] }
  })
}

export default profileRoutes
