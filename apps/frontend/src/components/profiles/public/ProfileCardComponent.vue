<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type { PublicProfile } from '@zod/dto/profile.schema'
import ProfileImage from '@/components/profiles/image/ProfileImage.vue'

// Props & Emits
const props = defineProps<{
  profile: PublicProfile
}>()

const emit = defineEmits<{
  // (e: 'select:profile', value: PublicProfile): void
  // (e: 'submit', value: OwnerProfile): void
}>()


</script>

<template>
  <div class="card h-100 profile-card">
    <div class="ratio ratio-1x1">
      <ProfileImage :profile="profile" />
    </div>
    <div class="card-body d-flex flex-column">
      <div class="card-title">{{ profile.publicName }}</div>
      <p>{{ profile.introSocial }}</p>
    </div>
    <div class="icons">
      <DatingFilter :profile="profile">
        <span class="text-danger">
          <FontAwesomeIcon icon="fa-solid fa-heart" />
        </span>
      </DatingFilter>
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
  cursor: pointer;

  &:hover {
    border-color: var(--bs-primary);
  }
}

.card-body {
  background-color: var(--bs-tertiary);
}
</style>
