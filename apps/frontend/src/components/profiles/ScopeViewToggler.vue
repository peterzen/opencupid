<script setup lang="ts">
import IconDate from '@/assets/icons/app/cupid.svg'
import IconSocialize from '@/assets/icons/app/socialize.svg'
import { type ScopeSelectModel } from '@/components/profiles/types'

const vm = defineModel<ScopeSelectModel>({
  default: () => {},
})
</script>

<template>
  <a
    href="#"
    class="link nav-link-social mx-2"
    :class="{
      active: vm.currentScope === 'social',
    }"
    @click="vm.currentScope = 'social'"
  >
    <IconSocialize class="svg-icon-100" />
  </a>
  <a
    href="#"
    class="link nav-link-dating"
    :class="{
      active: vm.currentScope === 'dating',
    }"
    @click="vm.currentScope = 'dating'"
  >
    <IconDate class="svg-icon-100" />
  </a>
</template>

<style lang="css" scoped>
.link {
  padding: 0.25rem 2rem;
  height: 3rem;
}
a.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
  filter: grayscale(100%);
}
</style>
