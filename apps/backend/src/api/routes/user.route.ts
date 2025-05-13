import { FastifyPluginAsync } from 'fastify'
import { RegisterSchema } from '@opencupid/shared/zod/user.schema'
import { hashPassword, comparePassword } from '../../utils/hash'
import { validateBody } from '../../utils/zodValidate'

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', async (req, reply) => {
    const data = validateBody(RegisterSchema, req, reply)
    if (!data) return

    const existing = await fastify.prisma.user.findUnique({ where: { email: data.email } })
    if (existing) return reply.status(400).send({ error: 'User already exists' })

    const hashed = await hashPassword(data.password)
    const user = await fastify.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashed
      }
    })

    reply.send({ ok: true, id: user.id })
  })

  fastify.post('/login', async (req, reply) => {
    const data = validateBody(RegisterSchema.pick({ email: true, password: true }), req, reply)
    if (!data) return

    const user = await fastify.prisma.user.findUnique({ where: { email: data.email } })
    if (!user) return reply.status(401).send({ error: 'Invalid credentials' })

    const valid = await comparePassword(data.password, user.password)
    if (!valid) return reply.status(401).send({ error: 'Invalid credentials' })

    const token = fastify.jwt.sign({ userId: user.id, email: user.email })
    reply.send({ token })
  })
}

export default userRoutes
