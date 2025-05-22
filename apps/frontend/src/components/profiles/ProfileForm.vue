<template>
  <div class="col-md-8 offset-md-2">

    <FormKit type="form"
             @submit="submitProfile"
             :actions="false">

      <div class="mb-3">
        <FormKit type="text"
                 name="publicName"
                 label="My name is..."
                 id="publicName"
                 v-model="profile.publicName"
                 :floating-label="true"
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required" />
      </div>

      <div class="mb-3">
        <Multiselect v-model="profile.country"
                     :options="countrySelectOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     open-direction="bottom"
                     :required="true"
                     placeholder="I'm from..."
                     label="label"
                     track-by="label" />
      </div>

      <div class="mb-3">
        <FormKit type="text"
                 name="city"
                 label="My city..."
                 id="city" 
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required" 
                 v-model="profile.city" />
      </div>

      <div class="mb-3">
        <FormKit type="textarea"
                 name="intro"
                 label="A few words about me..."
                 id="intro"
                 auto-height
                 max-auto-height="20"
                 rows="3"
                 :floating-label="true"
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required" 
                 v-model="profile.intro" />
      </div>

        <div class="d-grid gap-2 mb-3">
        <button type="submit"
                class="btn btn-primary"
                :disabled="isLoading">
          <span v-if="isLoading">Working...</span>
          <span v-else>Save</span></button>
      </div>

    </FormKit>

  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import { toast } from 'vue3-toastify'
import type { Profile, ProfileImage } from '@zod/generated'

import LoadingComponent from '@/components/LoadingComponent.vue'
import { getCountryOptions } from '@/lib/countries'
import Multiselect from 'vue-multiselect'


export default defineComponent({
  name: 'ProfileForm',
  components: {
    Multiselect,
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
  props: {
    modelValue: {
      type: Object as PropType<Profile>,
      required: true,
    },
  },
  setup(props: { modelValue: Profile }) {
    // Type-safe access
  },
  emits: ['update:modelValue'],

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

    // // for the <FormKit type="date"> value (YYYY-MM-DD)
    // birthdayFormatted: {
    //   get(): string {
    //     const b = this.profile.birthday
    //     // if it's already a Date, use toISOString; if it's a string, assume it's ISO
    //     if (!b) return ''
    //     const iso = b instanceof Date
    //       ? b.toISOString()
    //       : (typeof b === 'string' ? b : '').toString()
    //     return iso.split('T')[0]
    //   },
    //   set(value: string) {
    //     this.profile.birthday = value ? new Date(value) : null
    //   }
    // },

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
})
</script>
