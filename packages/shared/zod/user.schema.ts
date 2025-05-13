import { z } from 'zod'

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  resetToken: z.string().optional(),
  resetTokenExp: z.coerce.date().optional()
})

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})