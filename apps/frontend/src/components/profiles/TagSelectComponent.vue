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
import type { Tag } from '@zod/tags.schema';

// Instantiate Pinia store
const tagStore = useTagsStore();

// Reactive state
const tags = ref<Tag[]>([]);
const isLoading = ref(false);

// Props & Emits
const props = defineProps<{
  modelValue: Tag[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Tag[]): void
  (e: 'tags:selected', value: Tag[]): void
}>()

// const emit = defineEmits<{
//   (e: 'tags:selected', value: Tag[]): void
// }>()


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

// function handleChange(selected: Tag[]) {
//   console.log('handleChange:', selected);
//   selectedTags.value = selected
//     // Emit the change event to parent component
//     emit('tags:selected', selectedTags.value);
// }

// Computed v-model proxy (get from parent, set emits back)
const selected = computed<Tag[]>({
  get() {
    return props.modelValue || []
  },
  set(val: Tag[]) {
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
