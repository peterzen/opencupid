<script setup lang="ts">
import { type Component, inject, ref } from 'vue'
import DoodleIcons from '@/components/icons/DoodleIcons.vue'
import { useProfileStore } from '@/store/profileStore'
import useEditFields from '../composables/useEditFields'
import { OwnerProfileInput } from '@zod/profile/profile.dto'

type EditableFieldKey = keyof OwnerProfileInput

const profileStore = useProfileStore()

const props = defineProps<{
  fieldName: EditableFieldKey
  editComponent: Component
	buttonClass?: string // optional class for the button
  editProps?: Record<string, any> // allow additional props to be passed to the edit component
}>()

const isOwner = inject<boolean>('isOwner', false)
const editableModel = inject<OwnerProfileInput>('editableModel', {} as OwnerProfileInput)

const handleButtonClick = () => {
  profileStore.currentField = props.fieldName
  profileStore.open()
}

const { getModelProxy } = useEditFields(editableModel)
const fieldProxy = getModelProxy(props.fieldName)
</script>

<template>
  <span v-if="isOwner">
    <a href="#" @click="handleButtonClick" v-bind:class="props.buttonClass">
      <DoodleIcons name="IconPencil2" class="svg-icon" />
    </a>
    <Teleport to="#field-edit-modal" v-if="profileStore.fieldEditModal">
      <component
        :is="editComponent"
        v-bind="editProps"
        v-model="fieldProxy"
        v-if="profileStore.currentField === fieldName"
      />
    </Teleport>
  </span>
</template>
