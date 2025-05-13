import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router' 
import Login from '@/views/Login.vue';
import UserHome from '@/views/UserHome.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Login', component: Login },
  { path: '/', name: 'UserHome', component: UserHome },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});