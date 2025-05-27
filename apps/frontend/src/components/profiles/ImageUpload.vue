<script setup lang="ts">
import { ref } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import AvatarUploadIcon from '@/assets/icons/files/avatar-upload.svg'
import { OwnerProfile } from '@zod/profile.schema'

const profileStore = useProfileStore()

// State
const preview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const fileInput = ref<HTMLInputElement>()
const modal = ref(false)
const captionText = ref<string>('')

// Emitters
const emit = defineEmits<{
  (e: 'image:uploaded', payload: OwnerProfile): void
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
    preview.value = typeof reader.result === 'string'
      ? reader.result
      : null
  }
  reader.readAsDataURL(file)
  modal.value = true
}

/**
 * Upload the selected file
 */
async function handleUpload() {
  if (!selectedFile.value) return
  isLoading.value = true
  error.value = null
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
  preview.value = null
  selectedFile.value = null
  if (fileInput.value) fileInput.value.value = ''

  isLoading.value = false
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
  modal.value = false
}
</script>


<template>
  <div class="image-upload">
    <FormKit ref="fileInput"
             type="file"
             accept=".jpg,.jpeg,.png,.gif"
             @change="handleFileChange"
             help=""
             id="image-upload-input"
             capture="user"
             floating-label="false"
             :file-remove="false"
             :file-remove-icon="false"
             label="Add profile photo"
             label-class="btn btn-primary"
             :multiple="false">
      <template #label>
        <label class="formkit-label file-upload-label btn btn-secondary"
               for="image-upload-input">
          <AvatarUploadIcon />
        </label>
      </template>
    </FormKit>
    <div v-if="error"
         class="text-danger mt-2">
      {{ error }}
    </div>
  </div>
  <BModal v-model="modal"
          centered
          button-size="sm"
          cancel-title="Nevermind"
          initial-animation
          title="Add a photo"
          @cancel="handleRemovePreview"
          @ok="handleUpload">
    <div v-if="preview"
         class="preview-container">
      <div class="mb-3">
        <img :src="preview"
             alt="Preview"
             width="200"
             class="preview-image" />
      </div>
      <div class="mb-3">
        <FormKit type="textarea"
                 input-class="form-control-sm"
                 placeholder="Caption this..."
                 v-model="captionText"
                 label=""
                 floating-label="false"
                 auto-height
                 :validation-messages="{
                  required: 'Please write a sentence or two about yourself',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }" />
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
}

.file-upload-label {
  width: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
