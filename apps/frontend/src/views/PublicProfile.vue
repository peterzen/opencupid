<template>

  <LoadingComponent v-if="state.isLoading" />

  <div class="profileImages">
    <BCarousel controls>
      <BCarouselSlide v-for="img in state.profile.profileImages"
                      :img-src="img.url!" />
    </BCarousel>
  </div>
  <div class="container-fluid">
    <h2 class="publicName">
      {{ profile.publicName }}
      <DatingFilter :profile="profile"></DatingFilter>({{ age }})
    </h2>

    <h3 class="location">
      <span v-if="profile.cityName">{{ profile.cityName }}, </span>
      <span v-if="profile.country">{{ countryName }}</span>
    </h3>

    <div class="interests mb-2"
         v-if="profile.tags && profile.tags.length">
      <ul class="tags b-form-tags-list list-unstyled mb-0 d-flex flex-wrap align-items-center">
        <li v-for="tag in profile.tags"
            :key="tag.slug"
            class="badge d-inline-flex align-items-center mw-100 me-2 mb-2 text-bg-secondary">{{ tag.name }}</li>
      </ul>
    </div>

    <div class="introSocial mb-3">
      {{ profile.introSocial }}
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import {  PublicProfile } from '@zod/profile.schema'
import { useProfileStore } from '@/store/profileStore';
import { countryCodeToName } from '@/lib/countries';

import LoadingComponent from '@/components/LoadingComponent.vue';

const profileStore = useProfileStore()

// Define your component logic here
const state = reactive({
  profile: {} as PublicProfile,
  isLoading: false,
});

const profile = ref<PublicProfile>(state.profile);

const countryName = computed(() => {
  return profile.value.country ? countryCodeToName(profile.value.country) : '';
});

const age = computed(() => {
  console.log('Calculating age for:', profile.value);
  if (!profile.value.birthday) return '';
  const birthDate = new Date(profile.value.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

onMounted(async () => {
  state.isLoading = true
  const userProfile = await profileStore.getUserProfile()
  const profile = await profileStore.getPublicProfile(userProfile.id)
  Object.assign(state.profile, profile)
  state.isLoading = false
})

</script>

<style scoped>
</style>
