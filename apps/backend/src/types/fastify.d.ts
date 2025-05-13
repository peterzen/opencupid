// apps/backend/src/types/fastify.d.ts
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; email: string } // used to sign
    user: { userId: string; email: string }    // used after verify
  }
}
