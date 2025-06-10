<script setup lang="ts">
import { computed } from 'vue'

import type { ProfileImages } from '@zod/profile.schema'
import ImageTag from '@/components/profiles/image/ImageTag.vue'

// Props & Emits
const props = defineProps<{
  profile: ProfileImages
}>()

const profileImage = computed(() => {
  return props.profile.profileImages.length > 0 ? props.profile.profileImages[0] : undefined
})
</script>

<template>
  <ImageTag :image="profileImage" v-if="profileImage"
            className="img-fluid rounded" />
</template>