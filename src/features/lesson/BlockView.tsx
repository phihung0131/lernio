import { useState } from 'react'
import { AlertTriangle, BookOpen, Check, Eye, EyeOff, Info, Lightbulb, Mic, PenLine, Play, Volume2, X } from 'lucide-react'
import { Gender, type Block, type Lesson } from '@/core/content/schema'
import { speak, speakSequence, type Voice } from '@/core/audio/player'
import Md from '@/features/exercises/Md'
import ExerciseRunner, { type RunnerResult } from '@/features/exercises/ExerciseRunner'
import Recorder from '@/features/lesson/Recorder'
import { ILLUSTRATIONS } from '@/features/art/Illustrations'
import VocabIcon from '@/ui/VocabIcon'

const ART = { der: 'text-[var(--der)]', die: 'text-[var(--die)]', das: 'text-[var(--das)]' } as const
const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie']

export function Speak({ text, label, voice = 'm' }: { text: string; label?: string; voice?: Voice }) {
  return (
    <button
      type="button"
      aria-label={label ?? `Nghe: ${text}`}
      className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-brand transition hover:bg-brand/10 active:scale-95"
      onClick={() => void speak(text, { voice })}
    >
      <Volume2 size={18} />
    </button>
  )
}

function Callout({ tone, md }: { tone: 'info' | 'tip' | 'warn'; md: string }) {
  const style = {
    info: { cls: 'border-sky-400 bg-sky-50 dark:bg-sky-950/40', Icon: Info, color: 'text-sky-600' },
    tip: { cls: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40', Icon: Lightbulb, color: 'text-emerald-600' },
    warn: { cls: 'border-amber-400 bg-amber-50 dark:bg-amber-950/40', Icon: AlertTriangle, color: 'text-amber-600' },
  }[tone]
  return (
    <aside className={`my-3 flex gap-3 rounded-xl border-l-4 p-3 ${style.cls}`}>
      <style.Icon className={`mt-1 shrink-0 ${style.color}`} size={18} aria-hidden />
      <div className="min-w-0 flex-1">
        <Md text={md} />
      </div>
    </aside>
  )
}

export function StepQuiz({ quiz }: { quiz: { q: string; options: string[]; answer: number; why: string } }) {
  const [picked, setPicked] = useState<number | null>(null)
  // Xáo lựa chọn một lần khi hiển thị (giữ chỉ số gốc để chấm).
  const [order] = useState(() => {
    const a = quiz.options.map((_, i) => i)
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  })
  return (
    <div className="mt-3 rounded-xl bg-bg p-3">
      <p className="mb-2 text-sm font-semibold">Kiểm tra nhanh: {quiz.q}</p>
      <div className="flex flex-wrap gap-2">
        {order.map((i) => {
          const o = quiz.options[i]
          const st = picked === null ? '' : i === quiz.answer ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' : i === picked ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/50' : 'opacity-50'
          return (
            <button key={i} type="button" disabled={picked !== null} onClick={() => setPicked(i)} className={`rounded-lg border border-line px-3 py-1.5 text-sm ${st}`}>
              {o}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <p className={`mt-2 flex items-start gap-1 text-sm ${picked === quiz.answer ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
          {picked === quiz.answer ? <Check size={16} className="mt-0.5" /> : <X size={16} className="mt-0.5" />} {quiz.why}
        </p>
      )}
    </div>
  )
}

function Reading({ b }: { b: Extract<Block, { kind: 'reading' }> }) {
  const [showVi, setShowVi] = useState(false)
  return (
    <section className="my-4 rounded-2xl border border-line bg-surface p-4">
      <header className="mb-2 flex items-center gap-2">
        <BookOpen size={18} className="text-brand" aria-hidden />
        <h3 className="flex-1 font-semibold">{b.title}</h3>
        <button type="button" className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs" onClick={() => void speakSequence(b.de.split(/\n+/).filter(Boolean).map((t) => ({ text: t })))}>
          <Play size={14} /> Nghe
        </button>
        <button type="button" aria-pressed={showVi} className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs" onClick={() => setShowVi(!showVi)}>
          {showVi ? <EyeOff size={14} /> : <Eye size={14} />} Bản dịch
        </button>
      </header>
      <div className="space-y-2 text-[1.05rem] leading-relaxed">
        {b.de.split(/\n+/).map((p, i) => (
          <p key={i} lang="de">{p}</p>
        ))}
      </div>
      {showVi && (
        <div className="mt-3 space-y-2 border-t border-line pt-3 text-sm text-muted">
          {b.vi.split(/\n+/).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
      {b.glossary.length > 0 && (
        <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 border-t border-line pt-3 text-sm sm:grid-cols-2">
          {b.glossary.map((g) => (
            <div key={g.de} className="flex gap-2">
              <dt className="font-semibold" lang="de">{g.de}</dt>
              <dd className="text-muted">{g.vi}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}

function WritingTask({ b, storageKey }: { b: Extract<Block, { kind: 'writingTask' }>; storageKey: string }) {
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(storageKey) ?? ''
    } catch {
      return ''
    }
  })
  const [shown, setShown] = useState(false)
  const [checks, setChecks] = useState<boolean[]>(() => b.checklist.map(() => false))
  return (
    <section className="my-4 rounded-2xl border border-line bg-surface p-4">
      <h3 className="mb-1 flex items-center gap-2 font-semibold"><PenLine size={18} className="text-brand" aria-hidden /> Nhiệm vụ viết</h3>
      <Md text={b.prompt} />
      {b.hints.length > 0 && (
        <ul className="mb-2 list-disc pl-5 text-sm text-muted">
          {b.hints.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}
      <textarea
        className="field min-h-32 w-full"
        lang="de"
        aria-label="Bài viết của bạn"
        placeholder="Viết bằng tiếng Đức…"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          try {
            localStorage.setItem(storageKey, e.target.value)
          } catch {
            /* ignore */
          }
        }}
      />
      <button type="button" className="btn-secondary mt-2" onClick={() => setShown(!shown)}>
        {shown ? 'Ẩn bài mẫu' : 'Xem bài mẫu và tự chấm'}
      </button>
      {shown && (
        <div className="mt-3 space-y-3">
          <div className="rounded-xl bg-bg p-3">
            <p className="mb-1 text-xs font-semibold uppercase text-muted">Bài mẫu</p>
            {b.model.split(/\n+/).map((p, i) => <p key={i} lang="de">{p}</p>)}
            {b.modelVi && <p className="mt-2 text-sm text-muted">{b.modelVi}</p>}
          </div>
          {b.checklist.length > 0 && (
            <fieldset>
              <legend className="mb-1 text-sm font-semibold">Tự kiểm tra bài của bạn</legend>
              {b.checklist.map((c, i) => (
                <label key={i} className="flex items-start gap-2 py-1 text-sm">
                  <input type="checkbox" className="mt-1" checked={checks[i]} onChange={() => setChecks(checks.map((v, j) => (j === i ? !v : v)))} />
                  {c}
                </label>
              ))}
            </fieldset>
          )}
        </div>
      )}
    </section>
  )
}

export function BlockView({ b, lesson, onPracticeDone, onPracticeResult }: { b: Block; lesson: Lesson; onPracticeDone?: (s: number, t: number) => void; onPracticeResult?: (r: RunnerResult) => void }) {
  switch (b.kind) {
    case 'text':
      return <Md text={b.md} />
    case 'callout':
      return <Callout tone={b.tone} md={b.md} />
    case 'table':
      return (
        <div className="my-3 overflow-x-auto rounded-xl border border-line">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-bg">
              <tr>{b.head.map((h, i) => <th key={i} className="border-b border-line p-2 text-left font-semibold"><Md text={h} inline /></th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="odd:bg-surface even:bg-bg/50">{r.map((c, j) => <td key={j} className="border-b border-line p-2 align-top"><Md text={c} inline /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'vocabList':
      return (
        <ul className="my-3 grid gap-2">
          {b.vocabIds.map((id) => {
            const v = lesson.vocab.find((x) => x.id === id)
            if (!v) return null
            const art = v.article && Gender.safeParse(v.article).success ? v.article : undefined
            const said = art ? `${art} ${v.de}` : v.de
            return (
              <li key={id} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3">
                <VocabIcon icon={v.icon} word={v.de} article={art} />
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold" lang="de">
                    {art && <span className={`${ART[art]} mr-1`}>{art}</span>}
                    {v.de}
                    {v.plural && <span className="ml-2 text-sm font-normal text-muted">số nhiều: die {v.plural}</span>}
                  </p>
                  <p className="text-sm">{v.vi}</p>
                  {v.viRespelling && <p className="text-xs text-muted">đọc gần đúng: {v.viRespelling}</p>}
                  {v.example && (
                    <div className="mt-1 flex items-start gap-1 rounded-xl bg-surface-2 py-1 pl-2 text-sm">
                      <p className="min-w-0 flex-1 py-1">
                        <span lang="de" className="italic">{v.example.de}</span>
                        <span className="text-muted"> — {v.example.vi}</span>
                      </p>
                      <Speak text={v.example.de} label={`Nghe câu ví dụ: ${v.example.de}`} />
                    </div>
                  )}
                </div>
                <Speak text={said} />
              </li>
            )
          })}
        </ul>
      )
    case 'example':
      return (
        <div className="my-2 flex items-center gap-2 rounded-xl bg-surface p-3">
          <Speak text={b.de} />
          <div>
            <p className="font-medium" lang="de">{b.de}</p>
            <p className="text-sm text-muted">{b.vi}</p>
          </div>
        </div>
      )
    case 'dialogue':
      return (
        <section className="my-4">
          <div className="mb-2 flex items-center gap-2">
            {b.title && <h3 className="flex-1 font-semibold">{b.title}</h3>}
            <button type="button" className="ml-auto inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs" onClick={() => void speakSequence(b.lines.map((l) => ({ text: l.de, voice: l.voice })))}>
              <Play size={14} /> Phát cả hội thoại
            </button>
          </div>
          <div className="space-y-2">
            {b.lines.map((l, i) => {
              const right = l.voice === 'f'
              return (
                <div key={i} className={`flex items-end gap-2 ${right ? 'flex-row-reverse' : ''}`}>
                  <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${right ? 'bg-rose-500' : 'bg-sky-600'}`}>{l.speaker.charAt(0)}</span>
                  <div className={`max-w-[80%] rounded-2xl p-3 ${right ? 'rounded-br-sm bg-rose-50 dark:bg-rose-950/40' : 'rounded-bl-sm border border-line bg-surface'}`}>
                    <p className="text-xs text-muted">{l.speaker}</p>
                    <p className="font-medium" lang="de">{l.de}</p>
                    <p className="text-sm text-muted">{l.vi}</p>
                  </div>
                  <Speak text={l.de} voice={l.voice} />
                </div>
              )
            })}
          </div>
        </section>
      )
    case 'pronunciation':
      return (
        <div className="my-3 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
          <span className="text-5xl font-bold text-brand" lang="de">{b.letter}</span>
          <div className="min-w-0 flex-1">
            <p>đọc gần đúng: <strong>{b.viRespelling}</strong></p>
            {b.note && <p className="text-sm text-muted">{b.note}</p>}
            {b.examples.length > 0 && <p className="text-sm">Ví dụ: {b.examples.join(', ')}</p>}
          </div>
          <Speak text={b.audio ?? b.letter} />
          <Recorder />
        </div>
      )
    case 'reading':
      return <Reading b={b} />
    case 'writingTask':
      return <WritingTask b={b} storageKey={`lernio-writing-${lesson.id}`} />
    case 'speakingTask':
      return (
        <section className="my-4 rounded-2xl border border-line bg-surface p-4">
          <h3 className="mb-1 flex items-center gap-2 font-semibold"><Mic size={18} className="text-brand" aria-hidden /> Nhiệm vụ nói</h3>
          <Md text={b.prompt} />
          <ul className="my-2 space-y-1">
            {b.model.map((m, i) => (
              <li key={i} className="flex items-center gap-2">
                <Speak text={m.de} />
                <span lang="de" className="font-medium">{m.de}</span>
                <span className="text-sm text-muted">— {m.vi}</span>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-sm text-muted">Nghe câu mẫu, rồi thu âm giọng bạn và nghe lại để so sánh.</p>
          <Recorder />
        </section>
      )
    case 'conjugation':
      return (
        <div className="my-3 overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="flex items-center gap-2 bg-brand/10 px-3 py-2">
            <span className="font-bold" lang="de">{b.verb}</span>
            <span className="text-sm text-muted">({b.vi})</span>
            <Speak text={b.verb} />
          </div>
          <table className="w-full text-sm">
            <tbody>
              {b.forms.map((f, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="w-28 p-2 text-muted">{PRONOUNS[i]}</td>
                  <td className="p-2 font-semibold" lang="de">{f}</td>
                  <td className="w-10 p-1"><Speak text={`${PRONOUNS[i].split('/')[0]} ${f}`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {b.note && <p className="border-t border-line p-2 text-sm text-muted">{b.note}</p>}
        </div>
      )
    case 'steps':
      return (
        <ol className="my-3 space-y-3">
          {b.items.map((s, i) => (
            <li key={i} className="rounded-2xl border border-line bg-surface p-4">
              <p className="mb-1 flex items-center gap-2 font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-white">{i + 1}</span>
                {s.title}
              </p>
              <Md text={s.md} />
              {s.quiz && <StepQuiz quiz={s.quiz} />}
            </li>
          ))}
        </ol>
      )
    case 'illustration':
    {
      const Ill = ILLUSTRATIONS[b.name as keyof typeof ILLUSTRATIONS]
      return Ill ? <Ill /> : null
    }
    case 'exercises': {
      const list = b.exerciseIds.map((id) => lesson.exercises.find((e) => e.id === id)!).filter(Boolean)
      return (
        <ExerciseRunner
          exercises={list}
          onFinish={(r) => {
            if (onPracticeResult) onPracticeResult(r)
            else onPracticeDone?.(r.score, r.total)
          }}
        />
      )
    }
  }
}
