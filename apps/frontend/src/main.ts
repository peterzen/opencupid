// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/lib/utils.scss'

import { Settings } from 'luxon'
Settings.defaultZone = 'Europe/Berlin'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

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
import { useAuthStore } from './store/authStore'
app.use(formKitPlugin, defaultConfig({
  config: bootstrapConfig.config
}))


const authStore = useAuthStore()

// // Verify token on app startup
// authStore.verifyToken().then((isValid) => {
//   if (!isValid) {
//     router.push({ name: 'Login' }) // Redirect to login if token is invalid
//   }
// })

app.mount('#app')
