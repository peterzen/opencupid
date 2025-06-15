<script setup lang="ts">
import { computed } from 'vue'

import { countryCodeToName } from '@/lib/countries'
import type { PublicProfile } from '@zod/profile/profile.dto'

const props = defineProps<{
  profile: PublicProfile
}>()

const countryName = computed(() => {
  return props.profile.country ? countryCodeToName(props.profile.country) : ''
})
</script>

<template>
  <span>
    <span v-if="profile.cityName">{{ profile.cityName }}, </span>
    <span v-if="profile.country">{{ countryName }}</span>
  </span>
</template>
