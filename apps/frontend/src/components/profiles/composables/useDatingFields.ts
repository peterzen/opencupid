import { PublicProfile } from '@zod/profile/profile.dto'
import { computed, h } from 'vue'
import { useEnumOptions } from './useEnumOptions'

export function useDatingFields(profile: PublicProfile, t: (key: string) => string) {
  const birthYearMax = computed(() => {
    return new Date().getFullYear() - 18
  })

  const birthYearMin = computed(() => {
    return 1950
  })

  const age = computed(() => {
    if (!profile.isDatingActive || !profile.birthday) return null
    const currentYear = new Date().getFullYear()
    return currentYear - new Date(profile.birthday).getFullYear()
  })

  const { relationshipStatusLabels, pronounsLabels, hasKidsLabels } = useEnumOptions(t)

  const hasKids = computed(() => {
    if (!profile.isDatingActive || profile.hasKids === 'unspecified') return ''
    return hasKidsLabels()[profile.hasKids!] || profile.hasKids
  })

  const relationshipStatus = computed(() => {
    if (!profile.isDatingActive) return ''
    if (!profile.relationship || profile.relationship === 'unspecified') return ''

    return relationshipStatusLabels()[profile.relationship] || profile.relationship
  })

  const pronouns = computed(() => {
    if (!profile.isDatingActive) return ''
    if (!profile.pronouns || profile.pronouns === 'unspecified') return ''

    return pronounsLabels()[profile.pronouns] || profile.pronouns
  })


  return {
    age,
    hasKids,
    relationshipStatus,
    pronouns,
    birthYearMin,
    birthYearMax,
  }
}
