<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useRoute, useRouter } from 'vue-router'
import AuthIdComponent from '@/components/auth/AuthIdComponent.vue'
import { AuthIdentifier, OwnerUser } from '@zod/user.schema'
import OtpLoginComponent from '@/components/auth/OtpLoginComponent.vue'

// Reactive variables
const error = ref('' as string)
const isLoading = ref(false)

// Supply every field required by `OwnerUser`, letting TS validate it.
const user = reactive<OwnerUser>({
  id: '',
  email: '',
  phonenumber: '',
  language: '',
  isRegistrationConfirmed: false,
})

// form state
const showUserIdForm = ref(true)
const showOtpForm = ref(false)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()


// // On mounted lifecycle hook
onMounted(async () => {
  const queryOtp     = (route.query.otp     as string) || ''
  const queryUserId  = (route.query.userId  as string) || ''

  if (queryOtp && queryUserId) {                    // <-- both must be present
    const ok = await performOtpLogin(queryUserId, queryOtp)
    if (!ok) {
      showOtpForm.value = true
    }
  } else {
    showUserIdForm.value = true
  }
})

// Method to handle sending login link
async function handleSendOtp(authIdentifier: AuthIdentifier) {

  try {
    error.value = ''
    isLoading.value = true
    const res = await authStore.sendLoginLink(authIdentifier)
    if (res.success) {
      Object.assign(user, res.user)
      console.log('Login link sent successfully:', user)
      showOtpForm.value = true
      showUserIdForm.value = false
    } else {
      error.value = 'An unknown error occurred, please try again a bit later.'
    }
  } catch (err: any) {
    error.value = err || 'An unexpected error occurred.'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}

// Method to handle OTP entered
async function handleOTPSubmitted(otp: string): Promise<boolean> {
  return performOtpLogin(user.id, otp)
}

async function performOtpLogin(userId: string, otp: string) {
  isLoading.value = true
  try {
    const res = await authStore.otpLogin(userId, otp)
    if (res.success) {
      await router.push({ name: 'Onboarding' })
      return true
    } else {
      console.log('otp', res)
      // Handle different status flags
      if (res.status === 'missing_token' || res.status === 'invalid_token') {
        error.value = 'Please enter the code you received in the message.'
      }
      showUserIdForm.value = false
      showOtpForm.value = true
      return false
    }
  } catch (err: any) {
    console.error(err)
    error.value = err.response?.data?.message || 'Failed to confirm email.'
  } finally {
    isLoading.value = false
  }
  return false
}

function handleBackButton() {
  showUserIdForm.value = true
  showOtpForm.value = false
  error.value = ''
  isLoading.value = false
} 
</script>


<template>
  <div class="container mt-5">

    <div class="row justify-content-center">
      <div class="col-md-6">
        <div v-if="showOtpForm">
          <button class="btn btn-link btn-secondary"
                  @click="handleBackButton">
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            Back

          </button>
        </div>
      </div>
    </div>


    <div class="row justify-content-center">
      <div class="col-md-6 mb-3">

        <AuthIdComponent :isLoading="isLoading"
                         @otp:send="handleSendOtp"
                         v-if="showUserIdForm" />


        <OtpLoginComponent :isLoading="isLoading"
                           :user="user"
                           @otp:submit="handleOTPSubmitted"
                           v-if="showOtpForm" />
      </div>
    </div>
  </div>
</template>


<style lang="scss"></style>