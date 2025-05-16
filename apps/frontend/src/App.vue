<template>
  <Navbar />
  <div class="container mt-5">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { applySystemTheme } from './lib/utils';

export default defineComponent({
   name: "App",
   components: { Navbar },
   mounted(){
      applySystemTheme()
   }
})
</script>
