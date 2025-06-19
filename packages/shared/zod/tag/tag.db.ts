import { ProfileTagSchema, TagSchema } from "@zod/generated";
import z from "zod";


export const TagWithTranslationsSchema = TagSchema.extend({
  translations: z.array(
    z.object({
      name: z.string(),
    })
  ),
})

export type TagWithTranslations = z.infer<typeof TagWithTranslationsSchema>


// ProfileTag schema with joined Tag 
export const ProfileTagWithTagSchema = ProfileTagSchema.extend({
  tag: TagSchema,
})

export type ProfileTagWithTag = z.infer<typeof ProfileTagWithTagSchema>



