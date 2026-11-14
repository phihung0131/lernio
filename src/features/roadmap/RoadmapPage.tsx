import { Link } from 'react-router-dom'
import { CheckCircle2, Lock, PlayCircle, Trophy } from 'lucide-react'
import { LEVELS } from '@/core/content/loader'
import { isChapterUnlocked, isTestUnlocked, lessonState } from '@/core/content/unlock'
import { useChapters, useProgress } from './useCurriculum'
import { LevelBadge } from '@/features/art/Art'

export default function RoadmapPage() {
  const chapters = useChapters()
  const progress = useProgress()
  if (!chapters || !progress) return <p>Đang tải…</p>
  if (chapters.length === 0) return <p>Chưa có nội dung.</p>

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold">Lộ trình học</h1>
        <p className="text-muted">Học lần lượt từng bài. Đạt từ 80% bài kiểm tra cuối chapter để mở chapter tiếp theo.</p>
      </header>
      {LEVELS.map((lv) => {
        const list = chapters.map((c, idx) => ({ c, idx })).filter((x) => x.c.levelId === lv.id)
        if (!list.length) return null
        return (
          <section key={lv.id} aria-labelledby={`lv-${lv.id}`}>
            <div className="mb-4 flex items-center gap-3">
              <LevelBadge level={lv.id} />
              <div>
                <h2 id={`lv-${lv.id}`} className="text-xl font-bold">{lv.title}</h2>
                <p className="text-sm text-muted">{lv.blurb}</p>
              </div>
            </div>
            <ol className="space-y-4">
              {list.map(({ c, idx }) => {
                const unlocked = isChapterUnlocked(chapters, idx, progress)
                const passed = progress.chaptersPassed[c.id]
                return (
                  <li key={c.id} className={`rounded-xl border border-line bg-surface p-4 ${unlocked ? '' : 'opacity-60'}`}>
                    <h3 className="flex items-center gap-2 font-semibold">
                      {passed ? <CheckCircle2 className="text-green-600" size={18} /> : !unlocked ? <Lock size={18} /> : null}
                      Chapter {String(c.order).padStart(2, '0')} – {c.title}
                      <span className="font-normal text-muted">· {c.titleVi}</span>
                    </h3>
                    <ul className="mt-3 space-y-1">
                      {c.lessons.map((l, li) => {
                        const st = lessonState(chapters, idx, li, progress)
                        const inner = (
                          <span className="flex items-center gap-2 py-1.5">
                            {st === 'completed' ? <CheckCircle2 size={18} className="text-green-600" /> : st === 'locked' ? <Lock size={18} className="text-muted" /> : <PlayCircle size={18} className="text-brand" />}
                            <span className={st === 'current' ? 'font-semibold' : ''}>{l.title}</span>
                            {st === 'current' && <span className="ml-auto rounded bg-brand px-2 text-xs text-white">Học tiếp</span>}
                          </span>
                        )
                        return <li key={l.id}>{st === 'locked' ? <span aria-disabled>{inner}</span> : <Link to={`/lesson/${l.id}`}>{inner}</Link>}</li>
                      })}
                      <li>
                        {isTestUnlocked(chapters, idx, progress) ? (
                          <Link to={`/test/${c.id}`} className="flex items-center gap-2 py-1.5 font-medium text-amber-600">
                            <Trophy size={18} /> Kiểm tra cuối chapter {passed ? '(đã đạt)' : ''}
                          </Link>
                        ) : (
                          <span className="flex items-center gap-2 py-1.5 text-muted" aria-disabled>
                            <Lock size={18} /> Kiểm tra cuối chapter
                          </span>
                        )}
                      </li>
                    </ul>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
