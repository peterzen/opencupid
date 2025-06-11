<script setup lang="ts">
import { type MultiselectOption } from '@/lib/languages'
import type { GenderType, PronounsType } from '@zod/generated'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { filter } from 'remeda'
import { type OwnerProfile } from '@zod/dto/profile.schema'
import { useEnumOptions } from './composables/useEnumOptions'

const { t } = useI18n()

export type GenderPickerModel = {
  gender: GenderType | null
  pronouns: PronounsType | null
}

const props = defineProps<{
  modelValue: OwnerProfile
}>()

const emit = defineEmits<{
  (e: 'changed', value: GenderPickerModel): void
}>()

const formData = reactive<OwnerProfile>({ ...props.modelValue })

// Sync prop changes into formData
watch(
  () => props.modelValue,
  newVal => Object.assign(formData, newVal),
  { deep: true }
)

const gender = computed({
  get: () => formData.gender,
  set: val => {
    const changed = {
      pronouns: formData.pronouns,
      gender: val,
    }
    otherGendersVisible.value = false
    emit('changed', changed)
  },
})

const pronouns = computed({
  get: () => formData.pronouns,
  set: val => {
    const changed = {
      pronouns: val,
      gender: formData.gender,
    }
    emit('changed', changed)
  },
})

const { genderOptions, pronounsOptions } = useEnumOptions(t)

const otherGendersVisible = ref(false)

const genders = genderOptions() as MultiselectOption[]

const binaryGenders = computed(() => {
  const partitions = gender.value ? [gender.value] : ['male', 'female']
  return filter(genders, o => partitions.includes(o.value as GenderType))
})

const pronounsChoices = pronounsOptions() as MultiselectOption[]
</script>

<template>
  <div>
    <div class="row">
      <div class="col-6">
        <FormKit
          v-model="gender!"
          type="radio"
          label=""
          :options="binaryGenders"
          help="I identify as..."
        />

        <BButton v-b-toggle.collapse-1 variant="link-secondary" class="m-0 p-0">Other... </BButton>

        <BCollapse id="collapse-1" v-model="otherGendersVisible">
          <FormKit v-model="gender!" type="radio" label="" :options="genders" help="" />
        </BCollapse>
      </div>
      <div class="col-6">
        <FormKit
          v-model="pronouns!"
          type="radio"
          label=""
          :options="pronounsChoices"
          help="They refer to me as..."
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.formkit-options) {
  margin-bottom: 0;
}
</style>
