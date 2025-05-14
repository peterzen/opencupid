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
      const res = await authStore.confirmEmail(token);

       if (res.success) {
          this.$router.push({ name: 'UserHome', 
            query: { message: 'Your email has been successfully confirmed!' },

          });
        } else {
          // Handle different status flags
          if (res.status === 'invalid_token') {
            this.error = 'Cannot confirm your email address, please send us a message.';
          }
        }

    } catch (err: any) {
      console.error(err);
      this.error = err.response?.data?.message || 'Failed to confirm email.';
    }
  },
});
</script>

