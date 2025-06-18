import languages from '@cospired/i18n-iso-languages'

// https://www.npmjs.com/package/@cospired/i18n-iso-languages
import lang from '@cospired/i18n-iso-languages/langs/en.json'
languages.registerLocale(lang)

// const localeModules = import.meta.glob<{ default: any }>(
//   './src/node_modules/i18n-iso-languages/langs/*.json',
//   { eager: true }
// );

// async function registerLocales() {
//   for (const locale of getAvailableLocales()) {
//     const path = `@cospired/i18n-iso-languages/langs/${locale}.json`;
//     const lang = localeModules[path];
//     if (lang && lang.default) {
//       languages.registerLocale(lang.default);
//     }
//   }
// }

// await registerLocales();
export type MultiselectOption = {
  value: string
  label: string
}

export function getLanguageSelectorOptions(): MultiselectOption[] {
  const langs = languages.getNames('en')
  // console.log('Registering locales:', langs);
  return Object.keys(langs).map((code, label) => ({
    value: code,
    label: langs[code],
  }))
}

export function getLanguageList(codes: string[]) {
  if (!codes) {
    return []
  }
  const langs = languages.getNames('en')
  return codes.map(code => ({
    value: code,
    label: langs[code] || code,
  }))
}
