<script lang="ts" setup>
import IconHeart from '@/assets/icons/interface/heart.svg'
import IconCross from '@/assets/icons/interface/cross.svg'

import { type PublicProfileWithContext } from '@zod/profile/profile.dto'

import InteractionButtons from './InteractionButtons.vue'

const props = defineProps<{
  profile: PublicProfileWithContext
}>()

defineEmits<{
  (e: 'intent:like'): void
  (e: 'intent:pass'): void
}>()
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-2">
    <InteractionButtons @pass="$emit('intent:pass')" @like="$emit('intent:like')" />
  </div>
</template>
