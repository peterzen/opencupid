<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import type { PublicProfile } from '@zod/profile/profile.dto'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'

const profileStore = useProfileStore()

// Local state
const isLoading = ref(false)
const profile = reactive<PublicProfile>({} as PublicProfile)

onMounted(async () => {
  isLoading.value = true
  const fetched = await profileStore.getUserProfile()
  Object.assign(profile, fetched)
  isLoading.value = false
})
</script>

<template>
  <main class="container">
    <LoadingComponent v-if="isLoading" />
    <PublicProfileComponent :profile :isLoading />
  </main>
</template>
