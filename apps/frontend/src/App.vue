<script lang="ts" setup>
import Navbar from '@/components/nav/Navbar.vue'
import AppNotifier from '@/components/AppNotifier.vue'
</script>

<template>
  <Navbar />
  <RouterView />
  <AppNotifier />
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"
                 :key="$route.path" />
    </transition>
  </router-view> -->
</template>
