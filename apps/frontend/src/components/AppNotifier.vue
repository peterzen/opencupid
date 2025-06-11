<script setup lang="ts">
import { bus } from '@/lib/bus'

import { showToast } from '@/lib/toastify'
import type { MessageInConversation } from '@zod/dto/messaging.schema'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

bus.on('message:received', ({ message }) => {
  // const senderName = message.partnerProfile?.publicName || t('messaging.unknown_sender')
  showToast({
    type: 'info',
    message: t('messaging.new_message_notification', {
      sender:  t('messaging.unknown_sender'),
    }),
    options: {
      autoClose: 5000,
    },
  })
})
</script>
<template>
  <div ></div>
</template>