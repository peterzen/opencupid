import {
  OwnerScalarSchema,
  PublicProfile,
  OwnerProfile,
  ProfileUnionSchema,
  ProfileSummary,
} from '@zod/profile/profile.dto'
import {
  OwnerProfileImage,
  OwnerProfileImageSchema,
  PublicProfileImage,
  PublicProfileImageSchema,
} from '@zod/profile/profileimage.dto'
import { ProfileTagJoinSchema, PublicTag, PublicTagSchema } from '@zod/dto/tag.dto'
import type { ProfileImage, UserRole } from '@prisma/client'
import { ProfileTag } from '@zod/generated'
import { appConfig } from '@shared/config/appconfig'
import { ProfileComplete } from '@zod/profile/profile.types'

export function mapProfileToOwner(profile: ProfileComplete): OwnerProfile {
  const safe = OwnerScalarSchema.parse(profile)

  // Transform each image using the service
  const ownerImages = profile.profileImages ? mapProfileImagesToOwner(profile.profileImages) : []

  const publicTags: PublicTag[] = profile.tags
    .map((pt: ProfileTag) => ProfileTagJoinSchema.parse(pt)) // yields Tag
    .map((tag: PublicTag) => PublicTagSchema.parse(tag))

  return {
    ...safe,
    profileImages: ownerImages,
    tags: publicTags,
  }
}

export function mapProfileTags(profileTags: ProfileTag[]): PublicTag[] {
  return profileTags
    .map((pt: ProfileTag) => ProfileTagJoinSchema.parse(pt))
    .map((tag: PublicTag) => PublicTagSchema.parse(tag))
}

export function mapProfileToPublic(profile: ProfileComplete, roles: UserRole[]): PublicProfile {
  // shape discriminated union ProfileUnionSchema
  const dProf = {
    ...profile,
    isDatingActive: roles.includes('user_dating') && profile.isDatingActive,
  }
  const scalars = ProfileUnionSchema.parse(dProf)
  const publicImages = profile.profileImages ? mapProfileImagesToPublic(profile.profileImages) : []
  const publicTags = profile.tags ? mapProfileTags(profile.tags) : []

  return {
    ...scalars,
    profileImages: publicImages,
    tags: publicTags,
  } as PublicProfile
}

export function mapProfileImagesToOwner(images: ProfileImage[]): OwnerProfileImage[] {
  return images.map(img => toOwnerProfileImage(img))
}

export function mapProfileImagesToPublic(images: ProfileImage[]): PublicProfileImage[] {
  return images.map((img: ProfileImage) => toPublicProfileImage(img))
}

export function mapProfileSummary(profile: {
  id: string
  publicName: string
  profileImages: ProfileImage[]
}): ProfileSummary {
  return {
    id: profile.id,
    publicName: profile.publicName,
    profileImages: profile?.profileImages.map(toPublicProfileImage),
  }
}

export interface MinimalProfileImage {
  storagePath: string
}

/**
 * Constructs the public URL for the image
 */
function getImageUrl(image: MinimalProfileImage): string {
  const urlBase = appConfig.IMAGE_URL_BASE
  return `${urlBase}/${image.storagePath}`
}

/**
 * Add the public URL to the image object and sanitize it
 * by removing any non-public fields
 */
export function toPublicProfileImage(image: ProfileImage): PublicProfileImage {
  const withUrl = { ...image, url: getImageUrl(image) }
  return PublicProfileImageSchema.parse(withUrl)
}

/**
 * Add the public URL to the image object and sanitize it
 * by removing fields that are not accessible to the owner
 */
export function toOwnerProfileImage(image: ProfileImage): OwnerProfileImage {
  image.url = getImageUrl(image)
  return OwnerProfileImageSchema.parse(image)
}
