<script setup lang="ts">
import { reactive, onMounted, ref, provide, computed, toRef } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'
import { ownerToPublicProfile } from '@zod/profile/profile.transform'
import { type EditFieldProfileFormWithImages } from '@zod/profile/profile.form'
import IconDate from '@/assets/icons/app/cupid.svg'
import IconSocialize from '@/assets/icons/app/socialize.svg'

import useEditFields from '@/components/profiles/composables/useEditFields'
import { useOnboardingWizard } from '@/components/profiles/onboarding/useProfileWizards'
import { useStepper } from '@vueuse/core'
import DatingSteps from '@/components/profiles/onboarding/DatingSteps.vue'
import { useRouter } from 'vue-router'
import AgeSelector from '@/components/profiles/forms/AgeSelector.vue'
import GenderPronounSelector from '@/components/profiles/forms/GenderPronounSelector.vue'
import RelationstatusSelector from '@/components/profiles/forms/RelationstatusSelector.vue'
import IntrotextEditor from '@/components/profiles/forms/IntrotextEditor.vue'
import HaskidsSelector from '@/components/profiles/forms/HaskidsSelector.vue'

const router = useRouter()

const profileStore = useProfileStore()

const showModal = ref(false)
const formData: EditFieldProfileFormWithImages = reactive({} as EditFieldProfileFormWithImages)

onMounted(async () => {
  await profileStore.fetchOwnerProfile()
  if (!profileStore.profile?.isOnboarded) {
    router.push({ name: 'Onboarding' })
  }
  Object.assign(formData, profileStore.profile)
})

const handleOkClick = async () => {
  const res = await profileStore.updateOwnerProfile(formData)
  if (res.success) {
    // profileStore.close()
  } else {
    console.error('Failed to fetch updated profile after edit.')
  }
}
</script>

<template>
  <main class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 position-relative user-select-none">
        <div class="overflow-hidden rounded">
          <ImageCarousel :profile="formData" />
        </div>

        <div class="icons">
          <DatingIcon :profile="formData" />
        </div>

        <div class="action-buttons">
          <BButton :pill="true" class="btn-overlay">
            <DoodleIcons name="IconPhoto" class="svg-icon" />
          </BButton>
        </div>
      </div>
    </div>

    <BModal
      v-model="profileStore.fieldEditModal"
      title=""
      size="md"
      :backdrop="'static'"
      centered
      button-size="sm"
      fullscreen="sm"
      :focus="false"
      :no-close-on-backdrop="true"
      :no-header="true"
      :ok-title="'OK'"
      cancel-title="Nevermind"
      initial-animation
      body-class="d-flex flex-row align-items-center justify-content-center overflow-hidden"
      @ok="handleOkClick"
      @close="profileStore.fieldEditModal = false"
      :keyboard="false"
    >
      <div id="field-edit-modal" class="w-100"></div>
    </BModal>
  </main>
</template>
