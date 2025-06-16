import { defineStore } from 'pinia'
import { api } from '@/lib/api'
import type {
  EditableOwnerProfile,
  OwnerProfile,
  PublicProfile,
} from '@zod/profile/profile.dto'
import {
  EditableOwnerToProfilePayloadTransform,
  OwnerProfileSchema,
  PublicProfileArraySchema,
  PublicProfileSchema,
  UpdateProfilePayloadSchema,
} from '@zod/profile/profile.dto'
import type {
  GetMyProfileResponse,
  GetPublicProfileResponse,
  GetProfilesResponse,
  UpdateProfileResponse,
} from '@shared/dto/apiResponse.dto'
import {
  storeSuccess,
  storeError,
  type StoreVoidSuccess,
  type StoreResponse,
  type StoreError
} from './helpers'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as OwnerProfile | null,// Current user's profile
    profileList: [] as PublicProfile[], // List of public profiles
    isLoading: false, // Loading state
  }),

  actions: {
    async fetchUserProfile(): Promise<StoreVoidSuccess | StoreError> {
      try {
        this.isLoading = true // Set loading state
        const res = await api.get<GetMyProfileResponse>('/profiles/me')
        const fetched = OwnerProfileSchema.parse(res.data.profile)
        this.profile = fetched // Update local state
        return storeSuccess()
      } catch (error: any) {
        this.profile = null // Reset profile on error
        return storeError(error, 'Failed to fetch profile')
      } finally {
        this.isLoading = false // Reset loading state
      }
    },

    // Update the current user's social profile
    async updateProfile(profileData: EditableOwnerProfile): Promise<StoreVoidSuccess | StoreError> {
      try {
        const update = EditableOwnerToProfilePayloadTransform.parse(profileData)
        this.isLoading = true // Set loading state
        const res = await api.patch<UpdateProfileResponse>('/profiles/profile', update)
        const updated = OwnerProfileSchema.parse(res.data.profile)
        this.profile = updated
        return storeSuccess()
      } catch (error: any) {
        return storeError(error, 'Failed to update profile')
      } finally {
        this.isLoading = false // Reset loading state
      }
    },



    // Fetch a profile by ID
    async getPublicProfile(profileId: string): Promise<StoreResponse<PublicProfile>> {
      try {
        this.isLoading = true // Set loading state
        const res = await api.get<GetPublicProfileResponse>(`/profiles/${profileId}`)
        const fetched = PublicProfileSchema.parse(res.data.profile)
        return storeSuccess(fetched)
      } catch (error: any) {
        return storeError(error, 'Failed to fetch profile')
      } finally {
        this.isLoading = false // Reset loading state
      }
    },

    async findProfiles(): Promise<StoreResponse<StoreVoidSuccess | StoreError>> {
      try {
        this.isLoading = true // Set loading state
        const res = await api.get<GetProfilesResponse>('/profiles')
        const fetched = PublicProfileArraySchema.parse(res.data.profiles)
        this.profileList = fetched // Update local state
        return storeSuccess()
      } catch (error: any) {
        this.profileList = [] // Reset profile list on error
        return storeError(error, 'Failed to fetch profiles')
      } finally {
        this.isLoading = false // Reset loading state
      }
    },
  },
})
