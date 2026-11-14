import { useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { RotateCcw, X } from 'lucide-react'
import { didPass, isTestUnlocked } from '@/core/content/unlock'
import { saveChapterResult } from '@/core/db/repo'
import { awardXp } from '@/core/db/xp'
import { sfx } from '@/core/audio/player'
import ExerciseRunner, { type RunnerResult } from '@/features/exercises/ExerciseRunner'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'
import { Chest, Mascot } from '@/features/art/Art'
import { checkBadges } from '@/features/progress/checkBadges'
import { useToast } from '@/ui/Toast'
import Confetti from '@/ui/Confetti'
import { ProgressRing } from '@/ui/Progress'

function shuffle<T>(a: T[]): T[] {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

export default function TestPage() {
  const { chapterId } = useParams()
  const chapters = useChapters()
  const progress = useProgress()
  const toast = useToast()
  const [result, setResult] = useState<RunnerResult | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [started, setStarted] = useState(false)
  const unlockedAtStart = useRef<boolean | null>(null)

  const idx = chapters?.findIndex((c) => c.id === chapterId) ?? -1
  const chapter = chapters?.[idx]
  const questions = useMemo(
    () => (chapter ? shuffle(chapter.test.questions).slice(0, chapter.test.questionCount) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chapter, attempt],
  )

  if (!chapters || !progress) return <p className="p-8 text-center text-muted">Đang tải…</p>
  if (unlockedAtStart.current === null && chapter) unlockedAtStart.current = isTestUnlocked(chapters, idx, progress)
  if (!chapter || !unlockedAtStart.current) return <Navigate to="/path" replace />
  const back = `/path?level=${chapter.levelId}`
  const levelTest = /Gesamttest/.test(chapter.title)

  async function finish(r: RunnerResult) {
    setResult(r)
    const passed = didPass(r.score, r.total, chapter!.test.passScore)
    await saveChapterResult(chapter!.id, r.score / r.total, passed)
    if (passed) {
      sfx('win')
      if (!progress!.chaptersPassed[chapter!.id]) await awardXp(levelTest ? 150 : 50, 'chapter-test')
      for (const b of await checkBadges()) toast({ title: `Huy hiệu mới: ${b.name}`, body: b.desc, Icon: b.Icon })
    }
  }

  if (!started)
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <Chest state="open" size={120} />
        <h1 className="text-2xl font-extrabold">{levelTest ? `Bài thi cuối cấp ${chapter.levelId}` : `Kiểm tra: ${chapter.title}`}</h1>
        <p className="text-muted">
          {questions.length} câu, rút ngẫu nhiên từ ngân hàng {chapter.test.questions.length} câu. Cần đúng từ {Math.round(chapter.test.passScore * 100)}% để {levelTest ? 'hoàn thành cấp độ' : 'mở chapter tiếp theo'}.
        </p>
        <div className="flex w-full gap-3">
          <Link to={back} className="btn-secondary flex-1 text-center">Để sau</Link>
          <button className="btn-primary flex-1" onClick={() => setStarted(true)} autoFocus>Bắt đầu</button>
        </div>
      </div>
    )

  if (result) {
    const passed = didPass(result.score, result.total, chapter.test.passScore)
    const pct = result.score / result.total
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        {passed && <Confetti />}
        <Mascot size={120} mood={passed ? 'cheer' : 'happy'} />
        <h1 className={`text-3xl font-extrabold ${passed ? 'text-ok' : 'text-bad'}`}>{passed ? 'Bạn đã vượt qua!' : 'Chưa đạt, thử lại nhé'}</h1>
        <ProgressRing value={pct} size={120} stroke={12} color={passed ? 'var(--ok)' : 'var(--bad)'} label={`Điểm ${Math.round(pct * 100)}%`}>
          <span className="text-2xl">{Math.round(pct * 100)}%</span>
        </ProgressRing>
        <p className="text-muted">
          Đúng {result.score}/{result.total} câu. Cần tối thiểu {Math.round(chapter.test.passScore * 100)}%.
        </p>
        {!passed && <p className="text-sm">Hãy xem lại các bài của chapter, đặc biệt các phần bạn làm sai, rồi làm lại.</p>}
        <div className="flex w-full flex-col gap-3">
          {!passed && (
            <button className="btn-secondary flex items-center justify-center gap-2" onClick={() => { setResult(null); setAttempt(attempt + 1) }}>
              <RotateCcw size={18} /> Làm lại
            </button>
          )}
          <Link to={back} className="btn-primary block text-center">Về lộ trình</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link to={back} aria-label="Thoát bài kiểm tra" className="rounded-full p-1 text-muted hover:bg-surface-2"><X size={26} /></Link>
          <h1 className="truncate font-extrabold">{levelTest ? `Bài thi cuối cấp ${chapter.levelId}` : `Kiểm tra: ${chapter.title}`}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pt-4">
        <ExerciseRunner key={attempt} exercises={questions} onFinish={finish} />
      </main>
    </div>
  )
}
