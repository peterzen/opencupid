<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import { ProfileImage } from '@zod/generated'
import ImageUpload from '@/components/profiles/ImageUpload.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ProfileImageComponent from '@/components/profiles/ProfileImageComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { OwnerProfile } from '@zod/profile.schema'
import { OwnerProfileImage } from '@zod/media.schema'
import { VueDraggableNext } from 'vue-draggable-next'
import { orderProfileImages } from '@/lib/profileutils'

const profileStore = useProfileStore()

// const images = ref<OwnerProfileImage[]>([])
const isLoading = ref(false)
const isRemoving = reactive<Record<string, boolean>>({})

// Props & Emits
const props = defineProps<{
  modelValue: OwnerProfile
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: OwnerProfile): void
  (e: 'update:profileImage', value: OwnerProfileImage | null): void
}>()

const formData = reactive<OwnerProfile>({ ...props.modelValue })

// Sync prop changes into formData
watch(
  () => props.modelValue,
  async (newVal) => {
    Object.assign(formData, newVal)
    // await fetchImages()
  },
  { deep: true }
)

// /**
//  * Fetch all images for current user
//  */
// async function fetchImages() {
//   isLoading.value = true
//   try {
//     const fetched = await profileStore.getUserImages()
//     console.log('Fetched images:', fetched)
//     images.value = orderProfileImages(formData.profileImage, fetched)
//     if(formData.profileImage === null && images.value.length > 0) {
//       // If no profile image is set, set the first image as profile image
//       formData.profileImage = images.value[0]
//       emit('update:profileImage', images.value[0])
//     }
//   } catch (err) {
//     console.error('Failed to load images', err)
//   } finally {
//     isLoading.value = false
//   }
// }

/**
 * Remove an image by ID
 */
async function remove(image: OwnerProfileImage) {
  isRemoving[image.id] = true
  try {
    await profileStore.deleteImage(image)
    formData.otherImages = formData.otherImages.filter(img => img.id !== image.id)
    // set profileImage to the next available image, or null if none exist
    const nextProfileImage = formData.otherImages[0] || null
    formData.profileImage = nextProfileImage
    emit('update:profileImage', null)
    // emit('update:modelValue', formData)
  } catch (err) {
    console.error('Remove failed', err)
  } finally {
    isRemoving[image.id] = false
  }
}


async function handleImageUploaded(updatedProfile: OwnerProfile) {
  Object.assign(formData, updatedProfile)
  emit('update:modelValue', formData)
  // console.log('Image uploaded:', image)
  // if (formData.profileImage === null) {
  //   formData.profileImage = image
  //   emit('update:profileImage', image)
  // }
  // await fetchImages()
}

function checkMove(evt: any) {
  const el = evt.draggedContext.element as HTMLElement;
  // console.log('checkMove', el)
  // return (el.attributes.id.nodeValue !== "upload-button");
}

async function handleReorder(event: any) {
  console.log(event)
  const payload = event.moved
  if (!payload) return;
  if (payload.newIndex == 0) {
    const newProfileImage = payload.element as ProfileImage;
    Object.assign(formData, {
      profileImage: newProfileImage
    })
    emit('update:profileImage', newProfileImage)
    emit('update:modelValue', formData)
  }
}


</script>


<template>
  <div class="image-editor">
    <LoadingComponent v-if="isLoading" />

    <div v-else>
      <div class="row">
        <div class="col-sm-6"
             v-if="formData.profileImage">
          <ProfileImageComponent :image="formData.profileImage"
                                 v-if="formData.profileImage" />
        </div>
        <div class="col-sm-6">
          <VueDraggableNext class="row row-cols-3 row-cols-sm-3 row-cols-md-3 g-4 sortable-grid"
                            v-model="formData.otherImages"
                            ghost-class="ghost"
                            :sort="true"
                            filter="#upload-button"
                            :dragoverBubble="true"
                            :move="checkMove"
                            @change="handleReorder">
            <TransitionGroup name="fade">
              <div v-for="img in formData.otherImages"
                   :key="img.id"
                   class="col thumbnail"
                   :id="img.id">
                <div class="actions">
                  <button class="btn btn-sm rounded-circle"
                          @click="remove(img)"
                          :disabled="isRemoving[img.id]">
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                  </button>
                </div>
                <div :class="{ 'removing': isRemoving[img.id] }">
                  <div class="ratio ratio-1x1">
                    <ProfileImageComponent :image="img" />
                  </div>
                </div>
              </div>
              <div class="col"
                   key="upload-button"
                   id="upload-button">
                <ImageUpload @image:uploaded="handleImageUploaded" />
              </div>
            </TransitionGroup>
          </VueDraggableNext>
        </div>

        <!-- <div v-if="images.length === 0"
         class="mb-3 empty">No images uploaded yet.
    </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  object-fit: cover;
}

.removing {
  opacity: 0.2;
}

.thumbnail {
  position: relative
}

.actions {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  z-index: 1;
}

.actions {
  .btn {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    // padding: 10px;
    // font-size: 0.75rem;
    // border-radius: 9999px;
  }
}


.sortable-chosen {
  opacity: 0.3;
}

.sortable-chosen,
.fade-enter-from,
.fade-leave-to {
  opacity: 0.4;
  transform: translateY(10px);
}

.ghost,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

/* For reordering */
.sortable-grid {
  transition: transform 0.3s ease;
}

.fade-move {
  transition: transform 0.3s ease;
}
</style>
