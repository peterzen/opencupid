import { defineStore } from 'pinia'
import axios from 'axios'
// import { ProfileSchema } from '@zod/generated'
import type { ConnectionTypeType, DatingProfile, Profile, ProfileImage } from '@zod/generated'
import type {PublicProfile, OwnerProfile} from '@zod/profile.schema'

import { OwnerProfileImage, PublicProfileImage } from '@zod/media.schema'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

// Success / Error response shapes
interface UploadSuccess {
  success: true
  profileImage: PublicProfileImage
}


interface UploadError {
  success: false
  message: string
  fieldErrors?: Record<string, string[]>
}


type UploadResponse = UploadSuccess | UploadError

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {} as null | OwnerProfile, // Current user's profile
    datingProfile: {} as null | DatingProfile, // Current user's dating profile
    selectedProfile: null as null | Record<string, any>, // Profile fetched by ID
    profileImages: [] as OwnerProfileImage[], // List of profile images
    datingProfileImages: [] as OwnerProfileImage[], // List of dating profile images
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

    // Update the current user's social profile
    async updateProfile(profileData: Partial<Profile>) {
      try {
        const res = await axios.patch('/profiles/profile', profileData)
        this.profile = res.data.profile
        return this.profile as Profile
      } catch (error: any) {
        console.error('Failed to update profile:', error)
        throw error.response?.data?.message || 'Failed to update profile'
      }
    },

    // Update the current user's dating profile
    async updateDatingProfile(profileData: Partial<DatingProfile>) {
      try {
        const res = await axios.patch(`/profiles/dating`, profileData)
        this.datingProfile = res.data.profile
        return this.profile as DatingProfile
      } catch (error: any) {
        console.error('Failed to update profile:', error)
        throw error.response?.data?.message || 'Failed to update profile'
      }
    },

    async uploadProfileImage(
      file: File,
      captionText: string
    ): Promise<UploadResponse> {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('captionText', captionText)

      try {
        const { data } = await axios.post<UploadSuccess>('/profiles/image', formData)
        // data.success is guaranteed true here
        return data
      } catch (err: unknown) {
        let out: UploadError = {
          success: false,
          message: 'An unexpected error occurred'
        }

        if (axios.isAxiosError(err) && err.response) {
          const resp = err.response.data as Partial<UploadError>
          out.message = resp.message ?? out.message
          if (resp.fieldErrors) out.fieldErrors = resp.fieldErrors
        } else if (err instanceof Error) {
          out.message = err.message
        }

        return out
      }
    },

     /** 
     * Set the “main” profile image.
     * Calls POST /profiles/image/:imageId/main
     */
    async setProfileImage(imageId: string) {
      try {
        const { data } = await axios.post<{ success: true; profile: OwnerProfile }>(
          `/profiles/image/${imageId}/main`
        )
        // update the entire profile (including new profileImage)
        this.profile = data.profile
        return { success: true }
      } catch (err: unknown) {
        let msg = 'Failed to set profile image'
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          msg = err.response.data.message
        } else if (err instanceof Error) {
          msg = err.message
        }
        return { success: false, error: msg }
      }
    },

    /**
     * Add an image to the “otherImages” list.
     * Calls POST /profiles/image/:imageId/other
     */
    async addImageToProfile(imageId: string) {
      try {
        const { data } = await axios.post<{ success: true; otherImages: OwnerProfileImage[] }>(
          `/profiles/image/${imageId}/other`
        )
        // replace the otherImages array
        this.profileImages = data.otherImages
        return { success: true }
      } catch (err: unknown) {
        let msg = 'Failed to add image to profile'
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          msg = err.response.data.message
        } else if (err instanceof Error) {
          msg = err.message
        }
        return { success: false, error: msg }
      }
    },

    async deleteImage(image: ProfileImage) {
      try {
        const res = await axios.delete(`/profiles/image/${image.id}`)
      } catch (error: any) {
        console.error('Failed to delete profile image:', error)
        throw error.response?.data?.message || 'Failed to delete profile image'
      }
    },

    async getUserImages() {
      try {
        const res = await axios.get('/profiles/user-images')
        return res.data.images as ProfileImage[]
      } catch (error: any) {
        console.error('Failed to fetch user profile:', error)
        throw error.response?.data?.message || 'Failed to fetch user profile'
      }
    },

  },
})