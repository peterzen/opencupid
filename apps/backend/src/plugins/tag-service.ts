import fp from 'fastify-plugin'
import { TagService } from 'src/services/tag.service'

export default fp(async fastify => {
  const service = TagService.getInstance()

  fastify.decorate('tagService', service)
})

// Add type declarations for TypeScript
declare module 'fastify' {
  interface FastifyInstance {
    tagService: TagService
  }
}
