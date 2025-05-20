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