import { defineStore } from 'pinia'
import axios from 'axios'
import type { Profile, ProfileImage } from '@zod/generated'
import type { OwnerProfile, UpdateProfile } from '@zod/profile.schema'

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
    profileImages: [] as OwnerProfileImage[], // List of profile images
  }),

  actions: {
    // Fetch the current user's profile
    async getUserProfile(): Promise<OwnerProfile> {
      try {
        const res = await axios.get('/profiles/me')
        this.profile = res.data.profile as OwnerProfile
        console.log('Fetched user profile:', this.profile)
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
        return res.data.profile
      } catch (error: any) {
        console.error('Failed to fetch profile:', error)
        throw error.response?.data?.message || 'Failed to fetch profile'
      }
    },

    // Update the current user's social profile
    async updateProfile(profileData: UpdateProfile): Promise<OwnerProfile> {
      try {
        const res = await axios.patch('/profiles/profile', profileData)
        this.profile = res.data.profile
        return this.profile as OwnerProfile
      } catch (error: any) {
        console.error('Store: cannot to update profile:', error)
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
    * Calls POST /profiles/image/:imageId/primary
    */
    async setProfileImage(imageId: string) {
      try {
        const res = await axios.post<{ success: true; profile: OwnerProfile }>(
          `/profiles/image/${imageId}/primary`
        )
        // update the entire profile (including new profileImage)
        this.profile = res.data.profile
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
        const res = await axios.get('/profiles/image/list')
        return res.data.images as ProfileImage[]
      } catch (error: any) {
        console.error('Failed to fetch user profile:', error)
        throw error.response?.data?.message || 'Failed to fetch user profile'
      }
    },

    /**
     * Attach a tag to the current user's profile.
     * Calls POST /profiles/:id/tags/:tagId
     */
    async addTagToProfile(tagId: string): Promise<{ success: true } | { success: false; message: string }> {
      if (!this.profile) {
        return { success: false, message: 'No profile loaded' };
      }
      try {
        await axios.post(`/profiles/${this.profile.id}/tags/${tagId}`);
        // optimistically add to local state
        this.profile.tags = [...(this.profile.tags || []), { tagId } as any];
        return { success: true };
      } catch (err: any) {
        console.error('Failed to add tag to profile:', err);
        return {
          success: false,
          message: err.response?.data?.message || 'Failed to add tag to profile',
        };
      }
    },

    /**
     * Remove a tag from the current user's profile.
     * Calls DELETE /profiles/:id/tags/:tagId
     */
    async removeTagFromProfile(tagId: string): Promise<{ success: true } | { success: false; message: string }> {
      if (!this.profile) {
        return { success: false, message: 'No profile loaded' };
      }
      try {
        await axios.delete(`/profiles/${this.profile.id}/tags/${tagId}`);
        // update local state
        this.profile.tags = (this.profile.tags || []).filter(t => t.id !== tagId);
        return { success: true };
      } catch (err: any) {
        console.error('Failed to remove tag from profile:', err);
        return {
          success: false,
          message: err.response?.data?.message || 'Failed to remove tag from profile',
        };
      }
    },
  },
})