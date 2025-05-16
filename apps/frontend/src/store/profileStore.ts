import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as null | Record<string, any>, // Current user's profile
    selectedProfile: null as null | Record<string, any>, // Profile fetched by ID
  }),

  actions: {
    // Fetch the current user's profile
    async getUserProfile() {

      try {
        const res = await axios.get('/profiles/me') 
        this.profile = res.data.profile
        return this.profile
      } catch (error: any) {
        console.error('Failed to fetch user profile:', error)
        throw error.response?.data?.message || 'Failed to fetch user profile'
      }
    },

    // Fetch a profile by ID
    async findProfile(profileId: string) {
      try {
        const res = await axios.get(`/profiles/${profileId}`)
        this.selectedProfile = res.data.profile
        return this.selectedProfile
      } catch (error: any) {
        console.error('Failed to fetch profile:', error)
        throw error.response?.data?.message || 'Failed to fetch profile'
      }
    },

    // Update the current user's profile
    async updateProfile(profileData: Record<string, any>) {
      try {
        const res = await axios.patch(`/profiles/${this.profile?.id}`, profileData)
        this.profile = res.data.profile
        return this.profile
      } catch (error: any) {
        console.error('Failed to update profile:', error)
        throw error.response?.data?.message || 'Failed to update profile'
      }
    },
  },
})