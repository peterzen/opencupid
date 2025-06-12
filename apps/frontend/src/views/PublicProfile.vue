<script setup lang="ts">
import { reactive, onMounted, ref, nextTick } from 'vue'
import type { PublicProfile } from '@zod/profile/profile.dto'
import { useProfileStore } from '@/store/profileStore'

import LoadingComponent from '@/components/LoadingComponent.vue'
import PublicProfileComponent from '@/components/profiles/public/PublicProfileComponent.vue'
import SendMessage from '@/components/messaging/SendMessage.vue'
import ProfileThumbnail from '@/components/profiles/image/ProfileThumbnail.vue'
import { type MessageDTO } from '@zod/messaging/messaging.dto'

const profileStore = useProfileStore()

// Props
const props = defineProps<{
  id: string
}>()

// Local state
const isLoading = ref(false)
const profile = reactive<PublicProfile>({} as PublicProfile)
const showMessageModal = ref(false)

onMounted(async () => {
  isLoading.value = true
  const profileId = props.id
  const fetched = await profileStore.getPublicProfile(profileId)
  Object.assign(profile, fetched)
  isLoading.value = false
})

// autofocus on message input after modal is shown
const messageInput = ref()
function handleModalShown() {
  console.log('Modal shown', messageInput.value)
  nextTick(() => {
    setTimeout(() => {
      messageInput.value?.focusTextarea()
    }, 50)
  })
}
const messageSent = ref(false)
function handleMessageSent(message: MessageDTO | null) {
  messageSent.value = true
  setTimeout(() => {
    showMessageModal.value = false
    messageSent.value = false
  }, 3000) // Reset after 3 seconds
  if (message) {
    console.log('Message sent:', message)
  } else {
    console.log('Message sending failed or was cancelled.')
  }
}
</script>

<template>
  <main class="container">
    <LoadingComponent v-if="isLoading" />
    <PublicProfileComponent :profile :isLoading @send:message="showMessageModal = true" />

    <BModal
      v-model="showMessageModal"
      title=""
      size="md"
      :backdrop="'static'"
      centered
      button-size="sm"
      :focus="true"
      :no-close-on-backdrop="true"
      :no-header="true"
      :no-footer="true"
      ok-title="OK"
      cancel-title="Nevermind"
      initial-animation
      body-class="d-flex flex-row align-items-center justify-content-center overflow-hidden"
      :keyboard="false"
      @shown="handleModalShown"
    >
      <div class="w-100">
        <div v-if="!messageSent">
          <h6>
            <ProfileThumbnail :profile="profile" class="me-2" />
            {{
              $t('messaging.send_message_to_user', {
                name: profile.publicName || 'them',
              })
            }}
          </h6>
          <SendMessage
            ref="messageInput"
            :recipientProfile="profile"
            :conversationId="null"
            @close="showMessageModal = false"
            @message:sent="handleMessageSent"
          />
        </div>
        <div v-else class="text-center">
          <p class="text-success">
            {{ $t('messaging.message_sent_success') }}
          </p>
        </div>
      </div>
    </BModal>
  </main>
</template>
