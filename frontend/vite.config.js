import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      strict: false,
    },
  },
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Bus Plan App",
        short_name: "Bus Plan",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4DBA87",
        icons: [
          {
            src: "android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-launchericon-144-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "android-launchericon-72-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "android-launchericon-48-48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "40.png",
            sizes: "40x40",
            type: "image/png",
          },
          {
            src: "50.png",
            sizes: "50x50",
            type: "image/png",
          },
          {
            src: "64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "100.png",
            sizes: "100x100",
            type: "image/png",
          },
          {
            src: "144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Włącz generowanie w trybie deweloperskim
        type: "module", // Możesz wybrać 'module' lub 'script' w zależności od potrzeby
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
