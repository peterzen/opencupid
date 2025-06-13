<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, onMounted, computed } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import { type PublicProfile } from '@zod/profile/profile.dto'

import LoadingComponent from '@/components/LoadingComponent.vue'
import ProfileCardComponent from '@/components/profiles/public/ProfileCardComponent.vue'
import NoProfileInfoCTAComponent from '@/components/profiles/NoProfileInfoCTAComponent.vue'

const router = useRouter()
const profileStore = useProfileStore()

// Define your component logic here
const state = reactive({
  profiles: [] as PublicProfile[],
  isLoading: false,
  error: null as string | null,
  showModal: false,
})

onMounted(async () => {
  state.isLoading = true
  try {
    // Fetch profiles from the store
    const profiles = await profileStore.findProfiles()
    if (profiles != null) state.profiles = profiles
  } catch (error) {
    state.error = 'Failed to fetch profiles'
    state.showModal = true
    // console.error('Error fetching profiles:', error);
  } finally {
    state.isLoading = false
  }
})

const handleCardClick = (profile: PublicProfile) => {
  console.log('Card clicked:', profile)
  router.push({ name: 'PublicProfile', params: { id: profile.id } })
}
</script>

<template>
  <main class="container-fluid">
    <div>
      <div class="browse-profiles-view">
        <LoadingComponent v-if="state.isLoading" />

        <div class="container-fluid">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            <div v-for="profile in state.profiles" :key="profile.id" class="col">
              <ProfileCardComponent :profile="profile" @click="handleCardClick(profile)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <BModal
      v-model="state.showModal"
      centered
      button-size="sm"
      :focus="false"
      :no-close-on-backdrop="true"
      :no-footer="true"
      :no-header="true"
      cancel-title="Nevermind"
      initial-animation
      title="Add a photo"
    >
      <NoProfileInfoCTAComponent v-if="state.error" />
    </BModal>
  </main>
</template>
