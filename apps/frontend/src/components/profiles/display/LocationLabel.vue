<script setup lang="ts">
import { computed } from 'vue'

import { type LocationDTO } from '@zod/dto/location.dto';
import { useCountries } from '@/components/composables/useCountries';

const props = defineProps<{
  location: LocationDTO
}>()

const { countryCodeToName } = useCountries()


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
