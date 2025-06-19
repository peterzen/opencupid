import {
  type PublicProfile,
  ProfileUnionSchema,
  type ProfileSummary,
  type OwnerProfile,
  type UpdateProfilePayload,
  OwnerScalarsSchema,
} from '@zod/profile/profile.dto'
import { type DbProfileComplete, DbProfileWithImagesSchema } from '@zod/profile/profile.db'
import { LocationSchema } from '@zod/dto/location.dto'

import {
  type OwnerProfileImage,
  OwnerProfileImageSchema,
  type PublicProfileImage,
  PublicProfileImageSchema,
} from '@zod/profile/profileimage.dto'
import { mapProfileTags } from '@zod/tag/tag.transform'
import { appConfig } from '@shared/config/appconfig'
import { ProfileImage } from '@zod/generated'

export const DbProfileToOwnerProfileTransform = DbProfileWithImagesSchema.transform((db): OwnerProfile => {
  const scalars = OwnerScalarsSchema.parse(db)
  const tags = mapProfileTags(db.tags)
  const images = db.profileImages ? mapProfileImagesToOwner(db.profileImages) : []
  const location = LocationSchema.parse(db)

  const localizedMap = db.localized.reduce((acc, l) => {
    if (!acc[l.field]) acc[l.field] = {}
    acc[l.field][l.locale] = l.value
    return acc
  }, {} as Record<string, Record<string, string>>)

  return {
    ...scalars,
    introSocialLocalized: localizedMap['introSocial'] || {},
    introDatingLocalized: localizedMap['introDating'] || {},
    profileImages: images,
    location: location,
    tags,
  }
})



export function mapProfileToPublic(profile: DbProfileComplete, hasDatingPermission: boolean, locale: string): PublicProfile {

  const get = (field: string) =>
    profile.localized.find(l => l.field === field && l.locale === locale)?.value


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
    introSocial: get('introSocial') || '',
    introDating: get('introDating') || '',
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



export function mapToLocalizedUpserts(
  profileId: string,
  payload: Partial<Pick<UpdateProfilePayload, 'introSocialLocalized' | 'introDatingLocalized'>>
): Array<{ locale: string; updates: Record<string, string> }> {
  const byLocale: Record<string, Record<string, string>> = {}

  for (const field of ['introSocialLocalized', 'introDatingLocalized'] as const) {
    const localized = payload[field]
    if (!localized) continue

    for (const [locale, value] of Object.entries(localized)) {
      if (!byLocale[locale]) byLocale[locale] = {}
      byLocale[locale][field.replace('Localized', '')] = value
    }
  }

  return Object.entries(byLocale).map(([locale, updates]) => ({
    locale,
    updates,
  }))
}