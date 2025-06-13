<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import router from '@/router'
import { useMessageStore } from '@/store/messageStore'

import type { ConversationSummary } from '@zod/messaging/messaging.dto'
import type { ProfileSummary } from '@zod/profile/profile.dto'

import ConversationDetail from '../components/messaging/ConversationDetail.vue'
import ConversationSummaries from '@/components/messaging/ConversationSummaries.vue'

const messageStore = useMessageStore()

// Props
const props = defineProps<{
  conversationId?: string
}>()

const isLoading = ref(false)

const detailVisible = computed(() => !!messageStore.activeConversation && !isLoading.value)

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
  if( messageStore.activeConversation?.conversationId === convo.conversationId) {
    return
  }
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
  router.push({ name: 'PublicProfile', params: { id: profile.id } })
}
</script>

<template>
  <main class="flex-grow-1 d-flex flex-row overflow-hidden">
    <div
      class="col-12 col-md-3 d-md-block"
      :class="{ 'd-none': detailVisible }"
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
    <div class="col-md-9 flex-grow-1 d-flex flex-column overflow-hidden" v-if="detailVisible">
      <ConversationDetail
        :conversation="messageStore.activeConversation"
        @deselect:convo="handleDeselectConvo"
        @profile:select="handleProfileSelect"
      />
    </div>
  </main>
</template>
<style scoped></style>
