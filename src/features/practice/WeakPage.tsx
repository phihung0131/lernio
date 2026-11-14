import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Target } from 'lucide-react'
import { topMistakes } from '@/core/db/mistakes'
import { exercisePool, sample } from '@/core/content/pool'
import type { Exercise } from '@/core/content/schema'
import ExerciseRunner from '@/features/exercises/ExerciseRunner'
import { useChapters } from '@/features/roadmap/useCurriculum'
import { Mascot } from '@/features/art/Art'

export default function WeakPage() {
  const chapters = useChapters()
  const mistakes = useLiveQuery(() => topMistakes(30), [])
  const [run, setRun] = useState<Exercise[] | null>(null)
  const [round, setRound] = useState(0)

  const labels = useMemo(() => {
    const m = new Map<string, string>()
    for (const c of chapters ?? [])
      for (const l of c.lessons) {
        m.set(`lesson:${l.id}`, `Bài: ${l.title}`)
        for (const g of l.teaches) m.set(`grammar:${g}`, `Ngữ pháp: ${l.title}`)
        for (const v of l.vocab) m.set(`vocab:${v.id}`, `Từ: ${v.article ? v.article + ' ' : ''}${v.de} (${v.vi})`)
      }
    return m
  }, [chapters])

  if (!chapters || !mistakes) return <p className="p-6 text-center text-muted">Đang tải…</p>
  const focus = mistakes.filter((m) => !m.tag.startsWith('lesson:')).slice(0, 15)

  if (run)
    return (
      <div>
        <h1 className="mb-4 text-2xl font-extrabold">Luyện điểm yếu</h1>
        <ExerciseRunner key={round} exercises={run} onFinish={() => setTimeout(() => setRun(null), 800)} />
      </div>
    )

  function start() {
    const tags = focus.map((m) => m.tag)
    const pool = exercisePool(chapters!, { tags }).map((p) => p.ex)
    setRun(sample(pool, 10))
    setRound(round + 1)
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">Điểm yếu</h1>
      <p className="mb-4 text-sm text-muted">Lernio ghi lại mọi câu bạn làm sai. Luyện lại cho đến khi danh sách trống.</p>
      {focus.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-6 text-center">
          <Mascot size={96} mood="cheer" />
          <p className="font-bold">Chưa có điểm yếu nào. Cứ tiếp tục học nhé!</p>
          <Link to="/path" className="btn-primary">Về lộ trình</Link>
        </div>
      ) : (
        <>
          <button className="btn-primary mb-4 flex w-full items-center justify-center gap-2" onClick={start}>
            <Target size={20} /> Luyện lại (tối đa 10 câu)
          </button>
          <ul className="card divide-y divide-line">
            {focus.map((m) => (
              <li key={m.tag} className="flex items-center gap-3 p-3">
                <span className="flex-1 text-sm">{labels.get(m.tag) ?? m.tag}</span>
                <span className="rounded-full bg-bad-bg px-2 py-0.5 text-xs font-bold text-bad">sai {m.count} lần</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
