<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import ConnectionTypeSelector from '@/components/ConnectionTypeSelector.vue'
import ProfileForm from '@/components/profiles/ProfileForm.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import DatingProfileForm from '@/components/profiles/DatingProfileForm.vue'
import { OwnerProfile, OwnerProfileSchema, ProfileFormSubmit, UpdateProfilePayload } from '@zod/profile.schema'
import { ConnectionTypeType } from '@zod/generated'

const profileStore = useProfileStore()

const state = reactive({
  activeTab: 'dating' as ConnectionTypeType,
  isLoading: false,
  error: ''
})

const { activeTab, isLoading, error } = toRefs(state)

const profile = reactive<OwnerProfile>({} as OwnerProfile)

/**
 * Save the profile back to the store.
 * Mutates `state` directly and never uses `.value`.
 */
async function handleProfileFormSubmit(formData: ProfileFormSubmit) {
  state.isLoading = true
  state.error = ''

  // map Tag[] to tagId[]
  let tags: string[] = []
  if (formData.tags && formData.tags.length > 0)
    tags = formData.tags.map(tag => tag.id)

  const payload: UpdateProfilePayload = {
    ...formData,
    tags: tags,
  }

  try {
    console.log('onboarding Saving profile', payload)
    const updated = await profileStore.updateProfile(payload)
    if (updated) {
      // Validate the updated profile against the schema
      const validatedProfile = OwnerProfileSchema.parse(updated)
      Object.assign(profile, validatedProfile)
      state.error = ''
    } else {
      state.error = 'Failed to update profile.'
    }
  } catch (err: any) {
    state.error = err.message || 'An error occurred while updating the profile.'
  } finally {
    state.isLoading = false
  }
}

onMounted(async () => {
  state.isLoading = true
  const fetched = await profileStore.getUserProfile()
  Object.assign(profile, fetched)
  state.isLoading = false
})

</script>





<template>

  <div class="container">
    <div class="row justify-content-center">

      <ConnectionTypeSelector :isSocialActive="!!profile.isSocialActive"
                              :isDatingActive="!!profile.isDatingActive"
                              :activeTab="activeTab"
                              @update:selectTab="activeTab = $event"
                              @update:isSocialActive="(val: boolean) => profile.isSocialActive = val"
                              @update:isDatingActive="(val: boolean) => profile.isDatingActive = val" />


      <div class="tab-content p-3 border border-top-0">
        <div v-if="activeTab === 'dating'"
             class="tab-pane active">
          <div class="mt-4">
            <DatingProfileForm :isLoading="isLoading"
                               :modelValue="profile"
                               @submit="handleProfileFormSubmit" />
          </div>
        </div>
        <div v-if="activeTab === 'friend'"
             class="tab-pane active">
          <div class="mt-4">
            <ProfileForm :isLoading="isLoading"
                         v-model="profile"
                         @submit="handleProfileFormSubmit" />
          </div>
        </div>
      </div>
    </div>
    <ErrorComponent :error="state.error" />
  </div>

</template>
