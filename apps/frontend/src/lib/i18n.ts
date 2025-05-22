// Import JSON locale files
import en from '@opencupid/shared/i18n/en.json'
import hu from '@opencupid/shared/i18n/hu.json'

import { changeLocale } from '@formkit/vue'

export function useI18n(app: any) {
  const i18n = createI18n({
    legacy: true,
    locale: getLocale(),
    fallbackLocale: 'en',
    messages: { en, hu },
  })
  app.use(i18n)
  app.provide('$i18n', i18n)
}



export function getLocale() {
  return 'en'
}

export function getAvailableLocales() {
  return ['en', 'hu']
}

export function setLocale(locale: string) {
  // Set the locale for the i18n instance
  // i18n.global.locale = locale
  // Set the locale for Luxon
  // Settings.defaultLocale = locale
  // Set the locale for FormKit
  // formKitConfig.config.locales = getAvailableLocales()
  changeLocale(locale)
}


import { GenderSchema, RelationshipStatusSchema } from '@zod/generated'
import { createI18n } from 'vue-i18n'

export function enumOptions<T extends Record<string, string | number>>(enumObj: T, prefix: string) {
  return Object.values(enumObj).map((value) => ({
    value,
    label: `${prefix}.${value}`, // e.g., "gender.male"
  }));
}

export function getGenderOptions() {
  return enumOptions(GenderSchema.enum, 'gender')
}

export function getRelationshipStatusOptions() {
  return enumOptions(RelationshipStatusSchema.enum, 'relationship')
}

