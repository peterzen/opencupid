<template>
  <div class="col-md-8 offset-md-2">
    <FormKit type="form"
             @submit="submitForm"
             :actions="false">

      <div class="mb-3">
        <FormKit type="text"
                 v-model="formData.publicName"
                 label="My name is..."
                 id="publicName"
                 :floating-label="true"
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required" />
      </div>

      <div class="mb-3">
        <Multiselect v-model="country"
                     :options="countrySelectOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     open-direction="bottom"
                     :required="true"
                     placeholder="I'm from..."
                     label="label"
                     track-by="label" />
      </div>

      <div class="mb-3">
        <FormKit type="text"
                 name="city"
                 label="My city..."
                 id="city"
                 :validation-messages="{
                  required: 'Please enter your city',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required"
                 v-model="formData.city" />
      </div>

      <div class="mb-3">
        <FormKit type="textarea"
                 name="intro"
                 label="A few words about me..."
                 id="intro"
                 auto-height
                 max-auto-height="20"
                 rows="3"
                 :floating-label="true"
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required"
                 v-model="formData.intro" />
      </div>

      <ErrorComponent :error="error" />

      <SubmitButtonComponent :isLoading="isLoading" />

    </FormKit>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { Profile } from '@zod/generated'
import { getCountryOptions } from '@/lib/countries';

import Multiselect from 'vue-multiselect'
import ErrorComponent from '@/components/ErrorComponent.vue'
import SubmitButtonComponent from '@/components/SubmitButtonComponent.vue'

// Props & Emits
const props = defineProps<{
  modelValue: Profile
  isLoading: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: Profile): void
  (e: 'submit', value: Profile): void
}>()

// i18n
const { t } = useI18n()

console.log('ProfileForm', props.modelValue)


// Local form state
const formData = reactive<Profile>({ ...props.modelValue })

const error = ref('')

// Sync prop changes into formData
watch(
  () => props.modelValue,
  (newVal) => Object.assign(formData, newVal),
  { deep: true }
)

const countrySelectOptions = getCountryOptions()

// Computed proxies for multiselect v-models
const country = computed({
  get: () => countrySelectOptions.find((o) => o.value === formData.country),
  set: (opt: any) => { formData.country = opt.value },
})


// Submit handler
function submitForm() {
  emit('submit', { ...formData })
}

</script>