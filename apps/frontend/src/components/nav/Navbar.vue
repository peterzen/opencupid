<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  IconMessage,
  IconPen,
  IconSearch,
  IconSetting2,
  IconUser,
} from '@/components/icons/DoodleIcons'

import { useAuthStore } from '@/store/authStore'

import { computed } from 'vue'

const authStore = useAuthStore()

const { t } = useI18n()
const router = useRouter()

const isLoggedIn = computed(() => authStore.isLoggedIn)

function handleLogoutClick() {
  authStore.logout() // Clear the authentication state
  router.push({ name: 'Login' }) // Redirect to the login page
}
</script>

<template>
  <BNavbar variant="secondary" fixed="bottom" class="mt-4" v-if="isLoggedIn">
    <BNavbarNav class="d-flex justify-content-between w-100">
      <BNavItem to="/onboarding" active-class="active">
        <IconPen class="svg-icon" />
        <span class="d-none d-sm-inline">{{ t('nav.onboarding') }}</span>
      </BNavItem>

      <BNavItem to="/me" active-class="active">
        <IconUser class="svg-icon" />
        <span class="d-none d-sm-inline">{{ t('nav.profile') }}</span>
      </BNavItem>

      <BNavItem to="/browse" active-class="active">
        <IconSearch class="svg-icon" />
        <span class="d-none d-sm-inline">{{ t('nav.browse') }}</span>
      </BNavItem>

      <BNavItem to="/inbox" active-class="active">
        <IconMessage class="svg-icon" />
        <span class="d-none d-sm-inline"> {{ t('nav.inbox') }}</span>
      </BNavItem>

      <BNavItem to="/settings" active-class="active">
        <IconSetting2 class="svg-icon" />
        <span class="d-none d-sm-inline"> {{ t('nav.settings') }}</span>
      </BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>

<style scoped>
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  padding: 0rem;
}
</style>
