import { defineStore } from 'pinia'
import { api, axios } from '@/lib/api'
import type {
  OwnerProfile,
  PublicProfile,
  UpdatedProfileFragment,
  UpdateProfilePayload,
} from '@zod/profile.schema'
import {
  OwnerProfileSchema,
  PublicProfileSchema,
  UpdatedProfileFragmentSchema,
  UpdateProfilePayloadSchema
} from '@zod/profile.schema'
import { type OwnerProfileImage, type ProfileImagePosition } from '@zod/profileimage.schema'


// Success / Error response shapes
interface UploadSuccess {
  success: true
  profile: OwnerProfile
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
        const res = await api.get('/profiles/me')
        this.profile = OwnerProfileSchema.parse(res.data.profile)
        console.log('Fetched user profile:', this.profile)
        return this.profile
      } catch (error: any) {
        console.error('Failed to fetch user profile:', error)
        throw error.response?.data?.message || 'Failed to fetch user profile'
      }
    },

    // Update the current user's social profile
    async updateProfile(profileData: UpdateProfilePayload): Promise<UpdatedProfileFragment> {
      try {
        const update = UpdateProfilePayloadSchema.parse(profileData)
        const res = await api.patch('/profiles/profile', update)
        return UpdatedProfileFragmentSchema.parse(res.data.profile)
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
        const { data } = await api.post<UploadSuccess>('/profiles/image', formData)
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

    async deleteImage(image: OwnerProfileImage): Promise<UploadResponse> {
      try {
        const { data } = await api.delete<UploadSuccess>(`/profiles/image/${image.id}`)
        return data
      } catch (error: any) {
        const out: UploadError = {
          success: false,
          message: 'An unexpected error occurred'
        }
        return out
      }
    },

    async reorderImages(images: ProfileImagePosition[]): Promise<UploadResponse> {
      try {
        const { data } = await api.patch<UploadSuccess>('/profiles/image/order', { images })
        return data
      } catch (error: any) {
        const out: UploadError = {
          success: false,
          message: 'An unexpected error occurred'
        }
        return out
      }
    },

    // Fetch a profile by ID
    async getPublicProfile(profileId: string): Promise<PublicProfile | null> {
      try {
        const res = await api.get(`/profiles/${profileId}`)
        return PublicProfileSchema.parse(res.data.profile)
        // return res.data.profile
      } catch (error: any) {
        // console.error('Failed to fetch profile:', error)

        const status = error?.response?.status
        const message = error?.response?.data?.message || 'Failed to fetch profile'

        if (status === 403) {
          // You can throw a custom error, trigger a redirect, show a modal, etc.
          // throw new Error('You are not authorized to view this profile.')
          throw error.response?.data?.message || 'Failed to fetch profile'
        }
      }
      return null
    },

    async findProfiles(): Promise<PublicProfile[] | null> {
      try {
        const res = await api.get('/profiles')
        const profiles = res.data.profiles.map((p: any) => PublicProfileSchema.parse(p))
        return profiles
      } catch (error: any) {
        // console.error('Failed to fetch profiles:', error)

        const status = error?.response?.status
        const message = error?.response?.data?.message || 'Failed to fetch profile'

        if (status === 403) {
          // You can throw a custom error, trigger a redirect, show a modal, etc.
          // throw new Error('You are not authorized to view this profile.')
          throw error.response?.data?.message || 'Failed to fetch profile'
        }
      }
      return null
    }
  },
})