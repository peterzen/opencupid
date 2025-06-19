<script setup lang="ts">
import { reactive, onMounted, ref, provide, computed, toRef } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'
import { ownerToPublicProfile } from '@zod/profile/profile.transform'
import { type EditFieldProfileFormWithImages } from '@zod/profile/profile.form'
import IconDate from '@/assets/icons/app/cupid.svg'
import IconSocialize from '@/assets/icons/app/socialize.svg'
import IconPencil2 from '@/assets/icons/interface/pencil-2.svg'

import useEditFields from '@/components/profiles/composables/useEditFields'
import { useOnboardingWizard } from '@/components/profiles/onboarding/useProfileWizards'
import { useStepper } from '@vueuse/core'
import DatingSteps from '@/components/profiles/onboarding/DatingSteps.vue'
import { useRouter } from 'vue-router'
import ErrorOverlay from '@/components/ErrorOverlay.vue'
import { PublicProfile } from '@zod/profile/profile.dto'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()

const profileStore = useProfileStore()

const showModal = ref(false)
const error = ref('')
const formData: EditFieldProfileFormWithImages = reactive({} as EditFieldProfileFormWithImages)

const publicProfile = ref({} as PublicProfile)

const authStore = useAuthStore()

onMounted(async () => {
  await profileStore.fetchOwnerProfile()
  console.log('Profile fetched:', profileStore.profile)
  if (!profileStore.profile) {
    error.value = 'Something went wrong (owner profile)'
    return
  }
  Object.assign(formData, profileStore.profile)
  if (!profileStore.profile.isOnboarded) {
    router.push({ name: 'Onboarding' })
  }
  await fetchPublicProfile()
})

const fetchPublicProfile = async () => {
  if (!profileStore.profile) {
    error.value = 'Profile not found'
    return
  }
  const res = await profileStore.getPublicProfile(profileStore.profile.id)
  if (!res.success || !res.data) {
    error.value = 'Something went wrong (public profile)'
    return
  }
  console.log('Public profile fetched:', res.data)
  Object.assign(publicProfile.value, res.data)
}
// const publicProfile = computed(() => ownerToPublicProfile(profileStore.profile))

const isEditable = ref(false)

provide('isOwner', true)
provide('isEditable', isEditable)
provide('editableModel', formData)

const toggleSocial = () => {
  formData.isSocialActive = !formData.isSocialActive
}

const datingPopup = ref(false)
const toggleDating = async () => {
  formData.isDatingActive = !formData.isDatingActive
  if (formData.isDatingActive && !profileStore.profile?.birthday) {
    datingPopup.value = true
    profileStore.currentField = null
    profileStore.open()
    return
  }
  await profileStore.updateOwnerProfile(formData)
}

const handleOkClick = async () => {
  const res = await profileStore.updateOwnerProfile(formData)
  if (res.success) {
    await fetchPublicProfile()
    // profileStore.close()
  } else {
    console.error('Failed to fetch updated profile after edit.')
  }
}

const handleCancelClick = () => {
  console.log('Dating popup cancelled')
  profileStore.currentField = null
  datingPopup.value = false
  // this handles the case where the user cancels the dating popup
  // and the birthday is not set
  if (formData.isDatingActive && !profileStore.profile?.birthday) {
    formData.isDatingActive = false
  }
}

const handleStartEditing = async () => {
  isEditable.value = !isEditable.value
}

const handleFinishEditing = async () => {
  isEditable.value = !isEditable.value
}

const handleEditProfile = () => {
  router.push({ name: 'EditProfile' })
}
const isComplete = ref(false)

const { datingWizard } = useOnboardingWizard(formData)
const { current, isFirst, goToNext, goToPrevious, goTo, isCurrent } = useStepper(datingWizard)

// const saveProfile = async () => {
//   const res = await profileStore.createOwnerProfile(formData)
//   if (!res.success) {
//     console.error('Failed to save profile:', res.message)
//     error.value = res.message || 'Failed to save profile'
//     return
//   }
//   console.log('Profile saved:', formData)
// }

// const handleNext = async () => {
//   if (current.value) {
//     current.value.isCompleted = true
//     if (current.value.flags === 'stage_one_end') {
//       console.log('Stage completed:', current.value.state)
//       if (formData.isDatingActive) {
//         goToNext()
//       } else {
//         isComplete.value = true
//         goTo('confirm')
//         await saveProfile()
//       }
//     }
//     if (current.value.flags === 'stage_two_end') {
//       isComplete.value = true
//       goTo('confirm')
//       await saveProfile()
//       console.log('Stage completed:', current.value.state)
//     }
//     if (current.value.state) {
//       goToNext()
//     } else {
//       console.warn('Current step is not valid')
//     }
//   } else {
//     console.warn('No current step found')
//   }
// }

const update = (value: EditFieldProfileFormWithImages) => {}
</script>

<template>
  <main class="container">
    <!-- <LoadingComponent v-if="profileStore.isLoading" /> -->
    <ErrorOverlay v-if="error" :error />

    <div v-else class="d-flex flex-row justify-content-between align-items-center mb-2">
      <div class="d-flex">
        <div v-if="isEditable">
          <!-- <span
            class="btn-social-toggle px-4 py-1 rounded-4 me-2"
            @click="toggleSocial"
            :class="{ active: formData.isSocialActive }"
          >
            <IconSocialize class="svg-icon-lg" />
          </span> -->
          <span
            class="btn-dating-toggle px-4 py-1 rounded-4"
            @click="toggleDating"
            :class="{ active: formData.isDatingActive }"
          >
            <IconDate class="svg-icon-lg" />
          </span>
        </div>
      </div>
      <div>
        <BButton
          v-if="isEditable"
          pill
          class="btn btn-primary mt-1"
          size="sm"
          @click="handleFinishEditing"
          variant="success"
        >
          Done
        </BButton>
        <BButton
          v-else
          pill
          class="btn btn-primary mt-1"
          size="sm"
          @click="handleStartEditing"
          variant="primary"
        >
          <IconPencil2 class="svg-icon" />
          Edit profile
        </BButton>
      </div>
    </div>
    <PublicProfileComponent
      v-if="publicProfile"
      :isLoading="profileStore.isLoading"
      @intent:field:edit="showModal = true"
      :profile="publicProfile"
    />
    <BModal
      v-model="profileStore.fieldEditModal"
      title=""
      :backdrop="'static'"
      centered
      size="lg"
      button-size="sm"
      fullscreen="sm"
      :focus="false"
      :no-close-on-backdrop="true"
      :no-header="true"
      :ok-title="'OK'"
      :ok-class="'btn btn-primary px-5'"
      cancel-title="Nevermind"
      initial-animation
      body-class="d-flex flex-row align-items-center justify-content-center overflow-hidden"
      @ok="handleOkClick"
      @cancel="handleCancelClick"
      @close="profileStore.fieldEditModal = false"
      :keyboard="false"
    >
      <template #cancel="{ close }">
        <a href="#" @click="close" class="link-underline link-underline-opacity-0 me-4"
          >Nevermind</a
        >
      </template>
      <div id="field-edit-modal" class="w-100 py-5"></div>
    </BModal>
    <Teleport to="#field-edit-modal" v-if="datingPopup">
      <DatingWizard v-model="formData" @update:modelValue="update"></DatingWizard>
      <!-- <div>
        <DatingSteps v-model="formData" :isCurrent />
        <fieldset v-if="isCurrent('confirm')">Cool!</fieldset>
      </div>
      <BButton
        @click="handleNext"
        :disabled="!current.state"
        v-if="!isComplete"
        variant="primary"
        size="lg"
        pill
        >Next</BButton
      > -->
    </Teleport>
  </main>
</template>
