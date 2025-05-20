// import './assets/main.css'
import 'bootstrap/scss/bootstrap.scss'
import '@/lib/bootstrap-customizations.scss'
import '@/lib/utils.scss'

import { Settings } from 'luxon'
Settings.defaultZone = 'Europe/Berlin'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

// const i18n = window.__APP_I18N__ || createI18n({legacy: true })
// window.__APP_I18N__ = i18n // persists across HMR

const i18n = createI18n({
  legacy: true,
  locale: 'en',
  fallbackLocale: 'en',
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(i18n)
app.provide('$i18n', i18n)

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)
app.component('FontAwesomeIcon', FontAwesomeIcon)

// toastify
import Vue3Toastify from 'vue3-toastify';
import { defaultOptions } from './lib/toastify'
app.use(Vue3Toastify, defaultOptions)

// FormKit
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import bootstrapConfig from '@/lib/formkit/formkit.config'
import '@/lib/formkit/formkit-custom.scss'

app.use(formKitPlugin, defaultConfig({
  config: bootstrapConfig.config
}))

import "@/lib/vue-multiselect.scss"
// Initialize auth state from localStorage
// const authStore = useAuthStore()
// authStore.initializeFromStorage()

app.mount('#app')
