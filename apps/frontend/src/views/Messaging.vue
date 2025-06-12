<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useMessageStore } from '@/store/messageStore'
import type { ConversationSummary } from '@zod/messaging/messaging.dto'
import ConversationSummaries from '@/components/messaging/ConversationSummaries.vue'
import SendMessage from '@/components/messaging/SendMessage.vue'
import MessageList from '@/components/messaging/MessageList.vue'

import router from '@/router'
import MessagingNav from '../components/messaging/MessagingNav.vue'
import { type ProfileSummary } from '@zod/profile/profile.dto'

const messageStore = useMessageStore()

// Props
const props = defineProps<{
  conversationId?: string
}>()

const isLoading = ref(false)
const showModal = ref(false)

const recipient = computed(() => {
  return messageStore.activeConversation?.partnerProfile || null
})

const convoId = computed(() => {
  return messageStore.activeConversation?.conversationId || null
})

// Watch for changes in conversationId router prop so we can update
// the active conversation
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
  await messageStore.fetchConversations()
  if (props.conversationId) {
    await messageStore.setActiveConversationById(props.conversationId)
  }
  isLoading.value = false
})

onUnmounted(() => {
  // Clear active conversation when component is unmounted
  messageStore.setActiveConversation(null)
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

function handleProfileSelect(profile: ProfileSummary) {
  console.log('Profile selected:', profile)
  router.push({ name: 'PublicProfile', params: { id: profile.id } })
}
</script>

<template>
  <main class="flex-grow-1 d-flex flex-row overflow-hidden">
    <div
      class="col-12 col-md-3 d-md-block"
      :class="{ 'd-none': recipient }"
      id="conversations-list"
    >
      <div class="mx-3">
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
      <MessagingNav
        :recipient="recipient"
        @deselect:convo="handleDeselectConvo"
        @profile:select="handleProfileSelect"
        @modal:open="showModal = true"
      />

      <div class="flex-grow-1 overflow-hidden d-flex flex-column">
        <MessageList :messages="messageStore.messages" />
      </div>
      <div class="d-flex align-items-center w-100 py-2 px-2">
        <SendMessage :recipientProfile="recipient" :conversationId="convoId" v-if="recipient" />
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
  </main>
</template>
<style scoped></style>
