<script setup lang="ts">
import { BContainer, BRow } from 'bootstrap-vue-next'

const props = withDefaults(
  defineProps<{
    howMany: number
    loading?: boolean
  }>(),
  {
    howMany: 6,
  }
)
</script>

<template>
  <BContainer>
    <BRow cols="1" cols-sm="2">
      <BCol v-for="n in howMany" :key="n" class="col">
        <BPlaceholderCard
          no-footer
          no-button
          no-header
          size="sm"
          :animation="loading ? 'glow' : undefined"
        />
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.card {
  opacity: 0.2;
}
:deep(.card img) {
  height: 12rem;
}
</style>
