<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import { detectMobile } from '@/lib/mobile-detect'

import type { UpdatedProfileImageFragment, OwnerProfile } from '@zod/profile/profile.dto'
import LoadingComponent from '@/components/LoadingComponent.vue'
import UploadButton from './UploadButton.vue'
import AvatarUploadIcon from '@/assets/icons/files/avatar-upload.svg'

const profileStore = useProfileStore()

// State
const preview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const error = ref<string | null>('')
const fileInput = ref<HTMLInputElement>()
const modalOpen = ref(false)
const captionText = ref<string>('')
const showCaptureChooser = ref(true)

// Emitters
const emit = defineEmits<{
  (e: 'image:uploaded', payload: UpdatedProfileImageFragment): void
  (e: 'image:deleted', payload: { id: string }): void
  (e: 'update:modelValue', value: OwnerProfile): void
}>()




/**
 * Handle file selection: set preview and keep file
 */
function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  selectedFile.value = file
  if (!file) {
    preview.value = null
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    preview.value = typeof reader.result === 'string' ? reader.result : null
  }
  reader.readAsDataURL(file)
  modalOpen.value = true
}

const isMobile = computed(() => {
  return detectMobile()
})
/**
 * Upload the selected file
 */
async function handleUpload() {
  if (!selectedFile.value) return
  isLoading.value = true
  error.value = ''

  const res = await profileStore.uploadProfileImage(selectedFile.value, captionText.value)

  if (!res.success) {
    console.error('Upload error:', res.message)
    error.value = res.message
    isLoading.value = false
    return
  }
  const updatedProfile = res.profile
  emit('image:uploaded', updatedProfile)

  // Clear after upload
  showCaptureChooser.value = false
  preview.value = null
  selectedFile.value = null
  if (fileInput.value) fileInput.value.value = ''

  isLoading.value = false
  modalOpen.value = false
  setTimeout(() => {
    showCaptureChooser.value = true
  }, 500) // Delay to ensure modal closes before updating
}

/**
 * Remove preview and reset state
 */
async function handleRemovePreview() {
  preview.value = null
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  modalOpen.value = false
}
</script>

<template>
  <div class="image-upload h-100">
    <BButton v-if="isMobile" variant="secondary" class="w-100 h-100" @click="modalOpen = true">
      <AvatarUploadIcon class="svg-icon" />
    </BButton>
    <UploadButton v-else @file:change="handleFileChange" :genericIcon="true" />

    <div v-if="error" class="text-danger mt-2">
      {{ error }}
    </div>
  </div>
  <BModal
    v-model="modalOpen"
    centered
    button-size="sm"
    :focus="false"
    :no-close-on-backdrop="true"
    :no-footer="true"
    cancel-title="Nevermind"
    initial-animation
    fullscreen="md"
    title="Add a photo"
  >
    <div v-if="preview" class="preview-container">
      <div class="mb-3">
        <LoadingComponent v-if="isLoading" />
        <div class="ratio ratio-1x1">
          <img
            :src="preview"
            alt="Preview"
            width="200"
            :class="isLoading ? 'loading' : ''"
            class="preview-image"
          />
        </div>
      </div>
      <!-- <div class="mb-3">
        <FormKit
          type="textarea"
          input-class="form-control-sm"
          placeholder="Caption this..."
          v-model="captionText"
          label=""
          floating-label="false"
          auto-height
          :validation-messages="{
            required: 'Please write a sentence or two about yourself',
            min: 'Name must be at least 2 characters long',
            max: 'Name must be less than 50 characters long',
          }"
        />
      </div> -->
      <ErrorComponent :error="error" />
      <div class="mb-3 justify-content-center d-flex flex-column gap-2 align-items-center">

        <FormKit
          type="button"
          wrapper-class=""
          input-class="btn btn-primary btn-lg mb-3"
          label="Looks good!"
          :disabled="isLoading"
          @click.prevent="handleUpload"
        />
        <a href="#" @click.prevent="handleRemovePreview" class="text-secondary link-underline  link-underline-opacity-0">Nevermind</a>
      </div>
    </div>
    <div
      v-else-if="showCaptureChooser"
      class="d-flex flex-column align-items-center h-100 justify-content-center"
    >
      <div class="w-50 mx-auto d-flex flex-column align-items-center">
        <div class="mb-4">
          <UploadButton @file:change="handleFileChange" :key="'capture-user'" />
          <div class="mt-2 text-muted">Add a photo from your phone</div>
        </div>
        <div>
          <UploadButton @file:change="handleFileChange" capture="user" :key="'capture-none'" />
          <div class="mt-2 text-muted">Or take a photo with your camera</div>
        </div>
      </div>
    </div>
  </BModal>
</template>

<style lang="scss">
.image-upload {
  .formkit-no-files,
  .formkit-file-list,
  .formkit-inner {
    display: none;
  }
  > div {
    height: 100%;
    > .formkit-wrapper {
      width: 100% !important;
      .formkit-label {
        height: 100%;
      }
    }
  }
}

.file-upload-label {
  width: 100%;
  svg {
    width: 100%;
    height: 100%;
  }
}

img {
  object-fit: cover;
}

.preview-image {
  .loading {
    opacity: 0.5;
  }
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
}
.svg-icon {
  width: 4rem;
  height: 4rem;
}
</style>
