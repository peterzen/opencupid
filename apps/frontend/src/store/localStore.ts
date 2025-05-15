import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const STORE_NAME = 'settings'

export type LocalSettings = {
  theme: string
}

function systemPrefersDarkTheme() {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
  return darkThemeMq.matches
}

export const useLocalStore = defineStore('local', {
  state: () => ({
    settings: useStorage(
      STORE_NAME,
      {
        theme: systemPrefersDarkTheme() ? 'dark' : 'light',
      },
      localStorage,
      {
        mergeDefaults: true,
      }
    ),
  }),
  getters: {
    theme(state) {
      return state.settings.theme
    },
    isDarkTheme(state) {
      return state.settings.theme === 'dark'
    }
  },
  actions: {
    updateTheme(theme: string) {
      this.settings.theme = theme
    },
    setDarkTheme(isDark: boolean) {
      this.settings.theme = isDark ? 'dark' : 'light'
    },
    updateSettings(partialSettings: LocalSettings) {
      this.settings = {
        ...this.settings,
        ...partialSettings,
      }
    },
  },
})

