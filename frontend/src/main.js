import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";
import "primevue/resources/themes/lara-dark-indigo/theme.css";
import "tailwindcss/tailwind.css";

import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
import { router } from "./router.js";
const app = createApp(App);
const pinia = createPinia();
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.href,
    },
  })
);
app.use(router).use(vuetify).use(PrimeVue).use(pinia).mount("#app");
