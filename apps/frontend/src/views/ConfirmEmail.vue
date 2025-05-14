<template>
  aaa
  <div class="container mt-5">
    <h1 v-if="message">{{ message }}</h1>
    <h1 v-if="error" class="text-danger">{{ error }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store';

export default defineComponent({
  name: 'ConfirmEmail',
  data() {
    return {
      message: '',
      error: '',
    };
  },
  async mounted() {
    const route = useRoute();
    const authStore = useAuthStore();

    // Get the token from the query parameters
    const token = route.query.token as string;

    if (!token) {
      this.error = 'Invalid or missing token.';
      return;
    }

    try {
      // Call the confirmEmail method in the auth store
      await authStore.confirmEmail(token);
      this.message = 'Your email address has been confirmed! Welcome.';

          this.$router.push({ name: 'UserHome' });

    } catch (err: any) {
      console.error(err);
      this.error = err.response?.data?.message || 'Failed to confirm email.';
    }
  },
});
</script>

