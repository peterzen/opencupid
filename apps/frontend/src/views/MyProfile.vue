<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import type { PublicProfile } from '@zod/profile/profile.dto'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'

const profileStore = useProfileStore()

// Local state
const profile = reactive<PublicProfile>({} as PublicProfile)

onMounted(async () => {
  await profileStore.fetchUserProfile()
  Object.assign(profile, profileStore.profile)
})
</script>

<template>
  <main class="container">
    <LoadingComponent v-if="profileStore.isLoading" />
    <PublicProfileComponent :profile :isLoading="profileStore.isLoading" />
  </main>
</template>
