<script setup lang="ts">
import { IconArrowLeft, IconChevronsLeft } from '@/components/icons/DoodleIcons'
import LocationSelectorComponent from '@/components/profiles/forms/LocationSelector.vue'
import { useStepper } from '@vueuse/core'
import { LocationSchema, type LocationDTO } from '@zod/dto/location.dto'
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import z from 'zod'

import { PublicTagSchema } from '@zod/dto/tag.dto'
import {
  GenderSchema,
  HasKidsSchema,
  ProfileImageSchema,
  PronounsSchema,
  RelationshipStatusSchema,
  type GenderType,
  type PronounsType,
} from '@zod/generated'

import LanguageSelector from '@/components/profiles/forms/LanguageSelector.vue'
import AgeSelector from '@/components/profiles/forms/AgeSelector.vue'
import GoalsSelector from '../components/profiles/onboarding/GoalsSelector.vue'
import TagSelectComponent from '@/components/profiles/forms/TagSelectComponent.vue'
import GenderSelector from '@/components/profiles/forms/GenderSelector.vue'
import RelationstatusSelector from '@/components/profiles/forms/RelationstatusSelector.vue'
import IntrotextEditor from '@/components/profiles/forms/IntrotextEditor.vue'
import HaskidsSelector from '@/components/profiles/forms/HaskidsSelector.vue'
import ImageEditor from '@/components/profiles/image/ImageEditor.vue'
import NameInput from '../components/profiles/forms/NameInput.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { t } = useI18n()

const OnboardingFormSchema = z.object({
  publicName: z
    .string()
    .min(2, t('onboarding.name_required'))
    .max(50, t('onboarding.name_too_long'))
    .default(''),
  location: LocationSchema,
  birthday: z
    .date()
    .nullable()
    .refine(date => {
      if (!date) return false
      const today = new Date()
      const age = today.getFullYear() - date.getFullYear()
      return age >= 18 && age <= 100
    }, t('onboarding.age_invalid'))
    .optional(),
  languages: z.array(z.string()).default([]),
  tags: z.array(PublicTagSchema).default([]),
  isSocialActive: z.boolean().default(false),
  isDatingActive: z.boolean().default(false),
  gender: GenderSchema,
  pronouns: PronounsSchema,
  relationship: RelationshipStatusSchema.nullable(),
  hasKids: HasKidsSchema.nullable(),
  profileImages: z.array(ProfileImageSchema),
  introSocial: z.string(),
  introDating: z.string(),
})

type OnboardingForm = z.infer<typeof OnboardingFormSchema>

const {
  steps,
  stepNames,
  index,
  current,
  next,
  previous,
  isFirst,
  isLast,
  goTo,
  goToNext,
  goToPrevious,
  goBackTo,
  isNext,
  isPrevious,
  isCurrent,
  isBefore,
  isAfter,
} = useStepper({
  name: {
    title: t('onboarding.name_title'),
    schema: OnboardingFormSchema.pick({ publicName: true }),
    state: computed(() => (formData.publicName ? formData.publicName.length >= 3 : null)),
  },
  location: {
    title: 'Location',
    state: computed(() => (formData.location.country && formData.location.cityId ? true : false)),
  },
  looking_for: {
    title: 'Looking For',
    state: computed(() =>
      [formData.isDatingActive, formData.isSocialActive].some(t => t) ? true : false
    ),
  },
  languages: {
    title: 'Languages',
    state: computed(() => (formData.languages.length > 0 ? true : false)),
  },
  interests: {
    title: 'Interests',
    state: computed(() => formData.tags.length > 0), // Placeholder for interests step
  },
  age: {
    title: 'Age',
    state: computed(() =>
      OnboardingFormSchema.pick({ birthday: true }).safeParse(birthdayModel.value) ? true : false
    ),
  },
  gender: {
    title: 'Gender',
    state: computed(() => formData.gender && formData.pronouns), //
  },
  family_situation: {
    title: 'Family Situation',
    state: computed(() => formData.relationship && formData.hasKids), // Placeholder for family situation step
  },
  introSocial: {
    title: 'Intro Social',
    state: computed(() => formData.introSocial.length > 0), // Placeholder for intro social step
  },
  introDating: {
    title: 'Intro Dating',
    state: computed(() => formData.introDating.length > 0), // Placeholder for intro social step
  },

  photos: {
    title: 'Photos',
    state: computed(() => formData.profileImages.length > 0), // Placeholder for photos step
  },
})

const submitHandler = () => {
  console.log('Form submitted')
}

const formData = reactive<OnboardingForm>({
  publicName: '',
  // location: {
  //   country: '',
  //   cityId: '',
  //   cityName: '',
  // } as LocationDTO,
  location: {
    country: 'AD',
    cityId: 'cmbwaaywq00036wp34ual7mmw',
    cityName: '',
  } as LocationDTO,
  birthday: null,
  languages: ['en'],
  tags: [],
  isDatingActive: false,
  isSocialActive: true,
  gender: 'unspecified' as GenderType,
  pronouns: 'unspecified' as PronounsType,
  relationship: null,
  hasKids: null,
  profileImages: [],
  introSocial: '',
  introDating: '',
})

function modelProxy<T extends object, K extends keyof T>(target: T, key: K) {
  return computed({
    get: () => target[key],
    set: val => {
      target[key] = val
    },
  })
}
const publicNameModel = modelProxy(formData, 'publicName')
const birthdayModel = modelProxy(formData, 'birthday')
const relationshipModel = modelProxy(formData, 'relationship')
const hasKidsModel = modelProxy(formData, 'hasKids')
const introSocialModel = modelProxy(formData, 'introSocial')
const introDatingModel = modelProxy(formData, 'introDating')

const genderPronounsModel = computed({
  get: () => {
    return { gender: formData.gender, pronouns: formData.pronouns }
  },
  set: val => {
    formData.gender = val.gender
    formData.pronouns = val.pronouns
  },
})
</script>

<template>
  <main class="container pb-5 h-100 d-flex flex-column justify-content-center align-items-center">
    <div class="w-100 d-flex justify-content-between align-items-center">
      <BButton
        @click="goToPrevious"
        v-if="!isFirst"
        href="#"
        variant="link-secondary"
        class="d-flex align-items-center mt-2"
        size="lg"
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" class="" />
      </BButton>
    </div>
    <div class="d-flex align-items-center flex-grow-1 col-12 justify-content-center">
      <BForm id="onboarding" novalidate class="w-100" @submit.prevent="submitHandler">
        <fieldset v-if="isCurrent('name')" class="w-100">
          <legend>{{ current.title }}</legend>
          <NameInput v-model="publicNameModel" />
        </fieldset>

        <fieldset v-else-if="isCurrent('location')">
          <legend>I'm from...</legend>
          <LocationSelectorComponent v-model="formData.location" />
        </fieldset>

        <fieldset v-else-if="isCurrent('looking_for')">
          <legend>I'm looking for...</legend>
          <GoalsSelector v-model="formData" />
        </fieldset>

        <fieldset v-else-if="isCurrent('languages')">
          <legend>I speak...</legend>
          <LanguageSelector v-model="formData.languages" :required="true" />
        </fieldset>
        <fieldset v-else-if="isCurrent('interests')">
          <legend>My passions...</legend>
          <TagSelectComponent
            v-model="formData.tags"
            :label="t('onboarding.interests_label')"
            :placeholder="t('onboarding.interests_placeholder')"
            :required="true"
          />
        </fieldset>
        <fieldset v-else-if="isCurrent('age')">
          <legend>I was born...</legend>
          <AgeSelector v-model="birthdayModel" />
        </fieldset>

        <fieldset v-else-if="isCurrent('gender')">
          <legend>I identify as...</legend>
          <GenderSelector v-model="genderPronounsModel" />
        </fieldset>

        <fieldset v-else-if="isCurrent('family_situation')">
          <legend>My situation</legend>
          <div class="mb-3">
            <RelationstatusSelector v-model="relationshipModel" />
          </div>
          <HaskidsSelector v-model="hasKidsModel" />
        </fieldset>

        <fieldset v-else-if="isCurrent('photos')">
          <legend v-text="current.title"></legend>
          <ImageEditor />
        </fieldset>

        <fieldset v-else-if="isCurrent('introSocial')">
          <legend v-text="current.title"></legend>
          <IntrotextEditor v-model="introSocialModel" />
        </fieldset>
        <fieldset v-else-if="isCurrent('introDating')">
          <legend v-text="current.title"></legend>
          <IntrotextEditor v-model="introDatingModel" />
        </fieldset>

        <div class="w-100 text-center mt-4">
          <BButton @click="goToNext" :disabled="!current.state" variant="primary" size="lg" pill
            >Continue</BButton
          >
        </div>
      </BForm>
    </div>

    <!-- <pre>{{ formData }}</pre> -->
  </main>
</template>

<style lang="scss" scoped>
fieldset legend {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
