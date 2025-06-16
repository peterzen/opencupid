import { z } from "zod";
import { ConversationSchema, ProfileSchema } from "../generated";
import { PublicTagSchema } from "../dto/tag.dto";
import {
  OwnerProfileImageSchema,
  PublicProfileImageSchema
} from "./profileimage.dto";

const baseFields = {
  id: true,
  languages: true,
  publicName: true,
  introSocial: true,
  cityId: true,
  cityName: true,
  country: true,
  work: true,
  isActive: true,
  isDatingActive: true,
  // isSocialActive: true,
} as const;

const publicDatingProfileFields = {
  introDating: true,
  hasKids: true,
  relationship: true,
  gender: true,
  birthday: true,
  pronouns: true,
} as const;

const privateDatingPreferencesFields = {
  prefAgeMin: true,
  prefAgeMax: true,
  prefGender: true,
  prefKids: true,
} as const;


export const PublicScalarsSchema = ProfileSchema.pick({
  ...baseFields,
}).extend({
  isDatingActive: z.literal(false)
})

export const PublicDatingScalarsSchema = ProfileSchema.pick({
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

// export type ProfileUnion = z.infer<typeof ProfileUnionSchema>

export const PublicProfileSchema = ProfileUnionSchema.and(
  z.object({
    profileImages: z.array(PublicProfileImageSchema).default([]),
    tags: z.array(PublicTagSchema).default([]),
    conversation: ConversationSchema.nullable(),
  })
);
export const PublicProfileArraySchema = z.array(PublicProfileSchema);

export type PublicProfile = z.infer<typeof PublicProfileSchema>;

export const PublicDatingProfileSchema = ProfileSchema.pick({
  ...baseFields,
  ...publicDatingProfileFields,
}).extend({
  profileImages: z.array(PublicProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
  conversation: ConversationSchema
});

export type PublicDatingProfile = z.infer<typeof PublicDatingProfileSchema>;

export const OwnerScalarSchema = ProfileSchema.pick({
  ...baseFields,
  ...publicDatingProfileFields,
  ...privateDatingPreferencesFields,
  id: true,
  isActive: true,
});

export const OwnerProfileSchema = OwnerScalarSchema.extend({
  profileImages: z.array(OwnerProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
});
export type OwnerProfile = z.infer<typeof OwnerProfileSchema>;

// export const PartialOwnerScalarSchema = OwnerScalarSchema
//   .partial()
// export type PartialOwnerScalar = z.infer<typeof PartialOwnerScalarSchema>;

export const ProfileFormSubmitSchema = OwnerScalarSchema
  .partial()
  .extend({
    tags: z.array(PublicTagSchema).default([]),
  });
export type ProfileFormSubmit = z.infer<typeof ProfileFormSubmitSchema>;


export const UpdateProfilePayloadSchema = OwnerScalarSchema
  .partial()
  .extend({
    tags: z.array(z.string().cuid()).optional(),
  })
export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;

// Updated profile fragment with tags but no images
export const UpdatedProfileFragmentSchema = OwnerScalarSchema.extend({
  tags: z.array(PublicTagSchema).default([]),
});
export type UpdatedProfileFragment = z.infer<typeof UpdatedProfileFragmentSchema>;



// Fragment for updated profile images
// export const UpdatedProfileImageFragmentSchema = ProfileSchema
//   .pick({})
//   .extend({
//     profileImages: z.array(OwnerProfileImageSchema).default([]),
//   });
// export type UpdatedProfileImageFragment = z.infer<typeof UpdatedProfileImageFragmentSchema>;

export const OwnerDatingPreferencesSchema = ProfileSchema.pick({
  ...privateDatingPreferencesFields,
}).partial()
export type OwnerDatingPreferences = z.infer<typeof OwnerDatingPreferencesSchema>;


export const ProfileSummarySchema = z.object({
  id: z.string(),
  publicName: z.string(),
  profileImages: z.array(PublicProfileImageSchema)
})

export type ProfileSummary = z.infer<typeof ProfileSummarySchema>;



// export const CreateProfileInputSchema = ProfileSchema.pick({
//   publicName: true,
//   country: true,
//   cityId: true,
//   languages: true,
//   isActive: true,
//   isDatingActive: true,
//   isSocialActive: true,
//   introDating: true,
//   introSocial: true,
//   hasKids: true,
//   relationship: true,
//   gender: true,
//   birthday: true,
//   pronouns: true,
// }).extend({
//   tags: z.array(PublicTagSchema).default([]),
// });


// export type CreateProfileInput = z.infer<typeof CreateProfileInputSchema>