<template>
  <button @click="logout" class="btn">Logout</button>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LogoutButton',
  setup() {
    const auth = useAuthStore();
    const router = useRouter();

    const logout = () => {
      auth.logout(); // Clear the authentication state
      router.push({ name: 'Login' }); // Redirect to the login page
    };

    return { logout };
  },
});
</script>