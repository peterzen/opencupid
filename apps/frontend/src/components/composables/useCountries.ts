import countries from 'i18n-iso-countries'
import { bus } from '@/lib/bus';

import { useI18nStore } from '@/store/i18nStore'

// Always register English (fallback)
import enLocale from 'i18n-iso-countries/langs/en.json'
countries.registerLocale(enLocale)

const loadedLocales = new Set(['en'])

const localeLoaders: Record<string, () => Promise<any>> = {
  en: () => import('i18n-iso-countries/langs/en.json'),
  hu: () => import('i18n-iso-countries/langs/hu.json'),
  fr: () => import('i18n-iso-countries/langs/fr.json'),
  de: () => import('i18n-iso-countries/langs/de.json'),
  it: () => import('i18n-iso-countries/langs/it.json'),
};


// Lazy-register other languages only when first needed
async function ensureCountryLocale(locale: string) {
  if (loadedLocales.has(locale)) return

  const loader = localeLoaders[locale];
  if (!loader) {
    console.warn(`Unsupported locale: ${locale}`);
    return;
  }
  const mod = await loader();
  // console.log(`Registering country locale: ${locale}`, mod.default);
  countries.registerLocale(mod.default);
  loadedLocales.add(locale)
}


bus.on('language:changed', async ({ language }) => {
  await useCountries().ensureCountryLocale(language);
})


export function useCountries() {

  const i18nStore = useI18nStore()

  ensureCountryLocale(i18nStore.getLanguage())

  const getCountryOptions = () => {
    const locale = i18nStore.getLanguage()
    const list = countries.getNames(locale, {
      select: 'official',
    })
    const options = Object.entries(list)
      .map(([code, name]) => ({ label: name, value: code }))
      .sort((a, b) => a.label.localeCompare(b.label))
    return options
  }

  const countryCodeToName = (code: string) => {
    return countries.getName(code, i18nStore.getLanguage(), { select: 'official' })
  }

  return {
    getCountryOptions,
    ensureCountryLocale,
    countryCodeToName,
  }
}
