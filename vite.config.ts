/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Lernio – Học tiếng Đức',
        short_name: 'Lernio',
        description: 'Học tiếng Đức từ số 0 đến B1',
        lang: 'vi',
        display: 'standalone',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#2f6bff',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json,woff2,png}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\/audio\/.*\.mp3$/,
            handler: 'CacheFirst',
            options: { cacheName: 'lernio-audio', expiration: { maxEntries: 10000 } },
          },
        ],
      },
    }),
  ],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.ts', 'content-src/**/*.test.ts'],
  },
})
