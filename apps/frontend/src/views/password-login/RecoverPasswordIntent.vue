<template>
  <div class="register-container">
    <h1>Reset password</h1>

    <div v-if="status === ''">
      <h3>Enter your email address to reset your password.</h3>
      <form @submit.prevent="handleRecoverPasswordIntent"
            class="recover-password-form">

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email"
                 id="email"
                 v-model="email"
                 required />
        </div>

          <button type="submit">Continue</button>
        <div v-if="error"
             class="error-message">
          {{ error }}
        </div>
      </form>
    </div>

    <div v-if="status === 'sent'"
         class="alert alert-success">
      {{ status }}
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../store';

export default defineComponent({
  name: 'RecoverPasswordIntent',
  data() {
    return {
      email: '',
      error: '',
      status: '',
      isLoading: false
    };
  },
  methods: {
    async handleRecoverPasswordIntent() {
      try {
        this.isLoading = true;
        this.error = '';

        const auth = useAuthStore()
        const res = await auth.sendPasswordRecoveryEmail(this.email)
        console.log('Password recovery email send:', res)

        this.status = 'sent'
      } catch (err: any) {
        this.error = err.message || 'Password recovery problem. Please try again.';
        console.error('Password recovery problem:', err);
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
