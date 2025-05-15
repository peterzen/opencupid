<template>
  <div class="container mt-5">
    <h2>Profile</h2>
    <FormKit
      type="form"
      @submit="submitProfile"
    >
      <!-- Public Name -->
      <FormKit
        name="publicName"
        label="Public Name"
        type="text"
        placeholder="Enter your public name"
        :value="profile.publicName"
      />
      <FormKit
        name="intro"
        label="Introduction"
        type="textarea"
        placeholder="Write a short introduction"
        :value="profile.intro"
      />

      <!-- City -->
      <FormKit
        name="city"
        label="City"
        type="text"
        placeholder="Enter your city"
        :value="profile.city"
      />

      <!-- Full Birthday -->
      <div class="row">
        <div class="col">
          <FormKit
        name="birthYear"
        label="Year"
        type="number"
        placeholder="YYYY"
        :value="profile.birthYear"
        :validation="`required|integer|min:1900|max:${maxBirthYear}`"
          />
        </div>
        <div class="col">
          <FormKit
        name="birthMonth"
        label="Month"
        type="number"
        placeholder="MM"
        :value="profile.birthMonth"
        validation="required|integer|min:1|max:12"
          />
        </div>
        <div class="col">
          <FormKit
        name="birthDay"
        label="Day"
        type="number"
        placeholder="DD"
        :value="profile.birthDay"
        validation="required|integer|min:1|max:31"
          />
        </div>
      </div>
      <FormKit
        name="gender"
        label="Gender"
        type="select"
        :options="genderOptions"
        :value="profile.gender"
        validation="required"
      />
      <FormKit
        name="relationship"
        label="Relationship Status"
        type="select"
        :options="relationshipOptions"
        :value="profile.relationship"
        validation="required"
      />
      <FormKit
        name="hasKids"
        label="Do you have kids?"
        type="radio"
        :options="[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]"
        :value="profile.hasKids"
        validation="required"
      />
   

      <!-- Submit Button -->
      <FormKit type="submit" label="Save Profile" />
    </FormKit>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useProfileStore } from '@/store/profileStore'

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const profileStore = useProfileStore()

    // Fetch the user's profile on component mount
    const profile = ref(profileStore.profile || {})
    if (!profile.value.id) {
      profileStore.getUserProfile().then((data) => {
        profile.value = data || {}
      })
    }

    // Options for gender and relationship status
    const genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'non_binary', label: 'Non-Binary' },
      { value: 'other', label: 'Other' },
    ]

    const relationshipOptions = [
      { value: 'single', label: 'Single' },
      { value: 'in_relationship', label: 'In a Relationship' },
      { value: 'married', label: 'Married' },
      { value: 'other', label: 'Other' },
    ]

    // Maximum birth year (must be 18+)
    const maxBirthYear = computed(() => new Date().getFullYear() - 18)

    // Submit handler
    const submitProfile = async (formData: Record<string, any>) => {
      try {
        await profileStore.updateProfile(formData)
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Failed to update profile:', error)
        alert('Failed to update profile. Please try again.')
      }
    }

    return {
      profile,
      genderOptions,
      relationshipOptions,
      maxBirthYear,
      submitProfile,
    }
  },
})
</script>