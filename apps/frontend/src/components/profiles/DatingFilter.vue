<script setup lang="ts">

import { PublicProfile } from '@zod/profile.schema';

// Props & Emits
const props = defineProps<{
  profile: PublicProfile
}>()


</script>


<template>
  <slot v-if="profile.isDatingActive" />
</template>
