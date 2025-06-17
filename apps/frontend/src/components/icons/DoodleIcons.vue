<script setup lang="ts">
import { shallowRef, watchEffect, markRaw } from 'vue'
import { loadIcon, type DoodleIconName } from '@/icons/doodleIcons'

const props = defineProps<{
  name: DoodleIconName
  class?: string
}>()

const Component = shallowRef<any>(null)


watchEffect(async () => {
  const mod = await loadIcon(props.name) as any
  Component.value = markRaw(mod.default ?? mod)
})
</script>
<template>
  <component :is="Component" v-if="Component" :class="props.class" />
</template>