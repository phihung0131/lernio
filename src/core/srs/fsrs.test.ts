import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/core/db/db'
import { addCardIfMissing, dueCards, newRow, Rating, reviewCard, schedule } from './fsrs'

beforeEach(async () => {
  await Promise.all([db.srsCards.clear(), db.reviewLogs.clear(), db.outbox.clear()])
})

describe('fsrs', () => {
  it('Good pushes due date into the future; Again keeps it sooner', () => {
    const now = new Date('2026-11-15T10:00:00Z')
    const row = newRow('vocab:a', 'vocab', now)
    const good = schedule(schedule(row, Rating.Good, now), Rating.Good, new Date('2026-11-16T10:00:00Z'))
    const again = schedule(schedule(row, Rating.Good, now), Rating.Again, new Date('2026-11-16T10:00:00Z'))
    expect(new Date(good.due).getTime()).toBeGreaterThan(new Date(again.due).getTime())
  })
  it('new card is due immediately; reviewing logs and queues', async () => {
    await addCardIfMissing('vocab:x', 'vocab')
    await addCardIfMissing('vocab:x', 'vocab')
    expect(await db.srsCards.count()).toBe(1)
    expect((await dueCards(new Date(Date.now() + 1000))).length).toBe(1)
    await reviewCard('vocab:x', Rating.Good)
    expect(await db.reviewLogs.count()).toBe(1)
    expect(await db.outbox.count()).toBe(3)
  })
})
