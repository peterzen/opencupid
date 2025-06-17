<script setup lang="ts">
import { PublicProfile } from '@zod/profile/profile.dto'
import { useDatingFields } from '../composables/useDatingFields'
import { useI18n } from 'vue-i18n'

import RelationstatusSelector from '@/components/profiles/forms/RelationstatusSelector.vue'
import EditField from '@/components/profiles/public/EditField.vue'
import HaskidsSelector from '../forms/HaskidsSelector.vue'
import { toRef } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  profile: PublicProfile
}>()
const profileRef = toRef(props, 'profile')
const { relationshipStatus, hasKids } = useDatingFields(profileRef, t)
</script>

<template>
  <ul
    v-if="props.profile.isDatingActive"
    class="list-unstyled d-inline-flex flex-wrap align-items-center"
  >
    <li v-if="props.profile.relationship" class="me-2">
      <span class="badge text-bg-dating">{{ relationshipStatus }}</span>
      <EditField fieldName="relationship" :editComponent="RelationstatusSelector" />
    </li>
    <li v-if="props.profile.hasKids" class="me-2">
      <span class="badge text-bg-dating">{{ hasKids }}</span>
      <EditField fieldName="hasKids" :editComponent="HaskidsSelector" />
    </li>
  </ul>
</template>
