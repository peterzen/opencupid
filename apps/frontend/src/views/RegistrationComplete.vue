<template>
  <h3>Please check your email ({{ email }}) to complete the registration process.</h3>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
 setup() {
    const route = useRoute();
    const email = route.query.email as string;

    console.log('Email:', email);

    return { email };
  },
});
</script>