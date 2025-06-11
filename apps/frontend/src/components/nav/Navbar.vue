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
import { useMessageStore } from '@/store/messageStore'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const hasUnreadMessages = computed(() => useMessageStore().hasUnreadMessages)

function handleLogoutClick() {
  authStore.logout() // Clear the authentication state
  useRouter().push({ name: 'Login' }) // Redirect to the login page
}
</script>

<template>
  <BNavbar variant="secondary" fixed="bottom" class="mt-4" v-if="isLoggedIn">
    <BNavbarNav class="d-flex justify-content-between w-100">
      <BNavItem to="/onboarding" active-class="active">
        <IconPen class="svg-icon" />
        <span class="d-none d-sm-inline">{{ $t('nav.onboarding') }}</span>
      </BNavItem>

      <BNavItem to="/me" active-class="active">
        <IconUser class="svg-icon" />
        <span class="d-none d-sm-inline">{{ $t('nav.profile') }}</span>
      </BNavItem>

      <BNavItem to="/browse" active-class="active">
        <IconSearch class="svg-icon" />
        <span class="d-none d-sm-inline">{{ $t('nav.browse') }}</span>
      </BNavItem>

      <BNavItem to="/inbox" active-class="active">
        <span class="icon-wrapper position-relative">
          <IconMessage class="svg-icon" />
          <FontAwesomeIcon
          v-if="hasUnreadMessages"
            icon="fa-solid fa-circle"
            class="text-danger position-absolute top-0 start-55 translate-middle"
            style="font-size: 0.75rem"
          />
        </span>
        <span class="d-none d-sm-inline">{{ $t('nav.inbox') }}</span>
      </BNavItem>

      <BNavItem to="/settings" active-class="active">
        <IconSetting2 class="svg-icon" />
        <span class="d-none d-sm-inline"> {{ $t('nav.settings') }}</span>
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
