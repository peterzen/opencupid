<script lang="ts" setup>
import IconHeart from '@/assets/icons/interface/heart.svg'
import IconCross from '@/assets/icons/interface/cross.svg'

defineEmits<{
  (e: 'like'): void
  (e: 'pass'): void
}>()
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-2">
    <BButton variant="secondary" class="btn-icon-lg me-2" @click="$emit('pass')">
      <IconCross class="svg-icon-lg" />
    </BButton>

    <BButton  class="btn-icon-lg  btn-dating" @click="$emit('like')">
      <IconHeart class="svg-icon-lg" />
    </BButton>
  </div>
</template>
