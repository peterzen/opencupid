import { z } from 'zod'
import { ProfileImageSchema, ProfileSchema } from '@zod/generated'

import { publicTagSchema } from './tags.schema';
import { ownerProfileImageSchema, publicProfileImageSchema } from './media.schema';


const publicProfileFields = {
  id: true,
  publicName: true,
  introSocial: true,
  city: true,
  country: true,
  isSocialActive: true,
} as const;

const publicDatingProfileFields = {
  introDating: true,
  hasKids: true,
  relationship: true,
  gender: true,
  birthday: true,
  isDatingActive: true,
} as const;

export type PublicProfile = z.infer<typeof publicProfileSchema>;
export const publicProfileSchema = ProfileSchema
  .pick({
    ...publicProfileFields,
  })
  .extend({
    profileImage: publicProfileImageSchema.nullable().optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
    tags: z.array(publicTagSchema)
  });

export type PublicDatingProfile = z.infer<typeof publicDatingProfileSchema>;
export const publicDatingProfileSchema = ProfileSchema
  .pick({
    ...publicProfileFields,
    ...publicDatingProfileFields,
  })
  .extend({
    profileImage: publicProfileImageSchema.nullable().optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
    tags: z.array(publicTagSchema)
  });

export type OwnerProfile = z.infer<typeof ownerProfileSchema>;
export const ownerProfileSchema = ProfileSchema
  .pick({
    ...publicProfileFields,
    ...publicDatingProfileFields,
    id: true,
    isActive: true,
  }).extend({
    profileImage: ownerProfileImageSchema.nullable().optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
    tags: z.array(publicTagSchema).optional(),
  });


export const updateProfileSchema = ProfileSchema.pick({
  ...publicProfileFields,
  ...publicDatingProfileFields,
}).partial() // Allow partial updates
export type UpdateProfile = z.infer<typeof updateProfileSchema>;