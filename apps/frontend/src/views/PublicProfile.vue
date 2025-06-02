<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue';
import type { OwnerProfile } from '@zod/profile.schema'
import { useProfileStore } from '@/store/profileStore';
import { countryCodeToName } from '@/lib/countries';

import LoadingComponent from '@/components/LoadingComponent.vue';
import DatingFilter from '@/components/profiles/DatingFilter.vue';
import GenderSymbol from '@/components/profiles/GenderSymbol.vue';
import { getLanguageList } from '@/lib/languages';

const profileStore = useProfileStore()

// Props
const props = defineProps<{
  slug: string
}>()

// Define your component logic here
const state = reactive({
  isLoading: false,
});

const profile = reactive<OwnerProfile>({} as OwnerProfile)

const countryName = computed(() => {
  return profile.country ? countryCodeToName(profile.country) : '';
});

const age = computed(() => {
  if (!profile.birthday) return '';
  const birthDate = new Date(profile.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

const languages = computed(() => {
  return getLanguageList(profile.languages)
});

onMounted(async () => {
  state.isLoading = true
  const profileId = props.slug
  const fetched = await profileStore.getPublicProfile(profileId)
  Object.assign(profile, fetched)
  state.isLoading = false
})

</script>




<template>

  <div class="container">
    <LoadingComponent v-if="state.isLoading" />

    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="profileImages overflow-hidden">
          <div class="ratio ratio-4x3">
            <BCarousel controls>
              <BCarouselSlide v-for="img in profile.profileImages"
                              :key="img.id"
                              :img-src="img.url!" />
            </BCarousel>
          </div>
        </div>
        <div class="publicname-wrapper">
          <span class="fw-bolder fs-2">{{ profile.publicName }}</span>
          <DatingFilter :profile="profile">
            <span class="fs-4 text-muted">
              ({{ age }}
              <GenderSymbol v-if="profile.gender"
                            :gender="profile.gender" />)
            </span>
          </DatingFilter>
        </div>
        <div class="location fs-5">

          <span v-if="profile.cityName">{{ profile.cityName }}, </span>
          <span v-if="profile.country">{{ countryName }}</span>
        </div>

        <div class="interests mb-2"
             v-if="profile.tags && profile.tags.length">
          <ul class="tags list-unstyled mb-0 d-flex flex-wrap align-items-center">
            <li v-for="tag in profile.tags"
                :key="tag.slug"
                class="me-2">
              <BBadge variant="warning">{{ tag.name }}</BBadge>
              </li>
          </ul>
        </div>

        <div class="introSocial mb-3">
          {{ profile.introSocial }}
        </div>

        <div class="interests mb-2"
             v-if="languages && languages.length">
          <ul class="tags list-unstyled mb-0 d-flex flex-wrap align-items-center">
            <li v-for="lang in languages"
                :key="lang.value"
                class="me-2">
              <BBadge variant="info">{{ lang.label }}</BBadge>
            </li>
          </ul>
        </div>

        <DatingFilter :profile="profile">
          <div class="dating-basics">

          </div>

          <div class="introDating mb-3">
            {{ profile.introDating }}
          </div>
        </DatingFilter>


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
