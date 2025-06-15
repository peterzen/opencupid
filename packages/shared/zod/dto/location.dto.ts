import z from "zod";


export const LocationSchema = z.object({
  country: z.string(),
  cityId: z.string().cuid(),
  cityName: z.string(),
})

export type LocationDTO = z.infer<typeof LocationSchema>