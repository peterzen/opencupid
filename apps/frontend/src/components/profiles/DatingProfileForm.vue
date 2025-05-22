<template>
  <div class="col-md-8 offset-md-2">
    <FormKit type="form"
             :actions="false"
             @submit="submitForm">

      <div class="mb-3">
        <FormKit type="text"
                 v-model="formData.publicName"
                 label="My name is..."
                 validation="required"
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }" />
      </div>

      <div class="mb-3">
        <Multiselect v-model="birthYear"
                     :options="birthYearSelectOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     id="birthyear"
                     :show-labels="false"
                     open-direction="bottom"
                     placeholder="I was born in...">
          <template v-slot:tag></template>
        </Multiselect>
      </div>

      <div class="mb-3">
        <Multiselect v-model="gender"
                     :options="genderOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     :show-labels="false"
                     :searchable="false"
                     open-direction="bottom"
                     id="gender"
                     label="label"
                     track-by="label"
                     placeholder="I identify as...">
          <template v-slot:noResult></template>
          <!-- <template #singleLabel="props">
            {{ t(props.option.label) }}
          </template>

          <template #option="props">
            {{ t(props.option.label) }}
          </template> -->
        </Multiselect>
      </div>

      <div class="mb-3">
        <Multiselect v-model="relationship"
                     :options="relationshipStatusOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     open-direction="bottom"
                     id="relationship"
                     label="label"
                     track-by="label"
                     placeholder="I am currently...">
          <template v-slot:noResult></template>
          <!-- <template #singleLabel="props">
            {{ t(props.option.label) }}
          </template>

          <template #option="props">
            {{ t(props.option.label) }}
          </template> -->
        </Multiselect>
      </div>

      <div class="mb-3">
        <!-- eslint-disable-next-line vue/no-xxx -->
        <FormKit v-model="formData.hasKids"
                 type="radio"
                 label=""
                 :options="haveKidsRadioOptions"
                 help="Do you have kids?" />
      </div>

      <div class="mb-3">
        <FormKit type="textarea"
                 v-model="formData.intro"
                 label="A few words about me..."
                 auto-height
                 :validation-messages="{
                  required: 'Please write a sentence or two about yourself',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required" />
      </div>

      <ErrorComponent :error="error" />

      <SubmitButtonComponent :isLoading="props.isLoading" />

    </FormKit>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Multiselect from 'vue-multiselect'
import { DatingProfile } from '@zod/generated'
import { getGenderOptions, getHasKidsOptionsOptions, getRelationshipStatusOptions } from '@/lib/i18n'
import ErrorComponent from '@/components/ErrorComponent.vue'
import SubmitButtonComponent from '@/components/SubmitButtonComponent.vue'

// Props & Emits
const props = defineProps<{
  modelValue: DatingProfile
  isLoading: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: DatingProfile): void
  (e: 'submit', value: DatingProfile): void
}>()

// i18n
const { t } = useI18n()

console.log('DatingProfileForm', props.modelValue)

// Local form state
const formData = reactive<DatingProfile>({ ...props.modelValue })

const error = ref('')

// Sync prop changes into formData
watch(
  () => props.modelValue,
  (newVal) => Object.assign(formData, newVal),
  { deep: true }
)

// Options for selects/radios
const genderOptions = getGenderOptions(t)
const relationshipStatusOptions = getRelationshipStatusOptions(t)
const birthYearSelectOptions = computed(() => {
  const current = new Date().getFullYear() - 18
  return Array.from({ length: 100 }, (_, i) => current - i)
})
const haveKidsRadioOptions = getHasKidsOptionsOptions(t)

// Computed proxies for multiselect v-models
const gender = computed({
  get: () => genderOptions.find((o) => o.value === formData.gender),
  set: (opt: any) => { formData.gender = opt.value },
})
const relationship = computed({
  get: () => relationshipStatusOptions.find((o) => o.value === formData.relationship),
  set: (opt: any) => { formData.relationship = opt.value },
})
const birthYear = computed({
  get: () => formData.birthday ? new Date(formData.birthday).getFullYear() : null,
  set: (year: number) => {
    if (year) formData.birthday = new Date(year, 0, 1)
  },
})

// Submit handler
function submitForm() {
  emit('submit', { ...formData })
}
</script>