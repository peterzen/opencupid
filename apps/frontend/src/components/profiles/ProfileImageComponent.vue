<template>
  <img v-if="props.image.url"
       :src="props.image.url" />
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import type { PublicProfileImageSchema } from '@zod/media.schema'

const props = defineProps({
  image: {
    type: Object as PropType<PublicProfileImageSchema>,
    required: true,
  }
})
</script>
