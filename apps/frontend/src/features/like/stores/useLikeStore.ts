import { defineStore } from 'pinia'
import type { LikeEdge } from '@zod/like/like.dto'
import { api } from '@/lib/api'

interface LikeState {
  sent: LikeEdge[]
  received: LikeEdge[]
  matches: LikeEdge[]
  loading: boolean
}

export const useLikeStore = defineStore('like', {
  state: (): LikeState => ({
    sent: [],
    received: [],
    matches: [],
    loading: false,
  }),

  actions: {
    async fetchLikes() {
      this.loading = true

      try {
        const [sentRes, receivedRes, matchRes] = await Promise.all([
          api.get('/like/sent'),
          api.get('/like/received'),
          api.get('/like/matches'),
        ])

        this.sent = sentRes.data.edges
        this.received = receivedRes.data.edges
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
