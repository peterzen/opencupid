import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { hashPassword, comparePassword } from '../../utils/hash'

const userRoutes: FastifyPluginAsync = async (fastify) => {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  fastify.post('/register', async (req, reply) => {
    const body = bodySchema.parse(req.body)
    const existing = await fastify.prisma.user.findUnique({ where: { email: body.email } })
    if (existing) return reply.status(400).send({ error: 'User already exists' })

    const hashed = await hashPassword(body.password)
    const user = await fastify.prisma.user.create({
      data: { email: body.email, password: hashed }
    })

    reply.send({ ok: true, user: user.email })
  })

  fastify.post('/login', async (req, reply) => {
    const body = bodySchema.parse(req.body)
    const user = await fastify.prisma.user.findUnique({ where: { email: body.email } })
    if (!user) return reply.status(401).send({ error: 'Invalid credentials' })

    const valid = await comparePassword(body.password, user.password)
    if (!valid) return reply.status(401).send({ error: 'Invalid credentials' })

    const token = fastify.jwt.sign({ userId: user.id, email: user.email })
    reply.send({ token })
  })

  fastify.get('/me', { preValidation: [fastify.authenticate] }, async (req) => {
    return { user: req.user }
  })

}


export default userRoutes
