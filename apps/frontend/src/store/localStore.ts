import { type ToastMessage } from '@/lib/toastify'
import { defineStore } from 'pinia'

export const useLocalStore = defineStore('local', {
  state: () => ({
    flashMessage: null as ToastMessage | null,
  }),
  actions: {
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
    },
  },
})
