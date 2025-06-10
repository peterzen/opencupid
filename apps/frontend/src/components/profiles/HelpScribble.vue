<template>
  <div class="help-scribble">
    <IconArrowLeft class="svg-icon" />
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { IconArrowLeft } from '@/components/icons/DoodleIcons'

defineProps<{
  text: string
}>()
</script>

<style scoped>
.help-scribble {
  font-family: 'Caveat', cursive;
  font-size: 2rem;
  color: var(--bs-warning);
}
</style>
