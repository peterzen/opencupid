<template>
  <div class="row justify-content-center">
    <h2>Onboarding</h2>

    <form @submit.prevent="submitForm"
          class="col-12 col-md-6">
      <div class="form-group">
        <label for="publicName">Public Name</label>
        <input type="text"
               id="publicName"
               v-model="profile.publicName"
               class="form-control"
               required />
        <div class="form-group">

          <ImageUpload v-model="profile.primaryImage"
                       :maxWidth="800"
                       :maxHeight="800"
                       :quality="80" />
        </div>
      </div>
      <button type="submit"
              class="btn btn-primary"
              :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Submit</span></button>
    </form>
  </div>
</template>

<script lang="ts">
import ImageUpload from '@/components/ImageUpload.vue';
import { userProfileMixin } from './mixins/userProfileMixins';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'Onboarding',
  mixins: [userProfileMixin],
  components: {
    ImageUpload,
  },

  data() {
    return {
      // Add your form fields here
      publicName: '',
      email: '',
      error: '',
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      this.error = '';

      try {
        await this.profileStore.updateProfile({
          publicName: this.publicName,
          primaryImage: this.profile.primaryImage,
        });
        // Handle success, e.g., navigate to another page or show a success message
        // this.$router.push('/dashboard');
      } catch (err: any) {
        // Handle error
        this.error = err.message || 'An error occurred while updating the profile.';
      } finally {
        this.isLoading = false;
      }
    }
  },
})
</script>