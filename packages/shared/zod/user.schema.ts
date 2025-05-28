import { z } from 'zod'
import { ConnectionTypeSchema, UserRoleSchema } from '@zod/generated'



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

export const SessionDataSchema = z.object({
  userId: z.string(),
  lang: z.string(),
  roles: z.array(UserRoleSchema)
})

export type SessionData = z.infer<typeof SessionDataSchema>
