// src/plugins/countries.ts
import { useI18nStore } from '@/store/i18nStore'
import countries from 'i18n-iso-countries'

// const i18nStore = useI18nStore()

// Always register English (fallback)
import enLocale from 'i18n-iso-countries/langs/en.json'
import frLocale from 'i18n-iso-countries/langs/fr.json'
import huLocale from 'i18n-iso-countries/langs/hu.json'
import itLocale from 'i18n-iso-countries/langs/it.json'
countries.registerLocale(enLocale)
countries.registerLocale(huLocale)
countries.registerLocale(frLocale)
countries.registerLocale(itLocale)

// Lazy-register other languages only when first needed
export async function ensureCountryLocale(locale: string) {
  if (countries.getNames(locale)) return
  const mod = await import(/* @vite-ignore */ `i18n-iso-countries/langs/${locale}.json`)
  countries.registerLocale(mod.default)
}

export function getCountryOptions() {
  const list = countries.getNames('en', {
    select: 'official',
  })
  const options = Object.entries(list)
    .map(([code, name]) => ({ label: name, value: code }))
    .sort((a, b) => a.label.localeCompare(b.label))
  return options
}

export function countryCodeToName(code: string) {
  return countries.getName(code, 'en', { select: 'official' })
}

export { countries }
