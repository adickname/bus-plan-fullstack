import { createMemoryHistory, createRouter } from 'vue-router'

import Home from "./views/Home.vue"
import Schedule from "./views/Schedule.vue"
import Order from "./views/Order.vue"
import FindBus from "./views/FindBus.vue"
import OwnTickets from "./views/OwnTickets.vue"
import Login from "./views/Login.vue"
const routes = [
  { path: '/', component: Home, name:'home' },
  { path: '/schedule', component: Schedule, name:'schedule' },
  { path: '/order', component: Order, name:'order' },
  { path: '/find', component: FindBus, name:'find' },
  { path: '/tickets', component: OwnTickets, name:'own-tickets' },
  { path: '/login', component: Login, name:'login' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})