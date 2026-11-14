import { db } from '@/core/db/db'
import { mergeChapter, mergeLesson, mergeSrs } from '@/core/db/merge'
import { supabase } from './supabase'

type R = Record<string, any>

/** Kéo toàn bộ dữ liệu của người dùng từ Supabase và hợp nhất vào Dexie. Gọi trước khi đẩy. */
export async function pullAll(userId: string): Promise<boolean> {
  if (!navigator.onLine) return false
  const get = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*').eq('user_id', userId)
    if (error) throw error
    return (data ?? []) as R[]
  }
  try {
    const [lp, cr, sc, rl, xp, bd, pf] = await Promise.all([
      get('lesson_progress'), get('chapter_results'), get('srs_cards'), get('review_logs'), get('xp_events'), get('badges'), get('profiles'),
    ])
    await db.transaction('rw', [db.lessonProgress, db.chapterResults, db.srsCards, db.reviewLogs, db.xpEvents, db.badges, db.profile], async () => {
      const p = pf[0]
      if (p) {
        const local = await db.profile.get('me')
        if (!local || (p.updated_at && p.updated_at > local.updatedAt)) {
          const st = (p.settings ?? {}) as Record<string, unknown>
          await db.profile.put({ key: 'me', displayName: p.display_name ?? undefined, dailyGoalXp: p.daily_goal_xp ?? 30, newCardsPerDay: (st.newCardsPerDay as number) ?? 20, audioRate: (st.audioRate as number) ?? 1, theme: (st.theme as 'auto') ?? 'auto', updatedAt: p.updated_at ?? new Date(0).toISOString() })
        }
      }
      for (const r of lp) {
        const remote = { lessonId: r.lesson_id, status: r.status, bestScore: r.best_score ?? undefined, completedAt: r.completed_at ?? undefined, updatedAt: r.updated_at }
        const local = await db.lessonProgress.get(r.lesson_id)
        await db.lessonProgress.put(local ? mergeLesson(local, remote) : remote)
      }
      for (const r of cr) {
        const remote = { chapterId: r.chapter_id, attempts: r.attempts, bestScore: Number(r.best_score), passed: r.passed, updatedAt: r.updated_at }
        const local = await db.chapterResults.get(r.chapter_id)
        await db.chapterResults.put(local ? mergeChapter(local, remote) : remote)
      }
      for (const r of sc) {
        const remote = { cardId: r.card_id, kind: r.kind, due: r.due, stability: r.stability, difficulty: r.difficulty, reps: r.reps, lapses: r.lapses, state: r.state, lastReview: r.last_review ?? undefined, updatedAt: r.updated_at }
        const local = await db.srsCards.get(r.card_id)
        await db.srsCards.put(local ? mergeSrs(local, remote) : remote)
      }
      await db.reviewLogs.bulkPut(rl.map((r) => ({ id: r.id, cardId: r.card_id, rating: r.rating, reviewedAt: r.reviewed_at })))
      await db.xpEvents.bulkPut(xp.map((r) => ({ id: r.id, amount: r.amount, source: r.source, day: r.day, createdAt: r.created_at })))
      await db.badges.bulkPut(bd.map((r) => ({ badgeId: r.badge_id, earnedAt: r.earned_at })))
    })
    return true
  } catch {
    return false
  }
}
