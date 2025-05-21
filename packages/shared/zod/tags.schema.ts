import { TagSchema } from "./generated";

export const publicTagSchema = TagSchema.pick({
  id: true,
  name: true,
  slug: true,
});