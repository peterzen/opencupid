<script setup lang="ts">
import { getLanguageList } from '@/lib/languages'
import { type PublicProfile, type ProfileSummary } from '@zod/profile/profile.dto'
import { computed } from 'vue'

const props = defineProps<{
  profile: PublicProfile
}>()

const languages = computed(() => {
  return getLanguageList(props.profile.languages)
})
</script>

<template>
  <ul
    class="tags list-unstyled mb-0 d-flex flex-wrap align-items-center user-select-none"
    v-if="languages && languages.length"
  >
    <li v-for="lang in languages" :key="lang.value" class="me-2">
      <BBadge variant="secondary">{{ lang.label }}</BBadge>
    </li>
  </ul>
</template>
