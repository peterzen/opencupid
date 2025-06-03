<template>
  <Navbar />
  <RouterView />
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"
                 :key="$route.path" />
    </transition>
  </router-view> -->
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue';
import { applySystemTheme } from './lib/utils';
import { onMounted } from 'vue';

onMounted(() => {
  applySystemTheme()
});
</script>
