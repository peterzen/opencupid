<script setup lang="ts">
import { IconArrowSingleLeft, IconMenu } from '@/components/icons/DoodleIcons'
import { type ProfileSummary } from '@zod/profile/profile.dto'
import ProfileThumbnail from '../profiles/image/ProfileThumbnail.vue';

defineProps<{
  recipient: ProfileSummary
}>()

defineEmits<{
  (e: 'modal:open'): void
  (e: 'deselect:convo'): void
}>()
</script>

<template>
  <div class="d-flex align-items-center justify-content-between p-2">
    <div class="back-button">
      <a class="btn btn-secondary-outline" @click="$emit('deselect:convo')">
        <IconArrowSingleLeft class="svg-icon fs-4" />
      </a>
    </div>

    <div class="d-flex flex-column align-items-center justify-content-center">
      <div class="thumbnail">
        <ProfileThumbnail :profile="recipient" />
      </div>
      <div class="">
        <div class="fs-6">{{ recipient.publicName }}</div>
      </div>
    </div>

    <div class="action-button">
      <IconMenu class="svg-icon fs-4" @click="$emit('modal:open')" />
    </div>
  </div>
</template>
