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
import IconSetting from '@/assets/icons/interface/setting.svg'
import ErrorOverlay from '@/components/ErrorOverlay.vue'
import DatingPreferencesForm from '@/components/profiles/browse/DatingPreferencesForm.vue'
import { useAgeFields } from '@/components/profiles/composables/useAgeFields'

const router = useRouter()
const profileStore = useProfileStore()

// state management
const error = ref<string | null>('')
const showModal = ref(false)
const showPrefs = ref(false)

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
  const pres = await profileStore.fetchDatingPrefs()
  const ppres = await profileStore.fetchOwnerProfile()
})

const handleCardClick = (profile: PublicProfile) => {
  router.push({
    name: 'PublicProfile',
    params: {
      id: profile.id,
    },
  })
}

const handlePrefsClick = () => {
  showModal.value = true
}

const updateDatingPrefs = async () => {
  await profileStore.persistDatingPrefs()
}
</script>

<template>
  <main class="container-fluid">
    <div>
      <div class="browse-profiles-view">
        <!-- <LoadingComponent v-if="profileStore.isLoading" /> -->
        <ErrorOverlay v-if="error" :error />

        <div v-else>
          <!-- <ErrorComponent v-if="error" :error /> -->
          <div
            v-if="profileStore.datingPrefs && profileStore.profile"
            class="d-flex justify-content-end align-items-center mb-3 w-100 bg-light"
          >
            <BButton variant="primary" @click="handlePrefsClick">
              <IconSetting class="svg-icon" />
            </BButton>

            <BModal
              v-model="showModal"
              centered
              button-size="sm"
              :focus="false"
              :no-close-on-backdrop="true"
              fullscreen="sm"
              :no-footer="false"
              :no-header="true"
              cancel-title="Nevermind"
              initial-animation
              :body-scrolling="false"
              title="Add a photo"
              @ok="updateDatingPrefs"
            >
              <DatingPreferencesForm
                v-model="profileStore.datingPrefs"
                :profile="profileStore.profile"
              />
            </BModal>
          </div>

          <div v-if="haveProfiles" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            <div v-for="profile in profileStore.profileList" :key="profile.id" class="col">
              <ProfileCardComponent :profile @click="handleCardClick(profile)" />
            </div>
          </div>
          <BModal
            v-else
            centered
            :no-footer="true"
            :no-header="true"
            initial-animation
            title="Help spread the word!"
          >
            <InvitePeopleDialog />
          </BModal>
        </div>
      </div>
    </div>
  </main>
</template>
