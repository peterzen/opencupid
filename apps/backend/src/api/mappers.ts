import {
  PublicProfile,
  ProfileUnionSchema,
  ProfileSummary,
  OwnerProfile,
  OwnerCreateProfileFormSchema,
} from '@zod/profile/profile.dto'
import { type DbProfileComplete, DbProfileWithImagesSchema } from '@zod/profile/profile.db'
import { LocationSchema } from '@zod/dto/location.dto'

import {
  type OwnerProfileImage,
  OwnerProfileImageSchema,
  type PublicProfileImage,
  PublicProfileImageSchema,
} from '@zod/profile/profileimage.dto'
import { ProfileTagToTagTransformSchema, PublicTag, PublicTagSchema } from '@zod/dto/tag.dto'
import { type ProfileImage } from '@prisma/client'
import { type ProfileTag } from '@zod/generated'

import { appConfig } from '@shared/config/appconfig'

export const DbProfileToOwnerProfileTransform = DbProfileWithImagesSchema.transform((db): OwnerProfile => {
  const tags = mapProfileTags(db.tags)
  const images = db.profileImages ? mapProfileImagesToOwner(db.profileImages) : []
  const location = LocationSchema.parse(db)
  return {
    ...db,
    profileImages: images,
    location: location,
    tags,
  }
})




export function mapProfileTags(profileTags: ProfileTag[]): PublicTag[] {
  return profileTags
    .map((pt: ProfileTag) => ProfileTagToTagTransformSchema.parse(pt))
    .map((tag: PublicTag) => PublicTagSchema.parse(tag))
}

export function mapProfileToPublic(profile: DbProfileComplete, hasDatingPermission: boolean): PublicProfile {
  // shape discriminated union ProfileUnionSchema
  const dProf = {
    ...profile,
    isDatingActive: hasDatingPermission && profile.isDatingActive,
  }
  const scalars = ProfileUnionSchema.parse(dProf)
  const publicImages = profile.profileImages ? mapProfileImagesToPublic(profile.profileImages) : []
  const publicTags = profile.tags ? mapProfileTags(profile.tags) : []

  return {
    ...scalars,
    profileImages: publicImages,
    tags: publicTags,
    location: LocationSchema.parse(profile),
    conversation: profile.conversationParticipants?.[0]?.conversation ?? null,
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
