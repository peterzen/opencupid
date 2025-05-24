<script setup lang="ts">
import { computed } from 'vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { useI18n } from 'vue-i18n';
import { ConnectionTypeType } from '@zod/generated';

const { t } = useI18n()

// Props
const props = defineProps<{
  isSocialActive: boolean
  isDatingActive: boolean
  activeTab: ConnectionTypeType
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:isSocialActive', val: boolean): void
  (e: 'update:isDatingActive', val: boolean): void
  (e: 'update:selectTab', tab: ConnectionTypeType): void
}>()

// Computed disabling logic
const friendsToggleDisabled = computed(() =>
  props.isSocialActive && !props.isDatingActive
)
const datingToggleDisabled = computed(() =>
  props.isDatingActive && !props.isSocialActive
)

</script>


<template>
  <ul class="nav nav-tabs nav-fill">
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'friend' }">

        <ToggleSwitch value="friend"
                      :disabled="false"
                      label=""
                      @update:modelValue="val => $emit('update:isSocialActive', val)"
                      :modelValue="isSocialActive" />
        <a class="tab-switch"
           @click="$emit('update:selectTab', 'friend')">
          {{ t('general.connectiontypes.socializing') }}
        </a>
      </span>
    </li>
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'dating' }">
        <ToggleSwitch value="dating"
                      :disabled="false"
                      label=""
                      @update:modelValue="val => $emit('update:isDatingActive', val)"
                      :modelValue="isDatingActive" />
        <a class="tab-switch"
           @click="$emit('update:selectTab', 'dating')">
          {{ t('general.connectiontypes.dating') }}
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
</style>