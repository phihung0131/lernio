import { db } from '@/core/db/db'
import { enqueue } from '@/core/db/repo'
import { computeStreak } from '@/core/db/xp'
import { loadAllChapters } from '@/core/content/loader'
import { BADGES, type Badge, type Stats } from './badges'

export async function collectStats(): Promise<Stats> {
  const [xp, lessons, cards, results, reviews, chapters] = await Promise.all([
    db.xpEvents.toArray(),
    db.lessonProgress.where('status').equals('completed').count(),
    db.srsCards.count(),
    db.chapterResults.toArray(),
    db.reviewLogs.count(),
    loadAllChapters(),
  ])
  const passed = new Set(results.filter((r) => r.passed).map((r) => r.chapterId))
  const levelsPassed = ['A0', 'A1', 'A2', 'B1'].filter((lv) => {
    const list = chapters.filter((c) => c.levelId === lv)
    return list.length > 0 && passed.has(list[list.length - 1].id)
  })
  return {
    streak: computeStreak(xp.map((e) => e.day)),
    lessons,
    cards,
    chapters: passed.size,
    xp: xp.reduce((s, e) => s + e.amount, 0),
    reviews,
    levelsPassed,
  }
}

/** Trao huy hiệu mới đạt được; trả về danh sách huy hiệu vừa nhận. */
export async function checkBadges(): Promise<Badge[]> {
  const stats = await collectStats()
  const have = new Set((await db.badges.toArray()).map((b) => b.badgeId))
  const fresh = BADGES.filter((b) => !have.has(b.id) && b.test(stats))
  for (const b of fresh) {
    const earnedAt = new Date().toISOString()
    await db.badges.put({ badgeId: b.id, earnedAt })
    await enqueue('badges', { badge_id: b.id, earned_at: earnedAt })
  }
  return fresh
}
