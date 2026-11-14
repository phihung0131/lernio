import { useEffect, useMemo, useState } from 'react'
import { loadAllChapters } from '@/core/content/loader'
import type { Chapter, Exercise } from '@/core/content/schema'
import ExerciseRunner from '@/features/exercises/ExerciseRunner'
import { BlockView } from '@/features/lesson/BlockView'

export default function ListeningPage() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [mode, setMode] = useState<'dialogues' | 'dictation'>('dialogues')
  const [round, setRound] = useState(0)
  useEffect(() => { loadAllChapters().then(setChapters) }, [])

  const dialogues = chapters.flatMap((c) => c.lessons.flatMap((l) => l.sections.examples.filter((b) => b.kind === 'dialogue').map((b) => ({ c, l, b }))))
  const dictation: Exercise[] = useMemo(
    () =>
      chapters
        .flatMap((c) => c.lessons.flatMap((l) => l.exercises.filter((e) => e.type === 'dictation' || e.type === 'listenAndChoose')))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chapters, round],
  )

  return (
    <section>
      <h1 className="mb-3 text-2xl font-bold">Luyện nghe</h1>
      <div className="mb-4 flex gap-2" role="tablist">
        <button role="tab" aria-selected={mode === 'dialogues'} className={mode === 'dialogues' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('dialogues')}>Hội thoại</button>
        <button role="tab" aria-selected={mode === 'dictation'} className={mode === 'dictation' ? 'btn-primary' : 'btn-secondary'} onClick={() => { setMode('dictation'); setRound(round + 1) }}>Nghe chép chính tả</button>
      </div>
      {mode === 'dialogues' ? (
        dialogues.length ? dialogues.map(({ c, l, b }, i) => (
          <div key={i} className="mb-6">
            <p className="text-sm text-muted">{c.levelId} · {l.title}</p>
            <BlockView b={b} lesson={l} />
          </div>
        )) : <p className="text-muted">Chưa có hội thoại.</p>
      ) : dictation.length ? (
        <ExerciseRunner key={round} exercises={dictation} onFinish={() => {}} />
      ) : <p className="text-muted">Chưa có bài nghe.</p>}
    </section>
  )
}
