<template>
  <div class="image-gallery">
    <LoadingComponent v-if="isLoading" />

    <div v-else>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

        <ImageUpload @image:uploaded="fetchImages" />

        <div v-for="img in images"
             :key="img.id"
             class="col">
          <div class="card h-100"
               :class="{ 'removing': isRemoving[img.id] }">
            <div class="ratio ratio-1x1">
              <ProfileImageComponent :image="img" />
            </div>
            <div class="actions">
              <button class="btn btn-sm btn-danger"
                      @click="remove(img)"
                      :disabled="isRemoving[img.id]">
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </button>
            </div>
            <div class="card-body d-flex flex-column">
              <div class="text-muted ">
                {{ img.altText }}
              </div>
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
import { useProfileStore } from '@/store/profileStore'
import { Profile, ProfileImage } from '@zod/generated'
import ImageUpload from '@/components/profiles/ImageUpload.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ProfileImageComponent from '@/components/profiles/ProfileImageComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const profileStore = useProfileStore()

const images = ref<ProfileImage[]>([])
const isLoading = ref(false)
const isRemoving = reactive<Record<string, boolean>>({})
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

.removing {
  opacity: 0.2;
}

.actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}
</style>
