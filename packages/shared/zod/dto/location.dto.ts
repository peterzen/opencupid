import z from "zod";


export const LocationSchema = z.object({
  country: z.string(),
  cityId: z.string().cuid().nullable(), // TODO !!remove nullable when DB records are updated
  cityName: z.string(),
})

export type LocationDTO = z.infer<typeof LocationSchema>