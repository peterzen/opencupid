import { FastifyPluginAsync } from 'fastify'
import userRoutes from './routes/user.route'
import profileRoutes from './routes/profile.route'
import messageRoutes from './routes/message.route'
import tagsRoutes from './routes/tags.route'
import citiesRoutes from './routes/city.route'

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(userRoutes, { prefix: '/users' })
  fastify.register(tagsRoutes, { prefix: '/tags' })
  fastify.register(profileRoutes, { prefix: '/profiles' })
  fastify.register(messageRoutes, { prefix: '/messages' })
  fastify.register(citiesRoutes, { prefix: '/cities' })
}

export default api
