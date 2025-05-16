import { defineStore } from 'pinia'
import axios from 'axios'

// ensure base URL is set (e.g. via VITE_API_BASE_URL)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

function setJwt(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const jwt = localStorage.getItem('token') || ''
    let userId = null
    let email = null
    if (jwt) {
      setJwt(jwt)
      console.log("jwt: ", jwt)
      // extract user info from token
      try {
        const payload = JSON.parse(atob(jwt.split('.')[1]))
        // Optionally, you can assign user info here if you want it available on reload
        userId = payload.userId || null
        email = payload.email || null
      } catch (e) {
        console.warn('Failed to parse JWT payload:', e)
      }
    }
    console.log("userId: ", userId)
    console.log("email: ", email)
    return {
      user: null as null | Record<string, any>,
      userId,
      jwt,
      email
    }
  },

  getters: {
    isLoggedIn: (state) => state.jwt !== '',
    getUserId: (state) => state.userId,
    getEmail: (state) => state.email,
  },
  actions: {
    async otpLogin(otp: string) {
      try {
        const res = await axios.get('/users/login-return', {
          params: { token: otp }
        })

        if (res.data.status === 'success') {
          this.jwt = res.data.token;
          localStorage.setItem('token', this.jwt)
          setJwt(this.jwt);

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
      this.user = null
      this.jwt = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

  },
})
