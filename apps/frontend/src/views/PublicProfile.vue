<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PublicProfileWithConversation } from '@zod/profile/profile.dto'
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
const profile = reactive<PublicProfileWithConversation>({} as PublicProfileWithConversation)
const error = ref<string | null>(null)

onMounted(async () => {
  const profileId = props.id
  const res = await profileStore.getPublicProfile(profileId)
  if (!res.success) {
    error.value = res.message
    return
  }
  Object.assign(profile, res.data)
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
    <LoadingComponent v-if="profileStore.isLoading" />
    <PublicProfileComponent
      v-else
      :profile
      :isLoading="profileStore.isLoading"
      @intent:conversation:open="handleOpenConversation"
    />
  </main>
</template>
