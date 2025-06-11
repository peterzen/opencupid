import '@/css'

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

// vue-toastification
// import Toast from "vue-toastification";
// import { defaultOptions } from './lib/toast'
// app.use(Toast, {
//   ...defaultOptions,
//   shareAppContext: true,
// })

// vue-toastification
import registerToast from './lib/toast'
registerToast(app)


import { appUseI18n } from './lib/i18n'
appUseI18n(app)

import { useFormKit } from '@/lib/formkit'
useFormKit(app)

app.mount('#app')
