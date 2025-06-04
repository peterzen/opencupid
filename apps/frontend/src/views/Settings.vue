<script setup lang="ts">
import { IconSetting2 } from '@/components/icons/DoodleIcons';
import LoadingComponent from '@/components/LoadingComponent.vue';
import LogoutButton from '@/components/nav/LogoutButton.vue';
import { useAuthStore } from '@/store/authStore';
import { LoginUser } from '@zod/user.schema';
import { onMounted, reactive, ref } from 'vue';
const authStore = useAuthStore()

const user = reactive({} as LoginUser)
const isLoading = ref(true)

onMounted(async () => {

  isLoading.value = true;
  const { success, user: fetched, error } = await authStore.fetchUser()

  if (success) {
    Object.assign(user, fetched)
  } else {
    console.error('Failed to fetch user:', error)
  }
  isLoading.value = false;
});
</script>

<template>


  <div class="container pt-3">


    <h3 class="mb-4">
      <IconSetting2 class="svg-icon" />
      Settings
    </h3>

    <LoadingComponent v-if="isLoading" />

    <p v-if="user.email">Email: {{  user.email }}</p>
    <p v-if="user.phonenumber">Phone number: {{  user.phonenumber }}</p>

    <LogoutButton />

  </div>
</template>