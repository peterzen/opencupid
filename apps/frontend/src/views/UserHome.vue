<template>
  <h2>Home</h2>
  <LogoutButton />
</template>


<script  lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';

import LogoutButton from '@/components/LogoutButton.vue'

export default defineComponent({
  name: 'UserHome',

  components: {
    LogoutButton
  },
  
  async mounted(){
    const route = useRoute();
    const message = route.query.message as string;

    if (message) {
      toast.success(message);
    }
  }
});
</script>

