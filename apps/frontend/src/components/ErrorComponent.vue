<template>
  <div v-if="error"
       class="alert alert-danger mb-4">
    <h4>{{ t('uicomponents.error.title') }}</h4>
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  error?: string
}>()

const { t } = useI18n()

const error = ref(props.error)


</script>