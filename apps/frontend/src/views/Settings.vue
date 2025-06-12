<script setup lang="ts">
import { IconSetting2 } from '@/components/icons/DoodleIcons'
import LoadingComponent from '@/components/LoadingComponent.vue'
import LogoutButton from '@/components/nav/LogoutButton.vue'
import { useAuthStore } from '@/store/authStore'
import { type LoginUser } from '@zod/user/user.types'
import { computed, onMounted, reactive, ref } from 'vue'
import { useColorMode } from 'bootstrap-vue-next'
import { useLocalStore } from '@/store/localStore'
import { useMessageStore } from '@/store/messageStore'

const authStore = useAuthStore()

const user = reactive({} as LoginUser)
const isLoading = ref(true)

const mode = useColorMode({
  selector: 'html',
  attribute: 'data-bs-theme',
  storageKey: 'theme',
  modes: {
    light: 'light',
    dark: 'dark',
  },
})
console.log('mode', mode.value)

const changeColor = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

onMounted(async () => {
  isLoading.value = true
  const { success, user: fetched, error } = await authStore.fetchUser()

  if (success) {
    Object.assign(user, fetched)
  } else {
    console.error('Failed to fetch user:', error)
  }
  isLoading.value = false
})

const wsConnected = computed(() => {
  return !!useMessageStore().socket
})
const messageStore = useMessageStore()
</script>

<template>
  <div class="container mt-4">
    <h3 class="mb-4">
      <IconSetting2 class="svg-icon" />
      Settings
    </h3>

    <LoadingComponent v-if="isLoading" />

    <div class="mb-3">
      <p v-if="user.email">Email: {{ user.email }}</p>
      <p v-if="user.phonenumber">Phone number: {{ user.phonenumber }}</p>
    </div>

    <div class="mb-3">
      <LogoutButton />
    </div>

    <div class="mb-3">
      <button class="btn btn-secondary" @click="changeColor">Toggle night or day</button>
    </div>

    <div class="mb-3">
      <PushPermissions />
    </div>

    <div class="mb-3">
      <h5>WS</h5>
      <BFormCheckbox v-model="messageStore.enableReconnect">Enable reconnect</BFormCheckbox>
      <BButton class="btn btn-secondary" :pressed="wsConnected" @click="messageStore.connectWebSocket(authStore.jwt)"
        >Connect</BButton
      >
      <BButton class="btn btn-secondary" @click="messageStore.disconnectWebSocket()"
        >Disconnect</BButton
      >
    </div>
  </div>
</template>
