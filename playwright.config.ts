import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  timeout: 240_000,
  // Dev server biên dịch chunk theo route và parse nội dung lần đầu khá chậm.
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:5173', channel: process.env.CI ? undefined : 'chrome', trace: 'retain-on-failure' },
  webServer: [
    {
      command: 'npm run dev -- --port 5173 --strictPort',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      env: {
        VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? 'https://e2e-mock.supabase.co',
        VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY ?? 'e2e-mock-key',
      },
    },
    {
      // Bản build thật (có service worker) cho test offline; build riêng vào dist-e2e với Supabase giả.
      command: 'npx vite build --outDir dist-e2e --emptyOutDir && npx vite preview --outDir dist-e2e --port 4173 --strictPort',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: { VITE_SUPABASE_URL: 'https://e2e-mock.supabase.co', VITE_SUPABASE_ANON_KEY: 'e2e-mock-key' },
    },
  ],
})
