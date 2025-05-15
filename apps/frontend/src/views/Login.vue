<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div v-if="showInstructions"
           class="col-md-6">
        <h2>Check your email</h2>
        <p>We have sent you a login link. Please check your inbox.</p>
        <p>If you don't see it, please check your spam folder.</p>
      </div>

      <div v-if="showForm"
           class="col-md-6">
          <div v-if="error"
               class="mt-3 alert alert-danger">{{ error }}</div>

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
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: '',
      token: '' as string,
      error: '' as string,
      showInstructions: false,
      showForm: false,
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },

  async mounted() {
    const route = useRoute();
    const authStore = useAuthStore();

    // Get the token from the query parameters
    const token = route.query.token as string || '';

    if (token !== '') {
      try {
        const res = await authStore.login(token);

        if (res.success === true) {
          this.$router.push({ name: 'UserHome' })
        } else {
          // Handle different status flags
          if (res.status === 'missing_token') {
            this.error = 'Something went wrong, maybe that link expired.  Please try again.';

          }
          if (res.status === 'invalid_token') {
            this.error = 'Something went wrong, maybe that link expired.  Please try again.';
          }
          this.showForm = true
        }

      } catch (err: any) {
        console.error(err);
        this.error = err.response?.data?.message || 'Failed to confirm email.';
      }
    } else {
      this.showForm = true;
    }
  },
  methods: {
    async handleSendLoginLink() {

      try {
        this.error = '';

        const auth = useAuthStore();
        const res = await auth.sendLoginLink(this.email);

        if (res.success) {
          this.showInstructions = true;
          this.showForm = false;
        } else {
          this.error = 'An unknown error occurred, please try again a bit later.';
        }
      } catch (err: any) {
        this.error = err || 'An unexpected error occurred.';
        console.error('Login error:', err);
      } finally {
      }

    },
  },
})
</script>
