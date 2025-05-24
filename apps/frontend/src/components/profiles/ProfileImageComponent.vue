<template>
  <img v-if="props.image.url"
       :src="props.image.url" />
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import type { OwnerProfileImage, PublicProfileImage } from '@zod/media.schema'

const props = defineProps({
  image: {
    type: Object as PropType<PublicProfileImage | OwnerProfileImage>,
    required: true,
  }
})
</script>
