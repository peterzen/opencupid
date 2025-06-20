<template>
  <main class="container">
    <h2>Home</h2>
  </main>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/store/profileStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const profileStore = useProfileStore()
const router = useRouter()
const error = ref<string>('')

onMounted(async () => {
  await profileStore.fetchOwnerProfile()
  console.log('Profile fetched:', profileStore.profile)
  if (!profileStore.profile) {
    error.value = 'Something went wrong (owner profile)'
    return
  }
  if (!profileStore.profile.isOnboarded) {
    router.push({ name: 'Onboarding' })
    return
  }
})
</script>
