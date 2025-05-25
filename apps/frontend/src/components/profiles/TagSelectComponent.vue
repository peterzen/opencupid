<template>
  <div class="tags-multiselect">
    <Multiselect v-model="selected"
                 :options="tags"
                 :multiple="true"
                 :loading="isLoading"
                 :searchable="true"
                 :close-on-select="false"
                 :clear-on-select="false"
                 :internal-search="false"
                 label="name"
                 track-by="id"
                 placeholder="Search tags"
                 @search-change="asyncFind" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Multiselect from 'vue-multiselect';
import { useTagsStore } from '@/store/tagStore';
import type { PublicTag } from '@zod/tags.schema';

// Instantiate Pinia store
const tagStore = useTagsStore();

// Reactive state
const tags = ref<PublicTag[]>([]);
const isLoading = ref(false);

// Props & Emits
const props = withDefaults(
  defineProps<{
    modelValue?: PublicTag[]
  }>(),
  {
    modelValue: () => [] as PublicTag[]
  }
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: PublicTag[]): void
  (e: 'tags:selected', value: PublicTag[]): void
}>()

/**
 * Called when the user types in the search input
 */
async function asyncFind(query: string) {
  if (!query) {
    tags.value = [];
    return;
  }
  isLoading.value = true;
  try {
    tags.value = await tagStore.searchTags(query);
  } catch (error) {
    console.error('Failed to search tags:', error);
  } finally {
    isLoading.value = false;
  }
}

// Computed v-model proxy (get from parent, set emits back)
const selected = computed<PublicTag[]>({
  get() {
    return props.modelValue || []
  },
  set(val: PublicTag[]) {
    emit('update:modelValue', val)
    emit('tags:selected', val)
  }
})


</script>

<style lang="scss" scoped>
.tags-multiselect {
  .multiselect {
    width: 100%;
  }
}
</style>
