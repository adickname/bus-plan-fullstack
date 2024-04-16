import { createWebHistory, createRouter } from "vue-router";

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
    },
    {
      path: "/login",
      component: () => import("./pages/Login.vue"),
      name: "login",
    },
  ],
  history: createWebHistory(),
});
