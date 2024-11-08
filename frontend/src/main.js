import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";
import { createI18n, useI18n } from "vue-i18n";
import en from "./locales/en.json";
import pl from "./locales/pl.json";
import Aura from "@primevue/themes/aura";
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
      redirect_uri: window.location.origin,
    },
  })
);

const i18n = createI18n({
  locale: localStorage.getItem("language") || navigator.language,
  fallbackLocale: "en",
  messages: { pl, en },
  legacy: false,
});
app
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        darkModeSelector: "system",
        cssLayer: false,
      },
    },
  })
  .use(i18n)
  .use(vuetify)
  .use(pinia)
  .mount("#app");
