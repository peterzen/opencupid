<script setup lang="ts">
import { api } from '@/lib/api'

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const base64url = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64url)
  return Uint8Array.from([...raw].map(char => char.charCodeAt(0)))
}

async function enablePushNotifications() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return

  const registration = await navigator.serviceWorker.ready

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(__APP_CONFIG__.VAPID_PUBLIC_KEY),
  })
  console.log('Push subscription:', subscription)

  // const payload = JSON.stringify(subscription)
  // Send to your backend
  const res = await api.post('/push/subscription',  subscription)
  console.log('Subscription saved:', res)
}
</script>

<template>
  <div>
    <h5>Push Notifications</h5>
    <BButton class="btn btn-primary" @click="enablePushNotifications"
      >Enable Push Notifications</BButton
    >
  </div>
</template>
