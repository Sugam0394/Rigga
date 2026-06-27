 import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      injectRegister: "auto",

      manifest: {
        name: "Rigga",
        short_name: "Rigga",

        description:
          "Build commitments. Stay accountable.",

        theme_color: "#DC2626",

        background_color: "#FFFFFF",

        display: "standalone",

        orientation: "portrait",

        start_url: "/",

        scope: "/",

        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },

          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,png,svg,ico}",
        ],
      },
    }),
  ],
});
