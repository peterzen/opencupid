import '@/css'

// @ ts-expect-error: virtual:pwa-register is a Vite virtual module
// import { registerSW } from 'virtual:pwa-register'

// const updateSW = registerSW({
//   immediate: true,
//   onNeedRefresh() {
//     // Show "new version available" prompt
//   },
//   onOfflineReady() {
//     // Show "app is ready offline" message
//   },
// })


import { Settings } from 'luxon'
Settings.defaultZone = 'Europe/Berlin'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createBootstrap()) // bootstrap-vue-next

// Load/initialize icon set
import { useIcons } from './lib/icons'
useIcons(app)

import { useLocalStore } from './store/localStore'
const localStore = useLocalStore()
localStore.initialize()

import { useMessageStore } from './store/messageStore'
useMessageStore()

// toasts
import registerToast from './lib/toast'
registerToast(app)

import { appUseI18n } from './lib/i18n'
appUseI18n(app)

import { useFormKit } from '@/lib/formkit'
useFormKit(app)

app.mount('#app')
