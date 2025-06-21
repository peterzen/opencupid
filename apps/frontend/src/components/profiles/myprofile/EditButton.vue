<script setup lang="ts">
import { type ViewState } from './types'
import IconTick from '@/assets/icons/interface/tick.svg'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import IconPencil2 from '@/assets/icons/interface/pencil-2.svg'

const model = defineModel<ViewState>({
  default: {} as ViewState,
  required: true,
})
</script>

<template>
  <Transition name="scale" mode="out-in">
    <BButton
      v-if="model.isEditable"
      size="lg"
      class="btn-icon-lg"
      key="edit"
      @click="model.isEditable = false"
      variant="success"
    >
      <IconTick class="svg-icon me-1" />
    </BButton>
    <BButton
      v-else
      size="lg"
      class="btn-icon-lg"
      key="save"
      @click="model.isEditable = true"
      variant="primary"
    >
      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" class="animate__animated animate__fadeIn" />
      <!-- <IconPencil2 class="svg-icon-lg" /> -->
    </BButton>
  </Transition>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease;
  transition: opacity 0.25s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.9);
  opacity: 0.7;
}
.scale-enter-to,
.scale-leave-from {
  opacity: 1;
}
</style>
