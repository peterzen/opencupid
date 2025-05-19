<template>
  <div class="row justify-content-center">
    <h2>Onboarding</h2>

    <form @submit.prevent="submitForm"
          class="col-12 col-md-6">
      <div class="form-group">
        <label for="publicName">Public Name</label>
        <input type="text"
               id="publicName"
               v-model="profile.publicName"
               class="form-control"
               required />
        <div class="form-group">

          <ImageUpload v-model="profileImage"
                       :maxWidth="800"
                       :maxHeight="800"
                       :quality="80" />
        </div>
      </div>
      <button type="submit"
              class="btn btn-primary"
              :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Submit</span></button>
    </form>
  </div>
</template>

<script lang="ts">
import ImageUpload from '@/components/ImageUpload.vue';
import { defineComponent } from 'vue';

import type { Profile, ProfileImage } from '@zod/generated'
import { useProfileStore } from '@/store/profileStore';

export default defineComponent({
  name: 'Onboarding',
  components: {
    ImageUpload,
  },

  data() {
    return {
      profile: {} as Profile,
      profileImage: {} as ProfileImage,
      error: '',
      isLoading: false,
    };
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
    async submitForm() {
      this.isLoading = true;
      this.error = '';

      try {
        await this.profileStore.updateProfile(this.profile)
        // Handle success, e.g., navigate to another page or show a success message
        // this.$router.push('/dashboard');
      } catch (err: any) {
        // Handle error
        this.error = err.message || 'An error occurred while updating the profile.';
      } finally {
        this.isLoading = false;
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