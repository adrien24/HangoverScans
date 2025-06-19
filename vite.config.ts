import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
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
      registerType: 'prompt',
      devOptions: {
        enabled: true, // pour tester le SW en développement
        type: 'module',
      },
      manifest: {
        name: 'Hangover Scans',
        short_name: 'Hangover Scans',
        description: 'Une application pour lire des scans de mangas',
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
        skipWaiting: false,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
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
