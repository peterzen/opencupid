<script setup lang="ts">
import type { OwnerProfileImage, PublicProfileImage } from '@zod/profileimage.schema'
import { type PropType } from 'vue'

const props = defineProps({
  image: {
    type: Object as PropType<{url:string|null}>,
    required: true,
  },
  className: {
    type: String,
    default: 'img-fluid rounded',
  },
})

</script>

<template>
  <picture class="profile-image w-100 h-100 object-fit-cover"
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
         class="w-100 h-100 "
         :class="className"
         loading="lazy"
         onload="console.log('Loaded:', this.currentSrc)" />
  </picture>
</template>

