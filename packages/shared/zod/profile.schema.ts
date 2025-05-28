import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ProfileSchema } from "@zod/generated";

import { PublicTagSchema } from "./tag.schema";
import { OwnerProfileImageSchema, PublicProfileImageSchema } from "./profileimage.schema";

const publicProfileFields = {
  id: true,
  languages: true,
  publicName: true,
  introSocial: true,
  cityName: true,
  country: true,
  work: true,
  isDatingActive: true,
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
  ...publicProfileFields,
});

export const PublicProfileSchema = PublicScalarsSchema.extend({
  profileImages: z.array(PublicProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
});

export type PublicProfile = z.infer<typeof PublicProfileSchema>;

export const PublicDatingProfileSchema = ProfileSchema.pick({
  ...publicProfileFields,
  ...publicDatingProfileFields,
}).extend({
  profileImages: z.array(PublicProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
});

export type PublicDatingProfile = z.infer<typeof PublicDatingProfileSchema>;

export const OwnerScalarSchema = ProfileSchema.pick({
  ...publicProfileFields,
  ...publicDatingProfileFields,
  id: true,
  isActive: true,
});

export const OwnerProfileSchema = OwnerScalarSchema.extend({
  profileImages: z.array(OwnerProfileImageSchema).default([]),
  tags: z.array(PublicTagSchema).default([]),
});
export type OwnerProfile = z.infer<typeof OwnerProfileSchema>;

export const UpdateProfilePayloadSchema = ProfileSchema.pick({
  ...publicProfileFields,
  ...publicDatingProfileFields,
})
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


export type ProfileWithImages = Prisma.ProfileGetPayload<{
  include: {
    profileImages: true;
  }
}>;

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
