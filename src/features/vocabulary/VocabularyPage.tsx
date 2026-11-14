import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Search, Star, Volume2, X } from 'lucide-react'
import { LEVELS } from '@/core/content/loader'
import type { VocabItem } from '@/core/content/schema'
import { isChapterUnlocked } from '@/core/content/unlock'
import { speak } from '@/core/audio/player'
import { db, type SrsCardRow } from '@/core/db/db'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'
import VocabIcon from '@/ui/VocabIcon'
import { canonVocabId } from '@/generated/vocabCanon'

type Row = VocabItem & { level: string; chapter: string; chapterId: string }
const full = (v: VocabItem) => (v.article ? `${v.article} ${v.de}` : v.de)
const ART = { der: 'text-[var(--der)]', die: 'text-[var(--die)]', das: 'text-[var(--das)]' } as const

function stateLabel(c?: SrsCardRow) {
  if (!c) return { text: 'Chưa học', cls: 'bg-surface-2 text-muted' }
  const days = Math.round((new Date(c.due).getTime() - Date.now()) / 86400000)
  if (c.reps === 0) return { text: 'Mới', cls: 'bg-brand-soft text-brand' }
  if (days <= 0) return { text: 'Đến hạn ôn', cls: 'bg-bad-bg text-bad' }
  if (c.stability > 21) return { text: 'Đã thuộc', cls: 'bg-ok-bg text-ok' }
  return { text: `Ôn sau ${days} ngày`, cls: 'bg-accent/15 text-accent' }
}

export default function VocabularyPage() {
  const chapters = useChapters()
  const progress = useProgress()
  const cards = useLiveQuery(() => db.srsCards.toArray(), [])
  const stars = useLiveQuery(async () => new Set<string>(JSON.parse((await db.meta.get('stars'))?.value ?? '[]')), [])
  const [q, setQ] = useState('')
  const [level, setLevel] = useState('all')
  const [gender, setGender] = useState('all')
  const [scope, setScope] = useState<'learned' | 'open' | 'stars'>('learned')
  const [detail, setDetail] = useState<Row | null>(null)

  const all = useMemo<Row[]>(() => {
    if (!chapters || !progress) return []
    const seen = new Set<string>()
    const out: Row[] = []
    chapters.forEach((c, i) => {
      if (!isChapterUnlocked(chapters, i, progress)) return
      for (const l of c.lessons)
        for (const v of l.vocab)
          if (!seen.has(canonVocabId(v.id))) {
            seen.add(canonVocabId(v.id))
            out.push({ ...v, level: c.levelId, chapter: c.title, chapterId: c.id })
          }
    })
    return out
  }, [chapters, progress])
  const cardMap = useMemo(() => new Map((cards ?? []).map((c) => [c.cardId, c])), [cards])

  if (!chapters || !progress || !cards || !stars) return <p className="p-6 text-center text-muted">Đang tải…</p>

  const toggleStar = async (id: string) => {
    const n = new Set(stars)
    if (n.has(id)) n.delete(id)
    else n.add(id)
    await db.meta.put({ key: 'stars', value: JSON.stringify([...n]) })
  }
  const shown = all
    .filter((v) => (scope === 'learned' ? cardMap.has(`vocab:${v.id}`) : scope === 'stars' ? stars.has(v.id) : true))
    .filter((v) => level === 'all' || v.level === level)
    .filter((v) => gender === 'all' || v.article === gender)
    .filter((v) => !q || `${full(v)} ${v.vi}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">Từ điển của tôi</h1>
      <p className="mb-3 text-sm text-muted">
        {cards.filter((c) => c.kind === 'vocab').length} từ đã học · {all.length} từ trong các chapter đã mở
      </p>
      <label className="relative mb-3 block">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input className="field w-full !pl-10" placeholder="Tìm tiếng Đức hoặc tiếng Việt…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Tìm từ" />
      </label>
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <select className="field !py-1.5" value={scope} onChange={(e) => setScope(e.target.value as typeof scope)} aria-label="Phạm vi">
          <option value="learned">Đã học</option>
          <option value="open">Tất cả đã mở</option>
          <option value="stars">Đánh dấu sao</option>
        </select>
        <select className="field !py-1.5" value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Cấp độ">
          <option value="all">Mọi cấp độ</option>
          {LEVELS.map((l) => <option key={l.id} value={l.id}>{l.id}</option>)}
        </select>
        <select className="field !py-1.5" value={gender} onChange={(e) => setGender(e.target.value)} aria-label="Giống">
          <option value="all">Mọi loại từ</option>
          <option value="der">der (giống đực)</option>
          <option value="die">die (giống cái)</option>
          <option value="das">das (giống trung)</option>
        </select>
      </div>
      <ul className="grid gap-2">
        {shown.map((v) => {
          const st = stateLabel(cardMap.get(`vocab:${v.id}`))
          return (
            <li key={v.id} className="card flex items-center gap-3 p-3">
              <button type="button" className="flex min-w-0 flex-1 items-center gap-3 text-left" onClick={() => setDetail(v)}>
                <VocabIcon icon={v.icon} word={v.de} article={v.article} size={40} />
                <span className="min-w-0">
                  <span className="block truncate font-bold" lang="de">
                    {v.article && <span className={`${ART[v.article]} mr-1`}>{v.article}</span>}
                    {v.de}
                  </span>
                  <span className="block truncate text-sm text-muted">{v.vi}</span>
                </span>
              </button>
              <span className={`hidden rounded-full px-2 py-0.5 text-xs font-bold sm:inline ${st.cls}`}>{st.text}</span>
              <button type="button" aria-label={`Nghe ${v.de}`} className="p-2 text-brand" onClick={() => void speak(full(v))}><Volume2 size={18} /></button>
              <button type="button" aria-label={stars.has(v.id) ? 'Bỏ đánh dấu' : 'Đánh dấu sao'} aria-pressed={stars.has(v.id)} className="p-2" onClick={() => void toggleStar(v.id)}>
                <Star size={18} className={stars.has(v.id) ? 'fill-accent text-accent' : 'text-muted'} />
              </button>
            </li>
          )
        })}
        {shown.length === 0 && <li className="card p-5 text-center text-muted">Không có từ nào phù hợp.</li>}
      </ul>

      {detail && (
        <div role="dialog" aria-label={full(detail)} className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 sm:items-center" onClick={() => setDetail(null)}>
          <div className="card sheet-in w-full max-w-md rounded-b-none p-5 sm:rounded-b-[1.25rem]" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Đóng" className="float-right p-1 text-muted" onClick={() => setDetail(null)}><X /></button>
            <VocabIcon icon={detail.icon} word={detail.de} article={detail.article} size={64} />
            <p className="mt-2 text-3xl font-extrabold" lang="de">
              {detail.article && <span className={`${ART[detail.article]} mr-1`}>{detail.article}</span>}
              {detail.de}
            </p>
            {detail.plural && <p className="text-sm text-muted">Số nhiều: die {detail.plural}</p>}
            <p className="mt-1 text-lg">{detail.vi}</p>
            <p className="text-sm text-muted">{detail.pos}{detail.viRespelling ? ` · đọc gần đúng: ${detail.viRespelling}` : ''}</p>
            {detail.example && (
              <p className="mt-3 rounded-xl bg-surface-2 p-3">
                <span lang="de" className="font-medium">{detail.example.de}</span>
                <br />
                <span className="text-sm text-muted">{detail.example.vi}</span>
              </p>
            )}
            <p className="mt-3 text-xs text-muted">{detail.level} · {detail.chapter} · {stateLabel(cardMap.get(`vocab:${detail.id}`)).text}</p>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary flex flex-1 items-center justify-center gap-2" onClick={() => void speak(full(detail))}><Volume2 size={18} /> Nghe</button>
              {detail.example && <button className="btn-secondary flex-1" onClick={() => void speak(detail.example!.de)}>Nghe câu ví dụ</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
