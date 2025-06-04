<script setup lang="ts">
import { computed } from 'vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { useI18n } from 'vue-i18n';
import { type ConnectionTypeType } from '@zod/generated';

import IconDate from '@/assets/icons/app/cupid.svg'
import IconSocialize from '@/assets/icons/app/socialize.svg'

const { t } = useI18n()

// Props
const props = defineProps<{
  isDatingActive: boolean
  activeTab: ConnectionTypeType
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:isDatingActive', val: boolean): void
  (e: 'update:selectTab', tab: ConnectionTypeType): void
}>()


</script>


<template>
  <ul class="nav nav-tabs nav-fill">
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'friend' }">


        <a class="tab-switch"
           @click="$emit('update:selectTab', 'friend')">
            <span class="d-flex align-items-center">
            <IconSocialize class="svg-icon-lg w-100" />
          </span>
        <!-- {{ t('general.connectiontypes.socializing') }} -->
        </a>
      </span>
    </li>
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'dating' }">
        <!-- <ToggleSwitch value="dating"
                      :disabled="false"
                      label=""
                      @update:modelValue="val => $emit('update:isDatingActive', val)"
                      :modelValue="isDatingActive" /> -->
        <a class="tab-switch"
           @click="$emit('update:selectTab', 'dating')">
          <span class="d-flex align-items-center">
            <IconDate class="svg-icon-lg w-100" />
          </span>
          <!-- {{ t('general.connectiontypes.dating') }} -->
        </a>
      </span>

    </li>
  </ul>
</template>

<style lang="scss" scoped>
// @import "bootstrap/scss/functions";
// @import "bootstrap/scss/variables";
// @import "bootstrap/scss/mixins";
// @import "bootstrap/scss/nav";

.nav-link {
  display: flex;
  flex-direction: row;
  font-weight: bold;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.tab-switch {
  padding-left: 1rem;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.svg-icon-lg {
  width: 4rem;
  height: 4rem;
  fill: #fff;
  // stroke: white;
}
</style>