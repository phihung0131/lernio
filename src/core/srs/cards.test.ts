import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/core/db/db'
import type { Lesson } from '@/core/content/schema'
import { VOCAB_CANON } from '@/generated/vocabCanon'
import { seedCards } from './cards'

beforeEach(async () => {
  await Promise.all([db.srsCards.clear(), db.outbox.clear()])
})

describe('seedCards', () => {
  it('từ lặp lại ở bài sau dùng chung thẻ với lần xuất hiện đầu', async () => {
    const [dup, first] = Object.entries(VOCAB_CANON)[0]
    const lesson = { vocab: [{ id: first }, { id: dup }], teaches: [] } as unknown as Lesson
    await seedCards(lesson)
    const ids = (await db.srsCards.toArray()).map((c) => c.cardId)
    expect(ids).toEqual([`vocab:${first}`])
  })
  it('id gốc luôn là gốc (không có chuỗi gộp nhiều tầng)', () => {
    expect(Object.keys(VOCAB_CANON).every((k) => VOCAB_CANON[VOCAB_CANON[k]] === undefined)).toBe(true)
  })
})
