import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      // Optionnel : répertoire par défaut des composants
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true, // recherche dans les sous-dossiers
      dts: true, // génère un fichier de types (utile pour TypeScript)
    }),
    VitePWA({
      registerType: 'autoUpdate',

      devOptions: {
        enabled: true, // pour tester le SW en développement
      },
      manifest: {
        name: 'Mon App Manga',
        short_name: 'Manga',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api\.domain\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
            },
          },
        ],
      },
      injectRegister: 'auto',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/assets/scss/main.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
