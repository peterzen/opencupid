<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingWizard } from './useProfileWizards'
import { type EditFieldProfileFormWithImages } from '@zod/profile/profile.form'
import HelpScribble from '../HelpScribble.vue'

import { useStepper } from '@vueuse/core'
const isComplete = ref(false)
const error = ref('')

const formData = defineModel<EditFieldProfileFormWithImages>({
  default: () => ({
    isDatingActive: false,
    isSocialActive: false,
    birthday: null,
    genderPronouns: null,
    relationshipStatus: null,
    hasKids: null,
    introSocial: '',
    introDating: '',
  }),
})

// const props = defineProps<{
//   modelValue: EditProfileForm
// }>()
// const formData = reactive<EditProfileForm>({
//   ...props.modelValue,
//   isDatingActive: props.modelValue.isDatingActive || false,
//   isSocialActive: props.modelValue.isSocialActive || false,
// })
// watch(
//   () => props.modelValue,
//   newValue => {
//     Object.assign(formData, newValue)
//   },
//   { deep: true }
// )

const { datingWizard } = useOnboardingWizard(formData.value)
const { current, isFirst, goToNext, goToPrevious, goTo, isCurrent } = useStepper(datingWizard)

const handleNext = async () => {
  if (current.value) {
    current.value.isCompleted = true
    if (current.value.flags === 'stage_one_end') {
      console.log('Stage completed:', current.value.state)
      if (formData.value.isDatingActive) {
        goToNext()
      } else {
        isComplete.value = true
        goTo('confirm')
        // await saveProfile()
      }
    }
    if (current.value.flags === 'stage_two_end') {
      isComplete.value = true
      goTo('confirm')
      // await saveProfile()
      console.log('Stage completed:', current.value.state)
    }
    if (current.value.state) {
      goToNext()
    } else {
      console.warn('Current step is not valid')
    }
  } else {
    console.warn('No current step found')
  }
}
</script>

<template>
  <div>
    <DatingSteps v-model="formData" :isCurrent />
    <fieldset v-if="isCurrent('confirm')" class="position-relative">
      <legend>All set!</legend>
      <p class="text-muted">
        You will now appear to people who are looking for the same things as you. You can always
        change this info later.
      </p>
    </fieldset>
    <div class="mt-3">
      <BButton
        @click="handleNext"
        :disabled="!current.state"
        v-if="!isComplete"
        variant="primary"
        size="lg"
        pill
        class="w-100"
        >Next</BButton
      >
    </div>
      <div class="scribble position-absolute bottom-0 end-0 me-5 mb-2" v-if="isComplete">
        <HelpScribble text="Click Next" direction="se" />
      </div>
  </div>
</template>
