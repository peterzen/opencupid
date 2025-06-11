<script setup>
import { onMounted, onUnmounted } from 'vue'
import { bus } from '@/lib/bus'
import { useToast } from 'vue-toastification'

import router from '@/router'

import MessageReceivedToast from '@/components/messaging/MessageReceivedToast.vue'

const toast = useToast()

function handleMessageReceived({ message }) {
  toast(
    {
      component: MessageReceivedToast,
      props: {
        toastId: `${message.id}`,
        message: message,
      },
    },
    {
      onClick: closeToast => {
        console.log('Toast clicked:', message.id)
        router.push({ name: 'Messaging', params: { conversationId: message.conversationId },force: true })
        closeToast()
      },
    }
  )
}
onMounted(() => {
  bus.on('message:received', handleMessageReceived)
})
onUnmounted(() => {
  bus.off('message:received', handleMessageReceived)
})
</script>
<template>
  <div></div>
</template>
