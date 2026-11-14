import { beforeEach, describe, expect, it } from 'vitest'
import { db } from './db'
import { saveChapterResult, saveLessonStatus } from './repo'

beforeEach(async () => {
  await Promise.all([db.lessonProgress.clear(), db.chapterResults.clear(), db.outbox.clear()])
})

describe('repo', () => {
  it('completed is never downgraded', async () => {
    await saveLessonStatus('l1', 'completed', 1)
    const r = await saveLessonStatus('l1', 'in_progress')
    expect(r.status).toBe('completed')
    expect(await db.outbox.count()).toBe(1)
  })
  it('chapter passed sticks after a failed retry', async () => {
    await saveChapterResult('c1', 0.9, true)
    const r = await saveChapterResult('c1', 0.5, false)
    expect(r).toMatchObject({ passed: true, bestScore: 0.9, attempts: 2 })
  })
})
