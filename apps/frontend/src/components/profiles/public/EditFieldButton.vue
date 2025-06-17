<script setup lang="ts">
import DoodleIcons from '@/components/icons/DoodleIcons.vue'

defineProps<{
  isEditable: boolean,
  fieldName: string
}>()

defineEmits<{
  (e: 'intent:field:edit'): void
}>()
</script>

<template>
  <BButton :pill="true" variant="primary" @click="handleEditIntent">
    <DoodleIcons name="IconPencil2" class="svg-icon-lg p-0" />
  </BButton>
</template>
