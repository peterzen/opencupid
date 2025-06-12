<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import type { ProfileImages } from '@zod/profile/profile.types'
import ImageTag from '@/components/profiles/image/ImageTag.vue'

// Props & Emits
const props = defineProps<{
  profile: ProfileImages
}>()

const image = ref<{ url: string | null }>()

watchEffect(() => {
  if (props.profile && props.profile.profileImages && props.profile.profileImages.length > 0) {
    image.value = props.profile.profileImages[0]
  }
})
</script>

<template>
  <ImageTag :image="image" v-if="image" className="img-fluid rounded" />
</template>
