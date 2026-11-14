import { Volume2 } from 'lucide-react'
import { Gender, type Block, type Lesson } from '@/core/content/schema'
import { speak } from '@/core/audio/player'
import Md from '@/features/exercises/Md'
import ExerciseRunner from '@/features/exercises/ExerciseRunner'
import Recorder from '@/features/lesson/Recorder'

const ART = { der: 'text-blue-600', die: 'text-red-600', das: 'text-green-600' } as const

export function Speak({ text, label }: { text: string; label?: string }) {
  return (
    <button aria-label={label ?? `Nghe: ${text}`} className="rounded-full p-1.5 text-brand hover:bg-line" onClick={() => void speak(text)}>
      <Volume2 size={18} />
    </button>
  )
}

export function BlockView({ b, lesson, onPracticeDone }: { b: Block; lesson: Lesson; onPracticeDone?: (s: number, t: number) => void }) {
  switch (b.kind) {
    case 'text':
      return <Md text={b.md} />
    case 'callout': {
      const c = { info: 'bg-blue-50 dark:bg-blue-950 border-blue-300', tip: 'bg-green-50 dark:bg-green-950 border-green-300', warn: 'bg-amber-50 dark:bg-amber-950 border-amber-300' }[b.tone]
      const icon = { info: 'ℹ️', tip: '💡', warn: '⚠️' }[b.tone]
      return (
        <aside className={`my-3 rounded-lg border-l-4 p-3 ${c}`}>
          <span aria-hidden>{icon} </span>
          <Md text={b.md} />
        </aside>
      )
    }
    case 'table':
      return (
        <div className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>{b.head.map((h, i) => <th key={i} className="border-b border-line p-2 text-left">{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} className="border-b border-line p-2">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'vocabList':
      return (
        <ul className="my-3 divide-y divide-line rounded-xl border border-line bg-surface">
          {b.vocabIds.map((id) => {
            const v = lesson.vocab.find((x) => x.id === id)
            if (!v) return null
            const art = v.article && Gender.safeParse(v.article).success ? v.article : null
            return (
              <li key={id} className="flex items-center gap-3 p-3">
                <span className="text-3xl" aria-hidden>{v.emoji ?? '🔤'}</span>
                <div className="flex-1">
                  <p className="text-lg font-semibold">
                    {art && <span className={`${ART[art]} mr-1`}>{art}</span>}
                    {v.de}
                    {v.plural && <span className="ml-2 text-sm font-normal text-muted">pl. {v.plural}</span>}
                  </p>
                  <p className="text-sm">{v.vi}</p>
                  {v.viRespelling && <p className="text-xs text-muted">đọc gần đúng: {v.viRespelling}{v.ipa ? ` · [${v.ipa}]` : ''}</p>}
                </div>
                <Speak text={art ? `${art} ${v.de}` : v.de} />
              </li>
            )
          })}
        </ul>
      )
    case 'example':
      return (
        <div className="my-2 flex items-center gap-2 rounded-lg bg-surface p-3">
          <Speak text={b.de} />
          <div>
            <p className="font-medium">{b.de}</p>
            <p className="text-sm text-muted">{b.vi}</p>
          </div>
        </div>
      )
    case 'dialogue':
      return (
        <div className="my-3 space-y-2">
          {b.lines.map((l, i) => (
            <div key={i} className={`flex items-start gap-2 ${i % 2 ? 'flex-row-reverse' : ''}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 ${i % 2 ? 'bg-brand/10' : 'bg-surface border border-line'}`}>
                <p className="text-xs text-muted">{l.speaker}</p>
                <p className="font-medium">{l.de}</p>
                <p className="text-sm text-muted">{l.vi}</p>
              </div>
              <Speak text={l.de} />
            </div>
          ))}
        </div>
      )
    case 'pronunciation':
      return (
        <div className="my-3 flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
          <span className="text-5xl font-bold text-brand">{b.letter}</span>
          <div className="flex-1">
            <p>đọc gần đúng: <strong>{b.viRespelling}</strong></p>
            {b.note && <p className="text-sm text-muted">{b.note}</p>}
            {b.examples.length > 0 && <p className="text-sm">Ví dụ: {b.examples.join(', ')}</p>}
          </div>
          <Speak text={b.audio ?? b.letter} />
          <Recorder />
        </div>
      )
    case 'exercises': {
      const list = b.exerciseIds.map((id) => lesson.exercises.find((e) => e.id === id)!).filter(Boolean)
      return <ExerciseRunner exercises={list} onFinish={(r) => onPracticeDone?.(r.score, r.total)} />
    }
  }
}

