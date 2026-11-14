import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { SECTION_KEYS, type SectionKey } from '@/core/content/schema'
import { lessonState } from '@/core/content/unlock'
import { saveLessonStatus } from '@/core/db/repo'
import { awardXp } from '@/core/db/xp'
import { BlockView } from '@/features/lesson/BlockView'
import Recorder from '@/features/lesson/Recorder'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'
import { LessonHero } from '@/features/art/Art'
import { seedCards } from '@/core/srs/cards'

const TITLES: Record<SectionKey, string> = {
  introduction: 'Giới thiệu',
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  examples: 'Ví dụ',
  practice: 'Luyện tập',
  review: 'Tổng kết',
}

export default function LessonPage() {
  const { lessonId } = useParams()
  const chapters = useChapters()
  const progress = useProgress()
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [practice, setPractice] = useState<{ s: number; t: number } | null>(null)

  const found = useMemo(() => {
    if (!chapters) return null
    for (let ci = 0; ci < chapters.length; ci++) {
      const li = chapters[ci].lessons.findIndex((l) => l.id === lessonId)
      if (li >= 0) return { ci, li, lesson: chapters[ci].lessons[li], chapter: chapters[ci] }
    }
    return undefined
  }, [chapters, lessonId])

  if (!chapters || !progress || found === null) return <p>Đang tải…</p>
  if (!found) return <Navigate to="/" replace />
  if (lessonState(chapters, found.ci, found.li, progress) === 'locked') return <Navigate to="/" replace />

  const { lesson, chapter } = found
  const key = SECTION_KEYS[step]
  const blocks = lesson.sections[key]
  const hasPractice = blocks.some((b) => b.kind === 'exercises')
  const last = step === SECTION_KEYS.length - 1
  const needsPractice = key === 'practice' && hasPractice && !practice

  async function next() {
    if (!last) {
      if (step === 0) void saveLessonStatus(lesson.id, 'in_progress')
      setStep(step + 1)
      window.scrollTo(0, 0)
      return
    }
    const wasDone = progress!.lessons[lesson.id] === 'completed'
    await saveLessonStatus(lesson.id, 'completed', practice ? practice.s / Math.max(1, practice.t) : 1)
    await seedCards(lesson)
    if (!wasDone) await awardXp(20 + (practice?.s ?? 0) * 2, 'lesson')
    nav('/')
  }

  return (
    <article>
      <Link to="/" className="text-sm text-muted">← Lộ trình</Link>
      <LessonHero chapterId={chapter.id} />
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <p className="text-sm text-muted">Chapter {chapter.order} · {chapter.title}</p>
      <ol className="my-4 flex gap-1" aria-label="Các phần của bài">
        {SECTION_KEYS.map((k, i) => (
          <li key={k} className={`h-1.5 flex-1 rounded ${i <= step ? 'bg-brand' : 'bg-line'}`} aria-current={i === step ? 'step' : undefined} />
        ))}
      </ol>
      <h2 className="mb-2 text-lg font-semibold">{step + 1}. {TITLES[key]}</h2>
      {key === 'introduction' && (
        <ul className="mb-3 list-disc pl-5 text-sm">
          {lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      )}
      {blocks.map((b, i) => (
        <BlockView key={`${key}-${i}`} b={b} lesson={lesson} onPracticeDone={(s, t) => setPractice({ s, t })} />
      ))}
      {key === 'vocabulary' && lesson.vocab.length > 0 && (
        <div className="mt-3 rounded-xl border border-line bg-surface p-3">
          <p className="mb-2 text-sm">Luyện nói: bấm nghe từ, rồi thu âm giọng bạn và nghe lại để so sánh.</p>
          <Recorder />
        </div>
      )}
      {practice && key === 'practice' && (
        <p className="my-3 rounded-lg bg-green-100 p-3 text-green-900">Bạn làm đúng {practice.s}/{practice.t} câu.</p>
      )}
      <div className="mt-6 flex gap-2">
        {step > 0 && <button className="btn-secondary" onClick={() => setStep(step - 1)}>Quay lại</button>}
        <button className="btn-primary flex-1" disabled={needsPractice} onClick={next}>
          {last ? 'Hoàn thành bài học' : needsPractice ? 'Hãy làm hết bài tập' : 'Tiếp theo'}
        </button>
      </div>
    </article>
  )
}
