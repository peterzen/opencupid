<template>
  <div class="register-container">
    <h1>Reset password</h1>

     <div v-if="tokenError"
           class="error-message">
        {{ tokenError }}
      </div>

    <form v-else @submit.prevent="handleResetPassword"
          class="reset-password-form">

      <div class="form-group">
        <label for="password">New password</label>
        <input type="password"
               id="password"
               v-model="password"
               required />
      </div>

      <div v-if="error"
           class="error-message">
        {{ error }}
      </div>

      <button type="submit"
              :disabled="isLoading">
        {{ isLoading ? 'Setting password...' : 'Set new password' }}
      </button>

    </form>
      <div class="alt-action">
        <router-link to="/login">Back to login</router-link>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../store';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ResetPassword',
  data() {
    return {
      token: '',
      password: '',
      error: '',
      tokenError: '',
      isLoading: false
    };
  },
  async mounted() {
    const route = useRoute();
    const authStore = useAuthStore();

    // Get the token from the query parameters
    this.token = route.query.token as string;

    if (!this.token) {
      this.tokenError = 'Invalid or missing token.';
      return;
    }
  },
  methods: {
    async handleResetPassword() {
      try {
        this.isLoading = true;
        this.error = '';

        const auth = useAuthStore()
        const res = await auth.resetPassword(this.token, this.password)

        if (res.success === true) {
          // On successful registration, navigate to login
          this.$router.push({
            name: 'UserHome',
            // TODO
            // message should not be sent in query params
            // use a store or something
            query: { message: 'Your email has been changed.' },
          });
        } else {
          this.error = 'Reset password did not work';
        }

      } catch (err: any) {
        this.error = err.message || 'Reset password did not work. Please try again.';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.error-message {
  color: red;
  margin: 1rem 0;
}

button {
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
}

.alt-action {
  margin-top: 1rem;
  text-align: center;
}
</style>
