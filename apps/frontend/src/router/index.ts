import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/authStore';

import Login from '@/views/Login.vue';
import UserHome from '@/views/UserHome.vue';
import UserProfile from '@/views/UserProfile.vue';
import { useLocalStore } from '@/store/localStore';
import { showToast } from '@/lib/toastify';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/me',
    name: 'UserHome',
    component: UserHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  // Redirect root to login page
  {
    path: '/',
    redirect: '/login'
  }
];



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Register the navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Initialize auth state if not already done
  if (!authStore.isInitialized) {
    await authStore.initializeFromStorage()
  }

  if (to.meta.requiresAuth === false && authStore.isLoggedIn) {
    next({ name: 'UserHome' });
    return
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // If the route requires authentication and the user is not logged in, redirect to login
    next({ name: 'Login' });
  } else {
    // Otherwise, allow access
    next();
  }
});

router.afterEach((to, from) => {
  const localStore = useLocalStore()
  const flashMessage = localStore.getFlashMessage()

  if (flashMessage) {
    showToast(flashMessage)
  }

  // Set the page title based on the route name
  // const title = to.name ? `${to.name} - My App` : 'My App';
  // document.title = title;

});

export default router;