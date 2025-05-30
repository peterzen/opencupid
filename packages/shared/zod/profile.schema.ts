import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { Profile, ProfileImage, ProfileSchema, ProfileTag, Tag, TagSchema } from "@zod/generated";

import { PublicTagSchema } from "./tag.schema";
import { OwnerProfileImageSchema, PublicProfileImageSchema } from "./profileimage.schema";

const baseFields = {
  id: true,
  languages: true,
  publicName: true,
  introSocial: true,
  cityName: true,
  country: true,
  work: true,
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
  })
);

export type PublicProfile = z.infer<typeof PublicProfileSchema>;

export const PublicDatingProfileSchema = ProfileSchema.pick({
  ...baseFields,
  ...publicDatingProfileFields,
}).extend({
  profileImages: z.array(PublicProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
});

export type PublicDatingProfile = z.infer<typeof PublicDatingProfileSchema>;

export const OwnerScalarSchema = ProfileSchema.pick({
  ...baseFields,
  ...publicDatingProfileFields,
  id: true,
  isActive: true,
});

export const OwnerProfileSchema = OwnerScalarSchema.extend({
  profileImages: z.array(OwnerProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
});
export type OwnerProfile = z.infer<typeof OwnerProfileSchema>;

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
  });
export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;

// Updated profile fragment with tags but no images
export const UpdatedProfileFragmentSchema = OwnerScalarSchema.extend({
  tags: z.array(PublicTagSchema).default([]),
});
export type UpdatedProfileFragment = z.infer<typeof UpdatedProfileFragmentSchema>;


// Define types for service return values
export type ProfileWithImages = Profile & {
  profileImages: ProfileImage[]
}

export type ProfileWithTags = Profile & {
  tags: (ProfileTag & { tag: Tag })[]
}

export type ProfileComplete = ProfileWithImages & ProfileWithTags


// Fragment for updated profile images
export const UpdatedProfileImageFragmentSchema = ProfileSchema
  .pick({})
  .extend({
    profileImages: z.array(OwnerProfileImageSchema).default([]),
  });
export type UpdatedProfileImageFragment = z.infer<typeof UpdatedProfileImageFragmentSchema>;



// Route params for profile ID lookups
export const ProfileLookupParamsSchema = z.object({
  profileId: z.string().cuid(),
})
export type ProfileLookupParams = z.infer<typeof ProfileLookupParamsSchema>


// Route params for ID lookups
export const IdLookupParamsSchema = z.object({
  id: z.string().cuid(),
})
export type IdLookupParams = z.infer<typeof IdLookupParamsSchema>
