<script setup lang="ts">

import type { PublicProfile } from '@zod/profile/profile.dto'
import ProfileImage from '../image/ProfileImage.vue'
import DatingIcon from './DatingIcon.vue'

// Props & Emits
defineProps<{
  profile: PublicProfile
}>()

</script>

<template>
  <div class="card h-100 profile-card cursor-pointer">
    <div class="ratio ratio-1x1">
      <ProfileImage :profile="profile" />
    </div>
    <div class="card-body d-flex flex-column">
      <div class="card-title">{{ profile.publicName }}</div>
      <p>{{ profile.introSocial }}</p>
    </div>
    <div class="icons">
      <DatingIcon :profile />
    </div>
  </div>
</template>

<style scoped lang="scss">
.icons {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.card {
  &:hover {
    border-color: var(--bs-primary);
  }
}

.card-body {
  background-color: var(--bs-tertiary);
}
</style>
