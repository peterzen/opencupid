import { defineStore } from 'pinia'
import axios from 'axios'

// ensure base URL is set (e.g. via VITE_API_BASE_URL)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

function setJwt(token: string) {
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | Record<string, any>,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const res = await axios.post('/users/login', { email, password });

        if (res.data.status === 'success') {
          this.token = res.data.token;
          setJwt(this.token);
          this.user = res.data.user;
          return { success: true, status: 'success' };
        }

        // Return the status flag for the frontend to handle
        return { success: false, status: res.data.status };
      } catch (error: any) {
        console.error('Login failed:', error);
        throw 'An unexpected error occurred. Please try again.';
      }
    },


    async register(email: string, password: string) {
      try {
        const res = await axios.post('/users/register', { email, password })
        return { success: true, data: res.data }
      } catch (error) {
        console.error('Registration failed:', error)
        return { success: false, error }
      }
    },

    async confirmEmail(emailToken: string) {
      try {
        const res = await axios.get('/users/confirm-email', { params: { emailToken } })

        if (res.data.status === 'success') {
          this.token = res.data.token;
          setJwt(this.token);
          this.user = res.data.user;
          return { success: true, status: 'success' };
        }

        // Return the status flag for the frontend to handle
        return { success: false, status: res.data.status };
        // return { success: true, message: res.data.message }
      } catch (error: any) {
        console.error('Email confirmation failed:', error)
        throw error.response?.data?.message || 'Failed to confirm email.'
      }
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      this.user = null
    },
  },
})
