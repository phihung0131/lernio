import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Page } from '@playwright/test'

const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString('base64url')
const fakeJwt = () => `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'u1', role: 'authenticated', exp: 4102444800 })}.sig`

/** Mock Supabase Auth + REST để e2e không phụ thuộc mạng/xác nhận email. */
export async function mockSupabase(page: Page) {
  const user = { id: '00000000-0000-0000-0000-000000000001', aud: 'authenticated', role: 'authenticated', email: 'e2e@example.com', app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() }
  await page.route('**/auth/v1/**', (route) => {
    const url = route.request().url()
    if (url.includes('/token')) {
      return route.fulfill({ json: { access_token: fakeJwt(), token_type: 'bearer', expires_in: 3600, expires_at: 4102444800, refresh_token: 'r', user } })
    }
    if (url.includes('/user')) return route.fulfill({ json: user })
    if (url.includes('/logout')) return route.fulfill({ status: 204, body: '' })
    return route.fulfill({ json: {} })
  })
  await page.route('**/rest/v1/**', (route) => route.fulfill({ status: 201, json: [] }))
}

export async function login(page: Page) {
  await mockSupabase(page)
  await page.goto('/')
  await page.getByLabel('Email').fill('e2e@example.com')
  await page.getByLabel('Mật khẩu').fill('password123')
  await page.getByRole('button', { name: 'Đăng nhập' }).click()
  await page.getByRole('heading', { name: 'Lộ trình học' }).waitFor()
}

// ---- trả lời bài tập dựa vào dữ liệu nội dung ----
type Q = Record<string, any>
const questions = new Map<string, Q>()
for (const level of ['A0', 'A1', 'A2', 'B1']) {
  let dir: string
  try {
    dir = join('content', level, 'chapters')
    for (const f of readdirSync(dir)) {
      const ch = JSON.parse(readFileSync(join(dir, f), 'utf8'))
      for (const l of ch.lessons) for (const e of l.exercises) questions.set(e.id, e)
      for (const q of ch.test.questions) questions.set(q.id, q)
    }
  } catch {
    /* level chưa có */
  }
}

export async function answerExercise(page: Page, correct: boolean) {
  const root = page.locator('[data-exercise-id]').first()
  const id = await root.getAttribute('data-exercise-id')
  const q = questions.get(id!)
  if (!q) throw new Error(`Không tìm thấy bài ${id}`)
  switch (q.type) {
    case 'multipleChoice':
    case 'listenAndChoose': {
      const idx = correct ? q.answer : (q.answer + 1) % q.options.length
      await root.getByRole('button', { name: q.options[idx], exact: true }).click()
      break
    }
    case 'articlePick': {
      const g = correct ? q.answer : q.answer === 'der' ? 'die' : 'der'
      await root.getByRole('button', { name: g, exact: true }).click()
      break
    }
    case 'fillBlank':
    case 'typeAnswer':
    case 'dictation':
      await root.getByLabel('Đáp án').fill(correct ? q.answers[0] : 'zzz')
      await root.getByRole('button', { name: 'Kiểm tra' }).click()
      break
    case 'wordOrder': {
      const seq = correct ? q.answer : [...q.answer].reverse()
      for (const w of seq) await root.locator('div.flex-wrap').last().getByRole('button', { name: w, exact: true }).first().click()
      await root.getByRole('button', { name: 'Kiểm tra' }).click()
      break
    }
    case 'matchPairs':
      for (const p of q.pairs) {
        await root.getByRole('button', { name: p.left, exact: true }).click()
        await root.getByRole('button', { name: p.right, exact: true }).click()
      }
      break
  }
  await root.getByRole('button', { name: 'Tiếp tục' }).click()
}

/** Làm hết một ExerciseRunner đang hiển thị. */
export async function runAll(page: Page, correct = true) {
  await page.locator('[data-exercise-id]').first().waitFor()
  while (await page.locator('[data-exercise-id]').count()) await answerExercise(page, correct)
}
