<template>
  <div class="col-md-8 offset-md-2">

    <div class="mb-4">
      <div class="col-sm-6">
        <ImageUpload @image:uploaded="emit('update:modelValue', formData)" />
      </div>
    </div>

    <FormKit type="form"
             :actions="false"
             :disabled="isLoading"
             #default="{ state: { valid } }"
             @submit="submitForm">

      <fieldset :disabled="!modelValue.isActive || isLoading">

        <div class="mb-4">
          <FormKit type="text"
                   v-model="formData.publicName"
                   label="My name is..."
                   id="publicName"
                   :floating-label="true"
                   input-class="form-control-lg"
                   :validation="[['required'], ['matches', /^[\p{L}]+(?:['-][\p{L}]+)*(?:\s+[\p{L}]+(?:['-][\p{L}]+)*)*$/u]]"
                   validation-visibility="blur"
                   :validation-messages="{
                    matches: 'No real names policy here but please only put your name here.',
                    required: 'Please enter your name',
                    min: 'Name must be at least 2 characters long',
                    max: 'Name must be less than 50 characters long'
                  }" />

        </div>

        <div class="mb-4">
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

        <div class="mb-4">
          <FormKit type="text"
                   v-model="formData.city"
                   label="My city..."
                   id="city"
                   input-class="form-control-lg"
                   :validation="[['required'], ['matches', /^[\p{L}]+(?:['-][\p{L}]+)*(?:\s+[\p{L}]+(?:['-][\p{L}]+)*)*$/u]]"
                   validation-visibility="blur"
                   :validation-messages="{
                    matches: 'Hmm, that does not look like a city name?',
                    required: 'Please enter your name',
                    min: 'Name must be at least 2 characters long',
                    max: 'Name must be less than 50 characters long'
                  }" />
        </div>

        <div class="mb-4">
          <FormKit type="textarea"
                   name="intro"
                   label="A few words about me..."
                   id="intro"
                   input-class="form-control-lg"
                   auto-height
                   max-auto-height="20"
                   rows="3"
                   :floating-label="true"
                   :validation-messages="{
                    required: 'Please write a sentence or two about yourself',
                    min: 'Name must be at least 2 characters long',
                    max: 'Name must be less than 50 characters long'
                  }"
                   validation="required"
                   v-model="formData.intro" />
        </div>
      </fieldset>
      <ErrorComponent :error="error" />

      <FormKit type="submit"
               wrapper-class="d-grid gap-2 mb-3"
               input-class="btn-primary btn-lg"
               label="Save"
               :disabled="!valid || props.isLoading" />

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
import ImageUpload from './ImageUpload.vue'

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