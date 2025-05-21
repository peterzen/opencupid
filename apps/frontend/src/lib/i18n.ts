import { changeLocale } from '@formkit/vue'


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

export function enumOptions<T extends Record<string, string | number>>(enumObj: T, prefix: string) {
  // Filters out reverse-mapping keys if enum is numeric, but yours is string
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