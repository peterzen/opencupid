<script lang="ts" setup>
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'
import IconLogout from '@/assets/icons/interface/logout.svg'

const auth = useAuthStore()
const router = useRouter()

function handleClick() {
  auth.logout() // Clear the authentication state
  router.push({ name: 'Login' }) // Redirect to the login page
}
</script>

<template>
  <a @click="handleClick" href="#" class="btn btn-secondary btn-sm">
    <IconLogout class="svg-icon" />
    Logout</a
  >
</template>

