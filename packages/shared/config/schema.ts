import { z } from 'zod'

// Zod schema
export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_PORT: z.coerce.number().default(3000),
  FRONTEND_PORT: z.coerce.number().default(5173),

  FRONTEND_URL: z.string(),
  API_BASE_URL: z.string(),

  JWT_SECRET: z.string().min(10),

  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string().email(),
  SMTP_PASS: z.string(),
  EMAIL_FROM: z.string(),

  MEDIA_UPLOAD_DIR: z.string(),
  IMAGE_SRV_PORT: z.coerce.number(),
  IMAGE_URL_BASE: z.string(),
  IMAGE_MAX_SIZE: z.coerce.number(),

  SMS_API_KEY: z.string(),

  ALTCHA_HMAC_KEY: z.string().uuid()
})