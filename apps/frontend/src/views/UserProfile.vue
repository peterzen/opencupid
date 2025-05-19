<template>
  <h2>Profile</h2>

  <LoadingComponent v-if="isLoading" />

  <div class="col-md-6 offset-md-3">
    <FormKit type="form"
             @submit="submitProfile"
             :actions="false">
      <div class="mb-3">

        <FormKit type="text"
                 name="publicName"
                 label="Public Name"
                 id="publicName"
                 v-model="profile.publicName"
                 validation="required" />
      </div>

      <div class="mb-3">
        <FormKit type="textarea"
                 name="intro"
                 label="Introduction"
                 id="intro"
                 v-model="profile.intro" />
      </div>

      <div class="mb-3">
        <FormKit type="select"
                 name="country"
                 label="Country"
                 id="country"
                 v-model="profile.country"
                 :options="countrySelectOptions"
                 validation="required" />
      </div>

      <div class="mb-3">
        <FormKit type="text"
                 name="city"
                 label="City"
                 id="city"
                 v-model="profile.city" />
      </div>



      <div class="mb-3">
        <FormKit type="date"
                 name="birthday"
                 label="Birth Date"
                 id="birthDate"
                 v-model="birthdayFormatted"
                 :max="maxDate"
                 validation="required" />
      </div>

      <button type="submit"
              class="btn btn-primary">Save</button>


    </FormKit>

  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import { toast } from 'vue3-toastify'
import type { Profile, ProfileImage } from '@zod/generated'

import LoadingComponent from '@/components/LoadingComponent.vue'
import { getCountryOptions } from '@/lib/countries'


export default defineComponent({
  name: 'UserProfile',
  components: {
    LoadingComponent,
  },
  data() {
    return {
      profile: {} as Profile,
      profileImage: {} as ProfileImage,
      isLoading: false,
      error: '',
    }
  },

  computed: {
    maxBirthYear(): number {
      return new Date().getFullYear() - 18
    },

    profileStore() {
      return useProfileStore()
    },

    countrySelectOptions() {
      return getCountryOptions()
    },

    // for the <FormKit type="date"> value (YYYY-MM-DD)
    birthdayFormatted: {
      get(): string {
        const b = this.profile.birthday
        // if it's already a Date, use toISOString; if it's a string, assume it's ISO
        if (!b) return ''
        const iso = b instanceof Date
          ? b.toISOString()
          : (typeof b === 'string' ? b : '').toString()
        return iso.split('T')[0]
      },
      set(value: string) {
        this.profile.birthday = value ? new Date(value) : null
      }
    },

    // max selectable = today minus 18 years
    maxDate(): string {
      const d = new Date()
      d.setFullYear(d.getFullYear() - 18)
      return d.toISOString().split('T')[0]
    },
  },

  methods: {
    async submitProfile(formData: Record<string, any>) {
      console.log('submitProfile', this.profile)
      try {
        await this.profileStore.updateProfile(this.profile)
        toast.success('Profile updated successfully!')
      } catch (error) {
        console.error('Failed to update profile:', error)
        this.error = 'Failed to update profile. Please try again.'
      }
    }
  },

  async mounted() {
    const userProfile = await this.profileStore.getUserProfile()
    if (userProfile !== null) {
      this.profile = userProfile || {} as Profile
    }
  }


})
</script>
