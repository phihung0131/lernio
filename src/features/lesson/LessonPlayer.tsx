import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Target, X, Zap } from 'lucide-react'
import type { Exercise, SectionKey } from '@/core/content/schema'
import { lessonState } from '@/core/content/unlock'
import { saveLessonStatus } from '@/core/db/repo'
import { awardXp } from '@/core/db/xp'
import { db } from '@/core/db/db'
import { sfx } from '@/core/audio/player'
import { seedCards } from '@/core/srs/cards'
import Md from '@/features/exercises/Md'
import ExerciseRunner, { type RunnerResult } from '@/features/exercises/ExerciseRunner'
import { useProgress } from '@/features/roadmap/useCurriculum'
import { OUTLINE, useChapter } from '@/core/content/outline'
import { LessonHero, Mascot } from '@/features/art/Art'
import { checkBadges } from '@/features/progress/checkBadges'
import { useToast } from '@/ui/Toast'
import Confetti from '@/ui/Confetti'
import { ProgressBar } from '@/ui/Progress'
import { BlockView, StepQuiz } from './BlockView'
import { buildPages } from './pages'

const TITLES: Record<SectionKey, string> = {
  introduction: 'Giới thiệu',
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  examples: 'Ví dụ và hội thoại',
  practice: 'Luyện tập',
  review: 'Tổng kết',
}

interface Done {
  xp: number
  score: number
  total: number
  newWords: number
  seconds: number
  wrong: Exercise[]
}

function Results({ done, onRetry, onClose }: { done: Done; onRetry: () => void; onClose: () => void }) {
  const acc = done.total ? Math.round((done.score / done.total) * 100) : 100
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 px-4 text-center">
      <Confetti />
      <div className="pop-in">
        <Mascot size={140} mood="cheer" />
      </div>
      <h1 className="text-3xl font-extrabold text-accent">Hoàn thành bài học!</h1>
      <div className="grid w-full grid-cols-3 gap-3">
        {[
          { Icon: Zap, label: 'XP nhận', value: `+${done.xp}`, color: 'var(--accent)' },
          { Icon: Target, label: 'Chính xác', value: `${acc}%`, color: 'var(--ok)' },
          { Icon: Clock, label: 'Thời gian', value: `${Math.max(1, Math.round(done.seconds / 60))} phút`, color: 'var(--brand)' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="overflow-hidden rounded-2xl border-2" style={{ borderColor: color }}>
            <p className="py-1 text-xs font-bold text-white" style={{ background: color }}>{label}</p>
            <p className="flex items-center justify-center gap-1 py-3 text-lg font-extrabold" style={{ color }}>
              <Icon size={18} /> {value}
            </p>
          </div>
        ))}
      </div>
      {done.newWords > 0 && (
        <p className="flex items-center gap-2 text-sm text-muted">
          <BookOpen size={16} /> {done.newWords} từ mới đã được thêm vào lịch ôn tập
        </p>
      )}
      <div className="flex w-full flex-col gap-3">
        {done.wrong.length > 0 && (
          <button className="btn-secondary w-full" onClick={onRetry}>
            Ôn lại {done.wrong.length} câu sai
          </button>
        )}
        <button className="btn-primary w-full" onClick={onClose} autoFocus>
          Tiếp tục
        </button>
      </div>
    </div>
  )
}

/** key theo id: đổi sang bài khác qua URL thì dựng lại từ đầu (không giữ trạng thái/kết quả khóa của bài trước). */
export default function LessonPlayer() {
  const { lessonId } = useParams()
  return <LessonPlayerInner key={lessonId} />
}

function LessonPlayerInner() {
  const { lessonId } = useParams()
  const chapters = OUTLINE
  const progress = useProgress()
  const nav = useNavigate()
  const toast = useToast()
  const [page, setPage] = useState<number | null>(null)
  const [practice, setPractice] = useState<RunnerResult | null>(null)
  const [done, setDone] = useState<Done | null>(null)
  const [retry, setRetry] = useState<Exercise[] | null>(null)
  const [finishing, setFinishing] = useState(false)
  const started = useRef(Date.now())

  // Vị trí trong mục lục (để khóa/mở); chỉ tải nội dung của level chứa bài.
  const pos = useMemo(() => {
    for (let ci = 0; ci < chapters.length; ci++) {
      const li = chapters[ci].lessons.findIndex((l) => l.id === lessonId)
      if (li >= 0) return { ci, li }
    }
    return undefined
  }, [chapters, lessonId])
  const full = useChapter(pos ? chapters[pos.ci].id : undefined)
  const found = useMemo(() => {
    if (!pos) return undefined
    if (!full) return null
    return { ...pos, lesson: full.lessons[pos.li], chapter: full }
  }, [pos, full])
  const pages = useMemo(() => (found ? buildPages(found.lesson) : []), [found])

  // Khôi phục vị trí đang học.
  useEffect(() => {
    if (!found || page !== null) return
    db.lessonState.get(found.lesson.id).then((s) => {
      const p = s && s.step < pages.length && progressRef.current?.lessons[found.lesson.id] !== 'completed' ? s.step : 0
      // Không khôi phục vào giữa phần luyện tập (bài tập phải làm lại từ đầu).
      setPage(pages[p]?.section === 'practice' ? Math.max(0, pages.findIndex((x) => x.section === 'practice')) : p)
    })
  }, [found, pages, page])
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    if (found && page !== null) void db.lessonState.put({ lessonId: found.lesson.id, step: page, sub: 0, updatedAt: new Date().toISOString() })
  }, [found, page])

  if (!progress || found === null || (found && page === null)) return <p className="p-8 text-center text-muted">Đang tải…</p>
  if (!found) return <Navigate to="/path" replace />
  if (lessonState(chapters, found.ci, found.li, progress) === 'locked') return <Navigate to="/path" replace />

  const { lesson, chapter } = found
  const back = `/path?level=${chapter.levelId}`

  if (retry)
    return (
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <h1 className="mb-4 text-xl font-extrabold">Ôn lại câu sai</h1>
        <ExerciseRunner exercises={retry} onFinish={() => setTimeout(() => setRetry(null), 600)} />
      </div>
    )
  if (done) return <Results done={done} onRetry={() => setRetry(done.wrong)} onClose={() => nav(back)} />

  const cur = pages[page!]
  const isPractice = cur.blocks.some((b) => b.kind === 'exercises' && b.exerciseIds.length > 0)
  const blocked = isPractice && !practice
  const last = page === pages.length - 1
  const sectionIdx = (s: SectionKey) => pages.findIndex((p) => p.section === s)

  async function finish() {
    if (finishing) return
    setFinishing(true)
    const wasDone = progress!.lessons[lesson.id] === 'completed'
    const score = practice?.score ?? 0
    const total = practice?.total ?? 0
    await saveLessonStatus(lesson.id, 'completed', total ? score / total : 1)
    const before = await db.srsCards.count()
    await seedCards(lesson)
    const newWords = (await db.srsCards.count()) - before
    const xp = wasDone ? 5 : 20 + score * 2
    await awardXp(xp, wasDone ? 'lesson-review' : 'lesson')
    await db.lessonState.delete(lesson.id)
    sfx('win')
    for (const b of await checkBadges()) toast({ title: `Huy hiệu mới: ${b.name}`, body: b.desc, Icon: b.Icon })
    const wrong = (practice?.wrongIds ?? []).map((id) => lesson.exercises.find((e) => e.id === id)!).filter(Boolean)
    setDone({ xp, score, total, newWords, seconds: (Date.now() - started.current) / 1000, wrong })
  }

  function go(d: number) {
    const n = page! + d
    if (n < 0) return
    if (n >= pages.length) return void finish()
    if (page === 0) void saveLessonStatus(lesson.id, 'in_progress')
    setPage(n)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link to={back} aria-label="Thoát bài học" className="rounded-full p-1 text-muted hover:bg-surface-2">
            <X size={26} />
          </Link>
          <ProgressBar value={(page! + 1) / pages.length} className="flex-1" label="Tiến độ bài học" />
        </div>
        <nav aria-label="Các phần của bài" className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-4 pb-2">
          {(Object.keys(TITLES) as SectionKey[]).map((s) => {
            const idx = sectionIdx(s)
            const active = cur.section === s
            // Bài đã hoàn thành: được nhảy tới mọi phần để ôn lại.
            const reachable = idx >= 0 && (idx <= page! || progress.lessons[lesson.id] === 'completed')
            return (
              <button
                key={s}
                type="button"
                disabled={!reachable || isPractice}
                onClick={() => setPage(idx)}
                aria-current={active ? 'step' : undefined}
                ref={active ? (el) => el?.scrollIntoView({ block: 'nearest', inline: 'center' }) : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${active ? 'bg-brand text-white' : reachable ? 'bg-surface-2 text-text' : 'text-muted'}`}
              >
                {TITLES[s]}
              </button>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-40 pt-4">
        {page === 0 && <LessonHero chapterId={chapter.id} />}
        {page === 0 && (
          <>
            <p className="text-sm font-bold uppercase tracking-wide text-muted">
              {chapter.levelId} · Chapter {chapter.order} · {chapter.title}
            </p>
            <h1 className="mb-3 text-2xl font-extrabold">{lesson.title}</h1>
            <div className="card mb-4 p-4">
              <p className="mb-1 font-bold">Sau bài này bạn có thể:</p>
              <ul className="list-disc space-y-1 pl-5">
                {lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          </>
        )}
        {page !== 0 && <h2 className="mb-3 text-xl font-extrabold">{TITLES[cur.section]}</h2>}
        {cur.step && (
          <section className="card p-5">
            <p className="mb-1 text-xs font-bold uppercase text-muted">
              Bước {cur.step.no}/{cur.step.total}
            </p>
            <h3 className="mb-2 text-lg font-extrabold">{cur.step.item.title}</h3>
            <Md text={cur.step.item.md} />
            {cur.step.item.quiz && <StepQuiz key={page} quiz={cur.step.item.quiz} />}
          </section>
        )}
        {cur.blocks.map((b, i) => (
          <BlockView key={`${page}-${i}`} b={b} lesson={lesson} onPracticeDone={(s, t) => setPractice({ score: s, total: t, wrongTags: [], wrongIds: [] })} onPracticeResult={setPractice} />
        ))}
        {cur.blocks.length === 0 && !cur.step && <p className="text-muted">Phần này không có nội dung mới.</p>}
      </main>

      {!(isPractice && !practice) && (
        <footer className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-line bg-surface">
          <div className="mx-auto flex max-w-3xl gap-3 px-4 py-3">
            <button type="button" className="btn-secondary" disabled={page === 0} onClick={() => go(-1)} aria-label="Trang trước">
              <ArrowLeft size={20} />
            </button>
            <button type="button" className="btn-primary flex-1 text-lg" disabled={blocked || finishing} onClick={() => go(1)}>
              {last ? (finishing ? 'Đang lưu…' : 'Hoàn thành bài học') : 'Tiếp tục'}
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}
