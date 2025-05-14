<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email"
                   class="form-label">email</label>
            <input v-model="email"
                   id="email"
                   type="text"
                   class="form-control"
                   required />
          </div>
          <div class="mb-3">
            <label for="password"
                   class="form-label">Password</label>
            <input v-model="password"
                   id="password"
                   type="password"
                   class="form-control"
                   required />
          </div>
          <button type="submit"
                  class="btn btn-primary w-100">Login</button>
          <div v-if="error"
               class="mt-3 alert alert-danger">{{ error }}</div>
        </form>
      </div>
      <div class="col-md-6">
        <p class="mt-3">Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '' as string,
      token: '' as string,
      user: null as any,
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async handleLogin() {
      const auth = useAuthStore()
      this.error = ''
      this.token = ''
      try {
        await auth.login(this.email, this.password)
        this.router.push({ name: 'UserHome' })
      } catch (err: any) {
        console.error(err)
        this.error = err.response?.data?.message || 'Invalid credentials'
      }
    },
  },
})
</script>

