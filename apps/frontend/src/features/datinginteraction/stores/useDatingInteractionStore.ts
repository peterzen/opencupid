import { defineStore } from 'pinia'
import { api } from '@/lib/api'
import { bus } from '@/lib/bus'
import type { InteractionEdge } from '@zod/datinginteraction/datinginteraction.dto'

interface InteractionState {
  sent: InteractionEdge[]
  receivedLikesCount: number
  matches: InteractionEdge[]
  passed: string[] // just IDs for now
  loading: boolean
}

export const useDatingInteractionStore = defineStore('datingInteraction', {
  state: (): InteractionState => ({
    sent: [],
    receivedLikesCount: 0,
    matches: [],
    passed: [],
    loading: false,
  }),

  actions: {
    initialize() {
      bus.on('ws:new_like', this.onNewLike)
      // You can also listen for future events: ws:new_pass, ws:match, etc.
    },

    onNewLike() {
      // // Push to sent only if not already there
      // if (!this.sent.some(e => e.profile.id === edge.profile.id)) {
      //   this.sent.unshift(edge)
      // }

      // if (edge.isMatch && !this.matches.some(e => e.profile.id === edge.profile.id)) {
      //   this.matches.unshift(edge)
      // }
    },

    async fetchInteractions() {
      this.loading = true
      try {
        const [sentRes, receivedRes, matchRes] = await Promise.all([
          api.get('/interactions/sent'),
          api.get('/interactions/received'),
          api.get('/interactions/matches'),
        ])
        this.sent = sentRes.data.edges
        this.matches = matchRes.data.edges
        this.receivedLikesCount = receivedRes.data.count
      } catch (err) {
        console.error('Failed to fetch likes:', err)
      } finally {
        this.loading = false
      }
    },

    async sendLike(targetId: string): Promise<InteractionEdge | null> {
      try {
        const res = await api.post(`/interactions/like/${targetId}`)
        const edge = res.data.edge as InteractionEdge
        this.sent.push(edge)
        if (edge.isMatch) this.matches.push(edge)
        return edge
      } catch (err) {
        console.error('Failed to like profile:', err)
        return null
      }
    },

    async removeLike(targetId: string) {
      try {
        await api.delete(`/interactions/like/${targetId}`)
        this.sent = this.sent.filter(e => e.profile.id !== targetId)
        this.matches = this.matches.filter(e => e.profile.id !== targetId)
      } catch (err) {
        console.error('Failed to unlike profile:', err)
      }
    },

    async passProfile(targetId: string) {
      try {
        await api.post(`/interactions/pass/${targetId}`)
        if (!this.passed.includes(targetId)) {
          this.passed.push(targetId)
        }
        // Optionally: remove from sent/matches if previously liked
        this.sent = this.sent.filter(e => e.profile.id !== targetId)
        this.matches = this.matches.filter(e => e.profile.id !== targetId)
      } catch (err) {
        console.error('Failed to pass profile:', err)
      }
    },

    async unpassProfile(targetId: string) {
      try {
        await api.delete(`/interactions/pass/${targetId}`)
        this.passed = this.passed.filter(id => id !== targetId)
      } catch (err) {
        console.error('Failed to unpass profile:', err)
      }
    },
  },
})
