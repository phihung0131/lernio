import { expect, test } from '@playwright/test'
import { completeLesson, login } from './helpers'

// Bản build có service worker: học được khi mất mạng, tiến độ lưu cục bộ.
test.use({ baseURL: 'http://localhost:4173' })

test('offline: tải lại khi mất mạng vẫn học được và lưu tiến độ', async ({ page, context }) => {
  await login(page)
  // Đợi service worker cài xong và điều khiển trang (precache mọi chunk + nội dung).
  // registerType 'prompt' không tự claim trang: đợi kích hoạt rồi tải lại để SW điều khiển.
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true))
  await page.reload()
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true)
  await page.getByRole('link', { name: /Bắt đầu bài học|Học tiếp/ }).waitFor()

  // Route giả vẫn trả lời khi offline: cho REST lỗi mạng để mô phỏng mất kết nối thật.
  let offline = true
  await page.route('**/rest/v1/**', (route) => (offline ? route.abort('internetdisconnected') : route.fulfill({ status: 201, json: [] })))
  await context.setOffline(true)
  await page.reload()
  await expect(page.getByRole('link', { name: /Bắt đầu bài học|Học tiếp/ })).toBeVisible()
  await page.goto('/path')
  await expect(page.getByRole('heading', { name: 'A0 – Làm quen' })).toBeVisible()

  await page.goto('/lesson/a0-c01-l1')
  await completeLesson(page, 'a0-c01-l1')
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Cách học hiệu quả với Lernio' })).toBeVisible()
  // Có mạng lại: hàng đợi đồng bộ (outbox) được đẩy lên Supabase (giả) và trống.
  const outboxCount = () =>
    page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          const q = indexedDB.open('lernio-00000000-0000-0000-0000-000000000001')
          q.onsuccess = () => {
            const r = q.result.transaction('outbox').objectStore('outbox').count()
            r.onsuccess = () => (resolve(r.result), q.result.close())
          }
        }),
    )
  expect(await outboxCount()).toBeGreaterThan(0)
  offline = false
  await context.setOffline(false)
  await expect.poll(outboxCount, { timeout: 20_000 }).toBe(0)
})
