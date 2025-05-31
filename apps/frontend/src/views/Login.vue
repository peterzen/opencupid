<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useRoute, useRouter } from 'vue-router'
import ErrorComponent from '@/components/ErrorComponent.vue'

// Reactive variables
const email = ref('')
const otp = ref('' as string)
const error = ref('' as string)
const showInstructions = ref(false)
const showForm = ref(false)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// On mounted lifecycle hook
onMounted(() => {
  const queryOtp = route.query.otp as string || ''
  if (queryOtp !== '') {
    otp.value = queryOtp
  } else {
    showForm.value = true
  }
})

// Method to handle sending login link
async function handleSendLoginLink() {
  try {
    error.value = ''
    const res = await authStore.sendLoginLink(email.value)
    if (res.success) {
      showInstructions.value = true
      showForm.value = false
    } else {
      error.value = 'An unknown error occurred, please try again a bit later.'
    }
  } catch (err: any) {
    error.value = err || 'An unexpected error occurred.'
    console.error('Login error:', err)
  }
}

// Method to handle OTP entered
async function handleOTPEntered() {
  try {
    const res = await authStore.otpLogin(otp.value)
    if (res.success) {
      router.push({ name: 'Onboarding' })
    } else {
      console.log('otp', res)
      // Handle different status flags
      if (res.status === 'missing_token' || res.status === 'invalid_token') {
        error.value = 'Something went wrong, maybe that link expired. Please try again.'
      }
      showForm.value = false
      showInstructions.value = true
    }
  } catch (err: any) {
    console.error(err)
    error.value = err.response?.data?.message || 'Failed to confirm email.'
  }
}
</script>


<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">


        <div v-if="showInstructions">
          <h2>Check your email</h2>
          <p>We have sent you a login link. Please check your inbox.</p>
          <p>If you don't see it, please check your spam folder.</p>
          <form @submit.prevent="handleOTPEntered">
            <div class="mb-3">
              <label for="otp" class="form-label">Please enter the code in the message.</label>
              <input v-model="otp" id="otp" type="text" class="form-control form-control-lg" required  autocomplete="off"/>

              <ErrorComponent :error="error" />
            </div>

            <button type="submit" class="btn btn-primary w-100 btn-lg">Continue</button>
          </form>
        </div>

        <div v-if="showForm">

          <form @submit.prevent="handleSendLoginLink">
            <div class="mb-3">
              <label for="email" class="form-label">Please enter your email address to continue</label>
              <input v-model="email" id="email" type="email" class="form-control form-control-lg" required />
            </div>

            <button type="submit" class="btn btn-primary w-100 btn-lg">Continue</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>