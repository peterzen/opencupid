import { ToastMessage } from '@/lib/toastify'
import { defineStore } from 'pinia'



function systemPrefersDarkTheme() {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
  return darkThemeMq.matches
}

export const useLocalStore = defineStore('local', {
  state: () => ({
    theme: localStorage.getItem('theme') || '',
    flashMessage: null as ToastMessage | null,
  }),
  actions: {
    updateTheme(theme: string) {
      this.theme = theme
    },
    setFlashMessage(message: string, type: string) {
      this.flashMessage = {
        message: message,
        type: type,
      } as ToastMessage
    },
    getFlashMessage() {
      const message = this.flashMessage
      this.flashMessage = null
      return message
    }
  },
})

