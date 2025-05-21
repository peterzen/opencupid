<script lang="ts">
import { defineComponent } from 'vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';

export default defineComponent({
  name: 'ConnectionTypeSelector',
  components: { ToggleSwitch },
  props: {
    profileActive: {
      type: Boolean,
      required: true,
      default: false
    },
    datingActive: {
      type: Boolean,
      required: true,
      default: false
    },
    activeTab: {
      type: String,
      required: true,
    }
  },
  emits: [
    'update:profileActive',
    'update:datingActive',
    'update:selectTab'
  ],
  computed: {
    friendsToggleDisabled(): boolean {
      return this.profileActive && !this.datingActive;
    },
    datingToggleDisabled(): boolean {
      return this.datingActive && !this.profileActive;
    }
  },
  methods: {
    setProfileActive(val: boolean) {
      this.$emit('update:profileActive', val);
    },
    setDatingActive(val: boolean) {
      this.$emit('update:datingActive', val);
    },
  }
})
</script>

<template>
  <ul class="nav nav-tabs nav-fill">
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
          Socializing
        </a>
      </span>
    </li>
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
          Dating
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