<script setup lang="ts">
import IconDate from '@/assets/icons/app/cupid.svg'
import IconSocialize from '@/assets/icons/app/socialize.svg'

const model = defineModel<string>({
  default: 'social',
})
</script>

<template>
  <ul pills class="nav nav-pills w-100 d-flex align-items-center">
    <li class="col-2">
      <slot name="items-left"></slot>
    </li>

    <li class="col-8 d-flex nav-item justify-content-center align-items-center">
      <a
        href="#"
        class="link nav-link-social mx-2"
        :class="{ active: model === 'social' }"
        @click="model = 'social'"
      >
        <IconSocialize class="svg-icon-100" />
      </a>
      <a
        href="#"
        class="link nav-link-dating"
        :class="{ active: model === 'dating' }"
        @click="model = 'dating'"
      >
        <IconDate class="svg-icon-100" />
      </a>
    </li>

    <li class="col-2 d-flex justify-content-end">
      <slot name="items-right"> </slot>
    </li>
  </ul>
</template>
<style lang="css" scoped>

.link {
  padding:0.25rem 2rem;
  height: 3rem;
}

</style>