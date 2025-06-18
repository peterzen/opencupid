<script setup lang="ts">
import ProfileImage from './ProfileImage.vue'

// Props & Emits
defineProps<{
  profile: {
    profileImages: { url: string | null }[]
  }
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
