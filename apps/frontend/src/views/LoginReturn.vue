<template>
  <div class="container mt-5">
    <h2 v-if="message">{{ message }}</h2>
    <h3 v-if="error"
        class="text-danger">{{ error }}</h3>

    <p class="mt-3">
      <RouterLink to="/login">
        Back to login
      </RouterLink>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import { useLocalStore } from '@/store/localStore';

export default defineComponent({
  name: 'LoginReturn',
  data() {
    return {
      message: '',
      error: '',
    };
  },
  async mounted() {
    const route = useRoute();
    const authStore = useAuthStore();
    const localStore = useLocalStore()

    // Get the token from the query parameters
    const token = route.query.token as string;

    if (!token) {
      this.error = 'Invalid or missing token.';
      return;
    }

    try {
      const res = await authStore.login(token);
      console.log('res', res)
      if (res.success === true) {
        localStore.setFlashMessage('Your email has been successfully confirmed!', 'success')
        this.$router.push({ name: 'UserHome' })
      } else {
        // Handle different status flags
        if (res.status === 'missing_token') {
          this.error = 'Something went wrong, please doublecheck the link in the email.';
        }
        if (res.status === 'invalid_token') {
          this.error = 'Something went wrong, please doublecheck the link in the email.';
        }
      }

    } catch (err: any) {
      console.error(err);
      this.error = err.response?.data?.message || 'Failed to confirm email.';
    }
  },
});
</script>
