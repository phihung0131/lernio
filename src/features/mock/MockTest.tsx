import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Clock, X } from 'lucide-react'
import { buildMock } from '@/core/content/pool'
import type { Block, LevelId } from '@/core/content/schema'
import { db } from '@/core/db/db'
import { awardXp } from '@/core/db/xp'
import ExerciseRunner from '@/features/exercises/ExerciseRunner'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'
import { MOCK_LEVELS } from './MockList'
import Confetti from '@/ui/Confetti'

const MINUTES = { A1: 30, A2: 40, B1: 50 } as Record<string, number>

export default function MockTest() {
  const { level } = useParams() as { level: LevelId }
  const chapters = useChapters()
  const progress = useProgress()
  const [sec, setSec] = useState(0)
  const [scores, setScores] = useState<Record<string, { score: number; total: number }>>({})
  const [writing, setWriting] = useState<{ checked: number; total: number } | null>(null)
  const [left, setLeft] = useState((MINUTES[level] ?? 30) * 60)
  const sections = useMemo(() => (chapters ? buildMock(chapters, level) : []), [chapters, level])
  const task = useMemo(() => {
    const tasks = (chapters ?? []).filter((c) => c.levelId === level).flatMap((c) => c.lessons.flatMap((l) => Object.values(l.sections).flat())).filter((b): b is Extract<Block, { kind: 'writingTask' }> => b.kind === 'writingTask')
    return tasks.length ? tasks[Math.floor(Math.random() * tasks.length)] : null
  }, [chapters, level])
  const [checks, setChecks] = useState<boolean[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    const t = setInterval(() => setLeft((x) => Math.max(0, x - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  if (!chapters || !progress) return <p className="p-8 text-center text-muted">Đang tải…</p>
  const list = chapters.filter((c) => c.levelId === level)
  if (!MOCK_LEVELS.includes(level) || !list.length || !progress.chaptersPassed[list[list.length - 1].id]) return <Navigate to="/mock" replace />

  const finishedAll = sec >= sections.length && (writing || !task)
  const timeUp = left === 0
  const total = Object.values(scores).reduce((s, x) => s + x.total, 0) + (writing?.total ?? 0)
  const score = Object.values(scores).reduce((s, x) => s + x.score, 0) + (writing?.checked ?? 0)

  async function save() {
    const sectionsMap = { ...scores, ...(writing ? { schreiben: { score: writing.checked, total: writing.total } } : {}) }
    await db.mockResults.put({ id: crypto.randomUUID(), level, score, total: Math.max(1, total), sections: sectionsMap, at: new Date().toISOString() })
    await awardXp(30, 'mock')
  }

  if (finishedAll || timeUp) {
    const pct = total ? score / total : 0
    return (
      <div className="mx-auto max-w-md px-4 py-10 text-center">
        {pct >= 0.6 && <Confetti />}
        <h1 className="text-3xl font-extrabold">{timeUp && !finishedAll ? 'Hết giờ!' : 'Kết quả thi thử'} {level}</h1>
        <p className="my-3 text-5xl font-extrabold text-brand">{Math.round(pct * 100)}%</p>
        <p className="mb-4 text-sm text-muted">Thi thật thường cần từ 60% để đạt.</p>
        <ul className="card mb-4 divide-y divide-line text-left">
          {sections.map((s) => (
            <li key={s.id} className="flex justify-between p-3">
              <span>{s.title}</span>
              <span className="font-bold">{scores[s.id] ? `${scores[s.id].score}/${scores[s.id].total}` : 'chưa làm'}</span>
            </li>
          ))}
          {task && (
            <li className="flex justify-between p-3">
              <span>Schreiben (Viết, tự chấm)</span>
              <span className="font-bold">{writing ? `${writing.checked}/${writing.total}` : 'chưa làm'}</span>
            </li>
          )}
        </ul>
        <SaveOnce onSave={save} />
        <Link to="/mock" className="btn-primary block">Xong</Link>
      </div>
    )
  }

  const cur = sections[sec]
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link to="/mock" aria-label="Thoát thi thử" className="rounded-full p-1 text-muted"><X size={26} /></Link>
          <h1 className="flex-1 truncate font-extrabold">Thi thử {level} · {cur ? cur.title : 'Schreiben (Viết)'}</h1>
          <span className={`flex items-center gap-1 rounded-full px-3 py-1 font-mono text-sm font-bold ${left < 300 ? 'bg-bad-bg text-bad' : 'bg-surface-2'}`} aria-label="Thời gian còn lại">
            <Clock size={16} /> {mm}:{ss}
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pt-4">
        {cur ? (
          <ExerciseRunner key={cur.id} exercises={cur.exercises} onFinish={(r) => { setScores((s) => ({ ...s, [cur.id]: { score: r.score, total: r.total } })); setTimeout(() => setSec(sec + 1), 600) }} />
        ) : (
          task && (
            <section className="card space-y-3 p-4">
              <p className="font-bold">{task.prompt}</p>
              <textarea className="field min-h-40 w-full" lang="de" aria-label="Bài viết" value={text} onChange={(e) => setText(e.target.value)} />
              <details>
                <summary className="cursor-pointer font-bold">Viết xong? Xem bài mẫu và tự chấm</summary>
                <div className="mt-2 rounded-xl bg-surface-2 p-3" lang="de">{task.model}</div>
                {task.checklist.map((c, i) => (
                  <label key={i} className="flex items-start gap-2 py-1 text-sm">
                    <input type="checkbox" className="mt-1" checked={!!checks[i]} onChange={() => setChecks((x) => { const n = [...x]; n[i] = !n[i]; return n })} /> {c}
                  </label>
                ))}
              </details>
              <button className="btn-primary w-full" disabled={!text.trim()} onClick={() => setWriting({ checked: checks.filter(Boolean).length, total: Math.max(1, task.checklist.length) })}>
                Nộp bài
              </button>
            </section>
          )
        )}
      </main>
    </div>
  )
}

function SaveOnce({ onSave }: { onSave: () => Promise<void> }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!done) {
      setDone(true)
      void onSave()
    }
  }, [done, onSave])
  return null
}
