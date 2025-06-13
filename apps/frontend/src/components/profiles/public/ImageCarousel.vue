<script setup lang="ts">
import { ProfileImage } from '@zod/generated'
import { PublicProfile } from '@zod/profile/profile.dto'
import { BCarousel } from 'bootstrap-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { IconCross } from '@/components/icons/DoodleIcons'

const t = useI18n()

const props = defineProps<{
  profile: PublicProfile
}>()

const showModal = ref(false)
const slide = ref(0)

const handleImageClick = () => (showModal.value = true)

const handleCloseClick = () => (showModal.value = false)
</script>

<template>
  <div class="profileImages overflow-hidden">
    <div class="ratio ratio-4x3">
      <BCarousel controls fade v-model="slide">
        <BCarouselSlide
          v-for="img in props.profile.profileImages"
          :key="img.url!"
          @click="handleImageClick"
          class="w-100 h-100"
        >
          <template #img>
            <ImageTag :image="img" />
          </template>
        </BCarouselSlide>
      </BCarousel>
    </div>
  </div>
  <BModal
    v-model="showModal"
    centered
    button-size="sm"
    modal-class="carousel-modal"
    :no-close-on-backdrop="false"
    :no-footer="true"
    :no-header="false"
    :no-title="true"
    cancel-title="Nevermind"
    initial-animation
    :body-scrolling="false"
    :fullscreen="true"
    :lazy="true"
    no-animation
    :title-visually-hidden="true"
  >
    <template #header-close>
      <IconCross class="svg-icon" />
    </template>
    <BCarousel controls indicators fade v-model="slide" class="w-100 h-100">
      <BCarouselSlide
        v-for="img in props.profile.profileImages"
        :key="img.url!"
        @click="handleCloseClick"
        class="w-100 h-100"
      >
        <template #img>
          <ImageTag :image="img" />
        </template>
      </BCarouselSlide>
    </BCarousel>
  </BModal>
</template>

<style scoped>
:deep(.carousel-inner) {
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
  /* filter: grayscale(100%) blur(5px); */
  /* opacity: 0.25; */
}
:deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
</style>
