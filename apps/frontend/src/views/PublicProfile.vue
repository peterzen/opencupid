<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import type { PublicProfile } from '@zod/profile.schema'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'

const profileStore = useProfileStore()

// Props
const props = defineProps<{
  id: string
}>()

// Local state
const isLoading = ref(false)
const profile = reactive<PublicProfile>({} as PublicProfile)

onMounted(async () => {
  isLoading.value = true
  const profileId = props.id
  const fetched = await profileStore.getPublicProfile(profileId)
  Object.assign(profile, fetched)
  isLoading.value = false
})
</script>

<template>
  <div class="container mb-5 mt-3">
    <LoadingComponent v-if="isLoading" />
    <PublicProfileComponent :profile :isLoading />
  </div>
</template>
