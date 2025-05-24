import { z } from 'zod'
import { ConnectionTypeSchema, DatingPreferenceSchema, DatingProfile, DatingProfileSchema, Profile, ProfileImageSchema, ProfileSchema } from '@zod/generated'

import { publicTagSchema } from './tags.schema';
import { ownerProfileImageSchema, publicProfileImageSchema } from './media.schema';

export const UpdateProfileSchema = ProfileSchema.partial() // Allow partial updates


export enum ProfileScope {
  DATING = 'dating',
  SOCIAL = 'social'
}

export type AnyProfile = Profile | DatingProfile

export const profileScopeSchema = z.nativeEnum(ProfileScope)

const publicProfileFields = {
  id: true,
  publicName: true,
  intro: true,
  profileImageId: true,
  city: true,
  country: true,
} as const;

export type PublicProfile = z.infer<typeof publicProfileSchema>;
export const publicProfileSchema = ProfileSchema
  .pick(publicProfileFields)
  .extend({
    profileImage: publicProfileImageSchema.nullable().optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
    tags: z.array(publicTagSchema)
  });


export const ownerProfileSchema = ProfileSchema
  .pick({
    ...publicProfileFields,
    id: true,
    isActive: true,
  }).extend({
    profileImage: ownerProfileImageSchema.nullable().optional(),
    otherImages: z.array(ProfileImageSchema).optional(),
    tags: z.array(publicTagSchema).optional(),
  });

export type OwnerProfile = z.infer<typeof ownerProfileSchema>;


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
