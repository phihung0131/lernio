import { expect, test } from '@playwright/test'
import { login, runAll } from './helpers'

test('chưa đăng nhập bị chuyển về /login', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/login/)
})

test('đăng nhập, học bài, khóa bài và kiểm tra chapter', async ({ page }) => {
  await login(page)

  // Bài sau bị khóa, bài đầu mở
  await expect(page.getByRole('link', { name: /Tiếng Đức là gì/ })).toBeVisible()
  await expect(page.getByText('Cách học hiệu quả với Lernio').locator('..').locator('..')).toHaveAttribute('aria-disabled', 'true')
  await page.goto('/lesson/a0-c01-l2')
  await expect(page).toHaveURL('/') // truy cập thẳng bài bị khóa bị chặn

  // Học bài 1: đi qua 6 phần
  await page.getByRole('link', { name: /Tiếng Đức là gì/ }).click()
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Tiếp theo' }).click()
  await expect(page.getByRole('heading', { name: '5. Luyện tập' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Hãy làm hết bài tập' })).toBeDisabled()
  await runAll(page)
  await page.getByRole('button', { name: 'Tiếp theo' }).click()
  await page.getByRole('button', { name: 'Hoàn thành bài học' }).click()
  await page.getByRole('heading', { name: 'Lộ trình học' }).waitFor() // đợi lưu xong
  await expect(page.getByRole('heading', { name: 'Lộ trình học' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Cách học hiệu quả/ })).toBeVisible()

  // Bài kiểm tra bị khóa cho đến khi xong mọi bài của chapter
  await page.goto('/test/a0-c01')
  await expect(page).toHaveURL('/')
  await page.getByRole('link', { name: /Cách học hiệu quả/ }).click()
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Tiếp theo' }).click()
  await runAll(page)
  await page.getByRole('button', { name: 'Tiếp theo' }).click()
  await page.getByRole('button', { name: 'Hoàn thành bài học' }).click()
  await page.getByRole('heading', { name: 'Lộ trình học' }).waitFor() // đợi lưu xong

  // Chapter 2 vẫn khóa khi chưa đạt bài kiểm tra
  await page.goto('/lesson/a0-c02-l1')
  await expect(page).toHaveURL('/')

  // Trượt bài kiểm tra: toàn sai -> không mở chapter 2
  await page.getByRole('link', { name: /Kiểm tra cuối chapter/ }).first().click()
  await runAll(page, false)
  await expect(page.getByText('Chưa đạt, thử lại nhé')).toBeVisible()
  await page.goto('/lesson/a0-c02-l1')
  await expect(page).toHaveURL('/')

  // Làm lại và đạt -> mở chapter 2
  await page.goto('/test/a0-c01')
  await runAll(page, true)
  await expect(page.getByText('Bạn đã vượt qua!')).toBeVisible()
  await page.getByRole('link', { name: 'Về lộ trình' }).click()
  await page.getByRole('link', { name: /Chữ cái A đến M/ }).click()
  await expect(page.getByRole('heading', { name: 'Chữ cái A đến M' })).toBeVisible()
})

test('ôn tập: thẻ xuất hiện sau khi học và chấm FSRS', async ({ page }) => {
  await login(page)
  await page.goto('/review')
  await expect(page.getByText('Chưa có thẻ nào')).toBeVisible()
  await page.goto('/')
  await page.getByRole('link', { name: /Tiếng Đức là gì/ }).click()
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Tiếp theo' }).click()
  await runAll(page)
  await page.getByRole('button', { name: 'Tiếp theo' }).click()
  await page.getByRole('button', { name: 'Hoàn thành bài học' }).click()
  await page.getByRole('heading', { name: 'Lộ trình học' }).waitFor() // đợi lưu xong
  await expect(page.getByRole('heading', { name: 'Lộ trình học' })).toBeVisible() // đợi lưu xong
  await page.goto('/review')
  await expect(page.getByRole('heading', { name: 'Ôn tập hôm nay' })).toBeVisible()
  await page.getByRole('button', { name: 'Hiện đáp án' }).click()
  await page.getByRole('button', { name: 'Tốt' }).click()
  await expect(page.getByRole('heading', { name: 'Ôn tập hôm nay' }).or(page.getByRole('heading', { name: 'Hôm nay đã ôn xong!' }))).toBeVisible()
})

test('các trang chính không crash', async ({ page }) => {
  await login(page)
  for (const path of ['/progress', '/review', '/vocabulary', '/grammar', '/listening', '/settings']) {
    await page.goto(path)
    await expect(page.getByRole('alert')).toHaveCount(0)
    await expect(page.locator('main h1').first()).toBeVisible()
  }
})
