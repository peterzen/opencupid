<template>
  <div class="row justify-content-center">

    <ConnectionTypeSelector :profileActive="profile.isActive"
                            :datingActive="datingProfile.isActive"
                            :activeTab="activeTab"
                            @update:selectTab="activeTab = $event"
                            @update:profileActive="val => profile.isActive = val"
                            @update:datingActive="val => datingProfile.isActive = val" />


    <div class="tab-content p-3 border border-top-0">
      <div v-if="activeTab === 'friend'"
           class="tab-pane active">
        <div class="d-flex align-items-center mb-3">
          <span class="me-2">Profile Active</span>
        </div>
        <fieldset :disabled="!profile.isActive">
          <!-- Profile form fields here -->
        </fieldset>
      </div>
      <div v-if="activeTab === 'dating'"
           class="tab-pane active">
        <div class="d-flex align-items-center mb-3">
          <span class="me-2">Dating Profile Active</span>
        </div>
        <fieldset :disabled="!datingProfile.isActive">
          <!-- Dating profile form fields here -->
        </fieldset>
      </div>
    </div>

    <form @submit.prevent="submitForm">
      <div v-if="error"
           class="alert alert-danger mt-3">
        {{ error }}
      </div>

      <div class="d-grid gap-2 mt-3">
        <button type="submit"
                class="btn btn-primary"
                :disabled="isLoading">
          <span v-if="isLoading">Working...</span>
          <span v-else>Save</span></button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Profile, DatingProfile } from '@zod/generated'
import { useProfileStore } from '@/store/profileStore';

import ConnectionTypeSelector from '@/components/ConnectionTypeSelector.vue';

export default defineComponent({
  name: 'Onboarding',
  components: {
    ConnectionTypeSelector,
  },

  data() {
    return {
      profile: {} as Profile,
      datingProfile: {} as DatingProfile,
      activeTab: 'friend',
      error: '',
      isLoading: false,
    };
  },

  computed: {
    profileStore() {
      return useProfileStore()
    },
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
    const { profile, datingProfile } = await this.profileStore.getUserProfiles()
    this.profile = profile;
    this.datingProfile = datingProfile;
    console.log("mounted", this.profile, this.datingProfile)
  }
})
</script>