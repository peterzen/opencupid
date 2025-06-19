import z from "zod"

import { ProfileTag, ProfileTagSchema } from "@zod/generated"
import { TagWithTranslations, TagWithTranslationsSchema } from "@zod/tag/tag.db"
import { PublicTag } from "@zod/tag/tag.dto"

export const ProfileTagToTagTransformSchema = ProfileTagSchema
  .merge(z.object({ tag: TagWithTranslationsSchema }))
  .transform(join => join.tag)

export type ProfileTagJoin = z.infer<typeof ProfileTagToTagTransformSchema>



export function DbTagToPublicTagTransform(dbTag: TagWithTranslations): PublicTag {
  return {
    id: dbTag.id,
    name: dbTag.name = dbTag.translations[0]?.name ?? dbTag.name,
    slug: dbTag.slug,
  }
}


export function mapProfileTags(profileTags: ProfileTag[]): PublicTag[] {
  return profileTags
    .map((pt: ProfileTag) => ProfileTagToTagTransformSchema.parse(pt))
    .map((tag: TagWithTranslations) => DbTagToPublicTagTransform(tag))
}
