import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', async (req, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const body = bodySchema.parse(req.body)
    // call user service here...
    reply.send({ ok: true, user: body.email })
  })
}

export default userRoutes
