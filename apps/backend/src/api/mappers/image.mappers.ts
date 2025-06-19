import { ProfileImage } from "@prisma/client"
import { appConfig } from "@shared/config/appconfig"
import { PublicProfileImage, PublicProfileImageSchema, OwnerProfileImage, OwnerProfileImageSchema } from "@zod/profile/profileimage.dto"

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

