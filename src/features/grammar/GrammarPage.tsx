import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { LEVELS } from '@/core/content/loader'
import { isChapterUnlocked } from '@/core/content/unlock'
import type { Block } from '@/core/content/schema'
import { BlockView } from '@/features/lesson/BlockView'
import Md from '@/features/exercises/Md'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'

// Văn bản để tìm kiếm: tên bài, mục tiêu, chủ điểm, tiêu đề và nội dung các bước, ô bảng.
const searchText = (l: { title: string; objectives: string[]; teaches: string[]; sections: { grammar: Block[] } }) =>
  [
    l.title,
    ...l.objectives,
    ...l.teaches,
    ...l.sections.grammar.flatMap((b) =>
      b.kind === 'steps' ? b.items.flatMap((s) => [s.title, s.md]) : b.kind === 'table' ? [...b.head, ...b.rows.flat()] : b.kind === 'text' || b.kind === 'callout' ? [b.md] : [],
    ),
  ]
    .join(' ')
    .toLowerCase()

const hasGrammar = (blocks: Block[]) => blocks.some((b) => b.kind !== 'text' || !b.md.startsWith('Bài này tập trung'))

export default function GrammarPage() {
  const chapters = useChapters()
  const progress = useProgress()
  const [q, setQ] = useState('')
  if (!chapters || !progress) return <p className="p-6 text-center text-muted">Đang tải…</p>
  const items = chapters
    .flatMap((c, ci) => c.lessons.filter((l) => hasGrammar(l.sections.grammar)).map((l) => ({ c, l, open: isChapterUnlocked(chapters, ci, progress) })))
    .filter(({ l }) => !q || searchText(l).includes(q.trim().toLowerCase()))

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">Thư viện ngữ pháp</h1>
      <p className="mb-3 text-sm text-muted">Tra cứu lại ngữ pháp của các bài đã mở. Chủ điểm chưa học được khóa để giữ đúng lộ trình.</p>
      <label className="relative mb-4 block">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input className="field w-full !pl-10" placeholder="Tìm chủ điểm (ví dụ: Dativ, Perfekt)…" aria-label="Tìm chủ đề ngữ pháp" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      {q && <p className="mb-3 text-sm text-muted">{items.length ? `${items.length} bài có “${q.trim()}”` : `Không tìm thấy “${q.trim()}”. Thử từ khác, ví dụ: Akkusativ, Perfekt, weil.`}</p>}
      {LEVELS.map((lv) => {
        const list = items.filter((x) => x.c.levelId === lv.id)
        if (!list.length) return null
        return (
          <section key={lv.id} className="mb-6">
            <h2 className="mb-2 text-lg font-extrabold">{lv.title}</h2>
            <div className="space-y-2">
              {list.map(({ c, l, open }) =>
                open ? (
                  <details key={l.id} className="card group p-0">
                    <summary className="flex cursor-pointer list-none items-center gap-2 p-4 font-bold">
                      <span className="flex-1">{l.title} <span className="text-sm font-normal text-muted">· Chapter {c.order}</span></span>
                      <ChevronDown size={18} className="transition group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-line p-4">
                      {l.sections.grammar.map((b, i) =>
                        b.kind === 'steps' ? (
                          <ol key={i} className="space-y-3">
                            {b.items.map((s, si) => (
                              <li key={si}>
                                <p className="font-bold">{si + 1}. {s.title}</p>
                                <Md text={s.md} />
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <BlockView key={i} b={b} lesson={l} />
                        ),
                      )}
                    </div>
                  </details>
                ) : (
                  <p key={l.id} className="card p-4 text-muted">{l.title} · Chapter {c.order} (chưa mở)</p>
                ),
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
