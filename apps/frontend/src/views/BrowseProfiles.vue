<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, onMounted, computed, ref } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import { type PublicProfile } from '@zod/profile/profile.dto'

import LoadingComponent from '@/components/LoadingComponent.vue'
import ProfileCardComponent from '@/components/profiles/public/ProfileCardComponent.vue'
import NoProfileInfoCTAComponent from '@/components/profiles/NoProfileInfoCTA.vue'
import InvitePeopleDialog from '@/components/profiles/public/InvitePeopleDialog.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

const router = useRouter()
const profileStore = useProfileStore()

// state management
const error = ref<string | null>('')
const showModal = ref(false)

const haveProfiles = computed(() => {
  return profileStore.profileList.length > 0
})

onMounted(async () => {
  const res = await profileStore.findProfiles()
  // access issue
  if (!res.success) {
    error.value = res.message
    showModal.value = true
    return
  }
})

const handleCardClick = (profile: PublicProfile) => {
  router.push({
    name: 'PublicProfile',
    params: {
      id: profile.id,
    },
  })
}
</script>

<template>
  <main class="container-fluid">
    <div>
      <div class="browse-profiles-view">
        <LoadingComponent v-if="profileStore.isLoading" />

        <!-- <ErrorComponent v-if="error" :error /> -->

        <div v-else class="container-fluid">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4" v-if="haveProfiles">
            <div v-for="profile in profileStore.profileList" :key="profile.id" class="col">
              <ProfileCardComponent :profile @click="handleCardClick(profile)" />
            </div>
          </div>
          <div v-else class="text-center">
            <InvitePeopleDialog />
          </div>
        </div>
      </div>
    </div>
    <BModal
      v-model="showModal"
      centered
      button-size="sm"
      :focus="false"
      :no-close-on-backdrop="true"
      :no-footer="true"
      :no-header="true"
      cancel-title="Nevermind"
      initial-animation
      title="Add a photo"
    >
      <NoProfileInfoCTAComponent v-if="error" />
    </BModal>
  </main>
</template>
