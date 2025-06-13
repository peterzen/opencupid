<script setup lang="ts">
import { PublicProfile } from '@zod/profile/profile.dto'

defineProps<{
  profile: PublicProfile
}>()
</script>

<template>
  <DatingFilter :profile>
    <span class="text-danger">
      <FontAwesomeIcon icon="fa-solid fa-heart" />
    </span>
  </DatingFilter>
</template>
