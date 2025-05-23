import { FastifyPluginAsync } from 'fastify'
import userRoutes from './routes/user.route'
import profileRoutes from './routes/profile.route'
import messageRoutes from './routes/message.route'

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(userRoutes, { prefix: '/users' })
  fastify.register(profileRoutes, { prefix: '/profiles' })
  fastify.register(messageRoutes, { prefix: '/messages' })
}

export default api
