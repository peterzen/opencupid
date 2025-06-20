<script setup lang="ts">
import { DatingPreferencesDTO } from '@zod/profile/datingPreference.dto'
import { ref } from 'vue'


const model = defineModel<DatingPreferencesDTO>()

defineEmits({
  'update:datingPrefs': () => true,
  
})
const showModal = ref(false)

const handlePrefsClick = () => {
  showModal.value = true
}


</script>


<template>
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
      @ok="$emit('update:datingPrefs')"
    >
      <DatingPreferencesForm v-model="profileStore.datingPrefs" :profile="profileStore.profile" />
    </BModal>
  </div>
</template>
