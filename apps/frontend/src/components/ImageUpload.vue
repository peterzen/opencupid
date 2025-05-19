<template>
  <div class="image-upload">
    <div class="row">
      <div class="col-sm-4">
        <FormKit ref="fileInput"
                 type="file"
                 label="Add profile photo"
                 accept=".jpg,.jpeg,.png,.gif"
                 @change="handleFileChange"
                 help="Select a photo."
                 capture="user"
                 file-remove-icon="trash"
                 multiple="false" />
      </div>
      <div class="col-sm-8">
        <div v-if="preview"
             class="preview-container">
          <img :src="preview"
               alt="Preview"
               class="preview-image" />
          <button @click="removeImage"
                  class="remove-button">Remove</button>
        </div>
      </div>
    </div>
    <div v-if="isLoading"
         class="loading">Processing...</div>
  </div>
</template>

<script lang="ts">
import { Profile } from '@zod/generated'
import axios from 'axios'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ImageUpload',
  emits: ['image:uploaded', 'update:modelValue'],

  props: {
    profile: {
      type: Object as PropType<Profile>,
      required: true
    },
    maxWidth: {
      type: Number,
      default: 800
    },
    maxHeight: {
      type: Number,
      default: 800
    },
    quality: {
      type: Number,
      default: 80
    }
  },

  data() {
    return {
      preview: null as string | ArrayBuffer | null,
      isLoading: false
    }
  },

  methods: {
    triggerFileInput() {
      // this.$refs.fileInput.click()
    },

    async handleFileChange(event: any) {
      const file = event.target.files[0]
      if (!file) return

      this.isLoading = true
      try {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target) {
            this.preview = e.target.result
          }
        }
        reader.readAsDataURL(file)

        // Process image with sharp (this would typically be done server-side)
        const formData = new FormData()
        console.log('profile:', this.profile)
        const profileId = this.profile.id.toString()
        formData.append('image', file)

        const response = await axios.post(`/media/upload-single/${profileId}`, formData)
        console.log('Response:', response)
        this.$emit('image:uploaded', response.data.profileImage)

        // const resizedImage = await response.blob()
        // this.$emit('update:modelValue', resizedImage)
      } catch (error) {
        console.error('Error processing image:', error)
      } finally {
        this.isLoading = false
      }
    },
    removeImage() {
      this.preview = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.node.input.value = ''
      }
      this.$emit('update:modelValue', null)
    }
  }
})

</script>
