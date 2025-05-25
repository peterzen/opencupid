import { z } from "zod";
import { TagSchema } from "./generated";

export const publicTagSchema = TagSchema.pick({
  id: true,
  name: true,
});
export type PublicTag = z.infer<typeof publicTagSchema>;

export const publicTagSearchSchema = TagSchema.pick({
  id: true,
  name: true,
});

export const SearchQuerySchema = z.object({
  q: z.string().min(1),
});


// Zod schemas
export const TagParamsSchema = z.object({
  id: z.string().cuid(),
});

export const CreateTagBodySchema = z.object({
  name: z.string().min(1),
  createdBy: z.string().optional(),
});

const UpdateTagBodySchema = z.object({
  name: z.string().min(1).optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
});

export type CreateTagInput = z.infer<typeof CreateTagBodySchema>;
export type UpdateTagInput = z.infer<typeof UpdateTagBodySchema>;


export type Tag = z.infer<typeof TagSchema>;

