<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import ImageUpload from '@/components/profiles/ImageUpload.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ProfileImageComponent from '@/components/profiles/ProfileImageComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { OwnerProfile } from '@zod/profile.schema'
import { VueDraggableNext } from 'vue-draggable-next'
import { OwnerProfileImage } from '@zod/profileimage.schema'

const profileStore = useProfileStore()

const isLoading = ref(false)
const isRemoving = reactive<Record<string, boolean>>({})
const error = ref<string>('')

// Props & Emits
const props = defineProps<{
  modelValue: OwnerProfile
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: OwnerProfile): void
}>()

const formData = reactive<OwnerProfile>({ ...props.modelValue })

// Sync prop changes into formData
watch(
  () => props.modelValue,
  async (newVal) => {
    Object.assign(formData, newVal)
  },
  { deep: true }
)

/**
 * Remove an image by ID
 */
async function handleDelete(image: OwnerProfileImage) {
  isRemoving[image.id] = true

  const res = await profileStore.deleteImage(image)
  console.log('Delete response:', res)
  if (!res.success) {
    error.value = res.message
    isRemoving[image.id] = false
    return
  }
  Object.assign(formData, res.profile)
  emit('update:modelValue', formData)
}

async function handleUploaded(updatedProfile: OwnerProfile) {
  Object.assign(formData, updatedProfile)
  emit('update:modelValue', formData)
}

async function handleReorder(event: any) {
  const payload = event.moved
  if (!payload) return;
  const newOrder = formData.profileImages.map((img, position) => ({
    id: img.id,
    position
  }))
  const res = await profileStore.reorderImages(newOrder)
  Object.assign(formData, res)
  emit('update:modelValue', formData)
}



/**
 * Prevent moving the upload button
 */
function checkMove(evt: any) {
  const el = evt.draggedContext
  return (el.futureIndex < formData.profileImages.length)
}
</script>


<template>
  <div class="image-editor">
    <LoadingComponent v-if="isLoading" />

    <div v-else>
      <div class="row">
        <div class="col-sm-6"
             v-if="formData.profileImages && formData.profileImages.length">
          <ProfileImageComponent :image="formData.profileImages[0]" />
        </div>
        <div class="col-sm-6">
          <VueDraggableNext class="row row-cols-3 row-cols-sm-3 row-cols-md-3 g-4 sortable-grid"
                            v-model="formData.profileImages"
                            ghost-class="ghost"
                            :sort="true"
                            filter="#upload-button"
                            :dragoverBubble="true"
                            :move="checkMove"
                            @change="handleReorder">
            <TransitionGroup name="fade">
              <div v-for="img in formData.profileImages"
                   :key="img.id"
                   class="col thumbnail"
                   :id="img.id">
                <div class="actions">
                  <button class="btn btn-sm rounded-circle"
                          @click="handleDelete(img)"
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
                <ImageUpload @image:uploaded="handleUploaded" />
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
