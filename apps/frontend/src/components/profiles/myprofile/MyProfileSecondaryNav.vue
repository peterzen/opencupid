<script setup lang="ts">
import { computed } from 'vue'
import { useI18nStore } from '@/store/i18nStore'

import { type ViewState } from './types'
import IconGlobe from '@/assets/icons/interface/globe.svg'
import ScopeViewToggler from '../ScopeViewToggler.vue'

const model = defineModel<ViewState>({
  default: {} as ViewState,
  required: true,
})

const languagePreviewOptions = useI18nStore().getAvailableLocalesWithLabels()

const currentLanguage = computed(() => {
  return languagePreviewOptions.find(lang => lang.value === model.value.previewLanguage)
})
</script>

<template>
  <ScopeViewToggler v-model="model.previewScope">
    <template #items-right>
      <BNavItemDropdown
        size="sm"
        id="my-nav-dropdown"
        text="Dropdown"
        toggle-class="nav-link-custom"
        right
      >
        <template #button-content>
          <IconGlobe class="svg-icon" />
          <!-- {{ currentLanguage?.label }} -->
        </template>
        <BDropdownItem
          v-for="lang in languagePreviewOptions"
          :key="lang.value"
          :active="lang.value === model.previewLanguage"
          @click="model.previewLanguage = lang.value"
        >
          {{ lang.label }}
        </BDropdownItem>
      </BNavItemDropdown>
    </template>
  </ScopeViewToggler>
</template>
