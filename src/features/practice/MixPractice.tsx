import { useMemo, useState } from 'react'
import { LEVELS } from '@/core/content/loader'
import { exercisePool, sample, type Skill } from '@/core/content/pool'
import { isChapterUnlocked } from '@/core/content/unlock'
import type { Exercise, LevelId } from '@/core/content/schema'
import ExerciseRunner, { type RunnerResult } from '@/features/exercises/ExerciseRunner'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'
import { awardXp } from '@/core/db/xp'

const SKILLS: { id: Skill; label: string }[] = [
  { id: 'vocab', label: 'Từ vựng' },
  { id: 'grammar', label: 'Ngữ pháp' },
  { id: 'listening', label: 'Nghe' },
  { id: 'reading', label: 'Đọc' },
]

export default function MixPractice() {
  const chapters = useChapters()
  const progress = useProgress()
  const [level, setLevel] = useState<LevelId>('A0')
  const [chapterId, setChapterId] = useState<string>('all')
  const [skills, setSkills] = useState<Skill[]>(['vocab', 'grammar', 'listening', 'reading'])
  const [count, setCount] = useState(10)
  const [run, setRun] = useState<Exercise[] | null>(null)
  const [res, setRes] = useState<RunnerResult | null>(null)

  const open = useMemo(
    () => (chapters && progress ? chapters.filter((_c, i) => isChapterUnlocked(chapters, i, progress)) : []),
    [chapters, progress],
  )
  if (!chapters || !progress) return <p className="p-6 text-center text-muted">Đang tải…</p>
  const levelChapters = open.filter((c) => c.levelId === level)
  const pool = exercisePool(open, { levels: [level], chapterIds: chapterId === 'all' ? undefined : [chapterId], skills })

  if (run)
    return (
      <div>
        <h1 className="mb-4 text-2xl font-extrabold">Luyện tập tự chọn</h1>
        {res ? (
          <div className="card p-5 text-center">
            <p className="text-lg font-extrabold">Đúng {res.score}/{res.total} câu</p>
            <button className="btn-primary mt-3" onClick={() => { setRun(null); setRes(null) }}>Luyện tiếp</button>
          </div>
        ) : (
          <ExerciseRunner exercises={run} onFinish={(r) => { setRes(r); void awardXp(r.score, 'practice') }} />
        )}
      </div>
    )

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">Luyện tập tự chọn</h1>
      <fieldset>
        <legend className="mb-2 font-bold">Cấp độ</legend>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => {
            const has = open.some((c) => c.levelId === l.id)
            return (
              <button key={l.id} type="button" disabled={!has} aria-pressed={level === l.id} onClick={() => { setLevel(l.id); setChapterId('all') }} className={`rounded-full border-2 px-4 py-1.5 font-bold ${level === l.id ? 'border-brand bg-brand-soft text-brand' : 'border-line'} disabled:opacity-40`}>
                {l.id}
              </button>
            )
          })}
        </div>
      </fieldset>
      <label className="block">
        <span className="mb-2 block font-bold">Chapter</span>
        <select className="field w-full" value={chapterId} onChange={(e) => setChapterId(e.target.value)}>
          <option value="all">Tất cả chapter đã mở</option>
          {levelChapters.map((c) => <option key={c.id} value={c.id}>Chapter {c.order}: {c.title} ({c.titleVi})</option>)}
        </select>
      </label>
      <fieldset>
        <legend className="mb-2 font-bold">Kỹ năng</legend>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <button key={s.id} type="button" aria-pressed={skills.includes(s.id)} onClick={() => setSkills(skills.includes(s.id) ? skills.filter((x) => x !== s.id) : [...skills, s.id])} className={`rounded-full border-2 px-4 py-1.5 font-bold ${skills.includes(s.id) ? 'border-brand bg-brand-soft text-brand' : 'border-line'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 font-bold">Số câu</legend>
        <div className="flex gap-2">
          {[10, 20, 30].map((n) => (
            <button key={n} type="button" aria-pressed={count === n} onClick={() => setCount(n)} className={`rounded-full border-2 px-4 py-1.5 font-bold ${count === n ? 'border-brand bg-brand-soft text-brand' : 'border-line'}`}>{n}</button>
          ))}
        </div>
      </fieldset>
      <p className="text-sm text-muted">Có {pool.length} câu phù hợp.</p>
      <button className="btn-primary w-full" disabled={pool.length === 0} onClick={() => setRun(sample(pool.map((p) => p.ex), count))}>
        Bắt đầu luyện
      </button>
    </div>
  )
}
