<script setup lang="ts">
const model = defineModel<string>({
  default: () => '',
})
</script>

<template>
  <BFormFloatingLabel label="My name is..." label-for="publicName" class="my-2">
    <BInput
      size="lg"
      v-model.trim="model"
      id="publicName"
      type="text"
      placeholder=""
      label="publicName"
      maxlength="25"
      autocomplete="off"
      lazy
      required
    >
    </BInput>
    <BFormInvalidFeedback> Enter at least 3 letters </BFormInvalidFeedback>
  </BFormFloatingLabel>
</template>
