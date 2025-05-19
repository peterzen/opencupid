<template>
  <div class="image-upload">
    <div class="upload-container">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        class="file-input"
      />
      <button @click="triggerFileInput" class="upload-button">
        Select Image
      </button>
    </div>

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

<style scoped>
.image-upload {
  padding: 1rem;
}

.upload-container {
  margin-bottom: 1rem;
}

.file-input {
  display: none;
}

.upload-button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.preview-container {
  margin-top: 1rem;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.remove-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading {
  margin-top: 1rem;
  color: #666;
}
</style>
