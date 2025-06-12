<script setup lang="ts">
import { type ProfileImages } from '@zod/profile/profile.types'
import ProfileImage from './ProfileImage.vue'

// Props & Emits
const props = defineProps<{
  profile: ProfileImages
}>()
</script>

<template>
  <span class="thumbnail d-inline-flex">
    <ProfileImage :profile="profile" />
    </span>
</template>

<style scoped>
.thumbnail {
  width: 40px;
  height: 40px;
}

:deep(img) {
  border-radius: 50% !important;
}
</style>