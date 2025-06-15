<script setup lang="ts">
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { useTagsStore } from '@/store/tagStore'
import type { PublicTag } from '@zod/dto/tag.dto'

// Store
const tagStore = useTagsStore()

// v-model binding
const model = defineModel<PublicTag[]>({
  default: () => [],
})

// State
const tags = ref<PublicTag[]>([])
const isLoading = ref(false)

/**
 * Called when the user types in the search input
 */
async function asyncFind(query: string) {
  if (!query) {
    tags.value = []
    return
  }
  isLoading.value = true
  try {
    tags.value = await tagStore.search(query)
  } catch (error) {
    console.error('Failed to search tags:', error)
  } finally {
    isLoading.value = false
  }
}

async function addTag(name: string) {
  isLoading.value = true
  try {
    const newTag = await tagStore.create({ name })
    tags.value.push(newTag)
    model.value.push(newTag)
  } catch (error) {
    console.error('Failed to add tag:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="interests-multiselect">
    <Multiselect
      v-model="model"
      :options="tags"
      :multiple="true"
      :loading="isLoading"
      :searchable="true"
      :close-on-select="false"
      :clear-on-select="true"
      :internal-search="false"
      :show-labels="false"
      :show-no-results="true"
      :show-no-options="false"
      :taggable="true"
      open-direction="top"
      @tag="addTag"
      label="name"
      track-by="id"
      tag-placeholder="Add this as new tag"
      placeholder="Search interests..."
      @search-change="asyncFind"
    />
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
