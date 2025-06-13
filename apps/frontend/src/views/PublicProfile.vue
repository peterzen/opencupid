<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PublicProfile } from '@zod/profile/profile.dto'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'

const router = useRouter()
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

const handleOpenConversation = (conversationId: string) => {
  router.push({
    name: 'Messaging',
    params: { conversationId },
  })
}
</script>

<template>
  <main class="container">
    <LoadingComponent v-if="isLoading" />
    <PublicProfileComponent
      :profile
      :isLoading
      @intent:conversation:open="handleOpenConversation"
    />
  </main>
</template>
