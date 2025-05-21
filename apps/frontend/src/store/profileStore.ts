import { defineStore } from 'pinia'
import axios from 'axios'
// import { ProfileSchema } from '@zod/generated'
import type { ConnectionTypeType, DatingProfile, Profile } from '@zod/generated'
import { ConnectionOptions } from 'tls'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {} as null | Profile, // Current user's profile
    datingProfile: {} as null | DatingProfile, // Current user's dating profile
    selectedProfile: null as null | Record<string, any>, // Profile fetched by ID
  }),

  actions: {
    // Fetch the current user's profile
    async getUserProfiles() {

      try {
        const res = await axios.get('/profiles/me')
        this.profile = res.data.profile as Profile
        this.datingProfile = res.data.datingProfile as DatingProfile
        console.log('Fetched user profile:', this.profile)
        console.log('Fetched user dating profile:', this.datingProfile)
        return {
          profile: this.profile,
          datingProfile: this.datingProfile,
        }
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