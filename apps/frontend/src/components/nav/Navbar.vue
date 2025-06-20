<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import IconSetting2 from '@/assets/icons/interface/setting-2.svg'
import IconMessage from '@/assets/icons/interface/message.svg'
import IconSearch from '@/assets/icons/interface/search.svg'
import IconUser from '@/assets/icons/interface/user.svg'

import { useAuthStore } from '@/store/authStore'

import { computed } from 'vue'
import { useMessageStore } from '@/store/messageStore'
import { useProfileStore } from '@/store/profileStore'

const authStore = useAuthStore()
const profilesStore = useProfileStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const hasUnreadMessages = computed(() => useMessageStore().hasUnreadMessages)

function handleLogoutClick() {
  authStore.logout() // Clear the authentication state
  useRouter().push({ name: 'Login' }) // Redirect to the login page
}

</script>

<template>
  <BNavbar variant="secondary" fixed="top" class="" v-if="isLoggedIn">
    <BNavbarNav class="d-flex justify-content-between w-100">

      <BNavItem to="/browse" active-class="active">
        <IconSearch class="svg-icon-lg" />
        <span class="d-none d-sm-inline label">{{ $t('nav.browse') }}</span>
      </BNavItem>

      <BNavItem to="/inbox" active-class="active">
        <span class="icon-wrapper position-relative">
          <IconMessage  class="svg-icon-lg" />
          <FontAwesomeIcon
          v-if="hasUnreadMessages"
            icon="fa-solid fa-circle"
            class="text-danger position-absolute top-0 start-55 translate-middle"
            style="font-size: 0.75rem"
          />
        </span>
        <span class="d-none d-sm-inline label">{{ $t('nav.inbox') }}</span>
      </BNavItem>

      <BNavItem to="/me" active-class="active">
        <IconUser class="svg-icon-lg" />
        <span class="d-none d-sm-inline label">{{ $t('nav.profile') }}</span>
      </BNavItem>

      <BNavItem to="/settings" active-class="active">
        <IconSetting2 class="svg-icon-lg" />
        <span class="d-none d-sm-inline label"> {{ $t('nav.settings') }}</span>
      </BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>

<style scoped>
.svg-icon {
  /* width: 1.5rem; */
  /* height: 1.5rem; */
  /* margin-right: 0.5rem; */
  /* padding: 0rem; */
}

:deep(.nav-link .label) {
  vertical-align: sub;
  margin-left: 0.25rem;
}
</style>
