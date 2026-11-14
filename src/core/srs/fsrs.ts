import { createEmptyCard, fsrs, Rating, type Card, type Grade } from 'ts-fsrs'
import { db, type SrsCardRow } from '@/core/db/db'
import { enqueue } from '@/core/db/repo'

const f = fsrs()
export { Rating }
export type { Grade }

export function toCard(r: SrsCardRow): Card {
  return {
    due: new Date(r.due),
    stability: r.stability,
    difficulty: r.difficulty,
    elapsed_days: 0,
    scheduled_days: 0,
    learning_steps: 0,
    reps: r.reps,
    lapses: r.lapses,
    state: r.state,
    last_review: r.lastReview ? new Date(r.lastReview) : undefined,
  }
}

export function newRow(cardId: string, kind: 'vocab' | 'grammar', now = new Date()): SrsCardRow {
  const c = createEmptyCard(now)
  return {
    cardId,
    kind,
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    updatedAt: now.toISOString(),
  }
}

export function schedule(row: SrsCardRow, rating: Grade, now = new Date()): SrsCardRow {
  const { card } = f.next(toCard(row), now, rating)
  return {
    ...row,
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    lastReview: now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

const rowPayload = (r: SrsCardRow) => ({
  card_id: r.cardId,
  kind: r.kind,
  due: r.due,
  stability: r.stability,
  difficulty: r.difficulty,
  reps: r.reps,
  lapses: r.lapses,
  state: r.state,
  last_review: r.lastReview ?? null,
  updated_at: r.updatedAt,
})

export async function reviewCard(cardId: string, rating: Grade, now = new Date()) {
  const prev = await db.srsCards.get(cardId)
  if (!prev) return
  const next = schedule(prev, rating, now)
  await db.srsCards.put(next)
  await enqueue('srs_cards', rowPayload(next))
  const log = { id: crypto.randomUUID(), cardId, rating: rating as 1 | 2 | 3 | 4, reviewedAt: now.toISOString() }
  await db.reviewLogs.add(log)
  await enqueue('review_logs', { id: log.id, card_id: cardId, rating, reviewed_at: log.reviewedAt })
}

export async function addCardIfMissing(cardId: string, kind: 'vocab' | 'grammar') {
  if (await db.srsCards.get(cardId)) return
  const row = newRow(cardId, kind)
  await db.srsCards.put(row)
  await enqueue('srs_cards', rowPayload(row))
}

export const dueCards = (now = new Date()) =>
  db.srsCards.where('due').belowOrEqual(now.toISOString()).toArray()
