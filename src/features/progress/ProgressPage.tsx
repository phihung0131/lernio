import { useLiveQuery } from 'dexie-react-hooks'
import { Flame, Star } from 'lucide-react'
import { db } from '@/core/db/db'
import { computeStreak, dayKey } from '@/core/db/xp'
import { BADGES, earnedBadges } from '@/features/progress/badges'

export default function ProgressPage() {
  const data = useLiveQuery(async () => {
    const [xp, lessons, cards, chapters] = await Promise.all([
      db.xpEvents.toArray(),
      db.lessonProgress.where('status').equals('completed').count(),
      db.srsCards.count(),
      db.chapterResults.filter((c) => c.passed).count(),
    ])
    const total = xp.reduce((s, e) => s + e.amount, 0)
    const today = xp.filter((e) => e.day === dayKey()).reduce((s, e) => s + e.amount, 0)
    const streak = computeStreak(xp.map((e) => e.day))
    const earned = earnedBadges({ streak, lessons, cards, chapters, xp: total })
    return { total, today, streak, lessons, cards, chapters, earned }
  }, [])
  if (!data) return <p>Đang tải…</p>
  const goal = 30
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Tiến độ</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Flame className="text-orange-500" />} label="Streak" value={`${data.streak} ngày`} />
        <Stat icon={<Star className="text-amber-500" />} label="Tổng XP" value={String(data.total)} />
        <Stat label="Bài đã học" value={String(data.lessons)} />
        <Stat label="Từ/thẻ đã học" value={String(data.cards)} />
      </div>
      <div>
        <p className="mb-1 text-sm">Mục tiêu hôm nay: {Math.min(data.today, goal)}/{goal} XP</p>
        <div className="h-3 overflow-hidden rounded-full bg-line"><div className="h-full bg-brand" style={{ width: `${Math.min(100, (data.today / goal) * 100)}%` }} /></div>
      </div>
      <div>
        <h2 className="mb-2 font-semibold">Huy hiệu</h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BADGES.map((b) => {
            const on = data.earned.includes(b.id)
            return (
              <li key={b.id} className={`rounded-xl border border-line bg-surface p-3 text-center ${on ? '' : 'opacity-40 grayscale'}`}>
                <div className="text-3xl" aria-hidden>{b.emoji}</div>
                <p className="text-sm font-semibold">{b.name}</p>
                <p className="text-xs text-muted">{b.desc}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Stat({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="flex items-center gap-1 text-sm text-muted">{icon}{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
