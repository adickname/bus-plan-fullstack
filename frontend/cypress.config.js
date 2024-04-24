import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    server_url: "http://localhost:5170",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
