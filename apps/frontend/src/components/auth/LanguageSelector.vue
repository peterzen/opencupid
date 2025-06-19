<script setup lang="ts">
import { useI18nStore } from '@/store/i18nStore'
import { useI18n } from 'vue-i18n'

const i18nStore = useI18nStore()
const { t } = useI18n()

const labels: Record<string, string> = {
  hu: 'Magyar',
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
}
const handleSetLanguage = (locale: string) => {
  i18nStore.setLanguage(locale)
}
</script>

<template>
  <div class="language-selector">
    <ul class="list-inline text-muted">
      <li class="list-inline-item me-3">
        {{ t('settings.language_label') }}
      </li>
      <li v-for="lang in i18nStore.getAvailableLocales()" :key="lang" class="list-inline-item me-3">
        <span v-if="i18nStore.currentLanguage === lang" class="text-primary">{{ labels[lang] }}</span>
        <a v-else href="#" @click="handleSetLanguage(lang)">{{ labels[lang] }}</a>
      </li>
    </ul>
  </div>
</template>
