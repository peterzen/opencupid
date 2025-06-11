// TODO: review usage; copied for both db and dto layers
import { z } from 'zod';

/**
 * Zod schema representing a City record from the database
 */
export const CitySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  country: z.string().regex(/^[A-Z]{2}$/, 'ISO2 country code'),
  lat: z.number().refine(v => v >= -90 && v <= 90, { message: 'Latitude must be between -90 and 90' }),
  lon: z.number().refine(v => v >= -180 && v <= 180, { message: 'Longitude must be between -180 and 180' }),
});

/**
 * Input schema for creating a new City (id is auto-generated)
 */
export const CityCreateSchema = CitySchema.omit({ id: true });

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

// TypeScript type inference
export type City = z.infer<typeof CitySchema>;
export type CityCreate = z.infer<typeof CityCreateSchema>;
export type CityQuery = z.infer<typeof CityQuerySchema>;
