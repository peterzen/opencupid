<template>
  <h3>Please check your email ({{ email }}) to complete the registration process.</h3>
  <p>
          <router-link :to="{ path: '/confirm-email', query: { token: token } }">Click me</router-link>

          
  </p>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
 setup() {
    const route = useRoute();
    const email = route.query.email as string;
    const token = route.query.token as string;

    console.log('Email:', email);
    console.log('Token:', token);

    return { email, token };
  },
});
</script>