import fp from 'fastify-plugin'
import { ProfileService } from '../services/profile.service'

export default fp(async fastify => {
  const profileService = ProfileService.getInstance()

  fastify.decorate('profileService', profileService)
})

// Add type declarations for TypeScript
declare module 'fastify' {
  interface FastifyInstance {
    profileService: ProfileService
  }
}
