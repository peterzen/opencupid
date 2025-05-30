<script setup lang="ts">
import type { OwnerProfileImage, PublicProfileImage } from '@zod/profileimage.schema';
import { type PropType } from 'vue'

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


<template>
  <div class="profile-image"
       v-if="props.image">
    <div class="ratio ratio-1x1">
      <img :alt="props.image.altText"
           :src="props.image.url!"
           class="rounded" />
    </div>
  </div>
</template>
