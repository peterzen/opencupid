<template>
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
                             @update:profileImage="handleProfileImage"
                             :modelValue="profile"
                             @submit="saveProfile" />
        </div>
      </div>
      <div v-if="activeTab === 'friend'"
           class="tab-pane active">
        <div class="mt-4">
          <ProfileForm :isLoading="isLoading"
                       v-model="profile"
                       @update:profileImage="handleProfileImage"
                       @submit="saveProfile" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { useProfileStore } from '@/store/profileStore'

import ConnectionTypeSelector from '@/components/ConnectionTypeSelector.vue'
import ProfileForm from '@/components/profiles/ProfileForm.vue'
import DatingProfileForm from '@/components/profiles/DatingProfileForm.vue'
import { OwnerProfile, UpdateProfile } from '@zod/profile.schema'
import { ConnectionTypeType } from '@zod/generated'
import { OwnerProfileImage } from '@zod/media.schema'

const profileStore = useProfileStore()

const state = reactive({
  profile: {} as OwnerProfile,
  activeTab: 'dating' as ConnectionTypeType,
  isLoading: false,
  error: ''
})

const { profile, activeTab, isLoading, error } = toRefs(state)


/**
 * Save the profile back to the store.
 * Mutates `state` directly and never uses `.value`.
 */
async function saveProfile(formData: OwnerProfile) {
  state.isLoading = true
  state.error = ''

  let tags: string[] = []
  if (formData.tags && formData.tags.length > 0) tags = formData.tags.map(tag => tag.id)

  const payload: UpdateProfile = {
    ...formData,
    tags: tags,
  }

  try {
    console.log('Saving profile', payload)
    await profileStore.updateProfile(payload)
  } catch (err: any) {
    state.error = err.message || 'An error occurred while updating the profile.'
  } finally {
    state.isLoading = false
  }
}

async function handleProfileImage(image: OwnerProfileImage) {
  try {
    await profileStore.setProfileImage(image.id)
  } catch (err: any) {
    state.error = err.message || 'An error occurred while updating the profile image.'
  }
  Object.assign(state.profile, {
    profileImage: image
  })
}

onMounted(async () => {
  state.isLoading = true
  const fetched = await useProfileStore().getUserProfile()
  Object.assign(state.profile, fetched)
  state.isLoading = false
})

</script>
