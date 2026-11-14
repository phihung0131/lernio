import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, Lock, Star, X } from 'lucide-react'
import { LEVELS } from '@/core/content/loader'
import type { Chapter, LevelId } from '@/core/content/schema'
import { chapterProgress, isChapterUnlocked, isLevelUnlocked, isTestUnlocked, lessonState, nextStep, type NodeState, type Progress } from '@/core/content/unlock'
import { Chest, LevelBadge, Mascot } from '@/features/art/Art'
import { ProgressBar } from '@/ui/Progress'
import { useChapters, useProgress } from './useCurriculum'

const UNIT_COLORS = ['#2f6bff', '#19a55d', '#e5484d', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899', '#14b8a6']
const OFFSETS = [0, 52, 84, 52, 0, -52, -84, -52]
const STEP_Y = 104

interface NodeItem {
  key: string
  kind: 'lesson' | 'test'
  title: string
  subtitle: string
  goals: string[]
  href: string
  state: NodeState
}

function Node({ item, color, current, onOpen }: { item: NodeItem; color: string; current: boolean; onOpen: () => void }) {
  if (item.kind === 'test')
    return (
      <button type="button" onClick={onOpen} aria-label={`${item.title}${item.state === 'locked' ? ' (đang khóa)' : ''}`} className={`rounded-full transition active:scale-95 ${current ? 'node-pulse' : ''}`}>
        <Chest state={item.state === 'locked' ? 'locked' : item.state === 'completed' ? 'done' : 'open'} size={78} />
      </button>
    )
  const locked = item.state === 'locked'
  const done = item.state === 'completed'
  const bg = locked ? 'var(--line)' : done ? 'var(--accent)' : color
  const shade = locked ? '#b9c0d2' : done ? 'var(--accent-deep)' : `color-mix(in srgb, ${color} 70%, black)`
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${item.title}${locked ? ' (đang khóa)' : done ? ' (đã hoàn thành)' : ''}`}
      className={`flex h-[72px] w-[72px] items-center justify-center rounded-full text-white transition active:translate-y-1 ${current ? 'node-pulse' : ''}`}
      style={{ background: bg, boxShadow: `0 6px 0 ${shade}` }}
    >
      {locked ? <Lock size={28} className="text-slate-500" /> : done ? <Check size={34} strokeWidth={3} /> : <Star size={32} fill="currentColor" />}
    </button>
  )
}

function Unit({ ch, idx, chapters, progress, color, currentKey }: { ch: Chapter; idx: number; chapters: Chapter[]; progress: Progress; color: string; currentKey: string | null }) {
  const [open, setOpen] = useState<string | null>(null)
  const unlocked = isChapterUnlocked(chapters, idx, progress)
  const items: NodeItem[] = [
    ...ch.lessons.map((l, li) => ({
      key: l.id,
      kind: 'lesson' as const,
      title: l.title,
      subtitle: `Bài ${li + 1}/${ch.lessons.length}`,
      goals: l.objectives,
      href: `/lesson/${l.id}`,
      state: lessonState(chapters, idx, li, progress),
    })),
    {
      key: `${ch.id}-test`,
      kind: 'test' as const,
      title: /Gesamttest/.test(ch.title) ? 'Bài thi cuối cấp độ' : 'Kiểm tra cuối chapter',
      subtitle: 'Cần đạt từ 80% để mở chapter tiếp theo',
      goals: [],
      href: `/test/${ch.id}`,
      state: progress.chaptersPassed[ch.id] ? 'completed' : isTestUnlocked(chapters, idx, progress) ? 'current' : 'locked',
    },
  ]
  const height = items.length * STEP_Y
  const pts = items.map((_, i) => ({ x: 160 + OFFSETS[i % OFFSETS.length], y: i * STEP_Y + 40 }))
  const path = pts.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : `C${pts[i - 1].x} ${pts[i - 1].y + 50} ${p.x} ${p.y - 50} ${p.x} ${p.y}`)).join(' ')
  const pct = chapterProgress(ch, progress)

  return (
    <section aria-labelledby={`unit-${ch.id}`} className="mb-6">
      <header className="mb-4 rounded-2xl p-4 text-white" style={{ background: unlocked ? color : 'var(--muted)', boxShadow: `0 4px 0 color-mix(in srgb, ${unlocked ? color : '#6b7286'} 70%, black)` }}>
        <p className="text-xs font-bold uppercase tracking-wider opacity-85">Chapter {ch.order}</p>
        <h2 id={`unit-${ch.id}`} className="text-xl font-extrabold" lang="de">{ch.title}</h2>
        <p className="text-sm opacity-90">{ch.titleVi}</p>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar value={pct} color="#fff" className="flex-1 !bg-white/30" label={`Tiến độ chapter ${ch.order}`} />
          <span className="text-xs font-bold">{Math.round(pct * 100)}%</span>
        </div>
      </header>
      <div className="relative mx-auto" style={{ width: 320, height }}>
        <svg className="absolute inset-0" width={320} height={height} aria-hidden>
          <path d={path} fill="none" stroke="var(--line)" strokeWidth={10} strokeLinecap="round" strokeDasharray="2 18" />
        </svg>
        {items.map((it, i) => {
          const p = pts[i]
          const isCurrent = it.key === currentKey
          return (
            <div key={it.key} className="absolute" style={{ left: p.x - 36, top: p.y - 36 }}>
              {isCurrent && (
                <div className="absolute -left-24 top-0 hidden sm:block" aria-hidden>
                  <Mascot size={64} />
                </div>
              )}
              <Node item={it} color={color} current={isCurrent} onOpen={() => setOpen(open === it.key ? null : it.key)} />
              {open === it.key && (
                <div role="dialog" aria-label={it.title} className="card pop-in absolute left-1/2 top-[86px] z-10 w-72 -translate-x-1/2 p-4">
                  <button type="button" aria-label="Đóng" className="absolute right-2 top-2 rounded-full p-1 text-muted hover:bg-surface-2" onClick={() => setOpen(null)}>
                    <X size={16} />
                  </button>
                  <p className="text-xs font-bold uppercase text-muted">{it.subtitle}</p>
                  <h3 className="mb-1 pr-4 font-extrabold">{it.title}</h3>
                  {it.goals.length > 0 && (
                    <ul className="mb-3 list-disc pl-5 text-sm text-muted">
                      {it.goals.slice(0, 3).map((g, gi) => <li key={gi}>{g}</li>)}
                    </ul>
                  )}
                  {it.state === 'locked' ? (
                    <p className="flex items-center gap-2 rounded-xl bg-surface-2 p-2 text-sm text-muted">
                      <Lock size={16} /> {it.kind === 'test' ? 'Hoàn thành mọi bài của chapter để mở.' : 'Hoàn thành bài trước để mở khóa.'}
                    </p>
                  ) : (
                    <Link to={it.href} className="btn-primary block text-center">
                      {it.state === 'completed' ? (it.kind === 'test' ? 'Làm lại' : 'Ôn lại bài') : it.kind === 'test' ? 'Làm bài kiểm tra' : 'Bắt đầu'}
                    </Link>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function PathMap() {
  const chapters = useChapters()
  const progress = useProgress()
  const [params, setParams] = useSearchParams()

  const currentKey = useMemo(() => {
    if (!chapters || !progress) return null
    const n = nextStep(chapters, progress)
    if (n.kind === 'lesson') return chapters[n.chapterIdx].lessons[n.lessonIdx].id
    if (n.kind === 'test') return `${chapters[n.chapterIdx].id}-test`
    return null
  }, [chapters, progress])

  if (!chapters || !progress) return <p className="p-6 text-center text-muted">Đang tải…</p>
  const n = nextStep(chapters, progress)
  const defaultLevel = (n.kind === 'done' ? 'B1' : chapters[n.chapterIdx].levelId) as LevelId
  const level = (params.get('level') as LevelId) ?? defaultLevel
  const levelChapters = chapters.map((c, idx) => ({ c, idx })).filter((x) => x.c.levelId === level)
  const info = LEVELS.find((l) => l.id === level)!

  return (
    <div>
      <div role="tablist" aria-label="Cấp độ" className="sticky top-14 z-10 -mx-4 mb-4 flex gap-2 overflow-x-auto bg-bg/90 px-4 py-2 backdrop-blur">
        {LEVELS.map((lv) => {
          const open = isLevelUnlocked(chapters, lv.id, progress)
          return (
            <button
              key={lv.id}
              role="tab"
              aria-selected={lv.id === level}
              onClick={() => setParams({ level: lv.id })}
              className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-1.5 text-sm font-extrabold ${lv.id === level ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-surface text-muted'}`}
            >
              {!open && <Lock size={14} />} {lv.id}
            </button>
          )
        })}
      </div>
      <div className="mb-6 flex items-center gap-3">
        <LevelBadge level={level} size={56} />
        <div>
          <h1 className="text-2xl font-extrabold">{info.title}</h1>
          <p className="text-sm text-muted">{info.blurb}</p>
        </div>
      </div>
      {levelChapters.map(({ c, idx }) => (
        <Unit key={c.id} ch={c} idx={idx} chapters={chapters} progress={progress} color={UNIT_COLORS[idx % UNIT_COLORS.length]} currentKey={currentKey} />
      ))}
    </div>
  )
}
