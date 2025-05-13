export interface SearchPreferenceDTO {
  ageMin: number
  ageMax: number
  gender: 'male' | 'female' | 'non_binary' | 'other'
  goal: 'friends' | 'relationship'
}
