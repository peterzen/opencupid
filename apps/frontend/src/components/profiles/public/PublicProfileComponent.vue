<script lang="ts" setup>
import GenderSymbol from '@/components/profiles/GenderSymbol.vue';
import { countryCodeToName } from '@/lib/countries';
import { getLanguageList } from '@/lib/languages';
import { type PublicProfile } from '@zod/profile.schema';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEnumOptions } from '../composables/useEnumOptions';
import ProfileImageComponent from '../ProfileImageComponent.vue';

const { t } = useI18n()


const props = defineProps<{
  profile: PublicProfile
  isLoading: boolean
}>();


const age = computed(() => {
  if (!props.profile.isDatingActive) return ''
  if (!props.profile.birthday) return '';

  const birthDate = new Date(props.profile.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

const countryName = computed(() => {
  return props.profile.country ? countryCodeToName(props.profile.country) : '';
});

const languages = computed(() => {
  return getLanguageList(props.profile.languages)
});

const { relationshipStatusLabels, pronounsLabels, hasKidsLabels } = useEnumOptions(t)


const hasKidsLabel = computed(() => {
  if (!props.profile.isDatingActive || props.profile.hasKids === 'unspecified') return ''
  return hasKidsLabels()[props.profile.hasKids!] || props.profile.hasKids
})


const relationshipStatusLabel = computed(() => {
  if (!props.profile.isDatingActive) return ''
  if (!props.profile.relationship || props.profile.relationship === 'unspecified') return ''

  return relationshipStatusLabels()[props.profile.relationship] || props.profile.relationship
})

const pronounsLabel = computed(() => {
  if (!props.profile.isDatingActive) return ''
  if (!props.profile.pronouns || props.profile.pronouns === 'unspecified') return ''

  return pronounsLabels()[props.profile.pronouns] || props.profile.pronouns
})


</script>


<template>

  <div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="profileImages overflow-hidden">
          <div class="ratio ratio-4x3">
            <BCarousel controls>
              <BCarouselSlide v-for="img in props.profile.profileImages"
                              :key="img.url!">
                <template #img>
                  <ProfileImageComponent :image="img"
                                         className="img-fluid" />
                </template>
              </BCarouselSlide>
            </BCarousel>
          </div>
        </div>
        <div class="publicname-wrapper">
          <span class="fw-bolder fs-2">{{ props.profile.publicName }}</span>
          <span v-if="props.profile.isDatingActive">
            <span class="text-muted fs-5">
              ({{ age }}
              <GenderSymbol v-if="props.profile.gender"
                            :gender="props.profile.gender" />

              <span v-if="props.profile.pronouns && pronounsLabel"
                    class="ms-2">{{ pronounsLabel }}</span>)
            </span>
          </span>
        </div>
        <div class="location fs-5">

          <span v-if="props.profile.cityName">{{ props.profile.cityName }}, </span>
          <span v-if="props.profile.country">{{ countryName }}</span>
        </div>

        <div class="interests mb-2"
             v-if="props.profile.tags && props.profile.tags.length">
          <ul class="tags list-unstyled mb-0 d-flex flex-wrap align-items-center">
            <li v-for="tag in props.profile.tags"
                :key="tag.slug"
                class="me-2">
              <BBadge variant="warning">{{ tag.name }}</BBadge>
            </li>
          </ul>
        </div>

        <div class="introSocial mb-3">
          {{ props.profile.introSocial }}
        </div>

        <div class="interests mb-2"
             v-if="languages && languages.length">
          <ul class="tags list-unstyled mb-0 d-flex flex-wrap align-items-center">
            <li v-for="lang in languages"
                :key="lang.value"
                class="me-2">
              <BBadge variant="secondary">{{ lang.label }}</BBadge>
            </li>
          </ul>
        </div>

        <div v-if="props.profile.isDatingActive">
          <div class="dating-basics mb-3">
            <div class="introDating mb-3">
              {{ props.profile.introDating }}
            </div>

            <ul class="list-unstyled mb-2 d-flex flex-wrap align-items-center">
              <li v-if="props.profile.relationship"
                  class="me-2">
                <BBadge variant="info">{{ relationshipStatusLabel }}</BBadge>
              </li>
              <li v-if="props.profile.hasKids"
                  class="me-2">
                <BBadge variant="info">{{ hasKidsLabel }}</BBadge>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style scoped>
:deep(img) {
  object-fit: contain;
  /* filter: grayscale(100%) blur(5px); */
  /* opacity: 0.25; */
}
</style>
