

import { z } from 'zod'
import { ProfileSummarySchema } from '../profile/profile.dto'

export const LikeEdgeSchema = z.object({
  profile: ProfileSummarySchema,
  isMatch: z.boolean(),
  createdAt: z.string().datetime(), // ISO format
})

export type LikeEdge = z.infer<typeof LikeEdgeSchema>