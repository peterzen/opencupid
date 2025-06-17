<script setup lang="ts">
import LocationSelectorComponent from '@/components/profiles/forms/LocationSelector.vue'
import { useStepper } from '@vueuse/core'
import { type LocationDTO } from '@zod/dto/location.dto'
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { type GenderType, type PronounsType } from '@zod/generated'

import LanguageSelector from '@/components/profiles/forms/LanguageSelector.vue'
import AgeSelector from '@/components/profiles/forms/AgeSelector.vue'
import GoalsSelector from '../components/profiles/onboarding/GoalsSelector.vue'
import TagSelectComponent from '@/components/profiles/forms/TagSelectComponent.vue'
import GenderSelector from '@/components/profiles/forms/GenderPronounSelector.vue'
import RelationstatusSelector from '@/components/profiles/forms/RelationstatusSelector.vue'
import IntrotextEditor from '@/components/profiles/forms/IntrotextEditor.vue'
import HaskidsSelector from '@/components/profiles/forms/HaskidsSelector.vue'
import ImageEditor from '@/components/profiles/image/ImageEditor.vue'
import PublicNameInput from '../components/profiles/forms/PublicNameInput.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/store/profileStore'
import {
  type EditableOwnerProfile,
  EditableOwnerProfileSchema,
} from '@zod/profile/profile.dto'
import useEditFields from '@/components/profiles/composables/useEditFields'

const { t } = useI18n()
const profileStore = useProfileStore()

// https://github.com/vueuse/vueuse/blob/main/packages/core/useStepper/index.md
// https://playground.vueuse.org/?vueuse=13.3.0#eNrFWG1v2zYQ/isXf6htIFLarvtixGle0AIthjZYsu3DPAy0dHKYUKRAUk68LP99R4p6sx03aTv0SyKRx7vnnjvenXw/OCmKeFniYDI4NInmhQWDtixAMLmYzgbWzAZHM8nzQmkL91AavLBYFKjhATKtchge03FaPkiUxmFHVCNLLF9iI0hytD+TiZLGQqZ0DtNGanQ/kwAZ18Z+YjlOYPhRyeG+WxSsWasW5lwILhcnaarRmGaZ9FpN2k6SBAuL6QQyJgxWe0zPlfycZeSdpbPdvYKtcpSW9CQaU24jEk6HwAwMaatgYgj/9vfo2MO4dcUERqYdeip/hrSgIy6ds8xy8mgCfgPAciucS7+RBHQlPCYAbn5ngpMTozFMjzxdcUMPvHhRrdTc+EMP/u8w0BOxip9Nk6eVANQCOyz2qX4bW81z2t6bTmvWg1GLOt9i6tIv7zCwHjSYkmqry55HIUKb6s/DxnYDf/aD1oTzr5jLRJQpmpHHENSPG5NVcLNSUmoqCaac59ySTm+dZzAKEY+TUms6GS+ZKDEO5kdjOu7g1FILdak+4R1pINU9zUwIly/mFAkInmisFHCZ4t0EZJnPUY8nMFdKIJOVfU33U0vYO9GarWJ3tUb3IFAu7NWEEolOkg+BAVkKEcDERuU4Gv29D9xv7dXomB3x8dseeAJ5eFCVA7r89GIxLwSzSG8Ahylf+ofqERJKQkO1IhNkesGK6DVcl8bybBUlRA5qX0KceDiwjMhbOuBpJDypx8SJ6ADJ/TcVqbMBTG5wRdI8pefaVkclKZ2X1irCWS8ATFJu2FxgSrJ7j7E8dteotsnD9oinY9Lf0XWcCJ7ckKJuPDfFlpGlGAex2GdoV+Cg5eCgQ2B4Dm++KNY+5jZ69ZJ8Pq7yLy40LolPZ8EvdGk1BaVHfdDhiMSCLpi00VwJR1wP3WbqBrhdlBuhdX+iRIm16IaQE9rX/ai0XvZiz7MOCm7OKhyjzVJJ/PbOBzeP3rsqCNJ1BMpSt7ImxWVRWrKUqxSFQ9+rnZ0s2iPQL+OfacWuCgzMPWL1F6q0zzZal+dn2uxnxZPYWy/6W8jbirBf4L83qqorbMGynhsdgNzd2apfR6pp2D6Fe8jXW3qLPbnC5Gau7jqs53otO4NJweYoXCfabvPoAzDfmMAqSLFQhltgYZqAVhIyxMMDr2zd085lf7r3oSlucXqtXX67042pjq9XCD5y5KF/qYWe6uJXZErd4r8mV9omv0lY0NvypFnK1QZJ4MvgurIvUNcTPfNvLjXS75gJ1cTy7W7VenZ71EjRXHXOxHPD/Xj4N3tB1bLrhGiGEW5cnW1bf7eNf2Ho2nDOjVx9mJXRXUD+DxwXVbfejaTPYX9EcBFvZ4TH+7JrxG9cI37Vvfa9A7dRRiMhFHckWKyobWtV0siY0oipU+rl1b8oZ24aK1iCkRNSS9SZULcRK6kOXnkd/V7fmz86c8fRe8K+0TAPaZRpJxLnXn/0WMufH+vBH/wff6d3+hByYqsb/ef66fCgM1QP9ulLm6psxhfxtVGSPsf9rO/qc15wgfpz4WYiatDNN9BsQHOtuv3o15ovJn/GtYIt69eGusOEHs6p16NeUmY3e5bpBVI9cdvvLvzVaTep9JRuPNyx+SsaJUqHsRI7paAQ7I6cR/vB/zpAHfPSvLuzKE3tlAPafvHNBvRjwdkO11u4P8Vv/Dn6ahk8/AcWuUbe
const { current, isFirst, stepNames, steps, goToNext, goToPrevious, goTo, isNext, isCurrent } =
  useStepper({
    publicname: {
      state: computed(() => (formData.publicName ? formData.publicName.length >= 3 : null)),
      flags: '',
      isCompleted: false,
    },
    location: {
      state: computed(() => (formData.location.country && formData.location.cityId ? true : false)),
      flags: '',
      isCompleted: false,
    },
    looking_for: {
      state: computed(() =>
        [formData.isDatingActive, formData.isSocialActive].some(t => t) ? true : false
      ),
      flags: '',
      isCompleted: false,
    },
    interests: {
      state: computed(() => formData.tags.length > 0),
      flags: '',
      isCompleted: false,
    },
    languages: {
      state: computed(() => (formData.languages.length > 0 ? true : false)),
      flags: '',
      isCompleted: false,
    },
    introSocial: {
      state: computed(() => formData.introSocial.length > 0),
      flags: '',
      isCompleted: false,
    },
    photos: {
      state: computed(() => true),
      flags: 'stage_one_end',
      isCompleted: false,
    },

    // Dating steps
    age: {
      state: computed(() =>
        EditableOwnerProfileSchema.pick({ birthday: true }).safeParse(birthdayModel.value)
          ? true
          : false
      ),
      flags: '',
      isCompleted: false,
    },
    gender: {
      state: computed(() => formData.gender && formData.pronouns),
      flags: '',
      isCompleted: false,
    },
    family_situation: {
      state: computed(() => formData.relationship && formData.hasKids),
      flags: '',
      isCompleted: false,
    },
    introDating: {
      state: computed(() => formData.introDating.length > 0),
      flags: 'stage_two_end',
      isCompleted: false,
    },
    confirm: {
      state: computed(() => true),
      flags: '',
      isCompleted: false,
    },
  })

const formData = reactive<EditableOwnerProfile>({
  id: '',
  publicName: 'dfgdfg',
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
  introSocial: 'dfgdfg',
  introDating: 'dfgdfg',
  profileImages: [],
})

const {
  publicNameModel,
  birthdayModel,
  relationshipModel,
  hasKidsModel,
  introSocialModel,
  introDatingModel,
  genderPronounsModel,
} = useEditFields(formData)

const isLoading = ref(false)
const isComplete = ref(false)

const saveProfile = async () => {
  isLoading.value = true
  await profileStore.updateProfile(formData)
  console.log('Profile saved:', formData)
  isLoading.value = false
  // setTimeout(() => {
  //   console.log('Saving profile data:', formData)
  //   // Simulate saving data
  //   isLoading.value = false
  // }, 2000)
  // isLoading.value = false
}

onMounted(async () => {
  await profileStore.fetchUserProfile()
  Object.assign(formData, profileStore.profile)
})

const handleNext = async () => {
  if (current.value) {
    current.value.isCompleted = true
    if (current.value.flags === 'stage_one_end') {
      console.log('Stage completed:', current.value.state)
      if (formData.isDatingActive) {
        goToNext()
      } else {
        isComplete.value = true
        goTo('confirm')
        await saveProfile()
      }
    }
    if (current.value.flags === 'stage_two_end') {
      isComplete.value = true
      goTo('confirm')
      await saveProfile()
      console.log('Stage completed:', current.value.state)
    }
    if (current.value.state) {
      goToNext()
    } else {
      console.warn('Current step is not valid')
    }
  } else {
    console.warn('No current step found')
  }
}

const submitHandler = () => {
  console.log('Form submitted')
}
const router = useRouter()
const handleGoToProfile = async () => {
  router.push({ name: 'MyProfile' })
}

const handleGoToBrowse = () => {
  router.push({ name: 'BrowseProfiles' })
}

const handlePrevious = () => {
  current.value.isCompleted = false
  goToPrevious()
}
</script>

<template>
  <main class="container pb-5 h-100 d-flex flex-column justify-content-center align-items-center">
    <div class="w-100 d-flex justify-content-between align-items-center">
      <BButton
        @click="handlePrevious"
        v-if="!isFirst && !isComplete"
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
        <fieldset v-if="isCurrent('publicname')" class="w-100">
          <legend>{{ t('onboarding.name_title') }}</legend>
          <PublicNameInput v-model="publicNameModel" />
        </fieldset>

        <fieldset v-else-if="isCurrent('location')">
          <legend>I'm from...</legend>
          <LocationSelectorComponent v-model="formData.location" />
        </fieldset>

        <fieldset v-else-if="isCurrent('looking_for')">
          <legend>The connections I'm looking for...</legend>
          <GoalsSelector v-model="formData" />
        </fieldset>

        <fieldset v-else-if="isCurrent('languages')">
          <legend>I speak...</legend>
          <LanguageSelector v-model="formData.languages" :required="true" />
        </fieldset>

        <fieldset v-else-if="isCurrent('interests')">
          <legend>I'm into...</legend>
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
          <legend>I look like...</legend>
          <ImageEditor />
        </fieldset>

        <fieldset v-else-if="isCurrent('introSocial')">
          <legend>About me...</legend>
          <IntrotextEditor
            v-model="introSocialModel"
            :languages="formData.languages"
            placeholder="Tell a bit about yourself"
          />
        </fieldset>

        <fieldset v-else-if="isCurrent('introDating')">
          <legend>I would like to find:</legend>
          <IntrotextEditor
            v-model="introDatingModel"
            :languages="formData.languages"
            placeholder="Give people an idea who you're after."
          />
        </fieldset>

        <fieldset v-else-if="isCurrent('confirm')">
          <div v-if="isLoading" class="text-center">
            <SpinnerComponent />
          </div>
          <div v-else>
            <legend>Done!</legend>
            <div v-if="!isLoading" class="d-flex flex-column gap-3">
              <BButton
                @click="handleGoToProfile"
                variant="success"
                size="lg"
                pill
                class="d-flex align-items-center justify-content-center"
                >Go to my profile</BButton
              >
              <BButton
                @click="handleGoToBrowse"
                variant="success"
                size="lg"
                pill
                class="d-flex align-items-center justify-content-center"
                >Go find people</BButton
              >
            </div>
          </div>
        </fieldset>

        <div class="w-100 text-center mt-4">
          <BButton
            @click="handleNext"
            :disabled="!current.state"
            v-if="!isComplete"
            variant="primary"
            size="lg"
            pill
            >Continue</BButton
          >
        </div>
      </BForm>
      <!-- <div v-if="!isComplete" class="d-flex justify-content-center indicators ">
        <ul class="list-unstyled text-muted">
          <li v-for="stepKey in stepNames" :key="stepKey" class="d-inline">
            <FontAwesomeIcon
              :icon="steps[stepKey].isCompleted ? 'fa-solid fa-circle' : 'fa-circle-dot'"
              class="me-2"
            />
          </li>
        </ul>
      </div> -->
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
  color: var(--bs-secondary);
}
.indicators {
  bottom: 0;
  margin-bottom: 1rem;
  font-size: 0.5rem;
  position: absolute;
  opacity: 0.2;
}
</style>
