<template>
  <div class="row justify-content-center">
    <h2>Onboarding</h2>
    <FormKit type="form"
             :actions="false"
             @submit="submitForm">

      <FormKit type="text"
               id="publicName"
               name="publicName"
               label="Public Name"
               help="This name will be visible to other users."
               v-model="profile.publicName"
               validation="required" />

      <FormKit type="select"
               name="country"
               label="I'm from..."
               id="country"
               v-model="profile.country"
               :options="countrySelectOptions"
               validation="required" />

      <ImageUpload v-model="profileImage"
                   :maxWidth="800"
                   :maxHeight="800"
                   :quality="80" />

      <button type="submit"
              class="btn btn-primary"
              :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Submit</span></button>
    </FormKit>
  </div>
</template>

<script lang="ts">
import ImageUpload from '@/components/ImageUpload.vue';
import { defineComponent } from 'vue';

import type { Profile, ProfileImage } from '@zod/generated'
import { useProfileStore } from '@/store/profileStore';
import { getCountryOptions } from '@/lib/countries';

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
    countrySelectOptions() {
      return getCountryOptions()
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