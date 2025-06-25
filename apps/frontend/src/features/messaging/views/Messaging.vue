<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import type { ConversationSummary } from '@zod/messaging/messaging.dto'
import type { ProfileSummary } from '@zod/profile/profile.dto'

import ConversationDetail from '../components/ConversationDetail.vue'
import { useMessageStore } from '../stores/messageStore'
import ConversationSummaries from '../components/ConversationSummaries.vue'
import IconMessage from '@/assets/icons/interface/message.svg'
import IconSearch from '@/assets/icons/interface/search.svg'

const router = useRouter()
const messageStore = useMessageStore()

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
  },
  { immediate: true }
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

const handleSelectConvo = async (convo: ConversationSummary) => {
  if (messageStore.activeConversation?.conversationId === convo.conversationId) {
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

const handleDeselectConvo = async () => {
  router.back()
  await messageStore.setActiveConversation(null)
}

const handleProfileSelect = (profile: ProfileSummary) => {
  router.push({ name: 'PublicProfile', params: { id: profile.id } })
}
const t = ref(true)
</script>

<template>
  <main class="d-flex flex-column h-100">
    <!-- <h1 class="px-3 mb-2" v-if="!detailVisible">{{  $t('messaging.page_title') }}</h1> -->

    <BOverlay
      :show="messageStore.conversations.length === 0"
      no-spinner
      bg-color="var(--bs-body-bg)"
      :blur="null"
      opacity="0.85"
      class="h-100 overlay"
    >
      <template #overlay>
        <div class="d-flex flex-column align-items-center justify-content-center h-100">
          <IconMessage class="svg-icon-100 opacity-25" />
          <p class="text-muted mb-4 mt-4 text-center">Your conversations will take place here.</p>
          <BButton
            variant="primary"
            size="lg"
            pill
            @click="router.push({ name: 'BrowseProfiles' })"
          >
            <!-- <IconSearch class="svg-icon me-2" /> -->
            Find people to talk to
          </BButton>
        </div>
      </template>
      <div class="flex-grow-1 d-flex flex-row overflow-hidden pt-5">
        <div class="col-12 col-md-4 d-md-block" :class="{ 'd-none': detailVisible }">
          <div class="mx-3">
            <ConversationSummaries
              :loading="isLoading"
              :conversations="messageStore.conversations"
              :activeConversation="messageStore.activeConversation"
              @convo:select="handleSelectConvo"
            />
            <!-- <BPlaceholderWrapper :loading="isLoading" class="mb-3">
            <template #loading>
              <ConversationPlaceholder :howMany="5" />
            </template>
          </BPlaceholderWrapper> -->
          </div>
        </div>
        <div class="col-md-8 flex-grow-1 d-flex flex-column overflow-hidden" v-if="detailVisible">
          <ConversationDetail
            :loading="isLoading"
            :conversation="messageStore.activeConversation"
            @deselect:convo="handleDeselectConvo"
            @profile:select="handleProfileSelect"
          />
        </div>
      </div>
    </BOverlay>
  </main>
</template>
<style scoped></style>
