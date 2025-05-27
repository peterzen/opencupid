import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ProfileSchema } from "@zod/generated";

import { publicTagSchema } from "./tags.schema";
import {
  ownerProfileImageSchema,
  publicProfileImageSchema,
} from "./media.schema";

const publicProfileFields = {
  id: true,
  languages: true,
  publicName: true,
  introSocial: true,
  cityName: true,
  country: true,
  isSocialActive: true,
  work: true,
} as const;

const publicDatingProfileFields = {
  introDating: true,
  hasKids: true,
  relationship: true,
  gender: true,
  birthday: true,
  isDatingActive: true,
  pronouns: true,
} as const;

export const publicScalarsSchema = ProfileSchema.pick({
  ...publicProfileFields,
});

export const publicProfileSchema = publicScalarsSchema.extend({
  profileImage: publicProfileImageSchema.nullable().default(null),
  otherImages: z.array(publicProfileImageSchema).default([]),
  tags: z.array(publicTagSchema).default([]),
});

export type PublicProfile = z.infer<typeof publicProfileSchema>;

export const publicDatingProfileSchema = ProfileSchema.pick({
  ...publicProfileFields,
  ...publicDatingProfileFields,
}).extend({
  profileImage: publicProfileImageSchema.nullable().default(null),
  otherImages: z.array(publicProfileImageSchema).default([]),
  tags: z.array(publicTagSchema).default([]),
});

export type PublicDatingProfile = z.infer<typeof publicDatingProfileSchema>;

export const ownerScalarSchema = ProfileSchema.pick({
  ...publicProfileFields,
  ...publicDatingProfileFields,
  id: true,
  isActive: true,
});

export const ownerProfileSchema = ownerScalarSchema.extend({
  profileImage: ownerProfileImageSchema.nullable().default(null),
  otherImages: z.array(ownerProfileImageSchema).default([]),
  tags: z.array(publicTagSchema).default([]),
});

export type OwnerProfile = z.infer<typeof ownerProfileSchema>;

export const updateProfileSchema = ProfileSchema.pick({
  ...publicProfileFields,
  ...publicDatingProfileFields,
})
  .partial()
  .extend({
    tags: z.array(z.string().cuid()).optional(),
  });

export type UpdateProfile = z.infer<typeof updateProfileSchema>;

export type ProfileWithImages = Prisma.ProfileGetPayload<{
  include: {
    profileImage: true;
    otherImages: true
  }
}>;
