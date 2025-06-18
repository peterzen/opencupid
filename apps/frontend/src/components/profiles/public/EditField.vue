<script setup lang="ts">
import { type Component, inject, ref } from 'vue'
import IconPencil2 from '@/assets/icons/interface/pencil-2.svg'
import { useProfileStore } from '@/store/profileStore'
import useEditFields from '../composables/useEditFields'
import { type EditFieldProfileFormWithImages } from '@zod/profile/profile.form'

// Only allow field names that are accepted by getModelProxy
type AllowedFieldKey =
  | 'isSocialActive'
  | 'isDatingActive'
  | 'gender'
  | 'pronouns'
  | 'relationship'
  | 'hasKids'
  | 'publicName'
  | 'introSocial'
  | 'languages'
  | 'introDating'
  | 'birthday'
  | 'tags'
  | 'location'

const profileStore = useProfileStore()

const props = defineProps<{
  fieldName: AllowedFieldKey
  editComponent: Component
  buttonClass?: string // optional class for the button
  editProps?: Record<string, any> // allow additional props to be passed to the edit component
}>()

const isEditable = inject<boolean>('isEditable', false)
const editableModel = inject<EditFieldProfileFormWithImages>(
  'editableModel',
  {} as EditFieldProfileFormWithImages
)

const handleButtonClick = () => {
  profileStore.currentField = props.fieldName
  profileStore.open()
}

const { getModelProxy } = useEditFields(editableModel)
const fieldProxy = getModelProxy(props.fieldName)
</script>

<template>
  <span v-if="isEditable">
    <slot name="display"> </slot>
    <a href="#" @click="handleButtonClick" v-bind:class="props.buttonClass" class="me-2">
      <slot>
        <IconPencil2 class="svg-icon" />
      </slot>
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
