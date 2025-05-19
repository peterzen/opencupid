<template>
  <h2>Profile</h2>

  <LoadingComponent v-if="isLoading" />

  <div class="row"
       v-else>
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="submitProfile(profile)">
        <div class="mb-3">
          <label for="publicName"
                 class="form-label">Public Name</label>
          <input type="text"
                 v-model="profile.publicName"
                 class="form-control"
                 id="publicName"
                 required />
        </div>

        <div class="mb-3">
          <label for="intro"
                 class="form-label">Introduction</label>
          <textarea v-model="profile.intro"
                    class="form-control"
                    id="intro"></textarea>
        </div>

        <div class="mb-3">
          <label for="city"
                 class="form-label">City</label>
          <input type="text"
                 v-model="profile.city"
                 class="form-control"
                 id="city" />
        </div>

        <div class="mb-3">
          <label for="city"
                 class="form-label">Country</label>
          <input type="text"
                 v-model="profile.country"
                 class="form-control"
                 id="city" />
        </div>


        <div class="mb-3">
          <label for="birthDate"
                 class="form-label">Birth Date</label>
          <input type="date"
                 v-model="profile.birthday"
                 class="form-control"
                 id="birthDate"
                 :max="'{{ maxBirthYear }}'" />
        </div>

        <button type="submit"
                class="btn btn-primary">Save</button>


      </form>

    </div>

  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import { toast } from 'vue3-toastify'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { ProfileSchema } from '@zod/generated'
import type { Profile } from '@zod/generated'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-Binary' },
  { value: 'other', label: 'Other' },
]

const relationshipOptions = [
  { value: 'single', label: 'Single' },
  { value: 'in_relationship', label: 'In a Relationship' },
  { value: 'married', label: 'Married' },
  { value: 'other', label: 'Other' },
]

export default defineComponent({
  name: 'UserProfile',
  components: {
    LoadingComponent,
  },

  data() {
    return {
      profile: {} as Profile,
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
    }
  },

  methods: {

    async submitProfile(formData: Record<string, any>) {
      try {
        await this.profileStore.updateProfile(formData)
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
