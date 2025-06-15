<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { LocationDTO } from '@zod/dto/location.dto'
import fetchGeoIpInfo from '@/lib/geoip'

import CountrySelector from './CountrySelector.vue'
import CitySelector from './CitySelector.vue'

// i18n
const { t } = useI18n()

// v-model support
const model = defineModel<LocationDTO>({
  default: () => ({
    country: '',
    cityId: '',
    cityName: '',
  }),
})

onMounted( () => {
  if (model.value.country) return
  fetchGeoIpInfo()
    .then(countryCode => {
      if (countryCode) {
        // model.value.country = countryCode
      }
    })
    .catch(error => {
      console.error('Failed to fetch GeoIP info:', error)
    })
})
</script>

<template>
  <div>
    <div>
      <CountrySelector v-model="model.country" />

      <div class="mt-3">
        <CitySelector v-model="model" :required="true" />
      </div>
    </div>
  </div>
</template>
