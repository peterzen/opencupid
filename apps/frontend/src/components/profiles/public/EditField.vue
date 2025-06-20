<script setup lang="ts">
import { type Component, inject, ref } from 'vue'
import IconPencil2 from '@/assets/icons/interface/pencil-2.svg'
import { useProfileStore } from '@/store/profileStore'
import useEditFields from '../composables/useEditFields'
import { type EditFieldProfileFormWithImages } from '@zod/profile/profile.form'

// Only allow field names that are accepted by getModelProxy
type AllowedFieldKey = keyof EditFieldProfileFormWithImages
// | 'isSocialActive'
// | 'isDatingActive'
// | 'gender'
// | 'pronouns'
// | 'relationship'
// | 'hasKids'
// | 'publicName'
// | 'introSocial'
// | 'languages'
// | 'introDating'
// | 'birthday'
// | 'tags'
// | 'location'

const profileStore = useProfileStore()

const props = defineProps<{
  fieldName: AllowedFieldKey
  editComponent: Component
  buttonClass?: string // optional class for the button
  wrapperClass?: string // optional class for the wrapper
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
// @ts-expect-error - TypeScript does not know about the dynamic nature of the field name
const fieldProxy = getModelProxy(props.fieldName)
</script>

<template>
  <span v-if="isEditable" class="editable-field" v-bind:class="props.wrapperClass">
    <slot name="display"> </slot>
    <a
      href="#"
      @click="handleButtonClick"
      v-bind:class="props.buttonClass"
      class="edit-button me-2"
    >
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

<style scoped lang="scss">
// .editable-field {
//   position: relative;
//   // display: flex;
//   // justify-content: end;
//   // display: inline-flex;
// }

// :deep(.editable-placeholder) {
//   border: 2px dashed var(--bs-secondary);
//   border-radius: 5px;
//   height: 4rem;
//   opacity: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
// }


// :deep(.editable-placeholder + .edit-button) {
//   transform: translate(-12rem, 0%);
//   background-color: red;
//   position: relative;
//   left:100%;

//   bottom: 2rem;
//   right:1rem;
//   // z-index: 5;
//   // right: 1rem;
//   // bottom:1.5rem;
// }
</style>
