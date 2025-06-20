import { ProfileSchema } from '@zod/generated';
import { z } from 'zod'
import { datingPreferencesFields } from './profile.fields';


// API -> client dating preferences DTO
export const DatingPreferencesDTOSchema = ProfileSchema.pick({
  ...datingPreferencesFields,
})
export type DatingPreferencesDTO = z.infer<typeof DatingPreferencesDTOSchema>;


// client -> API DTO dating preferences update payload
export const UpdateDatingPreferencesPayloadSchema = ProfileSchema.pick({
  ...datingPreferencesFields,
}).partial()
export type UpdateDatingPreferencesPayload = z.infer<typeof UpdateDatingPreferencesPayloadSchema>;
