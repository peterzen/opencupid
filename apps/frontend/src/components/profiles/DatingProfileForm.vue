<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getHasKidsOptionsOptions, getRelationshipStatusOptions } from '@/lib/i18n'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { type OwnerProfile } from '@zod/profile.schema'
import GenderPickerComponent, { type GenderPickerModel } from './GenderPickerComponent.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'

const state = reactive({
  error: ''
})

// Props & Emits
const props = defineProps<{
  modelValue: OwnerProfile,
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isDatingActive', val: boolean): void
  (e: 'update:modelValue', value: OwnerProfile): void
  (e: 'submit', value: OwnerProfile): void
}>()

// i18n
const { t } = useI18n()

// Local form state
const formData = reactive<OwnerProfile>({ ...props.modelValue })

// Sync prop changes into formData
watch(
  () => props.modelValue,
  (newVal) => Object.assign(formData, newVal),
  { deep: true }
)

// Computed proxies for multiselect v-models
const birthYear = computed({
  get: () => formData.birthday ? new Date(formData.birthday).getFullYear() : null,
  set: (year: number) => {
    if (year && year < birthYearMax.value && year > 1920) {
      formData.birthday = new Date(year, 0, 1)
      // state.error = 'You must be at least 18 years old to create a profile.'
      return
    }
  },
})

const birthYearMax = computed(() => {
  return new Date().getFullYear() - 18
})


// Options for selects/radios
const relationshipStatusOptions = getRelationshipStatusOptions(t)
const haveKidsRadioOptions = getHasKidsOptionsOptions(t)

function handleGenderUpdate(value: GenderPickerModel) {
  const changed = { ...formData, ...value }
  emit('update:modelValue', changed)
}

// Submit handler
function handleSubmit() {
  const payload = { ...formData }
  emit('submit', payload)
}


</script>


<template>
  <div class="col-md-8 offset-md-2">

    <FormKit type="form"
             :actions="false"
             :disabled="isLoading"
             #default="{ state: { valid } }"
             @submit="handleSubmit">

      <div class="mb-3">
        <ToggleSwitch value="dating"
                      :disabled="false"
                      label="Enable dating profile"
                      @update:modelValue="val => $emit('update:isDatingActive', val)"
                      :modelValue="!!formData.isDatingActive" />
      </div>
      <fieldset :disabled="!formData.isDatingActive || isLoading">

        <div class="mb-4">
          <FormKit type="number"
                   label="I was born in..."
                   input-class="form-control-lg"
                   name="temperature"
                   number="integer"
                   v-model="birthYear!"
                   step="1"
                   min="1920"
                   :max="birthYearMax"
                   validation-visibility="blur"
                   :validation="[['required'], ['min', 1920], ['max', birthYearMax]]"
                   :validation-messages="{
                    required: 'Please enter your birth year',
                    min: 'Wow, you are really old!',
                    max: 'Wow, you are really young! You should be at least 18 to be here.'
                  }" />
        </div>

        <div class="mb-3">
          <GenderPickerComponent :modelValue="modelValue"
                                 @changed="handleGenderUpdate" />
        </div>

        <div class="mb-3">
          <FormKit v-model="formData.relationship!"
                   type="radio"
                   label=""
                   :options="relationshipStatusOptions"
                   help="I am ..." />
          <!-- <Multiselect v-model="relationship"
                     :options="relationshipStatusOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     open-direction="bottom"
                     id="relationship"
                     label="label"
                     track-by="label"
                     placeholder="I am currently...">
          <template v-slot:noResult></template>
          <template #singleLabel="props">
            {{ t(props.option.label) }}
          </template>

          <template #option="props">
            {{ t(props.option.label) }}
          </template>
        </Multiselect> -->
        </div>

        <div class="mb-4">
          <FormKit v-model="formData.hasKids!"
                   type="radio"
                   label=""
                   :options="haveKidsRadioOptions"
                   help="Kids?" />
        </div>

        <div class="mb-3">
          <FormKit type="textarea"
                   input-class="form-control-lg"
                   v-model="formData.introDating"
                   label="A few words about me..."
                   auto-height
                   :validation-messages="{
                    required: 'Please write a sentence or two about yourself',
                    min: 'Name must be at least 2 characters long',
                    max: 'Name must be less than 50 characters long'
                  }"
                   validation="required" />
        </div>
      </fieldset>

      <ErrorComponent :error="state.error" />

      <FormKit type="submit"
               wrapper-class="d-grid gap-2 mb-3"
               input-class="btn-primary btn-lg"
               label="Save"
               :disabled="!valid || props.isLoading" />

    </FormKit>
  </div>
</template>
