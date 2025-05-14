<template>
  <div class="register-container">
    <h1>Create Account</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Creating account...' : 'Register' }}
      </button>

      <div class="alt-action">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
      isLoading: false
    };
  },
  methods: {
    async handleRegister() {
      try {
        this.isLoading = true;
        this.error = '';

        const auth = useAuthStore();
        await auth.register( this.email, this.password);

        // On successful registration, navigate to login
        this.$router.push('/login');
      } catch (err: any) {
        this.error = err.message || 'Registration failed. Please try again.';
        console.error('Registration error:', err);
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
