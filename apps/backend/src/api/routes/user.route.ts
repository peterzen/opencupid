import { FastifyPluginAsync } from 'fastify'
import { LoginSchema } from '@opencupid/shared/zod/user.schema'
import { validateBody } from '../../utils/zodValidate'
import { randomBytes } from 'crypto' // Import crypto for generating resetToken
import { emailQueue } from '../../queues/emailQueue'

function makeLoginToken() {
  return randomBytes(32).toString('hex')
}

function getTokenExpiration() {
  return new Date(Date.now() + 1000 * 60 * 60 * 240)
}


const userRoutes: FastifyPluginAsync = async (fastify) => {

  type JwtPayload = {
    userId: string
    email: string
    tokenVersion: number
  }

  fastify.get('/login-return', async (req, reply) => {
    const { token } = req.query as { token: string }

    if (!token) {
      return reply.status(200).send({ success: false, status: 'missing_token' })
    }

    const user = await fastify.prisma.user.findUnique({ where: { loginToken: token } })
    if (!user) {
      return reply.status(200).send({ success: false, status: 'invalid_token' })
    }

    const isNewUser = user.isRegistrationConfirmed === false

    // Update the user's email confirmation status
    await fastify.prisma.user.update({
      where: { id: user.id },
      data: {
        isRegistrationConfirmed: true,
        loginToken: null, // Clear the reset token
        loginTokenExp: null, // Clear the expiration
        lastLoginAt: new Date(), // Update the last login date
      },
    })

    // new user
    if (isNewUser) {

      // 2) enqueue the welcome email
      await emailQueue.add(
        'sendWelcomeEmail',
        { userId: user.id },
        { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
      )
    }

    const payload: JwtPayload = { userId: user.id, email: user.email, tokenVersion: user.tokenVersion ?? 0 }
    const jwt = fastify.jwt.sign(payload)
    reply.send({ status: 'success', token: jwt, user: { id: user.id, email: user.email } })
  })


  fastify.post('/send-login-link', async (req, reply) => {
    const data = validateBody(LoginSchema, req, reply)
    // TODO return 400 with status
    if (!data) return

    const user = await fastify.prisma.user.findUnique({ where: { email: data.email } })
    const emailConfirmationToken = makeLoginToken() // enerate email confirmation token
    const tokenExpiration = getTokenExpiration() // Set token expiration to 24 hours from now

    if (!user) {
      // register email address

      const user = await fastify.prisma.user.create({
        data: {
          email: data.email,
          loginToken: emailConfirmationToken,
          loginTokenExp: tokenExpiration,
        }
      })
      await emailQueue.add(
        'sendLoginLinkEmail',
        { userId: user.id },
        { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
      )

      return reply.status(200).send({ success: true, status: 'register' });
    }

    // existing user
    await fastify.prisma.user.update({
      where: { id: user.id },
      data: {
        loginToken: emailConfirmationToken, // Clear the reset token
        loginTokenExp: tokenExpiration, // Clear the expiration
      },
    })

    await emailQueue.add(
      'sendLoginLinkEmail',
      { userId: user.id },
      { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
    )

    return reply.status(200).send({ success: true, status: 'login' });
  })

  fastify.get('/verify-token', async (req, reply) => {
    try {
      const user = await fastify.prisma.user.findUnique({
        where: { id: req.user.userId },
      })

      if (!user) {
        return reply.status(401).send({ success: false, error: 'Invalid token' })
      }
      reply.send({
        success: true,
        user: { id: user.id, email: user.email }
      });

    } catch (err) {
      return reply.status(500).send({ error: 'Failed to verify token' })
    }
  })

}

export default userRoutes
