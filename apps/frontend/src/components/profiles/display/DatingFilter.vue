<script setup lang="ts">
import { type PublicProfileWithConversation } from '@zod/profile/profile.dto'

// Props & Emits
const props = defineProps<{
  profile: PublicProfileWithConversation
}>()
</script>

<template>
  <slot v-if="props.profile.isDatingActive" />
</template>
