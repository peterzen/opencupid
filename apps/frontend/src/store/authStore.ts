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
    async login(token: string) {
      try {
        const res = await axios.get('/users/login-return', { 
          params: { token } 
        })

        if (res.data.status === 'success') {
          this.token = res.data.token;
          setJwt(this.token);
          this.user = res.data.user;
          console.log("user: ", this.user)
          return { success: true, status: '' };
        }

        // Return the status flag for the frontend to handle
        return { success: false, status: res.data.status };

      } catch (error: any) {
        console.error('Login failed:', error)
        return { success: false, status: error.message }
      }
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
      this.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      this.user = null
    },
  },
})
