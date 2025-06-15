<script setup lang="ts">
import { getLanguageSelectorOptions, type MultiselectOption } from '@/lib/languages'
import { computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import Multiselect from 'vue-multiselect'

const { t } = useI18n()

const props = defineProps<{
  modelValue?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const languageOptions = reactive([] as MultiselectOption[])
const languagesComputed = computed({
  get: () => (props.modelValue ?? []).map(lang => languageOptions.find(opt => opt.value === lang)),
  set: (options: MultiselectOption[]) => {
    const newVal = options.map(opt => opt.value)
    emit('update:modelValue', newVal)
  },
})

onMounted(() => {
  languageOptions.push(...getLanguageSelectorOptions())
})
</script>

<template>
  <div class="languages-multiselect">
    <Multiselect
      v-model="languagesComputed"
      :options="languageOptions"
      :close-on-select="false"
      :clear-on-select="true"
      :multiple="true"
      :searchable="true"
      open-direction="top"
      :maxHeight="100"
      id="languages"
      label="label"
      track-by="label"
      placeholder=""
			:showLabels="false"
      :showNoResults="false"
			:selectLabel="t('common.forms.multiselect.select')"
			:deselectLabel="t('common.forms.multiselect.deselect')"
    >
      <template v-slot:noResult></template>
      <template #singleLabel="props">
        {{ t(props.option.label) }}
      </template>

      <template #option="props">
        {{ t(props.option.label) }}
      </template>
    </Multiselect>
  </div>
</template>

<style scoped lang="scss">
:deep(.multiselect__tag) {
  background-color: var(--bs-info);
  color: var(--bs-body-bg);
	user-select: none;

  i:after {
    color: var(--bs-text-secondary);
  }
}
:deep(.multiselect__input) {
	color: var(--bs-text-secondary);
	background-color: var(--bs-body-bg);
	padding: 0.25rem 0.5rem;
}
</style>
