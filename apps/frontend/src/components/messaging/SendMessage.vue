<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { type ProfileSummary } from '@zod/profile/profile.dto'

import { useLocalStore } from '@/store/localStore'
import { funnel } from 'remeda'
import { useMessaging } from '../composables/useMessaging'
import { type MessageDTO } from '@zod/messaging/messaging.dto'

const props = defineProps<{
  recipientProfile: ProfileSummary
  conversationId: string | null
}>()

const emit = defineEmits<{
  (e: 'message:sent', message: MessageDTO | null): void
}>()
const content = ref('')

const { sendMessage, initiateConversation, isSending, isSent, errorMsg } = useMessaging()

// Local store for managing message drafts
const localStore = useLocalStore()
const debouncer = funnel<[string], string>(
  (val: string) => {
    localStore.setMessageDraft(props.recipientProfile.id, content.value)
  },
  {
    minQuietPeriodMs: 3000,
  }
)

// Watch message input field and save draft in localStore
watch(content, val => {
  debouncer.call(val)
})

watchEffect(() => {
  // Load the draft message from local store when the component is mounted
  const draft = localStore.getMessageDraft(props.recipientProfile.id)
  if (draft) {
    content.value = draft
  }
})

const textarea = ref<HTMLTextAreaElement>()

// Give focus to textarea - expose method to parent which can call it
// when it's rendered or when needed
function focusTextarea() {
  textarea.value?.focus()
}

defineExpose({
  focusTextarea,
})

async function handleSendMessage() {
  if (content.value.trim() === '') return
  if (props.conversationId) {
    // If conversationId is provided, use it to send the message
    const sentMessage = await sendMessage(props.conversationId, content.value)
    emit('message:sent', sentMessage!)
  } else {
    console.log('No conversationId provided, starting a new conversation...') 
    // If no conversationId, create a new conversation and send the message
    await initiateConversation(props.recipientProfile, content.value)
    emit('message:sent', null) // Emit null to indicate a new conversation was started
  }
  content.value = '' // Clear the input after sending
  localStore.setMessageDraft(props.recipientProfile.id, '') // Clear the draft in local store
}
</script>

<template>
  <div class="send-message-wrapper w-100">
    <div class="mb-2">
      <BFormGroup label="" label-for="content-input" class="me-2 flex-grow-1 w-100">
        <BFormTextarea
          id="content-input"
          ref="textarea"
          v-model="content"
          rows="1"
          max-rows="5"
          no-resize
          @keyup.enter="handleSendMessage"
          :placeholder="$t('messaging.message_input_placeholder')"
        />
        <div class="form-text text-muted d-flex justify-content-end">
          <small>{{ $t('messaging.message_input_hint') }}</small>
        </div>
      </BFormGroup>
      <!-- <BButton type="submit" variant="primary" :disabled="!valid">
          <IconSend class="svg-icon me-1" />
          {{ $t('messaging.send_message_button') }}
        </BButton> -->
    </div>
  </div>
</template>
