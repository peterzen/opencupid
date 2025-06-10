<template>
  <a @click="handleClick" href="#" class="btn btn-secondary">
    <IconLogout class="svg-icon" />
    Logout</a
  >
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'
import { IconLogout } from '@/components/icons/DoodleIcons'

const auth = useAuthStore()
const router = useRouter()

function handleClick() {
  auth.logout() // Clear the authentication state
  router.push({ name: 'Login' }) // Redirect to the login page
}
</script>
