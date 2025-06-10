<template>
  <div>
    <h3>Please fill in your profile</h3>
    <button class="btn btn-primary" @click="router.push({ name: 'Onboarding' })">
      Create Profile
    </button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
</script>
