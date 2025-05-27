import fp from 'fastify-plugin'
import { ImageGalleryService } from 'src/services/image.service'

export default fp(async (fastify) => {

  const service = ImageGalleryService.getInstance()
  
  fastify.decorate('imageGalleryService', service)
})

// Add type declarations for TypeScript
declare module 'fastify' {
  interface FastifyInstance {
    imageGalleryService: ImageGalleryService
  }
}