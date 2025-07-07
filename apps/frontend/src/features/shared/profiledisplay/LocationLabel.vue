<script setup lang="ts">
import { computed } from 'vue'

import { type SearchLocationDTO, type LocationDTO } from '@zod/dto/location.dto'
import { useCountries } from '@/features/shared/composables/useCountries'
import FlagIcon, { type CountryCode } from 'vue3-flag-icons'
import 'vue3-flag-icons/styles'

const props = withDefaults(
  defineProps<{
    location: LocationDTO | SearchLocationDTO
    viewerLocation?: LocationDTO
    showCity?: boolean
    showCountryLabel?: boolean
    showCountryIcon?: boolean
  }>(),
  {
    showCity: true,
    showCountryLabel: true,
    showCountryIcon: true,
  }
)

const { countryCodeToName } = useCountries()

const countryName = computed(() => {
  return props.location.country ? countryCodeToName(props.location.country) : ''
})

const isSameCountry = computed(() => {
  return props.viewerLocation?.country === props.location.country
})

const shouldRenderCity = computed(() => {
  return !!props.location.cityName && (isSameCountry.value || props.showCity)
})

const shouldRenderCountry = computed(() => {
  return !!props.location.country && (!isSameCountry.value || props.showCountryLabel)
})

const countryCode = computed(() => {
  return props.location.country?.toLowerCase() as CountryCode
})
</script>

<template>
  <span v-if="location">
    <span v-if="shouldRenderCity">{{ location.cityName }}</span>
    <span v-if="shouldRenderCity && shouldRenderCountry">, </span>
    <span v-if="shouldRenderCountry">
      <span v-if="showCountryLabel">
        {{ countryName }}
      </span>
      <span v-if="showCountryIcon" class="flag-icon" @click="$event.stopPropagation()">
        <BTooltip :delay="100" placement="top" :title="countryName">
          <template #target>
            <FlagIcon
              :code="countryCode"
              size="36"
              circle
              v-if="countryCode"
              :title="countryName"
            />
          </template>
          {{ countryName }}
        </BTooltip>
      </span>
    </span>
  </span>
</template>
