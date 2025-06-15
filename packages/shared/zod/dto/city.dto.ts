// TODO: review usage; copied for both db and dto layers
import { CitySchema } from '@zod/generated';
import { z } from 'zod';

const publicCityFields = {
  id: true,
  name: true,
  country: true,
} as const;

export const PublicCitySchema = CitySchema.pick(publicCityFields);
export type PublicCity = z.infer<typeof PublicCitySchema>;

// Payload schema for updating a tag
export const CreateCityPayloadSchema = CitySchema.pick({
  name: true,
  country: true,
})

export type CreateCityPayload = z.infer<typeof CreateCityPayloadSchema>

/**
 * Input schema for creating a new City (id is auto-generated)
 */
export const CreateCitySchema = CitySchema.pick({
  name: true,
  country: true,
  createdBy: true,
  isUserCreated: true,
})
export type CreateCityInput = z.infer<typeof CreateCitySchema>;

// Route schemas
export const SearchQuerySchema = z.object({
  q: z.string().min(1),
  country: z.string().length(2),
});

/** Params (for route IDs) */
export const CityParamsSchema = z.object({
  id: z.string(),
})
export type CityParams = z.infer<typeof CityParamsSchema>



/**
 * Query parameters schema for listing/searching cities
 */
export const CityQuerySchema = z.object({
  q: z.string().optional(),
  country: z.string().length(2).optional(),
  limit: z.preprocess(
    val => typeof val === 'string' ? parseInt(val, 10) : val,
    z.number().int().min(1).max(100).default(50)
  ),
  offset: z.preprocess(
    val => typeof val === 'string' ? parseInt(val, 10) : val,
    z.number().int().min(0).default(0)
  ),
});

