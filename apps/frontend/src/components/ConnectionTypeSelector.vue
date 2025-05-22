<script setup lang="ts">
import { computed } from 'vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

// Props
const props = defineProps<{
  profileActive: boolean
  datingActive: boolean
  activeTab: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:profileActive', val: boolean): void
  (e: 'update:datingActive', val: boolean): void
  (e: 'update:selectTab', tab: string): void
}>()

// Computed disabling logic
const friendsToggleDisabled = computed(() =>
  props.profileActive && !props.datingActive
)
const datingToggleDisabled = computed(() =>
  props.datingActive && !props.profileActive
)

// Methods
function setProfileActive(val: boolean) {
  emit('update:profileActive', val)
  emit('update:selectTab', 'profile')
}

function setDatingActive(val: boolean) {
  emit('update:datingActive', val)
  emit('update:selectTab', 'dating')
}
</script>


<template>
  <ul class="nav nav-tabs nav-fill">
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'dating' }">
        <ToggleSwitch value="dating"
                      :disabled="datingToggleDisabled"
                      label=""
                      @update:modelValue="val => $emit('update:datingActive', val)"
                      :modelValue="datingActive" />
        <a class="tab-switch"
           @click="$emit('update:selectTab', 'dating')">
          {{ t('general.connectiontypes.dating') }}
        </a>
      </span>

    </li>
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'friend' }">

        <ToggleSwitch value="friend"
                      :disabled="friendsToggleDisabled"
                      label=""
                      @update:modelValue="val => $emit('update:profileActive', val)"
                      :modelValue="profileActive" />
        <a class="tab-switch"
           @click="$emit('update:selectTab', 'friend')">
          {{ t('general.connectiontypes.socializing') }}
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