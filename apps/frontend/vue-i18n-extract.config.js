// Options documented in vue-i18n-extract readme.
export default {
  vueFiles:   './src/**/*.?(ts|vue)',
  languageFiles: '../../packages/shared/i18n/*.?(json|yml|yaml|js)',
  exclude: [],
  output: false,
  add: false,
  remove: false,
  ci: false,
  separator: '.',
  noEmptyTranslation: '',
  missingTranslationString: '',
};