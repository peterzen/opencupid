// profile.mappers.ts
import type { ProfileImage } from "@prisma/client";
import { z } from "zod";
import {
  publicScalarsSchema,
  ownerScalarSchema,
  PublicProfile,
  OwnerProfile,
} from "@zod/profile.schema";
import {
  publicProfileImageSchema,
  ownerProfileImageSchema,
} from "@zod/media.schema";
import { publicTagSchema } from "@zod/tags.schema";
import env from "src/env";

/** Stub—replace with your real URL builder */
function getImageUrl(image: ProfileImage): string {
  const urlBase = env.IMAGE_URL_BASE
  return `${urlBase}/${image.storagePath}`;
}

/** INLINE: raw→public image transform */
function toPublicProfileImage(img: ProfileImage) {
  return publicProfileImageSchema.parse({
    id: img.id,
    mimeType: img.mimeType,
    altText: img.altText,
    url: getImageUrl(img),
  });
}

/** INLINE: raw→owner image transform */
function toOwnerProfileImage(img: ProfileImage) {
  return ownerProfileImageSchema.parse({
    id: img.id,
    userId: img.userId,
    storagePath: img.storagePath,
    contentHash: img.contentHash,
    isModerated: img.isModerated,
    isFlagged: img.isFlagged,
    mimeType: img.mimeType,
    altText: img.altText,
    createdAt: img.createdAt,
    updatedAt: img.updatedAt,
    url: getImageUrl(img),
  });
}

/** Helper to safely map an array (or empty) */
// function mapImages<T, U>(items: T[] | null | undefined, fn: (i: T) => U): U[] {
//   return Array.isArray(items) ? items.map(fn) : [];
// }



function mapImages<T>(
  images: T[] | null | undefined,
  fn: (img: T) => any
): any[] {
  if (!images) return []
  return images.map(fn)
}

/** Full DTO mappers */

/** Raw Prisma payload → PublicProfile */
export function mapToPublic(
  profile: { profileImage: ProfileImage | null; otherImages?: ProfileImage[] } & Record<string, any>
): PublicProfile {
  const safeScalars = publicScalarsSchema
    .extend({ tags: z.array(publicTagSchema).default([]) })
    .parse(profile);

  return {
    ...safeScalars,
    profileImage: profile.profileImage
      ? toPublicProfileImage(profile.profileImage)
      : null,
    otherImages: mapImages(profile.otherImages, toPublicProfileImage),
  };
}

/** Raw Prisma payload → OwnerProfile */
export function mapToOwner(
  profile: { profileImage: ProfileImage | null; otherImages?: ProfileImage[] } & Record<string, any>
): OwnerProfile {
  const safeScalars = ownerScalarSchema
    .extend({ tags: z.array(publicTagSchema).default([]) })
    .parse(profile);

  return {
    ...safeScalars,
    profileImage: profile.profileImage
      ? toOwnerProfileImage(profile.profileImage)
      : null,
    otherImages: mapImages(profile.otherImages, toOwnerProfileImage),
  };
}
