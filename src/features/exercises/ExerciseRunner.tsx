import { useState } from 'react'
import type { Exercise } from '@/core/content/schema'
import { sfx } from '@/core/audio/player'
import { recordResult } from '@/core/db/mistakes'
import { ProgressBar } from '@/ui/Progress'
import ExerciseView from './ExerciseView'

export interface RunnerResult {
  score: number
  total: number
  wrongTags: string[]
  wrongIds: string[]
}

export default function ExerciseRunner({
  exercises,
  onFinish,
  showProgress = true,
}: {
  exercises: Exercise[]
  onFinish: (r: RunnerResult) => void
  showProgress?: boolean
}) {
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState<string[]>([])
  const [wrongIds, setWrongIds] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  if (exercises.length === 0) return null
  if (finished)
    return (
      <p role="status" className="card p-4 text-center font-semibold">
        Đã làm xong phần bài tập: đúng {score}/{exercises.length} câu
      </p>
    )
  const ex = exercises[i]
  return (
    <div className="pb-48">
      {showProgress && (
        <div className="mb-5 flex items-center gap-3">
          <ProgressBar value={i / exercises.length} className="flex-1" label="Tiến độ bài tập" />
          <span className="text-sm font-semibold text-muted">
            {i + 1}/{exercises.length}
          </span>
        </div>
      )}
      <ExerciseView
        key={ex.id}
        ex={ex}
        onChecked={(correct) => {
          sfx(correct ? 'ok' : 'bad')
          void recordResult(ex.tags, correct)
        }}
        onDone={({ correct }) => {
          const ns = score + (correct ? 1 : 0)
          const nw = correct ? wrong : [...wrong, ...ex.tags]
          const nwi = correct ? wrongIds : [...wrongIds, ex.id]
          setScore(ns)
          setWrong(nw)
          setWrongIds(nwi)
          if (i + 1 >= exercises.length) {
            setFinished(true)
            onFinish({ score: ns, total: exercises.length, wrongTags: nw, wrongIds: nwi })
          } else setI(i + 1)
        }}
      />
    </div>
  )
}
