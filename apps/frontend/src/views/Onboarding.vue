<template>
  <div class="row justify-content-center">

    <ConnectionTypeSelector :profileActive="profile.isActive === undefined ? false : profile.isActive"
                            :datingActive="datingProfile.isActive === undefined ? false : datingProfile.isActive"
                            :activeTab="activeTab"
                            @update:selectTab="activeTab = $event"
                            @update:profileActive="val => profile.isActive = val"
                            @update:datingActive="val => datingProfile.isActive = val" />


    <div class="tab-content p-3 border border-top-0">
      <div v-if="activeTab === 'dating'"
           class="tab-pane active">
        <div class="mt-4">
          <DatingProfileForm :isLoading="isLoading"
                             :modelValue="datingProfile"
                             @submit="saveDatingProfile" />
        </div>
      </div>
      <div v-if="activeTab === 'friend'"
           class="tab-pane active">
        <div class="mt-4">
          <ProfileForm :isLoading="isLoading"
                       v-model="profile"
                       @submit="saveProfile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Profile, DatingProfile } from '@zod/generated'
import { useProfileStore } from '@/store/profileStore';

import ConnectionTypeSelector from '@/components/ConnectionTypeSelector.vue';
import ProfileForm from '@/components/profiles/ProfileForm.vue';
import DatingProfileForm from '@/components/profiles/DatingProfileForm.vue';

export default defineComponent({
  name: 'Onboarding',
  components: {
    ConnectionTypeSelector,
    ProfileForm,
    DatingProfileForm,
  },

  data() {
    return {
      profile: {} as Profile,
      datingProfile: {} as DatingProfile,
      activeTab: 'dating',
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
    async saveDatingProfile(formData: DatingProfile) {
      this.isLoading = true;
      this.error = '';
      console.log("saveDatingProfile", formData)
      try {
        await this.profileStore.updateDatingProfile(formData)
        // this.$router.push('/dashboard');
      } catch (err: any) {
        // Handle error
        this.error = err.message || 'An error occurred while updating the profile.';
      } finally {
        this.isLoading = false;
      }
    },

    async saveProfile(formData: Profile) {
      this.isLoading = true;
      this.error = '';
      console.log("saveProfile", formData)
      try {
        await this.profileStore.updateProfile(formData)
        // this.$router.push('/dashboard');
      } catch (err: any) {
        // Handle error
        this.error = err.message || 'An error occurred while updating the profile.';
      } finally {
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    this.isLoading = true
    const { profile, datingProfile } = await this.profileStore.getUserProfiles()
    this.isLoading = false;
    this.profile = profile;
    this.datingProfile = datingProfile;
    console.log("mounted", this.profile, this.datingProfile)
  }
})
</script>