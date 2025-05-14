import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store';

import Login from '@/views/Login.vue';
import UserHome from '@/views/UserHome.vue';
import Register from '@/views/Register.vue';
import ConfirmEmail from '@/views/ConfirmEmail.vue';
import RegistrationComplete from '@/views/RegistrationComplete.vue';
import RecoverPasswordIntent from '@/views/RecoverPasswordIntent.vue';
import ResetPassword from '@/views/ResetPassword.vue';

const routes: Array<RouteRecordRaw> = [
    {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/register/confirm',
    name: 'RegistrationComplete',
    component: RegistrationComplete,
    meta: { requiresAuth: false }
  },
  {
    path: '/confirm-email',
    name: 'ConfirmEmail',
    component: ConfirmEmail,
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot-password',
    name: 'RecoverPasswordIntent',
    component: RecoverPasswordIntent,
    meta: { requiresAuth: false }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { requiresAuth: false }
  },
  {
    path: '/me',
    name: 'UserHome',
    component: UserHome,
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
router.beforeEach((to, from, next) => {
  const auth = useAuthStore(); // Access the auth store
  if (to.meta.requiresAuth && !auth.token) {
    // If the route requires authentication and the user is not logged in, redirect to login
    next({ name: 'Login' });
  } else {
    // Otherwise, allow access
    next();
  }
});

export default router;