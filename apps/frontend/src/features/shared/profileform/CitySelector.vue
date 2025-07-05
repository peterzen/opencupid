

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import { useCitiesStore } from '@/store/cityStore'
import { useI18n } from 'vue-i18n'
import { toInitialCaps } from '@/lib/utils'
import { type MultiselectComponent } from '@/types/multiselect'

import type { PublicCity } from '@zod/dto/city.dto'
import { LocationPayload } from '@zod/dto/location.dto'

const cityStore = useCitiesStore()
const { t } = useI18n()


/*
Actual schemas defined elewhere, but for clarity in this file:

export const LocationPayloadSchema = z.object({
  country: z.string().nullable(),
  cityId: z.string().nullable(),
})

export type LocationPayload = z.infer<typeof LocationPayloadSchema>


const publicCityFields = {
  id: true,
  name: true,
  country: true,
} as const;

export const PublicCitySchema = CitySchema.pick(publicCityFields);
export type PublicCity = z.infer<typeof PublicCitySchema>;

*/


const model = defineModel<LocationPayload>({
  default: () => ({
    cityId: null,
    country: null,
  }),
})

const props = withDefaults(
  defineProps<{
    allowEmpty?: boolean
    canAddCity?: boolean
    cityInputAutoFocus?: boolean
  }>(),
  {
    allowEmpty: false,
    canAddCity: true,
    cityInputAutoFocus: true,
  }
)

const selectOptions = ref<PublicCity[]>([])
const isLoading = ref(false)
const showHint = ref(false)
const multiselectRef = ref<MultiselectComponent>()

const selectedCity = computed<PublicCity>({
  get() {
    return {
      id: model.value.cityId ?? '',
      name: (selectOptions.value.find(c => c.id === model.value.cityId)?.name) ?? '',
      country: model.value.country ?? '',
    }
  },
  set(val: PublicCity) {
    model.value = {
      cityId: val?.id || null,
      country: model.value.country ?? null,
    }
  },
})

// Watch cityId → fetch city name
watch(
  () => model.value.cityId,
  async (newId) => {
    if (newId) {
      try {
        const city = await cityStore.getCity(newId)
        if (city) {
          if (!selectOptions.value.find(c => c.id === city.id)) {
            selectOptions.value.push(city)
          }
        }
      } catch (e) {
        console.warn('City fetch failed:', e)
      }
    }
  },
  { immediate: true }
)

// Watch country change → reset city
watch(
  () => model.value.country,
  async (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      model.value.cityId = null
      selectOptions.value = []

      if (props.cityInputAutoFocus) {
        await nextTick()
        multiselectRef.value?.activate?.()
        showHint.value = true
      }
    }
  }
)

async function asyncFind(query: string) {
  if (!query) {
    selectOptions.value = selectedCity.value?.id ? [selectedCity.value] : []
    return
  }

  isLoading.value = true
  try {
    if (model.value.country) {
      selectOptions.value = await cityStore.search(model.value.country, query)
    }
  } catch (error) {
    console.error('City search failed:', error)
  } finally {
    isLoading.value = false
  }
}

async function addCity(name: string) {
  if (!model.value.country) return

  const create = {
    name: toInitialCaps(name.trim()),
    country: model.value.country,
  }

  isLoading.value = true
  try {
    const newCity = await cityStore.create(create)
    selectOptions.value.push(newCity)
    selectedCity.value = newCity
  } catch (error) {
    console.error('City create failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>



<template>
  <div class="interests-multiselect">
    <Multiselect
      v-model="selectedCity"
      v-bind:allow-empty="props.allowEmpty"
      ref="multiselectRef"
      :options="selectOptions"
      :searchable="true"
      :close-on-select="true"
      :clear-on-select="true"
      :internal-search="false"
      v-bind:taggable="props.canAddCity"
      :show-labels="true"
      :show-no-results="false"
      :show-no-options="false"
      :loading="isLoading"
      :disabled="!model.country"
      open-direction="top"
      label="name"
      track-by="id"
      @search-change="asyncFind"
      @tag="addCity"
      @open="showHint = true"
      @close="showHint = false"
      :placeholder="t('profiles.forms.city_search_placeholder')"
      :tag-placeholder="t('profiles.forms.city_add_placeholder')"
    >
    </Multiselect>
    <div class="mt-1 form-text text-muted hint" :class="{ 'opacity-0': !showHint }">
      <small>{{ t('profiles.forms.city_start_typing') }}</small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hint {
  transition: opacity 0.3s ease-in-out;
  opacity: 0.5;
}
</style>
