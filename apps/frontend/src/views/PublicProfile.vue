<template>
  <div>
    <!-- <h1>Profile</h1> -->

    <LoadingComponent v-if="state.isLoading" />

    <BCarousel controls>
      <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=1" />
      <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=2" />
      <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=3" />
    </BCarousel>

  </div>
</template>

<script setup lang="ts">
// Import reactive, ref or any other composition API features as needed
import LoadingComponent from '@/components/LoadingComponent.vue';
import { ref, reactive, onMounted } from 'vue';
import { PublicProfile } from '@zod/profile.schema'
import { useProfileStore } from '@/store/profileStore';

const profileStore = useProfileStore()

// Define your component logic here
const state = reactive({
  profile: {} as PublicProfile,
  isLoading: false,
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
/* Your component styles here */
</style>
