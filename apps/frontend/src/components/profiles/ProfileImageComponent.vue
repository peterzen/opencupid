<template>
  <div class="profile-image">
    <div class="ratio ratio-1x1">
      <img v-if="props.image"
           :src="props.image.url!"
           class="rounded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import type { OwnerProfileImage, PublicProfileImage } from '@zod/media.schema'

const props = defineProps({
  image: {
    type: Object as PropType<PublicProfileImage | OwnerProfileImage | undefined>,
    required: true,
  }
})
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>