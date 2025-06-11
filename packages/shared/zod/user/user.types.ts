import { z } from "zod"

import { UserRoleSchema, UserSchema } from "@zod/generated"
import { AuthIdentifierSchema, JwtPayloadSchema } from "./user.dto"

const SessionDataSchema = z.object({
  userId: z.string(),
  profileId: z.string(),
  lang: z.string(),
  roles: z.array(UserRoleSchema),
  isOnboarded: z.boolean().default(false),
  hasActiveProfile: z.boolean().default(false),
})

export type SessionData = z.infer<typeof SessionDataSchema>


const LoginUserSchema = UserSchema.pick({
  id: true,
  email: true,
  phonenumber: true,
  language: true,
  isOnboarded: true,
  hasActiveProfile: true,
  isRegistrationConfirmed: true,
})

export type LoginUser = z.infer<typeof LoginUserSchema>

export type AuthIdentifier = z.infer<typeof AuthIdentifierSchema>

export type JwtPayload = z.infer<typeof JwtPayloadSchema>
