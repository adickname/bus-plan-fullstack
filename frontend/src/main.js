import { createApp } from "vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-dark-indigo/theme.css";
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

app.use(router).use(vuetify).use(PrimeVue).mount("#app");
