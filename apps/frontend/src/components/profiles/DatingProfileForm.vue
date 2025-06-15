<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ErrorComponent from '@/components/ErrorComponent.vue'
import type { OwnerDatingPreferences, OwnerProfile } from '@zod/profile/profile.dto'
import GenderPickerComponent, { type GenderPickerModel } from './forms/GenderSelector.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import DatingPreferencesForm from './DatingPreferencesForm.vue'
import { useEnumOptions } from './composables/useEnumOptions'
import AgeSelector from './forms/AgeSelector.vue'

const state = reactive({
  error: '',
})

// Props & Emits
const props = defineProps<{
  modelValue: OwnerProfile
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isDatingActive', val: boolean): void
  (e: 'update:modelValue', value: OwnerProfile): void
  (e: 'submit', value: OwnerProfile): void
}>()

// Local form state
const formData = reactive<OwnerProfile>({ ...props.modelValue })
// const birthYear = ref(null)

// Sync prop changes into formData
watch(
  () => props.modelValue,
  newVal => Object.assign(formData, newVal),
  { deep: true }
)





function handleGenderUpdate(value: GenderPickerModel) {
  const changed = { ...formData, ...value }
  emit('update:modelValue', changed)
}

// Submit handler
function handleSubmit() {
  const payload = { ...formData }
  emit('submit', payload)
}

// i18n
const { t } = useI18n()
const { relationshipStatusOptions, hasKidsOptions } = useEnumOptions(t)

const relationships = relationshipStatusOptions()
const hasKidsRadioOptions = hasKidsOptions()

function handlePreferencesUpdate(value: OwnerDatingPreferences) {
  const changed = { ...formData, ...value }
  Object.assign(formData, changed)
  emit('update:modelValue', formData)
}

const birthdayModel = computed({
  get: () => formData.birthday,
  set: (val) => formData.birthday = val,
})


</script>

<template>
  <div class="col-md-8 offset-md-2">
    <FormKit
      type="form"
      :actions="false"
      :disabled="isLoading"
      #default="{ state: { valid } }"
      @submit="handleSubmit"
    >
      <div class="mb-3">
        <ToggleSwitch
          value="dating"
          :disabled="false"
          label="Enable dating profile"
          @update:modelValue="val => $emit('update:isDatingActive', val)"
          :modelValue="!!formData.isDatingActive"
        />
      </div>

      <BOverlay
        :show="!formData.isDatingActive || isLoading"
        variant="dark"
        opacity="0.89"
        blur="1rem"
        rounded="sm"
      >
        <fieldset>
          <AgeSelector v-model="birthdayModel" />

          <div class="mb-3">
            <GenderPickerComponent :modelValue="formData" @changed="handleGenderUpdate" />
          </div>

          <div class="mb-3">
            <FormKit
              v-model="formData.relationship!"
              type="radio"
              label=""
              :options="relationships"
              help="I am ..."
            />
          </div>

          <div class="mb-4">
            <FormKit
              v-model="formData.hasKids!"
              type="radio"
              label=""
              :options="hasKidsRadioOptions"
              help="Kids?"
            />
          </div>

          <div class="mb-3">
            <FormKit
              type="textarea"
              input-class="form-control-lg"
              v-model="formData.introDating"
              label="A few words about me..."
              auto-height
              :validation-messages="{
                required: 'Please write a sentence or two about yourself',
                min: 'Name must be at least 2 characters long',
                max: 'Name must be less than 50 characters long',
              }"
              validation="required"
            />
          </div>
        </fieldset>

        <fieldset legend="Preferences">
          <DatingPreferencesForm :modelValue="formData" @changed="handlePreferencesUpdate" />
        </fieldset>

        <ErrorComponent :error="state.error" />

        <FormKit
          type="submit"
          wrapper-class="d-grid gap-2 mb-3"
          input-class="btn-primary btn-lg"
          label="Save"
          :disabled="!valid || props.isLoading"
        />
      </BOverlay>
    </FormKit>
  </div>
</template>

<style lang="css" scoped>
.birthday-preview {
  min-width: 6rem;
}
</style>
