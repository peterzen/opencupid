import { type OwnerProfile } from '@zod/profile/profile.dto'
import { computed } from 'vue'

export function useProfileFields(profile: OwnerProfile) {
  const birthYearMax = computed(() => {
    return new Date().getFullYear() - 18
  })

  const birthYearMin = computed(() => {
    return 1920
  })

  const age = computed(() => {
    if (!profile.birthday) return null
    const currentYear = new Date().getFullYear()
    return currentYear - new Date(profile.birthday).getFullYear()
  })

  return {
    age,
    birthYearMin,
    birthYearMax,
  }
}
