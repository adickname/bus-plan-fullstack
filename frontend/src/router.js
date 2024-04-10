import { createWebHistory, createRouter } from "vue-router";

export const router = createRouter({
  routes: [
    { path: "/", component: () => import("./views/Home.vue"), name: "home" },
    {
      path: "/find",
      component: () => import("./views/FindBus.vue"),
      name: "find",
    },
    {
      path: "/order",
      component: () => import("./views/Order.vue"),
      name: "order",
    },
    {
      path: "/find",
      component: () => import("./views/FindBus.vue"),
      name: "find",
    },
    {
      path: "/tickets",
      component: () => import("./views/OwnTickets.vue"),
      name: "own-tickets",
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
      name: "login",
    },
  ],
  history: createWebHistory(),
});
