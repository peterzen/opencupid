<template>
  <div class="row justify-content-center">

    <ConnectionTypeSelector v-model="lookingFor" />

    <form @submit.prevent="submitForm">
      <div v-if="error"
           class="alert alert-danger mt-3">
        {{ error }}
      </div>

      <div class="d-grid gap-2 mt-3">
        <button type="submit"
                class="btn btn-primary"
                :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Continue</span></button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Profile, User, ProfileImage, ConnectionTypeType } from '@zod/generated'
import { useProfileStore } from '@/store/profileStore';
import { useAuthStore } from '@/store/authStore';

import ConnectionTypeSelector from '@/components/ConnectionTypeSelector.vue';

export default defineComponent({
  name: 'Onboarding',
  components: {
    ConnectionTypeSelector,
  },

  data() {
    return {
      user: {} as User,
      profile: {} as Profile,
      profileImage: {} as ProfileImage,
      lookingFor: ['friend'] as ConnectionTypeType[],
      error: '',
      isLoading: false,
    };
  },

  watch: {
    lookingFor: {
      handler(newVal) {
        console.log('lookingFor changed:', newVal);
      },
      deep: true,
    },
  },

  computed: {
    profileStore() {
      return useProfileStore()
    },
    authStore() {
      return useAuthStore()
    }
  },

  methods: {


    async submitForm() {
      this.isLoading = true;
      this.error = '';
      // console.log("submitForm", this.user)
      // try {
      //   await this.authStore.updateUser(this.user)
      //   // this.$router.push('/dashboard');
      // } catch (err: any) {
      //   // Handle error
      //   this.error = err.message || 'An error occurred while updating the profile.';
      // } finally {
      //   this.isLoading = false;
      // }

      // try {
      //   await this.profileStore.initializeProfiles(this.lookingFor)
      //   // this.$router.push('/dashboard');
      // } catch (err: any) {
      //   // Handle error
      //   this.error = err.message || 'An error occurred while updating the profile.';
      // } finally {
      //   this.isLoading = false;
      // }
    }
  },

  async mounted() {
    const userProfile = await this.profileStore.getUserProfile()
    if (userProfile !== null) {
      this.profile = userProfile 
    }
  }
})
</script>