import { createRouter, createWebHistory } from 'vue-router'

import Login from "../Views/Authentication/login.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    
  ],
});

export default router
