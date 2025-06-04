import { FastifyPluginAsync } from 'fastify'
import { SendOtpSchema, OtpLoginSchema, OtpSendReturn } from '@zod/user.schema'
import { validateBody } from '../../utils/zodValidate'
import { emailQueue } from '../../queues/emailQueue'
import { UserService } from 'src/services/user.service'
import { ProfileService } from 'src/services/profile.service'
import { sendError, sendUnauthorizedError } from '../helpers'
import { SmsService } from '@/services/sms.service'
import { CaptchaService } from '@/services/captcha.service'
import cuid from 'cuid'
import { appConfig } from '@shared/config/appconfig'


const userRoutes: FastifyPluginAsync = async (fastify) => {

  const userService = UserService.getInstance()
  const profileService = ProfileService.getInstance()
  const captchaService = new CaptchaService(appConfig.ALTCHA_HMAC_KEY)

  fastify.get('/otp-login', async (req, reply) => {
    try {
      const { userId, otp } = OtpLoginSchema.parse(req.query)
      const { user, isNewUser } = await userService.otpLogin(userId, otp)
      if (!user) {
        return reply.status(200).send({ success: false, status: 'invalid_token' })
      }

      // new user
      if (isNewUser) {
        // 2) enqueue the welcome email
        if (user.email) await emailQueue.add(
          'sendWelcomeEmail',
          { userId: user.id },
          { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
        )
        // If the user is new, initialize their profiles
        await profileService.initializeProfiles(user.id)
      }

      const payload = { userId: user.id, tokenVersion: user.tokenVersion ?? 0 }
      const jwt = fastify.jwt.sign(payload)
      reply.send({ success: true, token: jwt })
    } catch (error) {
      return sendError(reply, 400, 'Invalid query parameters')
    }

  })

  fastify.post('/send-login-link', async (req, reply) => {

    const data = validateBody(SendOtpSchema, req, reply)
    if (!data) return

    try {
      const captchaOk = await captchaService.validate(data.captchaSolution)
      if (!captchaOk) {
        return reply.code(400).send({ success: false, status: 'invalid_captcha' })
      }
    } catch (err: any) {
      fastify.log.error("Captcha validation error", err)
      return reply.code(500).send({ success: false, status: 'captcha_validation_failed' })
    }

    let otp = null

    if (data.email) {
      otp = userService.generateOTP()
    } else {

      const smsService = new SmsService(appConfig.SMS_API_KEY)
      const userId = cuid()
      const smsRes = await smsService.sendOtp(data.phonenumber, userId)
      if (smsRes.success && smsRes.otp && smsRes.otp !== '') {
        otp = smsRes.otp
      } else {
        fastify.log.error("Textbelt error sending", smsRes.error)
        return sendError(reply, 500, 'SMS sending is down at the moment. Apologies for that, please try again later.')
      }
    }

    const { user, isNewUser } = await userService.setUserOTP(data, otp, data.locale)

    const userReturned: OtpSendReturn = {
      id: user.id,
      email: user.email,
      phonenumber: user.phonenumber,
      isRegistrationConfirmed: user.isRegistrationConfirmed,
      language: user.language,
    }

    // new user
    if (isNewUser) {
      if (user.email) await emailQueue.add(
        'sendLoginLinkEmail',
        { userId: user.id },
        { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
      )

      return reply.status(200).send({ success: true, user: userReturned, status: 'register' });
    }

    //  existing user
    if (user.email) await emailQueue.add(
      'sendLoginLinkEmail',
      { userId: user.id },
      { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
    )
    return reply.status(200).send({ success: true, user: userReturned, status: 'login' });
  })

  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {

    if (req.user === null) return sendUnauthorizedError(reply)

    const user = await userService.getUserById(req.user.userId, {
      select: {
        email: true,
        phonenumber: true,
        language: true,
      }
    })

    if (!user) return sendUnauthorizedError(reply)

    return reply.status(200).send({ success: true, user })
  })
}

export default userRoutes
