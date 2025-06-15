<script setup lang="ts">
import IconDate from '@/assets/icons/app/cupid.svg'
import IconSocialize from '@/assets/icons/app/socialize.svg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type FormData = {
  isSocialActive: boolean
  isDatingActive: boolean
}

// Replace props/emits/watch with defineModel
const model = defineModel<FormData>({
  default: () => ({
    isSocialActive: false,
    isDatingActive: false,
  }),
})

const toggleSocial = () => {
  model.value.isSocialActive = !model.value.isSocialActive
}

const toggleDating = () => {
  model.value.isDatingActive = !model.value.isDatingActive
}
</script>

<template>
  <div class="d-flex gap-4 flex-row justify-content-between w-100">
    <button
      type="button"
      class="btn btn-social-toggle"
      :class="{ active: model.isSocialActive }"
      @click="toggleSocial"
    >
      <IconSocialize class="svg-icon-lg h-100 w-100" />
    </button>
    <button
      type="button"
      class="btn btn-dating-toggle"
      :class="{ active: model.isDatingActive }"
      @click="toggleDating"
    >
      <IconDate class="svg-icon-lg h-100 w-100" />
    </button>
  </div>
  <div class="d-flex gap-4 flex-row justify-content-between w-100 mt-3">
    <div>
      <p class="description-social">
        Describe sacializing 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum elementum
        pulvinar. Integer elementum congue odio ut scelerisque. Nam tincidunt scelerisque mauris,
        viverra,
      </p>
    </div>

    <div>
      <p  class="description-dating">
        Describe dating 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum elementum
        pulvinar. Integer elementum congue odio ut scelerisque. Nam tincidunt scelerisque mauris,
        viverra,
      </p>
    </div>
  </div>
</template>
<style scoped>
p {
  line-height: 1.25;
}
</style>
