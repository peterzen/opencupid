<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import { type PublicProfile } from '@zod/profile/profile.dto'
import { useMessageStore } from '@/store/messageStore'
import type { ConversationSummary } from '@zod/dto/messaging.dto'
import ConversationSummaries from '@/components/messaging/ConversationSummaries.vue'
import SendMessage from '@/components/messaging/SendMessage.vue'
import MessageList from '@/components/messaging/MessageList.vue'
import { IconArrowSingleLeft, IconMenu } from '@/components/icons/DoodleIcons'
import ProfileImage from '@/components/profiles/image/ProfileImage.vue'

const profileStore = useProfileStore()
const messageStore = useMessageStore()

const profiles = ref<PublicProfile[]>([])
// const recipient = ref<ProfileSummary | null>(null)
const isLoading = ref(false)
const showModal = ref(false)

async function sendMessage(content: string) {
  if (!recipient.value || !content) return
  isLoading.value = true
  await messageStore.sendMessage(recipient.value.id, content)
  isLoading.value = false
}

const recipient = computed(() => {
  return messageStore.activeConversation?.partnerProfile || null
})

onMounted(async () => {
  isLoading.value = true
  const fetched = await profileStore.findProfiles()
  if (fetched) {
    profiles.value = fetched
  } else {
    console.error('Failed to fetch profiles')
  }

  const convos = await messageStore.fetchConversations()
  console.log('Conversations fetched:', convos)
  isLoading.value = false
})

async function handleSelectConvo(convo: ConversationSummary) {
  await messageStore.setActiveConversation(convo)
  setTimeout(async () => {
    await messageStore.markAsRead(convo.conversationId)
  }, 2000)
}

async function handleDeselectConvo() {
  await messageStore.setActiveConversation(null)
}
</script>

<template>
  <div class="flex-grow-1 d-flex flex-row overflow-hidden">
    <div
      class="col-12 col-md-3 d-md-block"
      :class="{ 'd-none': recipient }"
      id="conversations-list"
    >
      <div class="mt-3 mx-3">
        <ConversationSummaries
          :conversations="messageStore.conversations"
          :activeConversation="messageStore.activeConversation"
          @convo:select="handleSelectConvo"
        />
      </div>
    </div>
    <div
      class="col-md-9 flex-grow-1 d-flex flex-column overflow-hidden"
      v-if="recipient"
      id="message-view"
    >
      <div class="d-flex align-items-center justify-content-between p-2">
        <div class="back-button">
          <a class="btn btn-secondary-outline" @click="handleDeselectConvo">
            <IconArrowSingleLeft class="svg-icon fs-4" />
          </a>
        </div>

        <div class="d-flex flex-column align-items-center">
          <div class="thumbnail me-2">
            <ProfileImage :profile="recipient" />
          </div>
          <div class="">
            <span class="d-block text-truncate fs-6">{{ recipient.publicName }}</span>
          </div>
        </div>

        <div class="action-button">
          <IconMenu class="svg-icon fs-4" @click="showModal = true" />
        </div>
      </div>

      <div class="flex-grow-1 overflow-hidden d-flex flex-column">
        <MessageList :messages="messageStore.messages" />
      </div>
      <div class="d-flex align-items-center w-100 mb-5 py-2 px-2">
        <SendMessage @message:send="sendMessage" :recipientProfile="recipient" v-if="recipient" />
      </div>
    </div>

    <BModal
      v-model="showModal"
      title=""
      size="md"
      :backdrop="'static'"
      centered
      button-size="sm"
      :focus="false"
      :no-close-on-backdrop="true"
      :no-header="true"
      :ok-title="`Block ${recipient ? recipient.publicName : ''}`"
      cancel-title="Nevermind"
      initial-animation
      body-class="d-flex flex-row align-items-center justify-content-center overflow-hidden"
      :keyboard="false"
    >
      <div class="w-100">
        <h4>Block/report/unmatch</h4>
      </div>
    </BModal>
  </div>

  <!-- <div class="mb-4">
          <h4>Users</h4>
          <ul class="list-group">
            <li
              v-for="profile in profiles"
              :key="profile.id"
              class="list-group-item d-flex justify-content-between align-items-center"
              @click="recipient = profile"
            >
              <span class="publicname">{{ profile.publicName }}</span>
              <div class="thumbnail">
                <ProfileImage :profile="profile" />
              </div>
            </li>
          </ul>
        </div> -->
</template>
<style scoped>
:deep(.thumbnail) {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
