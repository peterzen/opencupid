import { defineStore } from 'pinia'
import { api } from '@/lib/api'
import type {
  OwnerProfile,
  PublicProfile,
  UpdatedProfileFragment,
  UpdateProfilePayload,
} from '@zod/profile/profile.dto'
import {
  OwnerProfileSchema,
  PublicProfileSchema,
  UpdatedProfileFragmentSchema,
  UpdateProfilePayloadSchema,
} from '@zod/profile/profile.dto'
import type {
  GetMyProfileResponse,
  GetPublicProfileResponse,
  GetProfilesResponse,
  UpdateProfileResponse,
} from '@shared/dto/apiResponse.dto'


export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {} as null | OwnerProfile, // Current user's profile
  }),

  actions: {
    // Fetch the current user's profile
    async getUserProfile(): Promise<OwnerProfile> {
      try {
        const res = await api.get<GetMyProfileResponse>('/profiles/me')
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
        const res = await api.patch<UpdateProfileResponse>('/profiles/profile', update)
        return UpdatedProfileFragmentSchema.parse(res.data.profile)
      } catch (error: any) {
        console.error('Store: cannot to update profile:', error)
        throw error.response?.data?.message || 'Failed to update profile'
      }
    },

    // Fetch a profile by ID
    async getPublicProfile(profileId: string): Promise<PublicProfile | null> {
      try {
        const res = await api.get<GetPublicProfileResponse>(`/profiles/${profileId}`)
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
        const res = await api.get<GetProfilesResponse>('/profiles')
        const profiles = res.data.profiles.map((p: any) => PublicProfileSchema.parse(p))
        return profiles
      } catch (error: any) {
        console.error('Failed to fetch profiles:', error)

        const status = error?.response?.status
        const message = error?.response?.data?.message || 'Failed to fetch profiles'

        if (status === 403) {
          throw error.response?.data?.message || 'Failed to fetch profiles'
        }
      }
      return null
    },
  },
})
