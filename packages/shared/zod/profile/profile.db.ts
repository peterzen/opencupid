import { ConversationParticipantSchema, ConversationSchema, LocalizedProfileFieldSchema, ProfileImageSchema, ProfileSchema, ProfileTagSchema, TagSchema } from "@zod/generated";
import z from "zod";

export const DbProfileSchema = ProfileSchema.extend({
  localized: z.array(LocalizedProfileFieldSchema).default([]),
  tags: z.array(ProfileTagSchema.extend({
    tag: TagSchema
  })).default([]),
})
export type DbProfile = z.infer<typeof DbProfileSchema>;

export const DbProfileWithImagesSchema = DbProfileSchema.extend({
  profileImages: z.array(ProfileImageSchema).default([]),
})
export type DbProfileWithImages = z.infer<typeof DbProfileWithImagesSchema>;

export const DbProfileCompleteSchema = DbProfileWithImagesSchema.extend({
  conversationParticipants: z
    .array(ConversationParticipantSchema.extend({
      conversation: ConversationSchema,
    }))
    .default([]),
})

export type DbProfileComplete = z.infer<typeof DbProfileCompleteSchema>;

