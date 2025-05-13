import { defineStore } from 'pinia'
import axios from 'axios'

// ensure base URL is set (e.g. via VITE_API_BASE_URL)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | Record<string, any>,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await axios.post('/users/login', { email, password })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      axios.defaults.headers.common['Authorization'] = `Bearer {this.token}`
      this.user = res.data.user
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      this.user = null
    },
  },
})
