<script setup lang="ts">
import { reactive, onMounted, ref, provide } from 'vue'
import { OwnerProfile, PublicProfile } from '@zod/profile/profile.dto'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'

const profileStore = useProfileStore()

const showModal = ref(false)
const editableModel: OwnerProfile = reactive({} as OwnerProfile)

onMounted(async () => {
  await profileStore.fetchUserProfile()
  Object.assign(editableModel, profileStore.profile)
})

const handleOkClick = async () => {
  const res = await profileStore.updateProfile(editableModel)
  if (res.success) {
    // profileStore.close()
  } else {
    console.error('Failed to fetch updated profile after edit.')
  }
}

provide('isOwner', true)
provide('editableModel', editableModel)
</script>

<template>
  <main class="container">
    <LoadingComponent v-if="profileStore.isLoading" />
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
    <PublicProfileComponent
      v-if="profileStore.profile"
      :isLoading="profileStore.isLoading"
      @intent:field:edit="showModal = true"    
      :profile="profileStore.profile as PublicProfile"/>
  </main>
</template>
