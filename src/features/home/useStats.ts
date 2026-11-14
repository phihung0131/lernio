import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/core/db/db'
import { computeStreak, dayKey } from '@/core/db/xp'

export interface Stats {
  xpToday: number
  xpTotal: number
  goal: number
  streak: number
  due: number
  cards: number
  lessonsDone: number
  chaptersPassed: number
  mistakes: number
}

export function useStats(): Stats | undefined {
  return useLiveQuery(async () => {
    const now = new Date().toISOString()
    const [xp, profile, due, cards, lessonsDone, chaptersPassed, mistakes] = await Promise.all([
      db.xpEvents.toArray(),
      db.profile.get('me'),
      db.srsCards.where('due').belowOrEqual(now).count(),
      db.srsCards.count(),
      db.lessonProgress.where('status').equals('completed').count(),
      db.chapterResults.filter((c) => c.passed).count(),
      // Đếm như trang Điểm yếu: bỏ tag lesson: (chỉ là nhãn bài, không phải chủ điểm cần luyện).
      db.mistakes.filter((m) => m.count > 0 && !m.tag.startsWith('lesson:')).count(),
    ])
    const today = dayKey()
    return {
      xpToday: xp.filter((e) => e.day === today).reduce((s, e) => s + e.amount, 0),
      xpTotal: xp.reduce((s, e) => s + e.amount, 0),
      goal: profile?.dailyGoalXp ?? 30,
      streak: computeStreak(xp.map((e) => e.day)),
      due,
      cards,
      lessonsDone,
      chaptersPassed,
      mistakes,
    }
  }, [])
}
