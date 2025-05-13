import { SearchPreferenceDTO } from './searchPreference.dto'

export interface ProfileDTO {
  id: string
  userId: string
  publicName: string
  intro?: string
  country?: string
  city?: string
  birthday?: string
  gender: 'male' | 'female' | 'non_binary' | 'other'
  relationship: 'single' | 'in_relationship' | 'married' | 'other'
  hasKids: boolean
  interestTags: string[]
  searchPreference?: SearchPreferenceDTO
}
