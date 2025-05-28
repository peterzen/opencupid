import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import { sendUnauthorizedError } from 'src/api/helpers'

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret'
  })

  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify()
    } catch (err) {
      sendUnauthorizedError(reply)
    }
  })
})
