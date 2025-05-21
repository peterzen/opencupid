<script lang="ts">
import { defineComponent } from 'vue';
import type { ConnectionTypeType } from '@zod/generated'
import ToggleSwitch from '@/components/ToggleSwitch.vue';

export default defineComponent({
  name: 'ConnectionTypeSelector',
  components: { ToggleSwitch },
  props: {
    modelValue: {
      type: Array as () => ConnectionTypeType[],
      required: true,
    },
  },
  data() {
    return {
      activeTab: 'friend',
    }
  },
  emits: ['update:modelValue'],
  computed: {
    profileActive: {
      get() {
        return this.modelValue.includes('friend');
      },
      set(val: boolean) {
        let arr = [...this.modelValue];
        if (val && !arr.includes('friend')) arr.push('friend');
        if (!val) arr = arr.filter(x => x !== 'friend');
        if (!arr.length) return; // Block removing last
        this.$emit('update:modelValue', arr)
      }
    },
    datingActive: {
      get() {
        return this.modelValue.includes('dating');
      },
      set(val: boolean) {
        let arr = [...this.modelValue];
        if (val && !arr.includes('dating')) arr.push('dating');
        if (!val) arr = arr.filter(x => x !== 'dating');
        if (!arr.length) return;
        this.$emit('update:modelValue', arr)
      }
    },
    friendsToggleEnabled() {
      return this.modelValue.includes('dating') || !this.modelValue.includes('friend');
    },
    datingToggleEnabled() {
      return this.modelValue.includes('friend') || !this.modelValue.includes('dating');
    },
  },
})
</script>



<template>
  <ul class="nav nav-tabs nav-fill">
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'friend' }">

        <ToggleSwitch value="friend"
                      :disabled="!friendsToggleEnabled"
                      label=""
                      v-model="profileActive" />
        <a class="tab-switch"
           @click="activeTab = 'friend'">
          Socializing
        </a>
      </span>
    </li>
    <li class="nav-item">
      <span class="nav-link text-start"
            :class="{ active: activeTab === 'dating' }">
        <ToggleSwitch value="dating"
                      :disabled="!datingToggleEnabled"
                      label=""
                      v-model="datingActive" />
        <a class="tab-switch"
           @click="activeTab = 'dating'">
          Dating
        </a>
      </span>

    </li>
  </ul>

  <div class="tab-content p-3 border border-top-0">
    <div v-if="activeTab === 'friend'"
         class="tab-pane active">
      <div class="d-flex align-items-center mb-3">
        <span class="me-2">Profile Active</span>
      </div>
      <fieldset :disabled="!profileActive">
        <!-- Profile form fields here -->
      </fieldset>
    </div>
    <div v-if="activeTab === 'dating'"
         class="tab-pane active">
      <div class="d-flex align-items-center mb-3">
        <span class="me-2">Dating Profile Active</span>
      </div>
      <fieldset :disabled="!datingActive">
        <!-- Dating profile form fields here -->
      </fieldset>
    </div>
  </div>

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