<script setup lang="ts">
import { ref } from 'vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { OwnerUser } from '@zod/user.schema'
import { otpRegex } from '@/lib/utils';

const props = defineProps<{
  user: OwnerUser
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'otp:submit', otp: string): void
}>()

// Reactive variables
const otpInput = ref('')
const error = ref('' as string)

// Method to handle OTP entered
async function handleOTPEntered() {
  emit('otp:submit', otpInput.value)
}

function validateOtp(node: any) {
  const value = node.value as string
  console.log('Validating OTP:', value)
  if (!value) return false

  // Simple validation for OTP: must be a number and 6 digits long
  return otpRegex.test(value)
}

</script>


<template>
  <div class="otp-form">
    <h2>Check your email</h2>
    <p>We have sent you a login link. Please check your inbox.</p>
    <p>If you don't see it, please check your spam folder.</p>

    <FormKit type="form"
             id="otpForm"
             :actions="false"
             :disabled="isLoading"
             #default="{ state: { valid } }"
             @submit="handleOTPEntered">

      <div class="mb-3">
        <FormKit type="text"
                 v-model="otpInput"
                 label="Login code..."
                 help="Please enter the code in the message"
                 id="otp"
                 :floating-label="true"
                 input-class="form-control-lg"
                 aria-autocomplete="none"
                 autocomplete="off"
                 autoFocus
                 validation="+validateOtp"
                 :validation-rules="{
                  validateOtp,
                }"
                 validation-visibility="live" />
      </div>

      <ErrorComponent :error="error" />
      <FormKit type="submit"
               wrapper-class="d-grid gap-2 mb-3"
               input-class="btn-primary btn-lg w-100"
               label="Continue"
               :disabled="!valid || isLoading" />
    </FormKit>
  </div>
</template>


<style scoped>
::v-deep ul.formkit-messages {
  display: none;
}


.suffix-icon {
  position: absolute;
  top: 0.75em;
  right: 1em;
}

.formkit-input {
  padding-right: 3.5rem;
  /* Adjust padding to accommodate suffix icon */
}
</style>