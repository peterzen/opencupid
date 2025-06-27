import { defineStore } from 'pinia'
import type { LikeEdge } from '@zod/like/like.dto'
import { api } from '@/lib/api'
import { bus } from '@/lib/bus'

interface LikeState {
  sent: LikeEdge[]
  matches: LikeEdge[]
  loading: boolean
}

export const useLikeStore = defineStore('like', {
  state: (): LikeState => ({
    sent: [],
    matches: [],
    loading: false,
  }),

  actions: {
    initialize() {
    },

    onNewLike(payload: LikeEdge) {
      // this.received.unshift(payload)
    },

    async fetchLikes() {
      this.loading = true

      try {
        const [sentRes,  matchRes] = await Promise.all([
          api.get('/like/sent'),
          api.get('/like/matches'),
        ])

        this.sent = sentRes.data.edges
        this.matches = matchRes.data.edges
      } catch (err) {
        console.error('Failed to fetch likes:', err)
      } finally {
        this.loading = false
      }
    },

    async sendLike(targetId: string): Promise<LikeEdge | null> {
      try {
        const res = await api.post(`/like/${targetId}`)
        const edge = res.data.edge as LikeEdge
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
        await api.delete(`/like/${targetId}`)
        this.sent = this.sent.filter(e => e.profile.id !== targetId)
        this.matches = this.matches.filter(e => e.profile.id !== targetId)
      } catch (err) {
        console.error('Failed to unlike profile:', err)
      }
    },
  },
})
