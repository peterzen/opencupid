import { createI18n, type Composer } from 'vue-i18n'

declare global {
  interface Window {
    __APP_I18N__?: ReturnType<typeof createI18n>
  }
}



import { Settings } from 'luxon'
Settings.defaultZone = 'Europe/Berlin'



// https://lokalise.com/blog/vue-i18n/

// Import JSON locale files
import en from '@shared/i18n/en.json'

export const messagesLoaders: Record<string, () => Promise<any>> = {
  hu: () => import('@shared/i18n/hu.json'),
  de: () => import('@shared/i18n/de.json'),
  fr: () => import('@shared/i18n/fr.json'),
  es: () => import('@shared/i18n/es.json'),
  it: () => import('@shared/i18n/it.json'),
  pt: () => import('@shared/i18n/pt.json'),
  sk: () => import('@shared/i18n/sk.json'),
  pl: () => import('@shared/i18n/pl.json'),
  ro: () => import('@shared/i18n/ro.json'),
  nl: () => import('@shared/i18n/nl.json'),
}


import { useLocalStore } from '@/store/localStore'
import { bus } from './bus'

export function getLocale(): string | null {
  const localStore = useLocalStore()
  return localStore.getLanguage
}

export function sortLanguagesWithEnFirst(codes: string[]): string[] {
  return codes.slice().sort((a, b) => {
    if (a === 'en') return -1
    if (b === 'en') return 1
    return a.localeCompare(b)
  })
}


export function appCreateI18n() {
  return createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en },
    missingWarn: true,
    fallbackWarn: false,
  })
}

async function loadMessages(language: string) {
  // Lazy-load messages only if not already loaded
  const i18n = window.__APP_I18N__

  if (i18n?.global?.messages && i18n.global.messages[language as keyof typeof i18n.global.messages]) {
    return
  }

  const messages = await messagesLoaders[language]?.()
  if (messages) {
    (window.__APP_I18N__?.global as Composer).setLocaleMessage(language, messages.default || messages)
  } else {
    console.warn(`No message loader found for locale: ${language}`)
  }

  // Apply new locale
  (window.__APP_I18N__?.global as Composer).locale.value = language
}

export async function appUseI18n(app: any) {
  const i18n = window.__APP_I18N__ || appCreateI18n()
  window.__APP_I18N__ = i18n as any
  app.use(i18n)

  const defaultLocale = getLocale() || 'en'
  if (defaultLocale && defaultLocale !== 'en') {
    await loadMessages(defaultLocale)
  }

  bus.on('language:changed', async ({ language }) => {
    await loadMessages(language)
    Settings.defaultLocale = language
  })
}
