<template>
  <div class="image-upload">
      
      <FormKit
        type="file"
        label="Add profile photo"
        accept=".jpg,.jpeg,.png,.gif"
        @change="handleFileChange"
        help="Select a photo."
        capture="user"
        file-remove-icon="trash"
        multiple="false" />


    <div v-if="preview" class="preview-container">
      <img :src="preview" alt="Preview" class="preview-image" />
      <button @click="removeImage" class="remove-button">Remove</button>
    </div>

    <div v-if="loading" class="loading">Processing...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageUpload',
  emits: ['update:modelValue'],
  
  props: {
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
      preview: null,
      loading: false
    }
  },

  methods: {
    triggerFileInput() {
      // this.$refs.fileInput.click()
    },

    async handleFileChange(event:any) {
      const file = event.target.files[0]
      if (!file) return

      this.loading = true
      try {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target) {
            // this.preview = e.target.result
          }
        }
        reader.readAsDataURL(file)

        // Process image with sharp (this would typically be done server-side)
        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('/api/resize-image', {
          method: 'POST',
          body: formData
        })

        const resizedImage = await response.blob()
        this.$emit('update:modelValue', resizedImage)
      } catch (error) {
        console.error('Error processing image:', error)
      } finally {
        this.loading = false
      }
    },

    removeImage() {
      this.preview = null
      // this.$refs.fileInput.value = ''
      this.$emit('update:modelValue', null)
    }
  }
})

</script>
