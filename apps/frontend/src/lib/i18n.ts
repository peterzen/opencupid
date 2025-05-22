import { createI18n } from 'vue-i18n'

declare global {
  interface Window {
    __APP_I18N__?: ReturnType<typeof createI18n>;
  }
}


// Import JSON locale files
import en from '@opencupid/shared/i18n/en.json'
import hu from '@opencupid/shared/i18n/hu.json'
import de from '@opencupid/shared/i18n/de.json'
import fr from '@opencupid/shared/i18n/fr.json'

import { changeLocale } from '@formkit/vue'

export function getLocale() {
  return 'en'
}

export function getAvailableLocales() {
  return ['en', 'hu', 'de', 'fr']
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


export function appUseI18n(app: any) {
  const i18n =window.__APP_I18N__ || createI18n({
    // legacy: true,
    locale: getLocale(),
    fallbackLocale: 'en',
    messages: { en, hu, de, fr },
  })
  window.__APP_I18N__ = i18n
  app.use(i18n)
  // app.provide('$i18n', i18n)
}

