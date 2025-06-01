import { createI18n } from 'vue-i18n'

declare global {
  interface Window {
    __APP_I18N__?: ReturnType<typeof createI18n>;
  }
}

// https://lokalise.com/blog/vue-i18n/

// Import JSON locale files
import en from '@shared/i18n/en.json'
import hu from '@shared/i18n/hu.json'
import de from '@shared/i18n/de.json'
import fr from '@shared/i18n/fr.json'

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


import { GenderSchema, HasKidsSchema, RelationshipStatusSchema } from '@zod/generated'

export function enumOptions<T extends Record<string, string | number>>(enumObj: T, prefix: string, t: Function) {
  return Object.values(enumObj).map((value) => ({
    value,
    label: t(`${prefix}.${value}`), // e.g., "gender.male"
  }));
}

export function getGenderOptions(t: Function) {
  return enumOptions(GenderSchema.enum, 'gender', t)
}

export function getRelationshipStatusOptions(t: Function) {
  return enumOptions(RelationshipStatusSchema.enum, 'relationship', t)
}

export function getHasKidsOptionsOptions(t: Function) {
  return enumOptions(HasKidsSchema.enum, 'haskids', t)
}


export function appUseI18n(app: any) {
  const i18n = window.__APP_I18N__ || createI18n({
    legacy: false,
    locale: getLocale(),
    fallbackLocale: 'en',
    messages: { en, hu, de, fr },
    missingWarn: false,
    fallbackWarn: false
  })
  window.__APP_I18N__ = i18n
  app.use(i18n)
  // app.provide('$i18n', i18n)
}

