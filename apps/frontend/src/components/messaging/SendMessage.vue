<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconSend } from '../icons/DoodleIcons'
import { type ProfileSummary } from '@zod/profile/profile.dto'
import ProfileImage from '@/components/profiles/image/ProfileImage.vue'

defineProps<{
  recipientProfile: ProfileSummary
}>()
const emit = defineEmits<{
  (e: 'message:send', content: string): void
}>()
const content = ref('')

const valid = computed(() => content.value.trim() !== '')

function handleSubmit() {
  if (content.value.trim() === '') return
  emit('message:send', content.value)
  content.value = '' // Clear the input after sending
}
</script>

<template>
  <div class="send-message-wrapper w-100">
    <!-- <div class="d-flex align-items-center mb-2">
      <div class="thumbnail me-2">
        <ProfileImage :profile="recipientProfile" />
      </div>
      <div class="flex-grow-1">
        <span class="d-block text-truncate fs-6">{{ recipientProfile.publicName }}</span>
      </div>
    </div> -->
    <BForm @submit.prevent="handleSubmit">
			<div class="d-flex flex-row align-items-center mb-2">
      <BFormGroup label="" label-for="content-input" class="me-2 flex-grow-1">
        <BFormInput
          id="content-input"
          v-model="content"
          type="text"
					autocomplete="off"
					autofocus
          :placeholder="$t('messaging.message_input_placeholder')"
          @keyup.enter="handleSubmit"
          required
        />
      </BFormGroup>
      <BButton type="submit" variant="primary" :disabled="!valid">
        <IconSend class="svg-icon me-1" />
        {{ $t('messaging.send_message_button') }}
      </BButton>
			</div>
    </BForm>
  </div>
</template>
