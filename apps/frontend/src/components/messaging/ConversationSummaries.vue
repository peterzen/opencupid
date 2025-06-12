<script setup lang="ts">
import { type ConversationSummary } from '@zod/messaging/messaging.dto'
import ProfileThumbnail from '../profiles/image/ProfileThumbnail.vue'

defineProps<{
  conversations: ConversationSummary[]
  activeConversation: ConversationSummary | null
}>()

defineEmits<{
  (e: 'convo:select', val: ConversationSummary): void
}>()
</script>

<template>
  <div class="list-group mb-3">
    <div
      v-for="convo in conversations"
      :key="convo.conversationId"
      class="list-group-item d-flex justify-content-start align-items-center mb-3 p-2 border-0 rounded-3 shadow cursor-pointer user-select-none"
      :class="{
        'focus-ring': activeConversation?.conversationId === convo.conversationId,
      }"
      @click="$emit('convo:select', convo)"
    >
      <div class="thumbnail me-2 flex-shrink-0">
        <ProfileThumbnail :profile="convo.partnerProfile" />
      </div>
      <div class="overflow-hidden flex-grow-1 d-flex flex-column user-select-none">
        <span class="d-block text-truncate fs-6">{{ convo.partnerProfile.publicName }}</span>
        <small
          class="last-message text-truncate text-muted text-nowrap pe-2"
          v-if="convo.lastMessage"
          >{{ convo.lastMessage.content }}</small
        >
      </div>
      <div class="flex-shrink-0 me-2">
        <small v-if="!convo.lastMessage?.isMine" class="badge bg-danger">My turn</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.last-message {
  text-overflow: ellipsis;
}
</style>
