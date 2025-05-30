<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { OwnerProfile, PublicProfile } from '@zod/profile.schema'
import { useProfileStore } from '@/store/profileStore';
import { countryCodeToName } from '@/lib/countries';

import LoadingComponent from '@/components/LoadingComponent.vue';
import DatingFilter from '@/components/profiles/DatingFilter.vue';

const profileStore = useProfileStore()

// Props
const props = defineProps<{
  id: string
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

onMounted(async () => {
  state.isLoading = true
  const profileId = props.id
  const fetched = await profileStore.getPublicProfile(profileId)
  Object.assign(profile, fetched)
  state.isLoading = false
})

</script>




<template>

  <div class="container">
    <LoadingComponent v-if="state.isLoading" />

    <div class="profileImages">
      <BCarousel controls>
        <BCarouselSlide v-for="img in profile.profileImages"
                        :img-src="img.url!" />
      </BCarousel>
    </div>
    <div class="container-fluid">
      <h2 class="publicName">
        {{ profile.publicName }}
        <DatingFilter :profile="profile">({{ age }})</DatingFilter>
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
  </div>
</template>
<style scoped></style>
