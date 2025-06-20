import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { bus } from "@/lib/bus";

import { Settings } from 'luxon'
Settings.defaultZone = 'Europe/Berlin'

const STORAGE_KEY = 'language'

const labels: Record<string, string> = {
  hu: 'Magyar',
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
}


export const useI18nStore = defineStore('i18n', () => {

  const { locale, availableLocales } = useI18n()
  const currentLanguage = ref(localStorage.getItem(STORAGE_KEY) || getBrowserLanguage(availableLocales))
  locale.value = currentLanguage.value

  // Sync changes to localStorage + vue-i18n
  watch(currentLanguage, (newLang) => {
    locale.value = newLang
    // Set the locale for Luxon
    Settings.defaultLocale = locale.value
    localStorage.setItem(STORAGE_KEY, newLang)
    bus.emit('language:changed', { language: newLang })
  })

  function getLanguage() {
    return currentLanguage.value
  }

  function setLanguage(lang: string) {

    if (!availableLocales.includes(lang)) {
      console.error(`Unsupported language: ${lang}`)
      return
    }
    currentLanguage.value = lang
  }

  function getAvailableLocales() {
    return availableLocales
  }

  function getAvailableLocalesWithLabels() {
    return availableLocales.map((lang) => ({
      value: lang,
      label: labels[lang] || lang, // Fallback to code if no label found
    }))
  }

  return {
    currentLanguage,
    getAvailableLocales,
    getAvailableLocalesWithLabels,
    setLanguage,
    getLanguage,
  }
})

function getBrowserLanguage(availableLocales: string[]): string {
  // TODO - handle multiple languages in navigator.languages
  // is navigator.language always == navigator.languages[0]?
  // const browserLanguage = navigator.language || navigator.languages[0] || 'en'
  const browserLang = (navigator.language || 'en').split('-')[0]
  return availableLocales.includes(browserLang) ? browserLang : 'en'

}