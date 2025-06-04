<script setup lang="ts">
import { computed, ref } from 'vue';
import Multiselect from 'vue-multiselect';
import { useTagsStore } from '@/store/tagStore';

import { type PublicTag } from '@zod/tag.schema';

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

async function addTag(name: string) {
  const create = {
    name: name,
  }
  isLoading.value = true;
  try {
    const newTag = await tagStore.addUserTag(create)
    console.log('Adding new tag:', newTag);
    tags.value.push(newTag)
    selected.value.push(newTag) // Update the selected tags
    emit('update:modelValue', selected.value)
  } catch (error) {
    console.error('Failed to add tag:', error);
    return;
  } finally {
    isLoading.value = false;
  }
}

</script>


<template>
  <div class="interests-multiselect">
    <Multiselect v-model="selected"
                 :options="tags"
                 :multiple="true"
                 :loading="isLoading"
                 :searchable="true"
                 :close-on-select="false"
                 :clear-on-select="false"
                 :internal-search="false"
                 :taggable="true"
                 tag-placeholder="Add this as new tag"
                 @tag="addTag"
                 label="name"
                 track-by="id"
                 placeholder="Search tags"
                 @search-change="asyncFind" />
  </div>
</template>



<style lang="scss">
.interests-multiselect {
  .multiselect__tag {
    background-color: var(--bs-warning);
    color: var(--bs-body-bg);

    i:after {
      color: var(--bs-text-secondary);
    }
  }
}
</style>
