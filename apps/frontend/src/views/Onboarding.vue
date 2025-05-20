<template>
  <div class="row justify-content-center">
    <h2>Let's get going</h2>
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label class="form-label">I'm from...</label>
        <Multiselect v-model="profile.country"
                     :options="countrySelectOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     placeholder="Select country"
                     label="label"
                     track-by="label" />
      </div>

      <div class="form-group mt-3">
        <label class="form-label">I was born in...</label>
        <Multiselect v-model="birthYear"
                     :options="birthYearSelectOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     :show-labels="false"
                     placeholder="Select one" />
      </div>

      <div class="form-group mt-3">
        <label class="form-label">I am looking for...</label>


        <div class="form-check">
          <input class="form-check-input"
                 type="checkbox"
                 value="friend"
                 id="lookingForFriends"
                 ref="lookingForFriends"
                 @change="toggleLookingForOptions"
                 checked
                 disabled>
          <label class="form-check-label"
                 for="lookingForFriends">
            Friends
          </label>
          <div class="form-text">
            Looking for friends, networking, and socializing
          </div>
        </div>
        <div class="form-check">
          <input class="form-check-input"
                 type="checkbox"
                 value="dating"
                 id="lookingForDating"
                 ref="lookingForDating"
                 @change="toggleLookingForOptions">
          <label class="form-check-label"
                 for="lookingForDating">
            Dating
          </label>
          <div class="form-text">
            Looking for a romantic partner
          </div>
        </div>
      </div>

      <div v-if="error"
           class="alert alert-danger mt-3">
        {{ error }}
      </div>

      <div class="d-grid gap-2 mt-3">
        <button type="submit"
                class="btn btn-primary"
                :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Continue</span></button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Profile, User, ProfileImage, ConnectionTypeType } from '@zod/generated'
import { useProfileStore } from '@/store/profileStore';
import { useAuthStore } from '@/store/authStore';
import { getCountryOptions } from '@/lib/countries';

import Multiselect from 'vue-multiselect';


export default defineComponent({
  name: 'Onboarding',
  components: {
    Multiselect
  },

  data() {
    return {
      user: {} as User,
      profile: {} as Profile,
      profileImage: {} as ProfileImage,
      lookingFor: ['friend'] as ConnectionTypeType[],
      birthYear: null,
      error: '',
      isLoading: false,
    };
  },

  computed: {
    birthYearSelectOptions() {
      const currentYear = new Date().getFullYear() - 18;
      return Array.from({ length: 100 }, (_, i) => currentYear - i);
    },
    // birthYear: {
    //   get() {
    //     return this.profile.birthday ? new Date(this.profile.birthday).getFullYear() : null;
    //   },
    //   set(year: number) {
    //     if (year) {
    //       const date = new Date(this.profile.birthday || new Date());
    //       date.setFullYear(year);
    //       this.profile.birthday = date.toISOString();
    //     } else {
    //       this.profile.birthday = null;
    //     }
    //   }
    // },
    countrySelectOptions() {
      // const empty = {
      //   label: 'Select a country',
      //   value: ''
      // }
      // const options = getCountryOptions()
      // options.unshift(empty)
      // console.log("countrySelectOptions", options)
      return getCountryOptions()
    },

    profileStore() {
      return useProfileStore()
    },
    authStore() {
      return useAuthStore()
    }
  },

  methods: {
    // ensure at least one checkbox is checked
    toggleLookingForOptions(event: Event) {
      const target = event.target as HTMLInputElement;
      const value = target.value as ConnectionTypeType;

      if (target.checked) {
        if (!this.lookingFor.includes(value)) {
          this.lookingFor.push(value);
        }
      } else {
        this.lookingFor = this.lookingFor.filter(option => option !== value);
      }

      this.user.lookingFor = this.lookingFor;

      const lookingForFriendsCheckbox = this.$refs.lookingForFriends as HTMLInputElement;
      const lookingForDatingCheckbox = this.$refs.lookingForDating as HTMLInputElement;

      if (this.lookingFor.length === 1) {
        if (this.lookingFor.includes('friend')) {
          lookingForFriendsCheckbox.disabled = true;
        } else if (this.lookingFor.includes('dating')) {
          lookingForDatingCheckbox.disabled = true;
        }
      } else {
        // Re-enable both checkboxes if both are selected
        lookingForFriendsCheckbox.disabled = false;
        lookingForDatingCheckbox.disabled = false;
      }
    },

    async submitForm() {
      this.isLoading = true;
      this.error = '';
      // console.log("submitForm", this.user)
      // try {
      //   await this.authStore.updateUser(this.user)
      //   // this.$router.push('/dashboard');
      // } catch (err: any) {
      //   // Handle error
      //   this.error = err.message || 'An error occurred while updating the profile.';
      // } finally {
      //   this.isLoading = false;
      // }

      try {
        await this.profileStore.createProfiles(this.lookingFor)
        // this.$router.push('/dashboard');
      } catch (err: any) {
        // Handle error
        this.error = err.message || 'An error occurred while updating the profile.';
      } finally {
        this.isLoading = false;
      }
    }
  },

  async mounted() {
    const userProfile = await this.profileStore.getUserProfile()
    if (userProfile !== null) {
      this.profile = userProfile || {} as Profile
    }

    const { success, user, error } = await this.authStore.fetchUser()
    if (success) {
      this.user = user || {} as User
    } else {
      this.error = error || 'An error occurred while fetching the user.';
    }

  }
})
</script>