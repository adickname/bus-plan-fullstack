import { createWebHistory, createRouter } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

export const router = createRouter({
  routes: [
    { path: "/", component: () => import("./pages/Home.vue"), name: "home" },
    {
      path: "/find",
      component: () => import("./pages/FindBus.vue"),
      name: "find",
    },
    {
      path: "/order",
      component: () => import("./pages/Order.vue"),
      name: "order",
      beforeEnter: authGuard,
    },
    {
      path: "/find",
      component: () => import("./pages/FindBus.vue"),
      name: "find",
    },
    {
      path: "/tickets",
      component: () => import("./pages/OwnTickets.vue"),
      name: "own-tickets",
      beforeEnter: authGuard,
    },
    {
      path: "/login",
      component: () => import("./pages/Login.vue"),
      name: "login",
      beforeEnter: authGuard,
    },
  ],
  history: createWebHistory(),
});
