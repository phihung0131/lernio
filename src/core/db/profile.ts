import { db, type ProfileRow } from './db'
import { enqueue } from './repo'

export const DEFAULT_PROFILE: ProfileRow = { key: 'me', dailyGoalXp: 30, newCardsPerDay: 20, audioRate: 1, theme: 'auto', updatedAt: '1970-01-01T00:00:00.000Z' }

export async function getProfile(): Promise<ProfileRow> {
  return (await db.profile.get('me')) ?? DEFAULT_PROFILE
}

export async function saveProfile(patch: Partial<Omit<ProfileRow, 'key' | 'updatedAt'>>) {
  const next: ProfileRow = { ...(await getProfile()), ...patch, key: 'me', updatedAt: new Date().toISOString() }
  await db.profile.put(next)
  await enqueue('profiles', {
    display_name: next.displayName ?? null,
    daily_goal_xp: next.dailyGoalXp,
    settings: { newCardsPerDay: next.newCardsPerDay, audioRate: next.audioRate, theme: next.theme },
    updated_at: next.updatedAt,
  })
  return next
}

/** Xếp hàng đồng bộ toàn bộ dữ liệu cục bộ (dùng sau khi nhập file). */
export async function enqueueAll() {
  for (const r of await db.lessonProgress.toArray())
    await enqueue('lesson_progress', { lesson_id: r.lessonId, status: r.status, best_score: r.bestScore ?? null, completed_at: r.completedAt ?? null, updated_at: r.updatedAt })
  for (const r of await db.chapterResults.toArray())
    await enqueue('chapter_results', { chapter_id: r.chapterId, attempts: r.attempts, best_score: r.bestScore, passed: r.passed, updated_at: r.updatedAt })
  for (const r of await db.srsCards.toArray())
    await enqueue('srs_cards', { card_id: r.cardId, kind: r.kind, due: r.due, stability: r.stability, difficulty: r.difficulty, reps: r.reps, lapses: r.lapses, state: r.state, last_review: r.lastReview ?? null, updated_at: r.updatedAt })
  for (const r of await db.reviewLogs.toArray()) await enqueue('review_logs', { id: r.id, card_id: r.cardId, rating: r.rating, reviewed_at: r.reviewedAt })
  for (const r of await db.xpEvents.toArray()) await enqueue('xp_events', { id: r.id, amount: r.amount, source: r.source, day: r.day, created_at: r.createdAt })
  for (const r of await db.badges.toArray()) await enqueue('badges', { badge_id: r.badgeId, earned_at: r.earnedAt })
}
