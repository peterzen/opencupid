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
import { profile } from "console";

export const baseFields = {
  id: true,
} as const;

export const socialFields = {
  languages: true,
  publicName: true,
  introSocial: true,
  // cityName: true,
  // country: true,
  // cityId: true,
} as const;


export const datingFields = {
  introDating: true,
  hasKids: true,
  relationship: true,
  gender: true,
  birthday: true,
  pronouns: true,
} as const;

export const datingPreferencesFields = {
  prefAgeMin: true,
  prefAgeMax: true,
  prefGender: true,
  prefKids: true,
} as const;


const PublicScalarsSchema = ProfileSchema.pick({
  ...baseFields,
  ...socialFields,
}).extend({
  isDatingActive: z.literal(false)
})

const PublicDatingScalarsSchema = ProfileSchema.pick({
  ...baseFields,
  ...socialFields,
  ...datingFields,
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

export const ownerFields = {
  isDatingActive: true,
  isSocialActive: true,
  isOnboarded: true,
} as const;

// API -> client DTO 
export const OwnerProfileSchema = ProfileSchema.pick({
  ...baseFields,
  ...socialFields,
  ...datingFields,
  ...ownerFields,
}).extend({
  profileImages: z.array(PublicProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
  location: LocationSchema
})
export type OwnerProfile = z.infer<typeof OwnerProfileSchema>;

export type OwnerOrPublicProfile = OwnerProfile | PublicProfile

export const editableFields = {
  ...socialFields,
  ...datingFields,
  isDatingActive: true,
  isSocialActive: true,

} as const;


// Client -> API DTO onboarding payload
export const CreateProfilePayloadSchema = ProfileSchema.pick({
  ...editableFields,
  cityId: true,
  country: true,
  cityName: true,
})
.partial().strict()
.extend({
  tags: z.array(z.string().cuid()),
})

export type CreateProfilePayload = z.infer<typeof CreateProfilePayloadSchema>;

// Client -> API DTO profile editing payload
export const UpdateProfilePayloadSchema = ProfileSchema.pick({
  ...editableFields,
  cityId: true,
  country: true,
  cityName: true,
})
  .omit({
    birthday: true, // birthday is not editable
  })
  .extend({
    tags: z.array(z.string().cuid()),
  })
  .partial()

export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;




// client -> API DTO dating preferences update payload
export const UpdateDatingPreferencesPayloadSchema = ProfileSchema.pick({
  ...datingPreferencesFields,
}).partial()
export type UpdateDatingPreferencesPayload = z.infer<typeof UpdateDatingPreferencesPayloadSchema>;

// Client -> API DTO used in conversations
export const ProfileSummarySchema = z.object({
  id: z.string(),
  publicName: z.string(),
  profileImages: z.array(PublicProfileImageSchema)
})

export type ProfileSummary = z.infer<typeof ProfileSummarySchema>;



