// import { type ToastMessage } from '@/lib/toast'
import { defineStore } from 'pinia'
import { bus } from '@/lib/bus'
import { language } from '@vue/eslint-config-prettier/skip-formatting'

export const useLocalStore = defineStore('local', {
  state: () => ({
    messageDrafts: {} as Record<string, string>, // Maps recipient profileIDs to their drafts
    // flashMessage: null as ToastMessage | null,
  }),
  actions: {
    setMessageDraft(profileId: string, message: string) {
      this.messageDrafts[profileId] = message
      localStorage.setItem('messageDrafts', JSON.stringify(this.messageDrafts))
    },
    getMessageDraft(profileId: string): string {
      return this.messageDrafts[profileId] || ''
    },
    async initialize() {
      const stored = localStorage.getItem('messageDrafts')
      if (stored) {
        try {
          this.messageDrafts = JSON.parse(stored)
        } catch {
          this.messageDrafts = {}
        }
      }

      bus.on('auth:logout', this.cleanUp)
    },
    async cleanUp() {
      this.messageDrafts = {}
      localStorage.removeItem('messageDrafts')
    }
    // setFlashMessage(message: string, type: string) {
    //   this.flashMessage = {
    //     message: message,
    //     type: type,
    //   } as ToastMessage
    // },
    // getFlashMessage() {
    //   const message = this.flashMessage
    //   this.flashMessage = null
    //   return message
    // },
  },
})
