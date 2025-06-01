<script setup lang="ts">
import { ref, computed } from 'vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { AuthIdentifier } from '@zod/user.schema'
import { emailRegex, phoneRegex } from '@/lib/utils';

const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'otp:send', identifier: AuthIdentifier): void
}>()


// Reactive variables
const authIdInput = ref('')
const error = ref('' as string)

const authIdentifier = computed(() => {
  console.log('authIdInput.value:', authIdInput.value)
  return {
    email: emailRegex.test(authIdInput.value) ? authIdInput.value : '',
    phonenumber: phoneRegex.test(authIdInput.value) ? authIdInput.value : ''
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
  console.log('Validating Auth ID empty:', value)
  if (!value || value === '') return false
  console.log('Validating Auth ID Input:', value)
  if (emailRegex.test(value) || phoneRegex.test(value)) {
    console.log('User ID is valid:', value)
    return true
  }
  return false
}

const authIdInputRef = ref<InstanceType<any> | null>(null)

// onMounted(() => {
//   const node: FormKitNode | undefined = authIdInputRef.value?.node
//   console.log('AuthIdComponent mounted', node)
// })
</script>


<template>
  <div class="auth-id-component">

    <ErrorComponent :error="error" />

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
                 autoFocus
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

              <FontAwesomeIcon icon="check"
                               v-if="valid"
                               class="text-success" />
              <span class="text-muted"
                    v-else>
                <FontAwesomeIcon icon="envelope"
                                 v-if="authIdInput.includes('@')" />
                <FontAwesomeIcon icon="phone"
                                 v-else-if="authIdInput.startsWith('+')" />
              </span>
            </div>
          </template>
        </FormKit>

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
}
</style>