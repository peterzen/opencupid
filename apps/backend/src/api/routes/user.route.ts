import cuid from 'cuid'
import { FastifyPluginAsync } from 'fastify'
import { validateBody } from '../../utils/zodValidate'
import { emailQueue } from '../../queues/emailQueue'
import { UserService } from 'src/services/user.service'
import { ProfileService } from 'src/services/profile.service'
import { sendError, sendUnauthorizedError } from '../helpers'
import { SmsService } from '@/services/sms.service'
import { CaptchaService } from '@/services/captcha.service'
import { appConfig } from '@shared/config/appconfig'

import { AuthIdentifierCaptchaInputSchema, OtpLoginInputSchema, OtpSendReturn } from '@zod/user/user.dto'
import type { OtpLoginResponse, SendLoginLinkResponse, UserMeResponse } from '@shared/dto/apiResponse.dto'
import { JwtPayload } from '@zod/user/user.types'
import { User } from '@zod/generated'


const userRoutes: FastifyPluginAsync = async fastify => {
  const userService = UserService.getInstance()
  const profileService = ProfileService.getInstance()
  const captchaService = new CaptchaService(appConfig.ALTCHA_HMAC_KEY)

  fastify.get('/otp-login', async (req, reply) => {
    try {
      const { userId, otp } = OtpLoginInputSchema.parse(req.query)
      const { user, isNewUser } = await userService.otpLogin(userId, otp)
      if (!user) {
        const response: OtpLoginResponse = { success: false, status: 'invalid_token' }
        return reply.status(200).send(response)
      }

      let profileId = null

      // new user
      if (isNewUser) {
        // 2) enqueue the welcome email
        if (user.email)
          await emailQueue.add(
            'sendWelcomeEmail',
            { userId: user.id },
            { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
          )
        // If the user is new, initialize their profiles
        const newProfile = await profileService.initializeProfiles(user.id)
        profileId = newProfile.id
      } else {
        profileId = user.profile?.id
      }

      const payload: JwtPayload = { userId: user.id, profileId: profileId! }
      console.info('jwt payload', payload)
      const jwt = fastify.jwt.sign(payload)
      const response: OtpLoginResponse = { success: true, token: jwt }
      reply.code(200).send(response)
    } catch (error) {
      return sendError(reply, 400, 'Invalid query parameters')
    }
  })

  fastify.post('/send-login-link', async (req, reply) => {
    const data = validateBody(AuthIdentifierCaptchaInputSchema, req, reply)
    if (!data) return

    try {
      const captchaOk = await captchaService.validate(data.captchaSolution)
      if (!captchaOk) {
        return reply.code(400).send({ success: false, status: 'invalid_captcha' })
      }
    } catch (err: any) {
      fastify.log.error('Captcha validation error', err)
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
        fastify.log.error('Textbelt error sending', smsRes.error)
        return sendError(
          reply,
          500,
          'SMS sending is down at the moment. Apologies for that, please try again later.'
        )
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
      if (user.email)
        await emailQueue.add(
          'sendLoginLinkEmail',
          { userId: user.id },
          { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
        )

      const response: SendLoginLinkResponse = { success: true, user: userReturned, status: 'register' }
      return reply.status(200).send(response)
    }

    //  existing user
    if (user.email)
      await emailQueue.add(
        'sendLoginLinkEmail',
        { userId: user.id },
        { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
      )
    const response: SendLoginLinkResponse = { success: true, user: userReturned, status: 'login' }
    return reply.code(200).send(response)
  })

  fastify.get(
    '/me',
    {
      onRequest: [fastify.authenticate],
    },
    async (req, reply) => {
      if (req.user === null) return sendUnauthorizedError(reply)

      const user = await userService.getUserById(req.user.userId, {
        select: {
          email: true,
          phonenumber: true,
          language: true,
        },
      })

      if (!user) return sendUnauthorizedError(reply)

      const response: UserMeResponse = { success: true, user }
      return reply.code(200).send(response)
    }
  )

  // !!! TODO this is a temporary endpoint/hack to update the language
  // need to be replaced with a proper user settings endpoint
  fastify.patch(
    '/me',
    {
      onRequest: [fastify.authenticate],
    },
    async (req, reply) => {
      const { language } = req.body as { language: string }
      if (!language) {
        return sendError(reply, 400, 'Language is required')
      }
      try {
        await userService.update({
          id: req.user.userId,
          language
        } as User)
        await req.deleteSession()

        return reply.code(200).send({ success: true })
      } catch (error) {
        return sendError(reply, 500, 'Failed to update language')
      }
    }
  )
}

export default userRoutes
