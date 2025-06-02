
<script lang="ts" setup>
import { GenderType } from '@zod/generated';
import { genderIcons } from './genderIcons';


const props = defineProps<{
  gender: GenderType
}>()

const IconComponent = genderIcons[props.gender]




</script>

<template>

  <component :is="IconComponent" class="gender-icon" />

</template>

<style scoped>
.gender-icon {
  width: 2rem;
  height: 2rem;
  fill: currentColor;
}
</style>