<template>
  <div class="loading-spinner">
    <div class="text-center">
      <div class="spinner-border"
           role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingComponent',
})
</script>
