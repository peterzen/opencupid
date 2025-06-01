<template>

  <div class="login-success-component">
    <div class="d-flex justify-content-center align-items-center flex-column h-100">
      <div class="icon-inner animate__animated animate__fadeIn">
        <OkIcon class="icon  " />
      </div>
      <h3 class="text-success animate__animated animate__fadeIn">Welcome!</h3>
    </div>
  </div>

</template>

<script lang="ts" setup>
import 'animate.css'
import OkIcon from '@/assets/icons/hand_gestures/ok.svg'
</script>

<style scoped>
.icon-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.icon {
  /* transition: filter 0.5s ease-in-out; */
  filter: invert(43%) sepia(76%) saturate(518%) hue-rotate(97deg) brightness(89%) contrast(90%);
}


</style>