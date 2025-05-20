import { z } from 'zod'
import { ConnectionTypeSchema, UserSchema } from '@zod/generated'



export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const LoginSchema = z.object({
  email: z.string().email()
})

export const UpdateUserSchema = z.object({
  lookingFor: z.array(ConnectionTypeSchema).optional(),
  language: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})