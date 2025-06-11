<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import { type PublicProfile } from '@zod/profile/profile.dto'
import { useMessageStore } from '@/store/messageStore'
import type { ConversationSummary } from '@zod/messaging/messaging.dto'
import ConversationSummaries from '@/components/messaging/ConversationSummaries.vue'
import SendMessage from '@/components/messaging/SendMessage.vue'
import MessageList from '@/components/messaging/MessageList.vue'
import { IconArrowSingleLeft, IconMenu } from '@/components/icons/DoodleIcons'
import ProfileImage from '@/components/profiles/image/ProfileImage.vue'

import router from '@/router'

const profileStore = useProfileStore()
const messageStore = useMessageStore()

// Props
const props = defineProps<{
  conversationId?: string
}>()

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

watch(
  () => props.conversationId,
  async (newId, oldId) => {
    if (newId !== oldId) {
      if (!newId) {
        await messageStore.setActiveConversation(null)
      } else {
        isLoading.value = true
        await messageStore.setActiveConversationById(newId)
        isLoading.value = false
      }
    }
  }
)

onMounted(async () => {
  isLoading.value = true
  const convos = await messageStore.fetchConversations()
  if (props.conversationId) {
    await messageStore.setActiveConversationById(props.conversationId)
  }
  console.log('Conversations fetched:', convos)
  isLoading.value = false
})

async function handleSelectConvo(convo: ConversationSummary) {
  isLoading.value = true
  router.push({ name: 'Messaging', params: { conversationId: convo.conversationId } })
  await messageStore.setActiveConversation(convo)
  isLoading.value = false
  setTimeout(async () => {
    await messageStore.markAsRead(convo.conversationId)
  }, 2000)
}

async function handleDeselectConvo() {
  router.push({ name: 'Messaging' })
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
</template>
<style scoped>
:deep(.thumbnail) {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
