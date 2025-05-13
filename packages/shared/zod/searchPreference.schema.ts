import { z } from 'zod'

export const SearchPreferenceSchema = z.object({
  ageMin: z.number().int().gte(18).lte(120),
  ageMax: z.number().int().gte(18).lte(120),
  gender: z.enum(['male', 'female', 'non_binary', 'other']),
  goal: z.enum(['friends', 'relationship'])
})
