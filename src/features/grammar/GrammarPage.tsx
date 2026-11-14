import { useEffect, useState } from 'react'
import { loadAllChapters, LEVELS } from '@/core/content/loader'
import type { Chapter } from '@/core/content/schema'
import { BlockView } from '@/features/lesson/BlockView'

export default function GrammarPage() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [q, setQ] = useState('')
  useEffect(() => { loadAllChapters().then(setChapters) }, [])
  const items = chapters.flatMap((c) =>
    c.lessons
      .filter((l) => l.sections.grammar.some((b) => b.kind !== 'text' || !b.md.startsWith('Bài này tập trung')))
      .map((l) => ({ c, l })),
  ).filter(({ l }) => !q || l.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <section>
      <h1 className="mb-1 text-2xl font-bold">Thư viện ngữ pháp</h1>
      <p className="mb-3 text-sm text-muted">Tra cứu lại phần ngữ pháp của mọi bài học.</p>
      <input className="field mb-4 w-full" placeholder="Tìm chủ đề…" aria-label="Tìm chủ đề ngữ pháp" value={q} onChange={(e) => setQ(e.target.value)} />
      {LEVELS.map((lv) => {
        const list = items.filter((x) => x.c.levelId === lv.id)
        if (!list.length) return null
        return (
          <div key={lv.id} className="mb-6">
            <h2 className="mb-2 font-semibold">{lv.title}</h2>
            {list.map(({ c, l }) => (
              <details key={l.id} className="mb-2 rounded-xl border border-line bg-surface p-3">
                <summary className="cursor-pointer font-medium">{l.title} <span className="text-sm text-muted">· Chapter {c.order}</span></summary>
                <div className="mt-2">{l.sections.grammar.map((b, i) => <BlockView key={i} b={b} lesson={l} />)}</div>
              </details>
            ))}
          </div>
        )
      })}
    </section>
  )
}
