import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { BookOpen, ChevronRight, Flame, Layers, LogOut, Settings, Star } from 'lucide-react'
import { db } from '@/core/db/db'
import { dayKey } from '@/core/db/xp'
import { useAuth } from '@/features/auth/AuthProvider'
import { useStats } from '@/features/home/useStats'
import { BADGES } from './badges'

function WeekChart({ days }: { days: { label: string; xp: number }[] }) {
  const max = Math.max(20, ...days.map((d) => d.xp))
  return (
    <div className="flex h-32 items-end gap-2" role="img" aria-label={`XP 7 ngày qua: ${days.map((d) => `${d.label} ${d.xp}`).join(', ')}`}>
      {days.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-muted">{d.xp || ''}</span>
          <div className="w-full rounded-t-lg bg-brand" style={{ height: `${(d.xp / max) * 90}px`, minHeight: 4, opacity: i === days.length - 1 ? 1 : 0.55 }} />
          <span className="text-xs text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function ProfilePage() {
  const { session, signOut } = useAuth()
  const stats = useStats()
  const data = useLiveQuery(async () => {
    const [xp, badges, profile] = await Promise.all([db.xpEvents.toArray(), db.badges.toArray(), db.profile.get('me')])
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const k = dayKey(d)
      return { label: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()], xp: xp.filter((e) => e.day === k).reduce((s, e) => s + e.amount, 0) }
    })
    return { days, earned: new Set(badges.map((b) => b.badgeId)), displayName: profile?.displayName }
  }, [])
  if (!stats || !data) return <p className="p-6 text-center text-muted">Đang tải…</p>
  const email = session?.user.email ?? ''
  const name = data.displayName ?? (session?.user.user_metadata?.name as string | undefined) ?? email.split('@')[0]

  return (
    <div className="space-y-5">
      <section className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl font-extrabold text-white">{name.charAt(0).toUpperCase()}</span>
        <div>
          <h1 className="text-2xl font-extrabold">{name}</h1>
          <p className="text-sm text-muted">{email}</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { Icon: Flame, label: 'Chuỗi ngày', value: `${stats.streak}`, color: 'text-orange-500' },
          { Icon: Star, label: 'Tổng XP', value: `${stats.xpTotal}`, color: 'text-accent' },
          { Icon: BookOpen, label: 'Bài đã học', value: `${stats.lessonsDone}`, color: 'text-brand' },
          { Icon: Layers, label: 'Thẻ ôn tập', value: `${stats.cards}`, color: 'text-ok' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="card flex items-center gap-3 p-3">
            <Icon className={color} size={26} />
            <div>
              <p className="text-xl font-extrabold">{value}</p>
              <p className="text-xs text-muted">{label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="card p-4">
        <h2 className="mb-3 font-extrabold">XP 7 ngày qua</h2>
        <WeekChart days={data.days} />
      </section>

      <section className="card p-4">
        <h2 className="mb-3 font-extrabold">
          Huy hiệu <span className="text-sm font-bold text-muted">({data.earned.size}/{BADGES.length})</span>
        </h2>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {BADGES.map((b) => {
            const on = data.earned.has(b.id)
            return (
              <li key={b.id} className={`flex flex-col items-center gap-1 text-center ${on ? '' : 'opacity-40 grayscale'}`} title={b.desc}>
                <span className={`flex h-14 w-14 items-center justify-center rounded-full ${on ? 'bg-accent text-white shadow-[0_4px_0_var(--accent-deep)]' : 'bg-surface-2 text-muted'}`}>
                  <b.Icon size={26} />
                </span>
                <span className="text-xs font-bold">{b.name}</span>
                <span className="sr-only">{on ? 'đã đạt' : 'chưa đạt'}: {b.desc}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="card divide-y divide-line">
        <Link to="/settings" className="flex items-center gap-3 p-4 font-bold">
          <Settings size={20} className="text-muted" /> <span className="flex-1">Cài đặt</span> <ChevronRight size={18} className="text-muted" />
        </Link>
        <button type="button" onClick={() => void signOut()} className="flex w-full items-center gap-3 p-4 font-bold text-bad">
          <LogOut size={20} /> Đăng xuất
        </button>
      </section>
    </div>
  )
}
