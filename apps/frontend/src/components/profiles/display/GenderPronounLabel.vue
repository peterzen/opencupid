<script setup lang="ts">
import { PublicProfile } from '@zod/profile/profile.dto'
import { useDatingFields } from '../composables/useDatingFields'
import { useI18n } from 'vue-i18n'
import EditField from '@/components/profiles/public/EditField.vue'
import GenderSelector from '@/components/profiles/forms/GenderSelector.vue'
import PronounSelector from '../forms/PronounSelector.vue'
import GenderSymbol from './GenderSymbol.vue'
import { toRef } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  profile: PublicProfile
}>()
const profileRef = toRef(props, 'profile')
const { age, pronouns } = useDatingFields(profileRef, t)
</script>

<template>
  <div v-if="props.profile.isDatingActive" class="text-muted">
    <span class="me-1">{{ age }}</span>
    <span class="me-1 d-inline-flex align-items-center">
      <GenderSymbol v-if="props.profile.gender" :gender="props.profile.gender" />
      <EditField fieldName="gender" :editComponent="GenderSelector" >
      <template #display>({{ props.profile.gender }})</template>
    </EditField>
    </span>

    <span v-if="props.profile.pronouns && pronouns" class="d-inline-flex align-items-center">
      <span>{{ pronouns }}</span>
    </span>
    <EditField fieldName="pronouns" :editComponent="PronounSelector">
      <template #display>
        <span v-if="!pronouns || props.profile.pronouns==='unspecified'">{{ $t('profile.pronouns') }} </span>
      </template>
    </EditField>
  </div>
</template>
