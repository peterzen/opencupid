<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue';
import { useProfileStore } from '@/store/profileStore';
import router from '@/router';

import { type PublicProfile } from '@zod/profile.schema';

import LoadingComponent from '@/components/LoadingComponent.vue';
import ProfileCardComponent from '@/components/profiles/ProfileCardComponent.vue';


const profileStore = useProfileStore()

// Define your component logic here
const state = reactive({
  profiles: [] as PublicProfile[],
  isLoading: false,
});

onMounted(async () => {
  state.isLoading = true
  state.profiles = await profileStore.findProfiles()
  state.isLoading = false
})

const handleCardClick = (profile: PublicProfile) => {
  console.log('Card clicked:', profile);
  router.push({ name: 'PublicProfile', params: { id: profile.id } });
};

</script>



<template>
  <LoadingComponent v-if="state.isLoading" />

  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

      <div v-for="profile in state.profiles"
           :key="profile.id"
           class="col">
        <ProfileCardComponent :profile="profile"
                              @click="handleCardClick(profile)" />
      </div>
    </div>
  </div>


</template>
