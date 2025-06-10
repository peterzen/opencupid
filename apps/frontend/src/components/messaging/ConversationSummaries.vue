<script setup lang="ts">
import { type ConversationSummary } from '@zod/messaging.schema'
import ProfileImage from '@/components/profiles/image/ProfileImage.vue'

defineProps<{
  conversations: ConversationSummary[]
  activeConversation: ConversationSummary | null
}>()

// Emits
const emit = defineEmits<{
  (e: 'convo:select', val: ConversationSummary): void
}>()
</script>

<template>
  <div class="list-group mb-3">
    <div
      v-for="convo in conversations"
      :key="convo.conversationId"
      class="list-group-item d-flex justify-content-start align-items-center mb-3 p-1 bg-secondary text-dark border-0 rounded-3 shadow-sm"
      :class="{
        'focus-ring': activeConversation?.conversationId === convo.conversationId,
      }"
      @click="emit('convo:select', convo)"
    >
      <div class="thumbnail me-2 flex-shrink-0">
        <ProfileImage :profile="convo.partnerProfile" />
      </div>
      <div class="overflow-hidden flex-grow-1 d-flex flex-column">
        <span class="d-block text-truncate fs-6">{{ convo.partnerProfile.publicName }}</span>
        <small
          class="last-message text-truncate text-muted text-nowrap pe-2"
          v-if="convo.lastMessage"
          >{{ convo.lastMessage.content }}</small
        >
      </div>
      <div class="flex-shrink-0">
        <small v-if="!convo.lastMessage?.isMine" class="badge bg-danger">My turn</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  cursor: pointer;
}
.last-message {
  text-overflow: ellipsis;
}
</style>
