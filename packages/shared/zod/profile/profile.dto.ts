import { z } from "zod";


import {
  ConversationSchema,
  ProfileSchema
} from "../generated";



import { PublicTagSchema } from "../dto/tag.dto";
import {
  PublicProfileImageSchema
} from "./profileimage.dto";
import { LocationSchema } from "@zod/dto/location.dto";

const baseFields = {
  id: true,
  languages: true,
  publicName: true,
  introSocial: true,
  cityName: true,
  country: true,
  isActive: true,
  isDatingActive: true,
  isSocialActive: true,
} as const;

const publicDatingProfileFields = {
  introDating: true,
  hasKids: true,
  relationship: true,
  gender: true,
  birthday: true,
  pronouns: true,
} as const;

const datingPreferencesFields = {
  prefAgeMin: true,
  prefAgeMax: true,
  prefGender: true,
  prefKids: true,
} as const;

const editableFields = {
  // cityId: true,  // TODO !!add it back when DB records are updated
  // country: true,
  // cityName: true,
  languages: true,
  birthday: true,
  publicName: true,
  introSocial: true,
  introDating: true,
  hasKids: true,
  relationship: true,
  gender: true,
  pronouns: true,
  isDatingActive: true,
  isSocialActive: true,
} as const;

const PublicScalarsSchema = ProfileSchema.pick({
  ...baseFields,
}).extend({
  isDatingActive: z.literal(false)
})

const PublicDatingScalarsSchema = ProfileSchema.pick({
  ...baseFields,
  ...publicDatingProfileFields,
}).extend({
  isDatingActive: z.literal(true)
})


export const ProfileUnionSchema = z.discriminatedUnion('isDatingActive', [
  // when isDatingActive = false, use the base
  PublicScalarsSchema,
  // when isDatingActive = true, require the dating picks
  PublicDatingScalarsSchema,
])

export const PublicProfileSchema = ProfileUnionSchema.and(
  z.object({
    location: LocationSchema,
    profileImages: z.array(PublicProfileImageSchema).default([]),
    tags: z.array(PublicTagSchema).default([]),
    conversation: ConversationSchema.nullable(),
  })
);
export const PublicProfileArraySchema = z.array(PublicProfileSchema);

export type PublicProfile = z.infer<typeof PublicProfileSchema>;

// const OwnerScalarSchema = ProfileSchema.pick({
//   ...baseFields,
//   ...publicDatingProfileFields,
//   ...datingPreferencesFields,
//   id: true,
//   isActive: true,
// });


export const OwnerProfileSchema = ProfileSchema.pick({
  ...editableFields,
  id: true,
}).extend({
  profileImages: z.array(PublicProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
  location: LocationSchema
})
export type OwnerProfile = z.infer<typeof OwnerProfileSchema>;

export type OwnerOrPublicProfile = OwnerProfile | PublicProfile

export const EditableOwnerProfileSchema = ProfileSchema.pick({
  ...editableFields,
  id: true,

}).extend({
  profileImages: z.array(PublicProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
  location: LocationSchema
})
export type EditableOwnerProfile = z.infer<typeof EditableOwnerProfileSchema>;

export const EditableOwnerToProfilePayloadTransform = EditableOwnerProfileSchema.transform((data) => {
  const {location,profileImages, ...rest} = data;
  return {
    ...rest,
    tags: data.tags.map(tag => tag.id),
    cityId: data.location.cityId,
    country: data.location.country,
    cityName: data.location.cityName,
    location: undefined
  }
})

export const UpdateProfilePayloadSchema = ProfileSchema.pick({
  ...editableFields,
  cityId: true,
  country: true,
  cityName: true,
}).extend({
  tags: z.array(z.string().cuid()),
})

export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;


export const OwnerDatingPreferencesSchema = ProfileSchema.pick({
  ...datingPreferencesFields,
}).partial()
export type OwnerDatingPreferences = z.infer<typeof OwnerDatingPreferencesSchema>;


export const ProfileSummarySchema = z.object({
  id: z.string(),
  publicName: z.string(),
  profileImages: z.array(PublicProfileImageSchema)
})

export type ProfileSummary = z.infer<typeof ProfileSummarySchema>;



