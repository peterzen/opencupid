import { z } from 'zod'
import { ConnectionTypeSchema, DatingPreferenceSchema, DatingProfileSchema, ProfileImageSchema, ProfileSchema } from '@zod/generated'

import { publicTagSchema } from './tags.schema';

export const UpdateProfileSchema = ProfileSchema.partial() // Allow partial updates

// CreateProfileSchema using Zod with minimal duplication
export const CreateProfileSchema = z.object({
  // publicName: z.string().min(1, 'Public name is required'),
  lookingFor: z.array(ConnectionTypeSchema).nonempty({ message: 'Select at least one connection type' }),
});

export type CreateProfileInput = z.infer<typeof CreateProfileSchema>;

const publicProfileFields = {
  id: true,
  publicName: true,
  intro: true,
  profileImageId: true,
  city: true,
  country: true,
} as const;

export const publicProfileSchema = ProfileSchema
  .pick(publicProfileFields)
  .extend({
    // profileImage: ProfileImageSchema.optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
    tags: z.array(publicTagSchema)
  });


export const ownerProfileSchema = ProfileSchema
  .pick({
    ...publicProfileFields,
    id: true,
    isActive: true,
  }).extend({
    tags: z.array(publicTagSchema).optional(),
    // profileImage: ProfileImageSchema.optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
  });


const publicDatingProfileFields = {
  id: true,
  publicName: true,
  intro: true,
  profileImageId: true,
  city: true,
  country: true,
  hasKids: true,
  relationship: true,
  gender: true,
  birthday: true,
} as const;


export const publicDatingProfileSchema = DatingProfileSchema
  .pick({
    ...publicDatingProfileFields
  }).extend({
    // profileImage: ProfileImageSchema.optional(),
    tags: z.array(publicTagSchema).optional(),
  });

export const ownerDatingProfileSchema = DatingProfileSchema
  .pick({
    ...publicDatingProfileFields,
    id: true,
    isActive: true,
  }).extend({
    // profileImage: ProfileImageSchema.optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
    tags: z.array(publicTagSchema).optional(),
    datingPreference: DatingPreferenceSchema.optional(),
  })


export const UpdateDatingProfileSchema = DatingProfileSchema.partial() // Allow partial updates
