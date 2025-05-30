import { defineStore } from 'pinia'
import axios from 'axios'
import type { UserRoleType } from '@zod/generated'
import type { SessionData } from '@zod/user.schema'

// ensure base URL is set (e.g. via VITE_API_BASE_URL)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

interface JwtPayload {
  userId: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: '',
    session: null as SessionData | null,
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

    async fetchUser() {
      try {
        const res = await axios.get('/users/me')
        // Return the status flag for the frontend to handle
        return { success: true, user: res.data.user, error: null };
      } catch (error: any) {
        console.error('Could not fetch user:', error)
        return { success: false, user: null, error: error.message }
      }
    },

    hasRole(role: UserRoleType) {

      // TODO implement me
      return true
    },
    // Update the current user's profile
    // async updateUser(userData: Record<string, any>) {
    //   try {
    //     const res = await axios.patch("/users/me", userData)
    //     return { success: true, user: res.data.user, error: null }
    //   } catch (error: any) {
    //     console.error('Failed to update profile:', error)
    //     const msg = error.response?.data?.message || 'Failed to update profile'
    //     return { success: false, user: null, error: msg }
    //   }
    // },

    logout() {
      this.userId = null
      this.email = null
      this.jwt = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

  },
})

