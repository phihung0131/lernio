import { useState } from 'react'
import type { Exercise } from '@/core/content/schema'
import { sfx } from '@/core/audio/player'
import ExerciseView from './ExerciseView'

export interface RunnerResult {
  score: number
  total: number
  wrongTags: string[]
}

export default function ExerciseRunner({
  exercises,
  onFinish,
}: {
  exercises: Exercise[]
  onFinish: (r: RunnerResult) => void
}) {
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  if (exercises.length === 0) return null
  if (finished) return <p role="status" className="rounded-lg bg-surface p-3 text-center font-semibold">Đã làm xong phần bài tập</p>
  const ex = exercises[i]
  return (
    <div>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-line" aria-label="Tiến độ bài tập">
        <div className="h-full bg-brand transition-all" style={{ width: `${(i / exercises.length) * 100}%` }} />
      </div>
      <ExerciseView
        key={ex.id}
        ex={ex}
        onChecked={(correct) => sfx(correct ? 'ok' : 'bad')}
        onDone={({ correct }) => {
          const ns = score + (correct ? 1 : 0)
          const nw = correct ? wrong : [...wrong, ...ex.tags]
          if (i + 1 >= exercises.length) {
            setFinished(true)
            onFinish({ score: ns, total: exercises.length, wrongTags: nw })
          }
          else {
            setScore(ns)
            setWrong(nw)
            setI(i + 1)
          }
        }}
      />
    </div>
  )
}
