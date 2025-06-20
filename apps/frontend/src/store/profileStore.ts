import { defineStore } from 'pinia'
import { api } from '@/lib/api'
import type {
  OwnerProfile,
  PublicProfile,
} from '@zod/profile/profile.dto'
import {
  OwnerProfileSchema,
  PublicProfileArraySchema,
  PublicProfileSchema,
} from '@zod/profile/profile.dto'
import type {
  GetMyProfileResponse,
  GetPublicProfileResponse,
  GetProfilesResponse,
  UpdateProfileResponse,
  GetDatingPreferenceseResponse,
  UpdateDatingPreferencesResponse,
} from '@shared/dto/apiResponse.dto'
import {
  storeSuccess,
  storeError,
  type StoreVoidSuccess,
  type StoreResponse,
  type StoreError
} from './helpers'
import { type EditProfileForm, ProfileFormToPayloadTransform, type EditFieldProfileFormWithImages } from '@zod/profile/profile.form'
import { DatingPreferencesDTO, DatingPreferencesDTOSchema, UpdateDatingPreferencesPayload, UpdateDatingPreferencesPayloadSchema } from '@zod/profile/datingPreference.dto'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as OwnerProfile | null,// Current user's profile
    profileList: [] as PublicProfile[], // List of public profiles
    datingPrefs: null as DatingPreferencesDTO | null, // Current user's dating preferences  

    isLoading: false, // Loading state

    // Modal state for editing profile fields. Bit of an abusal of this store and maybe should be
    // moved to a more specific store, but for now it works.
    fieldEditModal: false,
    currentField: '' as keyof EditFieldProfileFormWithImages | null, // Field being edited
  }),

  actions: {
    async fetchOwnerProfile(): Promise<StoreVoidSuccess | StoreError> {
      try {
        this.isLoading = true // Set loading state
        const res = await api.get<GetMyProfileResponse>('/profiles/me')
        const fetched = OwnerProfileSchema.parse(res.data.profile)
        this.profile = fetched // Update local state
        return storeSuccess()
      } catch (error: any) {
        this.profile = null // Reset profile on error
        console.log('Error fetching profile:', error)
        return storeError(error, 'Failed to fetch profile')
      } finally {
        this.isLoading = false // Reset loading state
      }
    },

    // Update the current user's social profile
    async updateOwnerProfile(profileData: EditProfileForm): Promise<StoreVoidSuccess | StoreError> {
      try {
        const update = ProfileFormToPayloadTransform.parse(profileData)

        console.log('Updating profile with data:', update)
        this.isLoading = true // Set loading state
        const res = await api.patch<UpdateProfileResponse>('/profiles/me', update)
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

    async fetchDatingPrefs(): Promise<StoreVoidSuccess | StoreError> {
      try {
        this.isLoading = true // Set loading state
        const res = await api.get<GetDatingPreferenceseResponse>('/profiles/datingprefs')
        const fetched = DatingPreferencesDTOSchema.parse(res.data.prefs)
        this.datingPrefs = fetched // Update local state
        return storeSuccess()
      } catch (error: any) {
        this.datingPrefs = null // Reset profile on error
        console.log('Error fetching datingPrefs:', error)
        return storeError(error, 'Failed to fetch datingPrefs')
      } finally {
        this.isLoading = false // Reset loading state
      }
    },

    async persistDatingPrefs(): Promise<StoreVoidSuccess | StoreError> {
      try {
        // console.log('Updating datingPrefs with data:', update)
        this.isLoading = true // Set loading state
        const res = await api.patch<UpdateDatingPreferencesResponse>('/profiles/datingprefs', this.datingPrefs)
        const updated = DatingPreferencesDTOSchema.parse(res.data.prefs)
        this.datingPrefs = updated
        return storeSuccess()
      } catch (error: any) {
        return storeError(error, 'Failed to update profile')
      } finally {
        this.isLoading = false // Reset loading state
      }
    },



    open() {
      this.fieldEditModal = true
    },

    close() {
      this.fieldEditModal = false
    }
  },
})
