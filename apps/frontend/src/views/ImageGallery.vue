<template>
  <div class="image-gallery">
    <LoadingComponent v-if="isLoading" />

    <div v-else>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <ImageUpload @image:uploaded="fetchImages" />

        <div v-for="img in images"
             :key="img.id"
             class="col">
          <div class="card h-100">
            <div class="ratio ratio-1x1">
              <img :src="getImageUrl(img.storagePath)"
                   :alt="img.altText || 'Profile image'"
                   class="card-img-top" />
            </div>
            <div class="card-body d-flex flex-column">
              <button class="btn btn-sm btn-secondary"
                      @click="remove(img)"
                      :disabled="isRemoving[img.id]">
                {{ isRemoving[img.id] ? 'Removing...' : 'Remove' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="images.length === 0"
         class="mb-3 empty">No images uploaded yet.
    </div> -->


  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useProfileStore } from '@/store/profileStore'
import { Profile, ProfileImage } from '@zod/generated'
import ImageUpload from '@/components/profiles/ImageUpload.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'

const profileStore = useProfileStore()

const images = ref<ProfileImage[]>([])
const isLoading = ref(false)
const isRemoving = reactive<Record<string, boolean>>({})
const fileInput = ref<HTMLInputElement>()
const myProfile = ref<Profile | null>(null)
/**
 * Fetch all images for current user
 */
async function fetchImages() {
  isLoading.value = true
  try {
    images.value = await profileStore.getUserImages()
  } catch (err) {
    console.error('Failed to load images', err)
  } finally {
    isLoading.value = false
  }
}

/**
 * Returns full URL for a stored image path
 */
function getImageUrl(storagePath: string) {
  return `http://localhost:3001/${storagePath}`
}

/**
 * Handle file selected and upload via API
 */
async function upload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  isLoading.value = true
  try {
    const form = new FormData()
    form.append('image', file)
    const { data } = await axios.post<ProfileImage>('/api/profile-images', form)
    images.value.unshift(data)
  } catch (err) {
    console.error('Upload failed', err)
  } finally {
    isLoading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

/**
 * Remove an image by ID
 */
async function remove(image: ProfileImage) {
  isRemoving[image.id] = true
  try {
    await profileStore.deleteImage(image)
    images.value = images.value.filter(img => img.id !== image.id)
  } catch (err) {
    console.error('Remove failed', err)
  } finally {
    isRemoving[image.id] = false
  }
}

onMounted(async () => {
  isLoading.value = true
  const { profile, datingProfile } = await profileStore.getUserProfiles()
  isLoading.value = false;
  myProfile.value = profile;

  fetchImages()
})
</script>

<style scoped lang="scss">
img {
  object-fit: cover;
}
</style>
