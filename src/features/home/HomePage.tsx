import { Link } from 'react-router-dom'
import { BookMarked, GraduationCap, Headphones, Repeat, Target, Trophy } from 'lucide-react'
import { LEVELS } from '@/core/content/loader'
import { chapterProgress, nextStep } from '@/core/content/unlock'
import { useProgress } from '@/features/roadmap/useCurriculum'
import { OUTLINE } from '@/core/content/outline'
import { LevelBadge, Mascot, StreakFlame } from '@/features/art/Art'
import { ProgressBar, ProgressRing } from '@/ui/Progress'
import { useStats } from './useStats'
import { useAuth } from '@/features/auth/AuthProvider'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/core/db/db'

function greeting() {
  const h = new Date().getHours()
  return h < 11 ? 'Guten Morgen' : h < 18 ? 'Guten Tag' : 'Guten Abend'
}

export default function HomePage() {
  const chapters = OUTLINE
  const progress = useProgress()
  const stats = useStats()
  const { session } = useAuth()
  const profile = useLiveQuery(() => db.profile.get('me'), [])
  if (!chapters || !progress || !stats) return <p className="p-6 text-center text-muted">Đang tải…</p>

  const next = nextStep(chapters, progress)
  const ch = next.kind !== 'done' ? chapters[next.chapterIdx] : null
  const lesson = next.kind === 'lesson' ? ch!.lessons[next.lessonIdx] : null
  const href = next.kind === 'lesson' ? `/lesson/${lesson!.id}` : next.kind === 'test' ? `/test/${ch!.id}` : '/practice'
  const name = profile?.displayName ?? (session?.user.user_metadata?.name as string | undefined) ?? session?.user.email?.split('@')[0] ?? ''
  const goalPct = stats.xpToday / stats.goal
  const level = LEVELS.find((l) => l.id === ch?.levelId)

  return (
    <div className="space-y-5">
      <section className="flex items-center gap-4">
        <Mascot size={84} mood={goalPct >= 1 ? 'cheer' : 'happy'} />
        <div className="relative rounded-2xl border-2 border-line bg-surface px-4 py-3">
          <p className="text-xl font-extrabold" lang="de">
            {greeting()}{name ? `, ${name}` : ''}!
          </p>
          <p className="text-sm text-muted">{goalPct >= 1 ? 'Bạn đã đạt mục tiêu hôm nay. Tuyệt vời!' : 'Mỗi ngày một chút, tiếng Đức sẽ thành của bạn.'}</p>
        </div>
      </section>

      {ch && (
        <section className="card overflow-hidden">
          <div className="flex items-center gap-4 bg-brand p-5 text-white">
            {level && <LevelBadge level={level.id} size={56} />}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                {level?.title} · Chapter {ch.order}
              </p>
              <h2 className="line-clamp-2 text-xl font-extrabold leading-tight">{next.kind === 'test' ? `Kiểm tra: ${ch.title}` : lesson!.title}</h2>
              <p className="line-clamp-2 text-sm opacity-90">{ch.titleVi}</p>
            </div>
            <ProgressRing value={chapterProgress(ch, progress)} size={60} color="#fff" label="Tiến độ chapter">
              <span className="text-white">{Math.round(chapterProgress(ch, progress) * 100)}%</span>
            </ProgressRing>
          </div>
          <div className="p-4">
            <Link to={href} className="btn-primary block w-full text-center text-lg">
              {next.kind === 'test' ? 'Làm bài kiểm tra' : progress.lessons[lesson!.id] === 'in_progress' ? 'Học tiếp' : 'Bắt đầu bài học'}
            </Link>
          </div>
        </section>
      )}
      {next.kind === 'done' && (
        <section className="card flex items-center gap-4 p-5">
          <Trophy className="text-accent" size={48} />
          <div className="flex-1">
            <h2 className="text-lg font-extrabold">Bạn đã hoàn thành lộ trình A0 → B1!</h2>
            <p className="text-sm text-muted">Hãy luyện đề thi thử và ôn tập để giữ kiến thức.</p>
          </div>
          <Link to="/practice" className="btn-primary">Luyện tập</Link>
        </section>
      )}

      <section className="grid grid-cols-2 gap-3">
        <div className="card flex flex-col items-center gap-2 p-4 text-center">
          <ProgressRing value={goalPct} size={72} color="var(--accent)" label="Mục tiêu XP hôm nay">
            <Target size={22} className="text-accent" />
          </ProgressRing>
          <p className="font-extrabold">
            {Math.min(stats.xpToday, stats.goal)}/{stats.goal} XP
          </p>
          <p className="text-xs text-muted">Mục tiêu hôm nay</p>
        </div>
        <div className="card flex flex-col items-center gap-2 p-4 text-center">
          <StreakFlame active={stats.streak > 0} size={72} />
          <p className="font-extrabold">{stats.streak} ngày</p>
          <p className="text-xs text-muted">Chuỗi ngày học</p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link to="/review" className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"><Repeat /></span>
          <div className="flex-1">
            <p className="font-bold">Ôn tập hôm nay</p>
            <p className="text-sm text-muted">{stats.due > 0 ? `${stats.due} thẻ đến hạn` : stats.cards > 0 ? 'Đã ôn xong, quay lại sau' : 'Học bài đầu tiên để có thẻ'}</p>
          </div>
          {stats.due > 0 && <span className="rounded-full bg-bad px-2.5 py-0.5 text-sm font-bold text-white">{stats.due}</span>}
        </Link>
        <Link to="/practice/weak" className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bad-bg text-bad"><Target /></span>
          <div className="flex-1">
            <p className="font-bold">Điểm yếu</p>
            <p className="text-sm text-muted">{stats.mistakes > 0 ? `${stats.mistakes} mục cần luyện lại` : 'Chưa có lỗi sai nào'}</p>
          </div>
        </Link>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {[
          { to: '/grammar', label: 'Ngữ pháp', Icon: GraduationCap },
          { to: '/vocabulary', label: 'Từ vựng', Icon: BookMarked },
          { to: '/listening', label: 'Luyện nghe', Icon: Headphones },
        ].map(({ to, label, Icon }) => (
          <Link key={to} to={to} className="card flex flex-col items-center gap-2 p-3 text-center text-sm font-bold">
            <Icon className="text-brand" /> {label}
          </Link>
        ))}
      </section>

      <section className="card p-4">
        <h2 className="mb-3 font-extrabold">Tiến độ các cấp độ</h2>
        <ul className="space-y-3">
          {LEVELS.map((lv) => {
            const list = chapters.filter((c) => c.levelId === lv.id)
            const pct = list.length ? list.reduce((s, c) => s + chapterProgress(c, progress), 0) / list.length : 0
            return (
              <li key={lv.id} className="flex items-center gap-3">
                <LevelBadge level={lv.id} size={36} />
                <div className="flex-1">
                  <p className="text-sm font-bold">{lv.title}</p>
                  <ProgressBar value={pct} label={`Tiến độ ${lv.id}`} />
                </div>
                <span className="w-10 text-right text-sm font-bold text-muted">{Math.round(pct * 100)}%</span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
