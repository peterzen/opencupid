import { z } from 'zod'
import { ProfileSchema } from '@zod/generated'

import { SearchPreferenceSchema } from './searchPreference.schema'

// export const ProfileSchema = z.object({
//   userId: z.string(),
//   publicName: z.string().min(2),
//   intro: z.string().optional(),
//   country: z.string().optional(),
//   city: z.string().optional(),
//   birthday: z.coerce.date().optional(),
//   gender: z.enum(['male', 'female', 'non_binary', 'other']),
//   relationship: z.enum(['single', 'in_relationship', 'married', 'other']),
//   hasKids: z.boolean(),
//   interestTags: z.array(z.string()),
//   searchPreference: SearchPreferenceSchema
// })


export const UpdateProfileSchema = ProfileSchema.partial() // Allow partial updates


// CreateProfileSchema using Zod with minimal duplication
export const CreateProfileSchema = z.object({
  body: z.object({
    userId: z.string(),
    isActive: z.boolean(),
    // publicName: z.string().min(1, 'Public name is required'),
    // lookingFor: z.array(ConnectionTypeSchema).nonempty({ message: 'Select at least one connection type' }),
  }),
});

export type CreateProfileInput = z.infer<typeof CreateProfileSchema>;


