import { FastifyPluginAsync } from 'fastify'
import { RegisterSchema } from '@opencupid/shared/zod/user.schema'
import { hashPassword, comparePassword } from '../../utils/hash'
import { validateBody } from '../../utils/zodValidate'
import { randomBytes } from 'crypto' // Import crypto for generating resetToken

function generateResetToken() {
  return randomBytes(32).toString('hex')
}

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', async (req, reply) => {
    const data = validateBody(RegisterSchema, req, reply)
    if (!data) return

    const existing = await fastify.prisma.user.findUnique({ where: { email: data.email } })
    if (existing) return reply.status(400).send({ error: 'User already exists' })

    const hashed = await hashPassword(data.password)
    const emailConfirmationToken = generateResetToken() // Generate email confirmation token
    console.log('Generated email confirmation token:', emailConfirmationToken)

    const user = await fastify.prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
        resetToken: emailConfirmationToken,
        resetTokenExp: new Date(Date.now() + 1000 * 60 * 60 * 240), // Token expires in 10 days
      }
    })

    reply.send({ ok: true, id: user.id, email: user.email, token: user.resetToken })
  })

  fastify.post('/login', async (req, reply) => {
    const data = validateBody(RegisterSchema.pick({ email: true, password: true }), req, reply);
    if (!data) return;

    const user = await fastify.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return reply.status(200).send({ status: 'invalid_credentials' }); // Return status flag
    }

    const valid = await comparePassword(data.password, user.password);
    if (!valid) {
      return reply.status(200).send({ status: 'invalid_credentials' }); // Return status flag
    }

    if (!user.isEmailConfirmed) {
      return reply.status(200).send({ status: 'email_not_confirmed' }); // Return status flag
    }

    const token = fastify.jwt.sign({ userId: user.id, email: user.email });
    reply.send({ status: 'success', token, user });
  });

  // Confirm email endpoint
  fastify.get('/confirm-email', async (req, reply) => {
    const { emailToken } = req.query as { emailToken: string } // Extract emailToken from query parameters

    if (!emailToken) {
      return reply.status(400).send({ error: 'Missing email token' })
    }

    const user = await fastify.prisma.user.findUnique({ where: { resetToken: emailToken } })
    if (!user) {
      return reply.status(200).send({ status: 'invalid_token' }); // Return status flag
    }

    // Update the user's email confirmation status
    await fastify.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailConfirmed: true,
        resetToken: null, // Clear the reset token
        resetTokenExp: null, // Clear the expiration
      },
    })

    const token = fastify.jwt.sign({ userId: user.id, email: user.email });
    reply.send({ status: 'success', token, user });

  })
}

export default userRoutes
