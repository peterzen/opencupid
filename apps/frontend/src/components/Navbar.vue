<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<script lang="ts">
import { Dropdown } from 'bootstrap'
import { defineComponent } from 'vue'
import LightSwitch from './LightSwitch.vue'
import LogoutButton from './LogoutButton.vue';
import { useAuthStore } from '@/store/authStore';


export default defineComponent({
  name: 'Navbar',
  components: {
    LightSwitch,
    LogoutButton,
  },
   data() {
    return {
      authStore: useAuthStore(),
    }
  },
  computed: {
    isLoggedIn(): boolean {
      return this.authStore.user !== null
    }
  },
   mounted() {
    const dropdownRef = this.$refs.navbarDropdown as HTMLElement
     if (dropdownRef) {
      new Dropdown(dropdownRef)
    }
  },
  methods: {
    switchTheme() {
      console.log('switch theme')
    }
  }
})

</script>

<template>
  <nav v-if="isLoggedIn" class="navbar sticky-top navbar-expand-md  mb-lg-4"
       id="navbar">
    <div class="container-fluid">
      <a class="navbar-brand"
         href="#">oc</a>
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse"
           id="navbar">
        <ul class="navbar-nav mb-2 mb-lg-0 d-flex">
          <li class="nav-item me-auto">
            <RouterLink to="/"
                        class="nav-link ">Home</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
               href="#"
               ref="navbarDropdown"
               role="button"
               data-bs-toggle="dropdown"
               aria-expanded="false"
               aria-haspopup="true">
              <FontAwesomeIcon icon="fa-bars" />
            </a>
            <ul class="dropdown-menu dropdown-dark dropdown-menu-end"
                aria-labelledby="navbarDropdown">
              <li>
                <span class="dropdown-item lightswitch">
                  <LightSwitch />
                </span>
              </li>
              <li>
                <LogoutButton />
              </li>

            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>



<style scoped>
.navbar {
  background-color: var(--bs-dark-bg-subtle);
}

.navbar-nav {
  width: 100%;
  justify-content: space-between;
}

.dropdown-toggle::after {
  display: none;
}

/* required for the .stetched-link to work correctly inside LightSwitch */
.lightswitch {
  position: relative;
}
</style>
```