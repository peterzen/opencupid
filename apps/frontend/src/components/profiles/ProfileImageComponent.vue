<script setup lang="ts">
import type { OwnerProfileImage, PublicProfileImage } from '@zod/profileimage.schema';
import { type PropType } from 'vue'

const props = defineProps({
  image: {
    type: Object as PropType<PublicProfileImage | OwnerProfileImage | undefined>,
    required: true,
  },
  className: {
    type: String,
    default: 'img-fluid rounded',
  },
})
</script>


<template>
  <picture class="profile-image overflow-hidden"
           v-if="props.image">
    <!-- WebP responsive -->
    <source :srcset="`
        ${props.image.url}-thumb.webp 150w,
        ${props.image.url}-card.webp 480w,
        ${props.image.url}-full.webp 1280w
      `"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
            type="image/webp" />

    <!-- JPEG fallback -->
    <img :src="`${props.image.url}-original.jpg`"
         :alt="props.image.altText || ''"
         :class="className"
         loading="lazy" />
  </picture>


  <!-- <div class="profile-image"
       v-if="props.image">
    <div class="ratio ratio-1x1">
      <img :alt="props.image.altText"
           :src="props.image.url!"
           class="rounded" />
    </div>
  </div> -->
</template>
<style scoped>
/* img {
  object-fit: cover;
  filter: grayscale(100%) blur(5px);
  opacity: 0.25;
} */
</style>
