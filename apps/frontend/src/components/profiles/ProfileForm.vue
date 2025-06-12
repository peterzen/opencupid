<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { getLanguageSelectorOptions, type MultiselectOption } from '@/lib/languages'

import type { OwnerProfile } from '@zod/profile/profile.dto'
import type { PublicTag } from '@zod/dto/tag.dto'

import Multiselect from 'vue-multiselect'
import ErrorComponent from '@/components/ErrorComponent.vue'
import TagSelectComponent from '@/components/profiles/TagSelectComponent.vue'
import ImageEditor from './image/ImageEditor.vue'
import LocationSelectorComponent from './LocationSelectorComponent.vue'

// Props & Emits
const props = defineProps<{
  modelValue: OwnerProfile
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

const error = ref('')

// Sync prop changes into formData
watch(
  () => props.modelValue,
  newVal => Object.assign(formData, newVal),
  { deep: true, immediate: true }
)

// Computed proxies for multiselect v-models

const languageOptions = reactive([] as MultiselectOption[])
const languages = computed({
  get: () =>
    (formData.languages ?? []).map(lang => languageOptions.find(opt => opt.value === lang)),
  set: (options: MultiselectOption[]) => {
    formData.languages = options.map(opt => opt.value)
  },
})

const haveImages = computed(() => {
  return formData.profileImages && formData.profileImages.length > 0
})

function handleTagsChange(selected: PublicTag[]) {
  formData.tags = [...selected] // replace array reactively
}

function handleImageUpdate(val: any) {
  Object.assign(formData, {
    ...formData,
    profileImages: val.profileImages,
  })
  emit('update:modelValue', formData)
}

function handleLocationUpdate(val: any) {
  Object.assign(formData, {
    ...formData,
    country: val.country,
    // cityId: val.cityId,
    cityName: val.cityName,
  })
  emit('update:modelValue', formData)
}

// Submit handler
function handleSubmit() {
  const payload = { ...formData }
  emit('submit', payload)
}

onMounted(() => {
  languageOptions.push(...getLanguageSelectorOptions())
})
</script>

<template>
  <div class="col-md-8 offset-md-2">
    <div class="mb-4">
      <ImageEditor :modelValue="modelValue" @update:modelValue="handleImageUpdate" />
    </div>

    <FormKit
      type="form"
      :actions="false"
      :disabled="isLoading"
      #default="{ state: { valid } }"
      @submit="handleSubmit"
    >
      <fieldset :disabled="!modelValue.isActive || isLoading">
        <div class="mb-4">
          <FormKit
            type="text"
            v-model="formData.publicName"
            label="My name is..."
            id="publicName"
            autofocus
            autocomplete="off"
            input-class="form-control-lg"
            :validation="[
              ['required'],
              ['matches', /^[\p{L}]+(?:['-][\p{L}]+)*(?:\s+[\p{L}]+(?:['-][\p{L}]+)*)*$/u],
            ]"
            validation-visibility="blur"
            :validation-messages="{
              matches: 'No real names policy here but please only put your name here.',
              required: 'Please enter your name',
              min: 'Name must be at least 2 characters long',
              max: 'Name must be less than 50 characters long',
            }"
          />
        </div>

        <div class="mb-4">
          <LocationSelectorComponent
            :modelValue="modelValue"
            @update:modelValue="handleLocationUpdate"
          />
        </div>

        <div class="mb-3">
          <TagSelectComponent
            v-model="formData.tags!"
            :isLoading="props.isLoading"
            label="My interests are..."
            placeholder="Select or search for your interests"
            @tags:selected="handleTagsChange"
          />
        </div>

        <div class="mb-4">
          <FormKit
            type="textarea"
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
              max: 'Name must be less than 50 characters long',
            }"
            validation="required"
            v-model="formData.introSocial"
          />
        </div>

        <div class="mb-4">
          <div class="languages-multiselect">
            <Multiselect
              v-model="languages"
              :options="languageOptions"
              :close-on-select="false"
              :clear-on-select="false"
              :multiple="true"
              :searchable="true"
              open-direction="bottom"
              id="languages"
              label="label"
              track-by="label"
              placeholder="I speak..."
            >
              <template v-slot:noResult></template>
              <template #singleLabel="props">
                {{ t(props.option.label) }}
              </template>

              <template #option="props">
                {{ t(props.option.label) }}
              </template>
            </Multiselect>
          </div>
        </div>
      </fieldset>
      <ErrorComponent :error="error" />

      <FormKit
        type="submit"
        wrapper-class="d-grid gap-2 mb-3"
        input-class="btn-primary btn-lg"
        label="Save"
        :disabled="!valid || !haveImages || props.isLoading"
      />
    </FormKit>
  </div>
</template>

<style scoped lang="scss">
:deep(.languages-multiselect) {
  .multiselect__tag {
    background-color: var(--bs-info);
    color: var(--bs-body-bg);

    i:after {
      color: var(--bs-text-secondary);
    }
  }
}
</style>
