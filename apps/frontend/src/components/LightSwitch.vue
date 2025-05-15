<script lang="ts">

import { applyTheme } from '@/lib/utils'
import { useLocalStore } from '@/store/localStore'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LightSwitch',
  setup() {
    return {
      settingsStore: useLocalStore(),
    }
  },
  computed: {
    isDarkTheme: {
      get() {
        return this.settingsStore.isDarkTheme
      },
      set(isDark: boolean) {
        this.settingsStore.setDarkTheme(isDark)
        applyTheme(this.settingsStore.theme)
      }
    }
  },
})
</script>

<template>
  <div class="form-check form-switch ps-0">
    <label class="form-check-label stretched-link d-flex align-items-center justify-content-start"
           for="lightSwitch">
      <FontAwesomeIcon icon="fa-sun" class="justify-self-start me-5 pt-1"/>
      <input class="form-check-input me-2"
             type="checkbox"
             ref="lightSwitch"
             id="lightSwitch"
             v-model="isDarkTheme" />
      <FontAwesomeIcon icon="fa-moon" class="pt-1"/>
    </label>

  </div>
</template>
