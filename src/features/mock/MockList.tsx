import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { ClipboardCheck, Lock } from 'lucide-react'
import { db } from '@/core/db/db'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'
import { LevelBadge } from '@/features/art/Art'
import type { LevelId } from '@/core/content/schema'

export const MOCK_LEVELS: LevelId[] = ['A1', 'A2', 'B1']

export default function MockList() {
  const chapters = useChapters()
  const progress = useProgress()
  const history = useLiveQuery(() => db.mockResults.orderBy('at').reverse().toArray(), [])
  if (!chapters || !progress || !history) return <p className="p-6 text-center text-muted">Đang tải…</p>
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Thi thử</h1>
      <p className="text-sm text-muted">Đề mô phỏng cấu trúc thi Goethe/telc rút gọn: Nghe, Đọc, Ngữ pháp, Viết. Mở sau khi đạt bài thi cuối cấp tương ứng.</p>
      <ul className="grid gap-3">
        {MOCK_LEVELS.map((lv) => {
          const list = chapters.filter((c) => c.levelId === lv)
          const unlocked = list.length > 0 && !!progress.chaptersPassed[list[list.length - 1].id]
          const best = history.filter((h) => h.level === lv).reduce((m, h) => Math.max(m, h.score / h.total), 0)
          return (
            <li key={lv} className="card flex items-center gap-4 p-4">
              <LevelBadge level={lv} size={52} />
              <div className="flex-1">
                <p className="font-extrabold">Thi thử {lv}</p>
                <p className="text-sm text-muted">{unlocked ? (best ? `Điểm cao nhất: ${Math.round(best * 100)}%` : 'Chưa làm lần nào') : `Đạt bài thi cuối ${lv} để mở`}</p>
              </div>
              {unlocked ? (
                <Link to={`/mock/${lv}`} className="btn-primary flex items-center gap-2"><ClipboardCheck size={18} /> Làm bài</Link>
              ) : (
                <Lock className="text-muted" />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
