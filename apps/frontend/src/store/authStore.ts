import { defineStore } from 'pinia'
import axios from 'axios'

// ensure base URL is set (e.g. via VITE_API_BASE_URL)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

interface JwtPayload {
  userId: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: '',
    userId: null as string | null,
    email: null as string | null,
    isInitialized: false,
  }),

  getters: {
    isLoggedIn: (state) => state.jwt !== '',
    getUserId: (state) => state.userId,
    getEmail: (state) => state.email,
  },

  actions: {
    setAuthState(token: string) {
      // Set JWT in localStorage and axios headers
      this.jwt = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Parse user data from token
      try {
        const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload
        this.userId = payload.userId
        this.email = payload.email
      } catch (e) {
        console.warn('Failed to parse JWT payload:', e)
        this.userId = null
        this.email = null
      }
    },

    initializeFromStorage() {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        this.setAuthState(storedToken)
      }
      this.isInitialized = true
    },

    async otpLogin(otp: string) {
      try {
        const res = await axios.get('/users/otp-login', {
          params: { token: otp }
        })

        if (res.data.success === true) {
          this.setAuthState(res.data.token)
        }

      } catch (error: any) {
        console.error('Login failed:', error)
        return { success: false, status: error.message }
      }
      return { success: true, status: '' };
    },

    async sendLoginLink(email: string) {
      try {
        const res = await axios.post('/users/send-login-link', { email })
        // Return the status flag for the frontend to handle
        return { success: true, status: res.data.status };
      } catch (error: any) {
        console.error('Sending login link failed:', error)
        return { success: false, status: error.message }
      }
    },

    logout() {
      this.userId = null
      this.email = null
      this.jwt = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

  },
})

