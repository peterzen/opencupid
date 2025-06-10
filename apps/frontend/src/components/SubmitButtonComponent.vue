<template>
  <div class="d-grid gap-2 mb-3">
    <button type="submit" class="btn btn-primary" :disabled="isLoading">
      <span v-if="isLoading">Working...</span>
      <span v-else>Save</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
