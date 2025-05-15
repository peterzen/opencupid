<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div v-if="isLinkSent"
           class="col-md-6">
        <h2>Check your email</h2>
        <p>We have sent you a login link. Please check your inbox.</p>
        <p>If you don't see it, please check your spam folder.</p>
      </div>

      <div v-else
           class="col-md-6">
        <h2>Welcome!</h2>
        <form @submit.prevent="handleSendLoginLink">
          <div class="mb-3">
            <label for="email"
                   class="form-label">Please enter your email address to continue</label>
            <input v-model="email"
                   id="email"
                   type="text"
                   class="form-control form-control-lg"
                   required />
          </div>

          <button type="submit"
                  class="btn btn-primary w-100 btn-lg">Continue</button>
          <div v-if="error"
               class="mt-3 alert alert-danger">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: '',
      error: '' as string,
      token: '' as string,
      user: null as any,
      isLoading: false,
      isLinkSent: false,
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async handleSendLoginLink() {

      try {
        this.isLoading = true;
        this.error = '';

        const auth = useAuthStore();
        const res = await auth.sendLoginLink(this.email);

        if (res.success) {
          this.isLinkSent = true;
        } else {
          this.error = 'An unknown error occurred.';
        }
      } catch (err: any) {
        this.error = err || 'An unexpected error occurred.';
        console.error('Login error:', err);
      } finally {
        this.isLoading = false;
      }

    },
  },
})
</script>
