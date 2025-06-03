<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SendOtpPayload } from '@zod/user.schema'
import { emailRegex, phoneRegex } from '@/lib/utils';
import CaptchaWidget from './CaptchaWidget.vue';
import { IconMail, IconPhone, IconTick } from '@/components/icons/DoodleIcons';

const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'otp:send', identifier: SendOtpPayload): void
}>()

// State variables
const authIdInput = ref('')
const captchaPayload = ref('')
const error = ref('')

const authIdentifier = computed(() => {
  // console.log('authIdInput.value:', authIdInput.value)
  return {
    email: emailRegex.test(authIdInput.value) ? authIdInput.value : '',
    phonenumber: phoneRegex.test(authIdInput.value) ? authIdInput.value : '',
    captchaSolution: captchaPayload.value || '',
  }
})

// Method to handle sending login link
async function handleSendLoginLink() {
  if (!authIdInput.value) {
    error.value = 'Please enter your email address or phone number.'
    return
  }
  emit('otp:send', authIdentifier.value)
}


const validateAuthIdInput = (node: any) => {
  const value = node.value as string
  // console.log('Validating Auth ID empty:', value)
  if (!value || value === '') return false
  // console.log('Validating Auth ID Input:', value)
  if (emailRegex.test(value) || phoneRegex.test(value)) {
    // console.log('User ID is valid:', value)
    return true
  }
  return false
}

function handleCaptchaUpdatePayload(payload: string) {
  // console.log('Captcha payload updated:', payload)
  captchaPayload.value = payload
}

const authIdInputRef = ref<InstanceType<any> | null>(null)

// onMounted(() => {
//   const node: FormKitNode | undefined = authIdInputRef.value?.node
//   console.log('AuthIdComponent mounted', node)
// })
</script>


<template>
  <div class="auth-id-component">

    <FormKit type="form"
             id="userIdForm"
             :actions="false"
             :disabled="props.isLoading"
             #default="{ state: { valid } }"
             @submit="handleSendLoginLink">

      <div class="mb-3">
        <FormKit type="text"
                 v-model="authIdInput"
                 label="Your email address or phone number..."
                 id="authIdInput"
                 ref="authIdInputRef"
                 autofocus
                 :floating-label="true"
                 input-class="form-control-lg"
                 validation="+validateAuthIdInput"
                 placeholder="+43... or your@email.com"
                 :validation-rules="{
                  validateAuthIdInput,
                }"
                 validation-visibility="live">
          <template #suffixIcon>
            <div class="suffix-icon">
              <span class="text-success"
                    v-if="valid">
                <IconTick class="svg-icon" />
              </span>
              <span class="text-muted"
                    v-else>
                <IconMail class="svg-icon"
                          v-if="authIdInput.includes('@')" />
                <IconPhone class="svg-icon"
                           v-else-if="authIdInput.startsWith('+')" />
              </span>
            </div>
          </template>
        </FormKit>
      </div>

      <div class="mb-3">
        <CaptchaWidget v-if="!props.isLoading"
                       @update:payload="handleCaptchaUpdatePayload" />
      </div>

      <FormKit type="submit"
               wrapper-class="d-grid gap-2 mb-3"
               input-class="btn-primary btn-lg w-100"
               label="Continue"
               :disabled="!valid || props.isLoading" />

    </FormKit>
  </div>
</template>


<style scoped>
:deep(ul.formkit-messages) {
  display: none;
}

.suffix-icon {
  position: absolute;
  top: 0.5em;
  right: 1em;
}

.formkit-input {
  padding-right: 3.5rem;
}

.svg-icon {
  fill: currentColor;
}
</style>