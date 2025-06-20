<script setup lang="ts">
import { useI18nStore } from '@/store/i18nStore'
import { useI18n } from 'vue-i18n'

const i18nStore = useI18nStore()
const { t } = useI18n()

defineEmits<{
  (e: 'language:select', lang: string): void
}>()

const labels: Record<string, string> = {
  hu: 'Magyar',
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
}
</script>

<template>
  <ul class="language-selector list-inline text-muted mt-3">
    <li v-for="lang in i18nStore.getAvailableLocales()" :key="lang" class="list-inline-item me-3">
      <span v-if="i18nStore.currentLanguage === lang" class="text-primary">{{ labels[lang] }}</span>
      <a v-else 
      class="text-decoration-none text-muted"
      href="#" 
      @click="$emit('language:select', lang)">{{ labels[lang] }}</a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.language-selector {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
}
</style>