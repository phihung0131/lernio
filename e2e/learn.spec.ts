import { expect, test } from '@playwright/test'
import { completeLesson, login, runAll, takeTest } from './helpers'

test('chưa đăng nhập bị chuyển về /login', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/login/)
})

test('lộ trình: học bài, khóa bài, kiểm tra chapter', async ({ page }) => {
  await login(page)
  await expect(page.getByRole('heading', { name: /Tiếng Đức là gì/ })).toBeVisible() // thẻ Học tiếp

  // Bản đồ: bài 2 khóa, truy cập thẳng bị chặn
  await page.goto('/path')
  await page.getByRole('button', { name: /Cách học hiệu quả với Lernio \(đang khóa\)/ }).click()
  await expect(page.getByText('Hoàn thành bài trước để mở khóa.')).toBeVisible()
  await page.goto('/lesson/a0-c01-l2')
  await expect(page).toHaveURL(/\/path/)

  // Học bài 1 qua bản đồ
  await page.getByRole('button', { name: 'Tiếng Đức là gì và vì sao học' }).click()
  await page.getByRole('link', { name: 'Bắt đầu' }).click()
  await expect(page).toHaveURL(/\/lesson\/a0-c01-l1/)
  await completeLesson(page, 'a0-c01-l1')

  // Bài kiểm tra khóa đến khi xong mọi bài
  await page.goto('/test/a0-c01')
  await expect(page).toHaveURL(/\/path/)
  await completeLesson(page, 'a0-c01-l2')
  await completeLesson(page, 'a0-c01-l3')
  await completeLesson(page, 'a0-c01-l4')

  // Trượt: chapter 2 vẫn khóa
  await takeTest(page, 'a0-c01', false)
  await expect(page.getByText('Chưa đạt, thử lại nhé')).toBeVisible()
  await page.goto('/lesson/a0-c02-l1')
  await expect(page).toHaveURL(/\/path/)

  // Đạt: chapter 2 mở
  await takeTest(page, 'a0-c01', true)
  await expect(page.getByText('Bạn đã vượt qua!')).toBeVisible()
  await page.goto('/lesson/a0-c02-l1')
  await expect(page.getByRole('heading', { name: 'Chữ cái A đến I' })).toBeVisible()
})

test('trình học: lưu vị trí và học tiếp đúng chỗ', async ({ page }) => {
  await login(page)
  await page.goto('/lesson/a0-c01-l1')
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click()
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click()
  const section = await page.locator('nav[aria-label="Các phần của bài"] [aria-current="step"]').textContent()
  await page.goto('/')
  await page.goto('/lesson/a0-c01-l1')
  await expect(page.locator('nav[aria-label="Các phần của bài"] [aria-current="step"]')).toHaveText(section!)
})

test('ôn tập: thẻ xuất hiện sau khi học, chấm FSRS', async ({ page }) => {
  await login(page)
  await page.goto('/review')
  await expect(page.getByText('Không có thẻ đến hạn')).toBeVisible()
  await completeLesson(page, 'a0-c01-l1')
  await page.goto('/review')
  await expect(page.getByRole('heading', { name: 'Ôn tập' })).toBeVisible()
  // Thẻ đầu (reps 0) là dạng nhận biết: chọn bất kỳ rồi chấm
  await page.locator('.grid button').first().click()
  const ok = page.getByRole('button', { name: 'Tốt' })
  if (await ok.isVisible()) await ok.click()
  else await page.getByRole('button', { name: 'Tiếp tục' }).click()
  await expect(page.getByText(/còn \d+/)).toBeVisible()
})

test('luyện tập tự chọn và điểm yếu', async ({ page }) => {
  await login(page)
  await completeLesson(page, 'a0-c01-l1', false) // làm sai để có điểm yếu
  await page.goto('/practice/weak')
  await page.getByRole('button', { name: 'Luyện lại (tối đa 10 câu)' }).click()
  await runAll(page, true)
  await page.goto('/practice/mix')
  await page.getByRole('button', { name: 'Bắt đầu luyện' }).click()
  await runAll(page, true)
  await expect(page.getByText(/Đúng \d+\/\d+ câu/)).toBeVisible()
})

test('các trang chính không crash', async ({ page }) => {
  await login(page)
  for (const path of ['/', '/path', '/review', '/practice', '/practice/weak', '/practice/mix', '/mock', '/vocabulary', '/grammar', '/listening', '/profile', '/settings']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: 'Có lỗi xảy ra' })).toHaveCount(0)
    await expect(page.locator('main h1, main h2').first()).toBeVisible()
  }
})

test('cài đặt: mục tiêu XP và giao diện tối được lưu', async ({ page }) => {
  await login(page)
  await page.goto('/settings')
  await page.getByRole('button', { name: '50 XP' }).click()
  await page.getByRole('button', { name: 'Tối', exact: true }).click()
  // Đợi giá trị đã lưu vào IndexedDB (giao diện đọc lại qua liveQuery) rồi mới tải lại.
  await expect(page.getByRole('button', { name: '50 XP' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.getByRole('button', { name: '50 XP' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('mobile 390px: các trang chính không tràn ngang', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await login(page)
  for (const path of ['/', '/path', '/review', '/practice', '/vocabulary', '/grammar', '/listening', '/profile', '/settings', '/mock', '/lesson/a0-c01-l1']) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, `tràn ngang ở ${path}`).toBeLessThanOrEqual(1)
  }
})
