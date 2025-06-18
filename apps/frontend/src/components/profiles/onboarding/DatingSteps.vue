<script setup lang="ts">
import useEditFields from '@/components/profiles/composables/useEditFields'
import { EditProfileForm } from '@zod/profile/profile.form'
import AgeSelector from '@/components/profiles/forms/AgeSelector.vue'
import GenderPronounSelector from '@/components/profiles/forms/GenderPronounSelector.vue'
import RelationstatusSelector from '@/components/profiles/forms/RelationstatusSelector.vue'
import IntrotextEditor from '@/components/profiles/forms/IntrotextEditor.vue'
import HaskidsSelector from '@/components/profiles/forms/HaskidsSelector.vue'

const formData = defineModel<EditProfileForm>({
  default: () => ({
    birthday: null,
    genderPronouns: null,
    relationshipStatus: null,
    hasKids: null,
    introSocial: '',
    introDating: '',
  }),
})

const props = defineProps<{
  isCurrent: (step: any) => boolean
}>()

const {
  publicNameModel,
  birthdayModel,
  relationshipModel,
  hasKidsModel,
  introSocialModel,
  introDatingModel,
  genderPronounsModel,
} = useEditFields(formData.value)
</script>

<template>
  <fieldset v-if="isCurrent('age')">
    <legend>I was born...</legend>
    <AgeSelector v-model="birthdayModel" />
  </fieldset>

  <fieldset v-else-if="isCurrent('gender')">
    <legend>I identify as...</legend>
    <GenderPronounSelector v-model="genderPronounsModel" />
  </fieldset>

  <fieldset v-else-if="isCurrent('family_situation')">
    <legend>My situation</legend>
    <div class="mb-3">
      <RelationstatusSelector v-model="relationshipModel" />
    </div>
    <HaskidsSelector v-model="hasKidsModel" />
  </fieldset>

  <fieldset v-else-if="isCurrent('introDating')">
    <legend>I would like to find:</legend>
    <IntrotextEditor
      v-model="introDatingModel"
      :languages="formData.languages"
      placeholder="Give people an idea who you're after."
    />
  </fieldset>
</template>
