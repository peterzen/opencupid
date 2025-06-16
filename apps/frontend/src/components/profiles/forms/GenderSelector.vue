<script setup lang="ts">
import { type MultiselectOption } from '@/lib/languages'
import type { GenderType, PronounsType } from '@zod/generated'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { filter } from 'remeda'
import { useEnumOptions } from '../composables/useEnumOptions'

// i18n
const { t } = useI18n()

export type GenderPickerModel = {
  gender: GenderType | null
  pronouns: PronounsType | null
}

const model = defineModel<GenderPickerModel>({
  default: () => ({
    gender: null,
    pronouns: null,
  }),
})

// show all gender options
const showAll = ref(false)

const gender = computed({
  get: () => model.value.gender,
  set: val => {
    model.value = {
      ...model.value,
      gender: val,
    }
    showAll.value = false
  },
})

const pronouns = computed({
  get: () => model.value.pronouns,
  set: val => {
    model.value = {
      ...model.value,
      pronouns: val,
    }
  },
})

const { genderOptions, pronounsOptions } = useEnumOptions(t)

const pronounsChoices = pronounsOptions() as MultiselectOption[]

const allGenderOptions = genderOptions().filter(
  o => o.value !== 'unspecified'
) as MultiselectOption[]
const defaultGenderOptions = ['male', 'female']

const sortedOptions = computed(() => {
  const current = allGenderOptions.find(o => o.value === gender.value)

  if (showAll.value) return allGenderOptions

  if (gender.value === 'unspecified')
    return allGenderOptions.filter(o => defaultGenderOptions.includes(o.value))

  return current ? [current] : []
})

const showPronouns = computed(() => {
  return !['unspecified', 'male', 'female'].includes(gender.value as GenderType)
})
</script>
<template>
  <div>
    <BListGroup class="overflow-scroll" style="max-height: 40vh">
      <BListGroupItem
        v-for="g in sortedOptions"
        :key="g.value"
        class="d-flex justify-content-between align-items-center"
      >
        <BFormRadio
          name="gender"
          v-model="gender"
          :id="`list-gender-${g.value}`"
          :value="g.value"
          >{{ g.label }}</BFormRadio
        >
      </BListGroupItem>
    </BListGroup>
    <BButton
      v-if="!showAll"
      @click="() => (showAll = !showAll)"
      variant="link-secondary"
      class="m-0 p-0 w-100 text-center"
    >
      More options...
    </BButton>

    <div v-if="showPronouns && !showAll" class="mt-3">
      <label>They refer to me as...</label>
      <BListGroup>
        <BListGroupItem
          v-for="p in pronounsChoices"
          :key="p.value"
          class="d-flex justify-content-between align-items-center"
        >
          <BFormRadio
            name="pronouns"
            v-model="pronouns"
            :id="`list-pronouns-${p.value}`"
            :value="p.value"
            >{{ p.label }}</BFormRadio
          >
        </BListGroupItem>
      </BListGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
