// src/plugins/countries.ts
import countries, { Alpha2Code } from 'i18n-iso-countries'

// Always register English (fallback)
import enLocale from 'i18n-iso-countries/langs/en.json'
import { getLocale } from './i18n'
countries.registerLocale(enLocale)

// Lazy-register other languages only when first needed
export async function ensureCountryLocale(locale: string) {
  if (countries.getNames(locale)) return
  const mod = await import(
    /* @vite-ignore */ `i18n-iso-countries/langs/${locale}.json`
  )
  countries.registerLocale(mod.default)
}


export function getCountryOptions() {
  const list = countries.getNames(getLocale(), {
    select: 'official'
  })
  const options = Object.entries(list)
    .map(([code, name]) => ({ label: name, value: code }))
    .sort((a, b) => a.label.localeCompare(b.label))
  return options
}

export function countryCodeToName(code: string) {
  return countries.getName(code, getLocale(), { select: 'official' }) 
}


export { countries }