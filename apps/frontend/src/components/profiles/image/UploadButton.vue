<script setup lang="ts">
import AvatarUploadIcon from '@/assets/icons/files/avatar-upload.svg'
import { IconCamera2, IconPhoto } from '@/components/icons/DoodleIcons'
import { computed, ref } from 'vue'

const props = defineProps<{
  capture?: 'user' | 'environment' | undefined
  genericIcon?: boolean
}>()

defineEmits<{
  (e: 'file:change', event: Event): void
}>()

const fileInput = ref<HTMLInputElement>()

const captureAttr = computed(() => (props.capture ? 'user' : null))
</script>

<template>
  <FormKit
    ref="fileInput"
    type="file"
    accept=".jpg,.jpeg,.png,.gif"
    help=""
    @change="$emit('file:change', $event)"
    :capture="captureAttr"
    floating-label="false"
    :file-remove="false"
    :file-remove-icon="false"
    :id="'image-upload-input' + captureAttr"
    label="Add profile photo"
    label-class="btn btn-primary"
    inner-class="$reset d-none"
    :multiple="false"
  >
    <template #label>
      <div class="ratio ratio-1x1">
        <label
          class="formkit-label file-upload-label btn btn-secondary rounded rounded-lg-5"
          :for="'image-upload-input' + captureAttr"
        >
          <IconCamera2 class="svg-icon" v-if="captureAttr" />
          <AvatarUploadIcon class="svg-icon" v-else-if="genericIcon" />
          <IconPhoto class="svg-icon" v-else />
        </label>
      </div>
    </template>
  </FormKit>
</template>
