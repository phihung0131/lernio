import { useMemo, useState } from 'react'
import { Volume2 } from 'lucide-react'
import type { Exercise } from '@/core/content/schema'
import { speak } from '@/core/audio/player'
import { matchesAny } from './normalize'

export interface Result {
  correct: boolean
}

const GENDER_CLASS = { der: 'bg-blue-600', die: 'bg-red-600', das: 'bg-green-600' } as const

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function SpecialKeys({ onInsert }: { onInsert: (c: string) => void }) {
  return (
    <div className="flex gap-2" aria-label="Ký tự đặc biệt">
      {['ä', 'ö', 'ü', 'ß'].map((c) => (
        <button key={c} type="button" className="btn-secondary !min-h-9 !px-3 !py-1" onClick={() => onInsert(c)}>
          {c}
        </button>
      ))}
    </div>
  )
}

function Choices({
  options,
  answer,
  locked,
  onPick,
}: {
  options: string[]
  answer: number
  locked: number | null
  onPick: (i: number) => void
}) {
  return (
    <div className="grid gap-2">
      {options.map((o, i) => {
        const state =
          locked === null ? '' : i === answer ? 'border-green-600 bg-green-50 dark:bg-green-950' : i === locked ? 'border-red-600 bg-red-50 dark:bg-red-950' : ''
        return (
          <button
            key={i}
            disabled={locked !== null}
            onClick={() => onPick(i)}
            className={`btn-secondary text-left ${state}`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

/** Hiển thị một bài tập. Gọi onDone(correct) khi người học đã trả lời và xem phản hồi. */
function ExerciseInner({ ex, onDone }: { ex: Exercise; onDone: (r: Result) => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<boolean | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const shuffledWords = useMemo(() => (ex.type === 'wordOrder' ? shuffle(ex.words) : []), [ex])
  const [matchState, setMatchState] = useState<{ left: string | null; done: Set<string>; wrong: number }>({
    left: null,
    done: new Set(),
    wrong: 0,
  })
  const rightOrder = useMemo(
    () => (ex.type === 'matchPairs' ? shuffle(ex.pairs.map((p) => p.right)) : []),
    [ex],
  )

  const finish = (correct: boolean) => setChecked(correct)

  function check() {
    if (ex.type === 'fillBlank' || ex.type === 'typeAnswer' || ex.type === 'dictation')
      finish(matchesAny(text, ex.answers))
    else if (ex.type === 'wordOrder') finish(order.join(' ') === ex.answer.join(' '))
  }

  const feedback = checked !== null && (
    <div
      role="status"
      className={`mt-4 rounded-lg p-3 text-sm ${checked ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}
    >
      <p className="font-semibold">{checked ? '✓ Chính xác!' : '✗ Chưa đúng'}</p>
      <p>{ex.explanationVi}</p>
      <button className="btn-primary mt-3 w-full" onClick={() => onDone({ correct: checked })}>
        Tiếp tục
      </button>
    </div>
  )

  switch (ex.type) {
    case 'multipleChoice':
    case 'listenAndChoose': {
      const prompt = ex.type === 'multipleChoice' ? ex.prompt : 'Nghe và chọn đáp án đúng'
      return (
        <div>
          <p className="mb-3 text-lg font-semibold">{prompt}</p>
          {ex.type === 'listenAndChoose' && (
            <button className="btn-secondary mb-3 flex items-center gap-2" onClick={() => void speak(ex.audio)}>
              <Volume2 size={18} /> Nghe
            </button>
          )}
          <Choices
            options={ex.options}
            answer={ex.answer}
            locked={picked}
            onPick={(i) => {
              setPicked(i)
              finish(i === ex.answer)
            }}
          />
          {feedback}
        </div>
      )
    }
    case 'articlePick':
      return (
        <div>
          <p className="mb-3 text-lg font-semibold">
            Chọn mạo từ đúng: <span className="text-2xl">___ {ex.noun}</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['der', 'die', 'das'] as const).map((g) => (
              <button
                key={g}
                disabled={checked !== null}
                onClick={() => finish(g === ex.answer)}
                className={`rounded-lg py-3 font-bold text-white ${GENDER_CLASS[g]} ${checked !== null && g !== ex.answer ? 'opacity-40' : ''}`}
              >
                {g}
              </button>
            ))}
          </div>
          {feedback}
        </div>
      )
    case 'fillBlank':
    case 'typeAnswer':
    case 'dictation': {
      const prompt =
        ex.type === 'dictation' ? 'Nghe và gõ lại những gì bạn nghe' : ex.prompt
      return (
        <div>
          <p className="mb-3 text-lg font-semibold">{prompt}</p>
          {ex.type === 'dictation' && (
            <div className="mb-3 flex gap-2">
              <button className="btn-secondary flex items-center gap-2" onClick={() => void speak(ex.audio)}>
                <Volume2 size={18} /> Nghe
              </button>
              <button className="btn-secondary" onClick={() => void speak(ex.audio, 0.7)}>
                Chậm
              </button>
            </div>
          )}
          {ex.type === 'fillBlank' && ex.hint && <p className="mb-2 text-sm text-muted">Gợi ý: {ex.hint}</p>}
          <input
            className="field w-full"
            value={text}
            disabled={checked !== null}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Đáp án"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && text && checked === null && check()}
          />
          <div className="mt-2 flex items-center justify-between">
            <SpecialKeys onInsert={(c) => setText((t) => t + c)} />
            {checked === null && (
              <button className="btn-primary" disabled={!text} onClick={check}>
                Kiểm tra
              </button>
            )}
          </div>
          {checked === false && (
            <p className="mt-2 text-sm">
              Đáp án: <strong>{ex.answers[0]}</strong>
            </p>
          )}
          {feedback}
        </div>
      )
    }
    case 'wordOrder': {
      const remaining = [...shuffledWords]
      for (const w of order) remaining.splice(remaining.indexOf(w), 1)
      return (
        <div>
          <p className="mb-3 text-lg font-semibold">Sắp xếp thành câu: “{ex.promptVi}”</p>
          <div className="mb-3 flex min-h-12 flex-wrap gap-2 rounded-lg border border-dashed border-line p-2">
            {order.map((w, i) => (
              <button
                key={i}
                disabled={checked !== null}
                className="btn-secondary !min-h-9 !px-3 !py-1"
                onClick={() => setOrder(order.filter((_, j) => j !== i))}
              >
                {w}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {remaining.map((w, i) => (
              <button
                key={i}
                disabled={checked !== null}
                className="btn-secondary !min-h-9 !px-3 !py-1"
                onClick={() => setOrder([...order, w])}
              >
                {w}
              </button>
            ))}
          </div>
          {checked === null && (
            <button className="btn-primary mt-3" disabled={remaining.length > 0} onClick={check}>
              Kiểm tra
            </button>
          )}
          {checked === false && (
            <p className="mt-2 text-sm">
              Đáp án: <strong>{ex.answer.join(' ')}</strong>
            </p>
          )}
          {feedback}
        </div>
      )
    }
    case 'matchPairs': {
      const { left, done, wrong } = matchState
      const pickRight = (r: string) => {
        if (!left) return
        const pair = ex.pairs.find((p) => p.left === left)!
        if (pair.right === r) {
          const nd = new Set(done).add(left)
          setMatchState({ left: null, done: nd, wrong })
          if (nd.size === ex.pairs.length) finish(wrong === 0)
        } else setMatchState({ left: null, done, wrong: wrong + 1 })
      }
      return (
        <div>
          <p className="mb-3 text-lg font-semibold">Nối các cặp tương ứng</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              {ex.pairs.map((p) => (
                <button
                  key={p.left}
                  disabled={done.has(p.left) || checked !== null}
                  onClick={() => setMatchState({ ...matchState, left: p.left })}
                  className={`btn-secondary ${left === p.left ? 'border-brand ring-2 ring-brand' : ''} ${done.has(p.left) ? 'opacity-40' : ''}`}
                >
                  {p.left}
                </button>
              ))}
            </div>
            <div className="grid gap-2">
              {rightOrder.map((r) => {
                const isDone = ex.pairs.some((p) => done.has(p.left) && p.right === r)
                return (
                  <button
                    key={r}
                    disabled={isDone || checked !== null}
                    onClick={() => pickRight(r)}
                    className={`btn-secondary ${isDone ? 'opacity-40' : ''}`}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
          </div>
          {wrong > 0 && <p className="mt-2 text-sm text-muted">Số lần nối sai: {wrong}</p>}
          {feedback}
        </div>
      )
    }
  }
}

export default function ExerciseView(props: { ex: Exercise; onDone: (r: Result) => void }) {
  return (
    <div data-exercise-id={props.ex.id}>
      <ExerciseInner {...props} />
    </div>
  )
}
