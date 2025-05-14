import { FastifyPluginAsync } from 'fastify'
import { PasswordRecoverySchema, RegisterSchema, ResetPasswordSchema } from '@opencupid/shared/zod/user.schema'
import { hashPassword, comparePassword } from '../../utils/hash'
import { validateBody } from '../../utils/zodValidate'
import { randomBytes } from 'crypto' // Import crypto for generating resetToken
import { emailQueue } from '../../queues/emailQueue'

function generateResetToken() {
  return randomBytes(32).toString('hex')
}

function getPasswordRecoveryTokenExpiration() {
  return new Date(Date.now() + 1000 * 60 * 60 * 240)
}


const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', async (req, reply) => {
    const data = validateBody(RegisterSchema, req, reply)
    if (!data) return

    const existing = await fastify.prisma.user.findUnique({ where: { email: data.email } })
    if (existing) return reply.status(400).send({ error: 'User already exists' })

    const hashed = await hashPassword(data.password)
    const emailConfirmationToken = generateResetToken() // Generate email confirmation token
    const tokenExpiration = getPasswordRecoveryTokenExpiration() // Set token expiration to 24 hours from now

    const user = await fastify.prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
        resetToken: emailConfirmationToken,
        resetTokenExp: tokenExpiration,
      }
    })

    // 2) enqueue the welcome/verification email
    await emailQueue.add(
      'sendConfirmationEmail',
      { userId: user.id },
      { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
    )
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
    // 2) enqueue the welcome/verification email
    await emailQueue.add(
      'sendWelcomeEmail',
      { userId: user.id },
      { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
    )
    const token = fastify.jwt.sign({ userId: user.id, email: user.email });
    reply.send({ status: 'success', token, user });

  })


  fastify.post('/send-password-recovery-email', async (req, reply) => {
    const data = validateBody(PasswordRecoverySchema, req, reply)
    if (!data) return

    const user = await fastify.prisma.user.findUnique({ where: { email: data.email } })
    if (!user) {
      return reply.status(200).send({ status: '' }); // Return status flag
    }

    // Create password recovery token
    const emailConfirmationToken = generateResetToken() // Generate email confirmation token
    const tokenExpiration = getPasswordRecoveryTokenExpiration() // Set token expiration to 24 hours from now

    await fastify.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: emailConfirmationToken, // Clear the reset token
        resetTokenExp: tokenExpiration, // Clear the expiration
      },
    })

    // 2) enqueue the welcome/verification email
    await emailQueue.add(
      'sendPasswordRecoveryEmail',
      { userId: user.id },
      { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
    )
    reply.send({ ok: true, id: user.id, email: user.email, token: user.resetToken })
  })


  // Confirm email endpoint
  fastify.post('/password-reset', async (req, reply) => {
    
    const data = validateBody(ResetPasswordSchema, req, reply)
    if (!data) return

    if (!data.token) {
      return reply.status(400).send({ error: 'Missing email token' })
    }

    const user = await fastify.prisma.user.findUnique({ where: { resetToken: data.token } })
    if (!user) {
      return reply.status(200).send({ status: 'invalid_token' }); // Return status flag
    }

    const hashed = await hashPassword(data.password)

    // Update the user's email confirmation status
    await fastify.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
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
