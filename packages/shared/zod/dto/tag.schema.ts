// TODO: review usage; copied for both db and dto layers
import { z } from 'zod'
import { ProfileTagSchema, TagSchema } from '../generated'

// Public tag fields
const publicTagFields = {
  id: true,
  name: true,
  slug: true,
} as const

export const PublicTagSchema = TagSchema.pick(publicTagFields)
export type PublicTag = z.infer<typeof PublicTagSchema>

// Owner tag fields
const ownerTagFields = {
  ...publicTagFields,
} as const

export const OwnerTagSchema = TagSchema.pick(ownerTagFields)
export type OwnerTag = z.infer<typeof OwnerTagSchema>


/** Params (for route IDs) */
export const TagParamsSchema = z.object({
  id: z.string().cuid(),
})
export type TagParams = z.infer<typeof TagParamsSchema>

/** Create payload */
export const CreateTagSchema = z.object({
  name: z.string().min(1),
  createdBy: z.string().cuid().optional(),
})
export type CreateTagInput = z.infer<typeof CreateTagSchema>

// Payload schema for updating a tag
export const UpdateTagPayloadSchema = z.object({
  name: z.string().min(1),
})
export type UpdateTagPayload = z.infer<typeof UpdateTagPayloadSchema>

// ProfileTag schema with joined Tag 
export const ProfileTagWithTagSchema = ProfileTagSchema.extend({
  tag: TagSchema,
})

export type ProfileTagWithTag = z.infer<typeof ProfileTagWithTagSchema>


// Route schemas
export const SearchQuerySchema = z.object({
  q: z.string().min(1),
});



// Match { id, tagId, profileId, tag: { ... } }
export const ProfileTagJoinSchema = ProfileTagSchema
  .merge(z.object({ tag: TagSchema }))
  .transform(join => join.tag)

export type ProfileTagJoin = z.infer<typeof ProfileTagJoinSchema>
