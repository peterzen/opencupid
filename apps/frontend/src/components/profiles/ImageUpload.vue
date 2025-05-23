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
             file-remove="false"
             file-remove-icon="trash"
             file-remove-class="hidden"
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
         class="text-danger mt-2">{{ error }}</div>
  </div>
  <BModal v-model="modal"
          centered
          button-size="sm"
          cancel-title="Nevermind"
          initial-animation
          title="Add image"
          @cancel="handleRemovePreview"
          @ok="handleUpload">
    <div v-if="preview"
         class="preview-container">
      <img :src="preview"
           alt="Preview"
           width="200"
           class="preview-image" />
    </div>
  </BModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ProfileImage } from '@zod/generated'
import { useProfileStore } from '@/store/profileStore'
import { BvTriggerableEvent } from 'bootstrap-vue-next'

import AvatarUploadIcon from '@/assets/icons/files/avatar-upload.svg'

const profileStore = useProfileStore()

// State
const preview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const fileInput = ref<HTMLInputElement>()
const modal = ref(false)
const dontCloseFn = (e: BvTriggerableEvent) => {
  e.preventDefault()
}
// Emitters
const emit = defineEmits<{
  (e: 'image:uploaded', payload: ProfileImage): void
  (e: 'image:deleted', payload: { id: string }): void
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
  try {
    const image = await profileStore.uploadProfileImage(selectedFile.value)
    emit('image:uploaded', image)
    // Clear after upload
    preview.value = null
    selectedFile.value = null
    if (fileInput.value) fileInput.value.value = ''
  } catch (err: any) {
    console.error('Upload error:', err)
    error.value = err.message || 'Error uploading image.'
  } finally {
    isLoading.value = false
  }
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
