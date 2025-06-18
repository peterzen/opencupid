<script setup lang="ts">
import { computed } from 'vue'

import { countryCodeToName } from '@/lib/countries'
import { type LocationDTO } from '@zod/dto/location.dto';

const props = defineProps<{
  location: LocationDTO
}>()

const countryName = computed(() => {
  return props.location.country ? countryCodeToName(props.location.country) : ''
})
</script>

<template>
  <span v-if="location">
    <span v-if="location.cityName">{{ location.cityName }}, </span>
    <span v-if="location.country">{{ countryName }}</span>
  </span>
</template>
