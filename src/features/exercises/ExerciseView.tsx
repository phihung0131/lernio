import { useMemo, useState } from 'react'
import { Check, Volume2, X } from 'lucide-react'
import type { Exercise } from '@/core/content/schema'
import { speak } from '@/core/audio/player'
import { matchesAny } from './normalize'
import { FeedbackSheet } from '@/ui/Sheet'
import PassageHint from './PassageHint'

/** Chuỗi đáp án đúng để hiển thị khi trả lời sai. */
export function correctAnswer(ex: Exercise): string | null {
  switch (ex.type) {
    case 'multipleChoice':
    case 'listenAndChoose':
      return ex.options[ex.answer]
    case 'fillBlank':
    case 'typeAnswer':
    case 'translate':
    case 'dictation':
      return ex.answers[0]
    case 'wordOrder':
      return ex.answer.join(' ')
    case 'articlePick':
      return `${ex.answer} ${ex.noun}`
    case 'trueFalse':
      return ex.answer ? 'Đúng (richtig)' : 'Sai (falsch)'
    case 'conjugate':
      return ex.rows.map((r) => `${r.pronoun} ${r.answer}`).join(', ')
    default:
      return null
  }
}

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
          locked === null ? '' : i === answer ? 'border-ok bg-ok-bg' : i === locked ? 'border-bad bg-bad-bg' : ''
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
function TrueFalse({ ex, checked, finish }: { ex: Extract<Exercise, { type: 'trueFalse' }>; checked: boolean | null; finish: (c: boolean) => void }) {
  const [pick, setPick] = useState<boolean | null>(null)
  return (
    <div>
      {ex.context && <p className="mb-2 rounded-lg bg-bg p-2 text-sm" lang="de">{ex.context}</p>}
      <p className="mb-3 text-lg font-semibold" lang="de">{ex.statement}</p>
      <div className="grid grid-cols-2 gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            disabled={checked !== null}
            onClick={() => {
              setPick(v)
              finish(v === ex.answer)
            }}
            className={`btn-secondary ${pick === v ? (v === ex.answer ? 'border-emerald-500' : 'border-rose-500') : ''}`}
          >
            {v ? 'Đúng (richtig)' : 'Sai (falsch)'}
          </button>
        ))}
      </div>
    </div>
  )
}

function Conjugate({ ex, checked, finish }: { ex: Extract<Exercise, { type: 'conjugate' }>; checked: boolean | null; finish: (c: boolean) => void }) {
  const [vals, setVals] = useState<string[]>(() => ex.rows.map(() => ''))
  const ok = ex.rows.map((r, i) => matchesAny(vals[i], [r.answer]))
  return (
    <div>
      <p className="mb-3 text-lg font-semibold">
        Chia động từ <span lang="de" className="text-brand">{ex.verb}</span> <span className="text-sm text-muted">({ex.vi})</span>
      </p>
      <div className="grid gap-2">
        {ex.rows.map((r, i) => (
          <label key={i} className="flex items-center gap-3">
            <span className="w-24 text-right text-muted" lang="de">{r.pronoun}</span>
            <input
              className={`field flex-1 ${checked !== null ? (ok[i] ? 'border-emerald-500' : 'border-rose-500') : ''}`}
              lang="de"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label={`Dạng của ${r.pronoun}`}
              disabled={checked !== null}
              value={vals[i]}
              onChange={(e) => setVals(vals.map((v, j) => (j === i ? e.target.value : v)))}
            />
            {checked !== null && !ok[i] && <span className="text-sm font-semibold text-emerald-600" lang="de">{r.answer}</span>}
          </label>
        ))}
      </div>
      {checked === null && (
        <button className="btn-primary mt-3" type="button" disabled={vals.some((v) => !v.trim())} onClick={() => finish(ok.every(Boolean))}>
          Kiểm tra
        </button>
      )}
    </div>
  )
}

function Categorize({ ex, checked, finish }: { ex: Extract<Exercise, { type: 'categorize' }>; checked: boolean | null; finish: (c: boolean) => void }) {
  const [assign, setAssign] = useState<(number | null)[]>(() => ex.items.map(() => null))
  return (
    <div>
      <p className="mb-3 text-lg font-semibold">{ex.prompt}</p>
      <ul className="grid gap-2">
        {ex.items.map((it, i) => {
          const right = assign[i] === it.category
          return (
            <li key={i} className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-2">
              <span className="min-w-24 flex-1 font-medium" lang="de">{it.text}</span>
              {ex.categories.map((c, ci) => (
                <button
                  key={ci}
                  type="button"
                  disabled={checked !== null}
                  aria-pressed={assign[i] === ci}
                  onClick={() => setAssign(assign.map((a, j) => (j === i ? ci : a)))}
                  className={`rounded-lg border px-3 py-1 text-sm ${assign[i] === ci ? 'border-brand bg-brand text-white' : 'border-line'} ${checked !== null && assign[i] === ci ? (right ? '!border-emerald-600 !bg-emerald-600' : '!border-rose-600 !bg-rose-600') : ''}`}
                >
                  {c}
                </button>
              ))}
              {checked !== null && !right && <span className="text-xs text-emerald-600">→ {ex.categories[it.category]}</span>}
            </li>
          )
        })}
      </ul>
      {checked === null && (
        <button className="btn-primary mt-3" type="button" disabled={assign.some((a) => a === null)} onClick={() => finish(assign.every((a, i) => a === ex.items[i].category))}>
          Kiểm tra
        </button>
      )}
    </div>
  )
}

function ExerciseInner({ ex, onDone, onChecked }: { ex: Exercise; onDone: (r: Result) => void; onChecked?: (correct: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<boolean | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const shuffledWords = useMemo(() => (ex.type === 'wordOrder' ? shuffle(ex.words) : []), [ex])
  // Xáo thứ tự lựa chọn mỗi lần hiển thị để vị trí đáp án đúng không đoán được.
  const optOrder = useMemo(() => (ex.type === 'multipleChoice' || ex.type === 'listenAndChoose' ? shuffle(ex.options.map((_, i) => i)) : []), [ex])
  const [matchState, setMatchState] = useState<{ left: string | null; done: Set<string>; wrong: number }>({
    left: null,
    done: new Set(),
    wrong: 0,
  })
  const rightOrder = useMemo(
    () => (ex.type === 'matchPairs' ? shuffle(ex.pairs.map((p) => p.right)) : []),
    [ex],
  )

  const finish = (correct: boolean) => {
    setChecked(correct)
    onChecked?.(correct)
  }

  function check() {
    if (ex.type === 'fillBlank' || ex.type === 'typeAnswer' || ex.type === 'dictation' || ex.type === 'translate')
      finish(matchesAny(text, ex.answers))
    else if (ex.type === 'wordOrder') finish(order.join(' ') === ex.answer.join(' '))
  }

  const solution = correctAnswer(ex)
  const feedback = checked !== null && (
    <FeedbackSheet
      tone={checked ? 'ok' : 'bad'}
      title={checked ? <><Check size={22} /> Chính xác!</> : <><X size={22} /> Chưa đúng</>}
      action={
        <button autoFocus className={`${checked ? 'btn-ok' : 'btn-bad'} w-full`} onClick={() => onDone({ correct: checked })}>
          Tiếp tục
        </button>
      }
    >
      {!checked && solution && (
        <p className="mb-1">
          Đáp án đúng: <strong lang="de">{solution}</strong>
        </p>
      )}
      <p>{ex.explanationVi}</p>
    </FeedbackSheet>
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
            options={optOrder.map((i) => ex.options[i])}
            answer={optOrder.indexOf(ex.answer)}
            locked={picked}
            onPick={(i) => {
              setPicked(i)
              finish(optOrder[i] === ex.answer)
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
    case 'trueFalse':
      return (
        <div>
          <TrueFalse ex={ex} checked={checked} finish={finish} />
          {feedback}
        </div>
      )
    case 'conjugate':
      return (
        <div>
          <Conjugate ex={ex} checked={checked} finish={finish} />
          {feedback}
        </div>
      )
    case 'categorize':
      return (
        <div>
          <Categorize ex={ex} checked={checked} finish={finish} />
          {feedback}
        </div>
      )
    case 'fillBlank':
    case 'typeAnswer':
    case 'translate':
    case 'dictation': {
      const prompt =
        ex.type === 'dictation' ? 'Nghe và gõ lại những gì bạn nghe' : ex.type === 'translate' ? `Dịch sang tiếng Đức: “${ex.vi}”` : ex.prompt
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

export default function ExerciseView(props: { ex: Exercise; onDone: (r: Result) => void; onChecked?: (correct: boolean) => void }) {
  return (
    <div data-exercise-id={props.ex.id}>
      <PassageHint ex={props.ex} />
      <ExerciseInner {...props} />
    </div>
  )
}
