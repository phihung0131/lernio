import { useEffect, useMemo, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { loadAllChapters } from '@/core/content/loader'
import type { VocabItem } from '@/core/content/schema'
import { speak } from '@/core/audio/player'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/core/db/db'

export default function VocabularyPage() {
  const [all, setAll] = useState<(VocabItem & { level: string })[]>([])
  const [q, setQ] = useState('')
  const learned = useLiveQuery(() => db.srsCards.toArray(), [])
  const known = useMemo(() => new Set((learned ?? []).map((c) => c.cardId)), [learned])

  useEffect(() => {
    loadAllChapters().then((cs) =>
      setAll(cs.flatMap((c) => c.lessons.flatMap((l) => l.vocab.map((v) => ({ ...v, level: c.levelId }))))),
    )
  }, [])

  const shown = all.filter((v) => known.has(`vocab:${v.id}`)).filter((v) => !q || (v.de + v.vi).toLowerCase().includes(q.toLowerCase()))
  return (
    <section>
      <h1 className="mb-1 text-2xl font-bold">Từ điển của tôi</h1>
      <p className="mb-3 text-sm text-muted">{known.size} từ đã học</p>
      <input className="field mb-3 w-full" placeholder="Tìm từ…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Tìm từ" />
      <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
        {shown.map((v) => (
          <li key={v.id} className="flex items-center gap-3 p-3">
            <span className="text-2xl">{v.emoji ?? '🔤'}</span>
            <div className="flex-1">
              <p className="font-semibold">{v.article} {v.de}</p>
              <p className="text-sm text-muted">{v.vi} · {v.level}</p>
            </div>
            <button aria-label={`Nghe ${v.de}`} className="p-2 text-brand" onClick={() => void speak(`${v.article ?? ''} ${v.de}`)}>
              <Volume2 size={18} />
            </button>
          </li>
        ))}
        {shown.length === 0 && <li className="p-4 text-muted">Chưa có từ nào. Hoàn thành bài học để thêm từ.</li>}
      </ul>
    </section>
  )
}
