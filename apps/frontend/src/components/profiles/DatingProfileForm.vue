<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getGenderOptions, getHasKidsOptionsOptions, getRelationshipStatusOptions } from '@/lib/i18n'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { type OwnerProfile } from '@zod/profile.schema'

const state = reactive({
  error: ''
})

// Props & Emits
const props = defineProps<{
  modelValue: OwnerProfile,
  isLoading: boolean
}>()

const emit = defineEmits<{
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
const genderOptions = getGenderOptions(t)
const relationshipStatusOptions = getRelationshipStatusOptions(t)
const haveKidsRadioOptions = getHasKidsOptionsOptions(t)

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

      <fieldset :disabled="!modelValue.isActive || isLoading">

        <!-- <div class="mb-4">
          <FormKit type="text"
                   v-model="formData.publicName"
                   label="My name is..."
                   input-class="form-control-lg"
                   :validation="[['required'], ['matches', /^[\p{L}]+(?:['-][\p{L}]+)*(?:\s+[\p{L}]+(?:['-][\p{L}]+)*)*$/u]]"
                   validation-visibility="blur"
                   :validation-messages="{
                    matches: 'No real names policy here but please only put your name here.',
                    required: 'Please enter your name',
                    min: 'Name must be at least 2 characters long',
                    max: 'Name must be less than 50 characters long'
                  }" />
        </div> -->

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
          <FormKit v-model="formData.gender!"
                   type="radio"
                   label=""
                   :options="genderOptions"
                   help="I identify as..." />

          <!-- <Multiselect v-model="gender"
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
          </template> 
        </Multiselect> -->
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
