import { z } from 'zod'
import { UserRoleSchema, UserSchema } from '@zod/generated'


export const AuthIdSchema = z.object({
  email: z.string().optional(),
  phonenumber: z.string().optional(),
})
export type AuthIdentifier = z.infer<typeof AuthIdSchema>

export const SendOtpSchema = AuthIdSchema
  .extend({
    captchaSolution: z.string().min(1, 'Captcha solution is required'),
  })
  .refine(
    (data) => !!data.email || !!data.phonenumber,
    {
      message: 'Either email or phone number is required.',
      path: ['email'], // mark the error on the email field (or 'phonenumber')
    }
  )
export type SendOtpPayload = z.infer<typeof SendOtpSchema>

export const SessionDataSchema = z.object({
  userId: z.string(),
  lang: z.string(),
  roles: z.array(UserRoleSchema)
})

export type SessionData = z.infer<typeof SessionDataSchema>

export const OwnerUserSchema = UserSchema.pick({
  id: true,
  email: true,
  phonenumber: true,
  language: true,
  isRegistrationConfirmed: true,
})
export type OwnerUser = z.infer<typeof OwnerUserSchema>


export const OtpLoginSchema = z.object({
  userId: z.string().cuid(),
  otp: z.string().min(6, 'OTP must be at least 6 characters long').max(6, 'OTP must be exactly 6 characters long'),
})
export type OtpLogin = z.infer<typeof OtpLoginSchema>