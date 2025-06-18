import { defineStore } from 'pinia'
import { api } from '@/lib/api'
import { bus } from '@/lib/bus'
import { type UserRoleType } from '@zod/generated'

import {
  OtpSendReturnSchema,
  SettingsUserSchema,
} from '@zod/user/user.dto'

import type { AuthIdentifier, JwtPayload, SessionData } from '@zod/user/user.types'

import type { OtpLoginResponse, SendLoginLinkResponse, UserMeResponse } from '@shared/dto/apiResponse.dto'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: '',
    session: null as SessionData | null,
    userId: null as string | null,
    email: null as string | null,
    profileId: null as string | null,
    isInitialized: false,
    hasActiveProfile: false as boolean,
  }),

  getters: {
    isLoggedIn: state => state.jwt !== '',
    getUserId: state => state.userId,
    getEmail: state => state.email,
  },

  actions: {
    setAuthState(token: string) {
      // Set JWT in localStorage and axios headers
      this.jwt = token
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Parse user data from token
      try {
        const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload
        this.userId = payload.userId
        this.profileId = payload.profileId
        // Notify messageStore
        bus.emit('auth:login', { token: this.jwt, userInfo: payload })
      } catch (e) {
        console.warn('Failed to parse JWT payload:', e)
        this.userId = null
      }
    },

    initializeFromStorage() {
      const token = localStorage.getItem('token')
      if (token) {
        this.setAuthState(token)
      }
      this.isInitialized = true
    },

    async otpLogin(otp: string) {
      let userId: string | null
      try {
        userId = localStorage.getItem('uid')
      } catch (error) {
        console.warn('Failed to access localStorage:', error)
        return { success: false, status: 'storage_error' }
      }

      if (!userId) {
        // registration/login initiated in a different browser -> no userId
        return { success: false, status: 'missing_userid' }
      }
      if (!otp) {
        // OTP is missing - maybe it got garbled in the email link
        return { success: false, status: 'missing_otp' }
      }
      try {
        const res = await api.get<OtpLoginResponse>('/users/otp-login', {
          params: { userId, otp },
        })

        if (res.data.success === true) {
          this.setAuthState(res.data.token)
          localStorage.removeItem('uid') // Clear userId after successful login
        } else {
          return { success: false, status: res.data.status }
        }
      } catch (error: any) {
        console.error('Login failed:', error)
        return { success: false, status: error.message }
      }
      return { success: true, status: '' }
    },

    async sendLoginLink(authId: AuthIdentifier) {
      // console.log('Sending login link with data:', authId)
      try {
        const res = await api.post<SendLoginLinkResponse>('/users/send-login-link', authId)
        const user = OtpSendReturnSchema.parse(res.data.user)
        // set userId in localStorage for the otplogin to pick up
        localStorage.setItem('uid', user.id)
        // Return the status flag for the frontend to handle
        return { success: true, user, status: res.data.status }
      } catch (error: any) {
        console.error('Sending login link failed:', error)
        return { success: false, status: error.message }
      }
    },

    async fetchUser() {
      try {
        const res = await api.get<UserMeResponse>('/users/me')
        const user = SettingsUserSchema.parse(res.data.user)
        return { success: true, user, error: null }
      } catch (error: any) {
        console.error('Could not fetch user:', error)
        return { success: false, user: null, error: error.message }
      }
    },

    hasRole(role: UserRoleType) {
      // TODO implement me
      return true
    },

    // Update the current user
    async updateUser(userData: Record<string, any>) {
      try {
        const res = await api.patch("/users/me", userData)
        return { success: true, user: res.data.user, error: null }
      } catch (error: any) {
        console.error('Failed to update profile:', error)
        const msg = error.response?.data?.message || 'Failed to update profile'
        return { success: false, user: null, error: msg }
      }
    },

    logout() {
      this.userId = null
      this.email = null
      this.jwt = ''
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      bus.emit('auth:logout')
    },
  },
})


bus.on('language:changed', async ({ language }) => {
  await useAuthStore().updateUser({ language })
})


