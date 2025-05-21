import { FastifyPluginAsync } from 'fastify'
import { LoginSchema } from '@zod/user.schema'
import { validateBody } from '../../utils/zodValidate'
import { emailQueue } from '../../queues/emailQueue'
import { UserService } from 'src/services/user.service'


const userRoutes: FastifyPluginAsync = async (fastify) => {

  const userService = UserService.getInstance()

  fastify.get('/otp-login', async (req, reply) => {
    const { token } = req.query as { token: string }
    if (!token) {
      return reply.status(200).send({ success: false, status: 'missing_token' })
    }

    const { user, isNewUser } = await userService.otpLogin(token)
    if (!user) {
      return reply.status(200).send({ success: false, status: 'invalid_token' })
    }

    // new user
    if (isNewUser) {
      // 2) enqueue the welcome email
      await emailQueue.add(
        'sendWelcomeEmail',
        { userId: user.id },
        { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
      )
    }

    const payload = { userId: user.id, email: user.email, tokenVersion: user.tokenVersion ?? 0 }
    const jwt = fastify.jwt.sign(payload)
    reply.send({ success: true, token: jwt })
  })

  fastify.post('/send-login-link', async (req, reply) => {
    const data = validateBody(LoginSchema, req, reply)
    // TODO return 400 with status
    if (!data) return

    const { user, isNewUser } = await userService.createUserOTP(data.email, data.locale)

    // new user
    if (isNewUser) {
      await emailQueue.add(
        'sendLoginLinkEmail',
        { userId: user.id },
        { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
      )

      return reply.status(200).send({ success: true, status: 'register' });
    }

    //  existing user
    await emailQueue.add(
      'sendLoginLinkEmail',
      { userId: user.id },
      { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
    )
    return reply.status(200).send({ success: true, status: 'login' });
  })

  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (req.user === null) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const user = userService.getUserById(req.user.userId, {
      select: {
        email: true,
        language: true,
      }
    })

    if (!user) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    return reply.status(200).send({ success: true, data: user })
  })


  // fastify.patch('/me', {
  //   onRequest: [fastify.authenticate]
  // }, async (req, reply) => {
  //   if (req.user === null) {
  //     return reply.status(401).send({ error: 'Unauthorized' })
  //   }
  //   const data = validateBody(UpdateUserSchema, req, reply)
  //   if (!data) return

  //   const user = await fastify.prisma.user.update({
  //     where: { id: req.user.userId },
  //     data,
  //   })

  //   if (!user) {
  //     return reply.status(401).send({ error: 'Unauthorized' })
  //   }

  //   return reply.status(200).send({ success: true  })
  // })
}

export default userRoutes
