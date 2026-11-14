import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Check, Volume2, X } from 'lucide-react'
import { Rating, reviewCard, type Grade } from '@/core/srs/fsrs'
import { speak, sfx } from '@/core/audio/player'
import { awardXp, dayKey } from '@/core/db/xp'
import { db, type SrsCardRow } from '@/core/db/db'
import { loadAllChapters } from '@/core/content/loader'
import type { Exercise, Lesson, VocabItem } from '@/core/content/schema'
import { recordResult } from '@/core/db/mistakes'
import { matchesAny } from '@/features/exercises/normalize'
import ExerciseRunner from '@/features/exercises/ExerciseRunner'
import Md from '@/features/exercises/Md'
import { Mascot } from '@/features/art/Art'
import VocabIcon from '@/ui/VocabIcon'
import { ProgressBar } from '@/ui/Progress'
import { FeedbackSheet } from '@/ui/Sheet'

interface Content {
  vocab: Map<string, VocabItem>
  grammar: Map<string, { lesson: Lesson; summary: string; exercises: Exercise[] }>
}

const full = (v: VocabItem) => (v.article ? `${v.article} ${v.de}` : v.de)

function grammarSummary(l: Lesson): string {
  for (const b of l.sections.grammar) {
    if (b.kind === 'steps') return b.items.map((s) => `**${s.title}.** ${s.md}`).slice(0, 2).join('\n\n')
    if (b.kind === 'text' || b.kind === 'callout') return b.md
  }
  return l.objectives.join('\n')
}

function VocabCard({ v, mode, pool, onRate }: { v: VocabItem; mode: 'recognize' | 'produce'; pool: VocabItem[]; onRate: (g: Grade) => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [result, setResult] = useState<boolean | null>(null)
  const options = useMemo(() => {
    const others = pool.filter((x) => x.vi !== v.vi).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.vi)
    const pos = Math.floor(Math.random() * (others.length + 1))
    others.splice(pos, 0, v.vi)
    return { list: others, answer: pos }
  }, [v, pool])

  useEffect(() => {
    if (mode === 'recognize') void speak(full(v))
  }, [v, mode])

  const done = (ok: boolean) => {
    setResult(ok)
    sfx(ok ? 'ok' : 'bad')
    void recordResult([`vocab:${v.id}`], ok)
  }

  return (
    <div className="pb-48">
      <div className="card flex flex-col items-center gap-3 p-6 text-center">
        <VocabIcon icon={v.icon} word={v.de} article={v.article} size={72} />
        {mode === 'recognize' ? (
          <>
            <p className="text-3xl font-extrabold" lang="de">{full(v)}</p>
            <button type="button" className="btn-secondary inline-flex items-center gap-2" onClick={() => void speak(full(v))}><Volume2 size={18} /> Nghe lại</button>
            <p className="text-sm text-muted">Từ này nghĩa là gì?</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-extrabold">{v.vi}</p>
            <p className="text-sm text-muted">Gõ từ tiếng Đức{v.article ? ' (kèm mạo từ der/die/das)' : ''}</p>
          </>
        )}
      </div>
      {mode === 'recognize' ? (
        <div className="mt-4 grid gap-2">
          {options.list.map((o, i) => (
            <button key={i} type="button" disabled={picked !== null} onClick={() => { setPicked(i); done(i === options.answer) }} className={`btn-secondary text-left ${picked !== null && i === options.answer ? 'border-ok bg-ok-bg' : picked === i ? 'border-bad bg-bad-bg' : ''}`}>
              {o}
            </button>
          ))}
        </div>
      ) : (
        <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (text.trim() && result === null) done(matchesAny(text, v.article ? [full(v)] : [v.de])) }}>
          <input className="field flex-1" lang="de" autoFocus aria-label="Đáp án" autoCapitalize="off" autoCorrect="off" spellCheck={false} value={text} disabled={result !== null} onChange={(e) => setText(e.target.value)} />
          <button className="btn-primary" disabled={!text.trim() || result !== null}>Kiểm tra</button>
        </form>
      )}
      {result !== null && (
        <FeedbackSheet
          tone={result ? 'ok' : 'bad'}
          title={result ? <><Check size={22} /> Chính xác!</> : <><X size={22} /> Chưa đúng</>}
          action={
            result ? (
              <div className="grid grid-cols-3 gap-2">
                <button className="btn-secondary !px-2" onClick={() => onRate(Rating.Hard)}>Khó</button>
                <button className="btn-ok !px-2" autoFocus onClick={() => onRate(Rating.Good)}>Tốt</button>
                <button className="btn-secondary !px-2" onClick={() => onRate(Rating.Easy)}>Dễ</button>
              </div>
            ) : (
              <button className="btn-bad w-full" autoFocus onClick={() => onRate(Rating.Again)}>Tiếp tục</button>
            )
          }
        >
          <p><strong lang="de">{full(v)}</strong> = {v.vi}</p>
          {v.example && <p className="text-muted" lang="de">{v.example.de} — {v.example.vi}</p>}
        </FeedbackSheet>
      )}
    </div>
  )
}

function GrammarCard({ g, onRate }: { g: { lesson: Lesson; summary: string; exercises: Exercise[] }; onRate: (gr: Grade) => void }) {
  const [phase, setPhase] = useState<'read' | 'quiz'>('read')
  const exercises = useMemo(() => [...g.exercises].sort(() => Math.random() - 0.5).slice(0, 2), [g])
  if (phase === 'read' || exercises.length === 0)
    return (
      <div className="card p-5">
        <p className="text-xs font-bold uppercase text-muted">Ôn ngữ pháp</p>
        <h2 className="mb-2 text-xl font-extrabold">{g.lesson.title}</h2>
        <Md text={g.summary} />
        {exercises.length ? (
          <button className="btn-primary mt-4 w-full" onClick={() => setPhase('quiz')}>Làm {exercises.length} câu kiểm tra</button>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="btn-secondary" onClick={() => onRate(Rating.Again)}>Chưa nhớ</button>
            <button className="btn-ok" onClick={() => onRate(Rating.Good)}>Đã nhớ</button>
          </div>
        )}
      </div>
    )
  return (
    <ExerciseRunner
      exercises={exercises}
      onFinish={(r) => setTimeout(() => onRate(r.score === r.total ? Rating.Good : r.score > 0 ? Rating.Hard : Rating.Again), 400)}
    />
  )
}

export default function ReviewPage() {
  const [content, setContent] = useState<Content | null>(null)
  const [doneCount, setDoneCount] = useState(0)
  const queue = useLiveQuery(async () => {
    const now = new Date().toISOString()
    const profile = await db.profile.get('me')
    const limit = profile?.newCardsPerDay ?? 20
    const due = await db.srsCards.where('due').belowOrEqual(now).toArray()
    const today = dayKey()
    // Số thẻ mới đã học lần đầu hôm nay (lần ôn sớm nhất của thẻ rơi vào hôm nay).
    const first = new Map<string, string>()
    for (const l of await db.reviewLogs.toArray()) if (!first.has(l.cardId) || l.reviewedAt < first.get(l.cardId)!) first.set(l.cardId, l.reviewedAt)
    const introducedToday = [...first.values()].filter((t) => dayKey(new Date(t)) === today).length
    const review = due.filter((c) => c.reps > 0)
    const fresh = due.filter((c) => c.reps === 0).slice(0, Math.max(0, limit - introducedToday))
    return [...review, ...fresh]
  }, [doneCount])

  useEffect(() => {
    loadAllChapters().then((cs) => {
      const vocab = new Map<string, VocabItem>()
      const grammar = new Map<string, { lesson: Lesson; summary: string; exercises: Exercise[] }>()
      for (const c of cs)
        for (const l of c.lessons) {
          for (const v of l.vocab) vocab.set(`vocab:${v.id}`, v)
          for (const g of l.teaches) grammar.set(`grammar:${g}`, { lesson: l, summary: grammarSummary(l), exercises: l.exercises.filter((e) => e.tags.includes(`grammar:${g}`)) })
        }
      setContent({ vocab, grammar })
    })
  }, [])

  const pool = useMemo(() => (content ? [...content.vocab.values()] : []), [content])
  if (!queue || !content) return <p className="p-6 text-center text-muted">Đang tải…</p>
  const card: SrsCardRow | undefined = queue[0]

  async function rate(g: Grade) {
    await reviewCard(card!.cardId, g)
    await awardXp(g === Rating.Again ? 1 : 3, 'review')
    setDoneCount((n) => n + 1)
  }

  if (!card)
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Mascot mood="cheer" size={120} />
        <h1 className="text-2xl font-extrabold">{doneCount > 0 ? `Xong! Bạn đã ôn ${doneCount} thẻ.` : 'Không có thẻ đến hạn'}</h1>
        <p className="text-muted">Thẻ sẽ quay lại đúng lúc bạn sắp quên. Hãy học bài mới hoặc luyện điểm yếu.</p>
        <div className="flex gap-2">
          <Link to="/path" className="btn-primary">Học bài mới</Link>
          <Link to="/practice/weak" className="btn-secondary">Luyện điểm yếu</Link>
        </div>
      </div>
    )

  const v = content.vocab.get(card.cardId)
  const g = content.grammar.get(card.cardId)
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-xl font-extrabold">Ôn tập</h1>
        <ProgressBar value={doneCount / (doneCount + queue.length)} className="flex-1" label="Tiến độ ôn tập" />
        <span className="text-sm font-bold text-muted">còn {queue.length}</span>
      </div>
      {v ? (
        <VocabCard key={card.cardId + doneCount} v={v} pool={pool} mode={card.reps % 2 === 0 ? 'recognize' : 'produce'} onRate={rate} />
      ) : g ? (
        <GrammarCard key={card.cardId + doneCount} g={g} onRate={rate} />
      ) : (
        <div className="card p-5">
          <p>Thẻ này thuộc nội dung đã thay đổi.</p>
          <button className="btn-primary mt-3" onClick={() => void rate(Rating.Good)}>Bỏ qua</button>
        </div>
      )}
    </div>
  )
}
