import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { didPass, isTestUnlocked } from '@/core/content/unlock'
import { saveChapterResult } from '@/core/db/repo'
import { awardXp } from '@/core/db/xp'
import { sfx } from '@/core/audio/player'
import ExerciseRunner, { type RunnerResult } from '@/features/exercises/ExerciseRunner'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'
import { Mascot } from '@/features/art/Art'

export default function TestPage() {
  const { chapterId } = useParams()
  const chapters = useChapters()
  const progress = useProgress()
  const [result, setResult] = useState<RunnerResult | null>(null)
  const [attempt, setAttempt] = useState(0)

  const idx = chapters?.findIndex((c) => c.id === chapterId) ?? -1
  const chapter = chapters?.[idx]
  const questions = useMemo(() => {
    if (!chapter) return []
    const pool = [...chapter.test.questions].sort(() => Math.random() - 0.5)
    return pool.slice(0, chapter.test.questionCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, attempt])

  if (!chapters || !progress) return <p>Đang tải…</p>
  if (!chapter || !isTestUnlocked(chapters, idx, progress)) return <Navigate to="/" replace />

  async function finish(r: RunnerResult) {
    setResult(r)
    const passed = didPass(r.score, r.total, chapter!.test.passScore)
    await saveChapterResult(chapter!.id, r.score / r.total, passed)
    if (passed) {
      sfx('win')
      if (!progress!.chaptersPassed[chapter!.id]) await awardXp(50, 'chapter-test')
    }
  }

  if (result) {
    const passed = didPass(result.score, result.total, chapter.test.passScore)
    const pct = Math.round((result.score / result.total) * 100)
    return (
      <section className="text-center">
        <Mascot size={120} mood={passed ? 'cheer' : 'happy'} />
        <h1 className="mt-2 text-2xl font-bold">{passed ? 'Bạn đã vượt qua!' : 'Chưa đạt, thử lại nhé'}</h1>
        <p className="text-4xl font-bold">{pct}%</p>
        <p className="text-muted">Cần tối thiểu {Math.round(chapter.test.passScore * 100)}% để mở chapter tiếp theo.</p>
        {!passed && (
          <p className="mt-2 text-sm">Hãy xem lại các bài của chapter này rồi làm lại bài kiểm tra.</p>
        )}
        <div className="mt-6 flex justify-center gap-2">
          {!passed && (
            <button className="btn-secondary" onClick={() => { setResult(null); setAttempt(attempt + 1) }}>
              Làm lại
            </button>
          )}
          <Link to="/" className="btn-primary inline-block">Về lộ trình</Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      <Link to="/" className="text-sm text-muted">← Lộ trình</Link>
      <h1 className="mb-4 text-2xl font-bold">Kiểm tra: {chapter.title}</h1>
      <ExerciseRunner key={attempt} exercises={questions} onFinish={finish} />
    </section>
  )
}
