import fp from 'fastify-plugin'
import { UserService } from '../services/user.service'

export default fp(async fastify => {
  // Create a single instance of UserService
  const userService = UserService.getInstance()

  // Decorate Fastify with the userService
  fastify.decorate('userService', userService)
})

// Add type declarations for TypeScript
declare module 'fastify' {
  interface FastifyInstance {
    userService: UserService
  }
}
