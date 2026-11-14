import { useEffect, useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Volume2 } from 'lucide-react'
import { dueCards, Rating, reviewCard, type Grade } from '@/core/srs/fsrs'
import { speak } from '@/core/audio/player'
import { awardXp } from '@/core/db/xp'
import { db } from '@/core/db/db'
import { loadAllChapters } from '@/core/content/loader'
import type { VocabItem } from '@/core/content/schema'
import { Mascot } from '@/features/art/Art'

export default function ReviewPage() {
  const [vocab, setVocab] = useState<Map<string, VocabItem>>(new Map())
  const [titles, setTitles] = useState<Map<string, string>>(new Map())
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)
  const due = useLiveQuery(() => dueCards(), [done])
  const total = useLiveQuery(() => db.srsCards.count(), [])

  useEffect(() => {
    loadAllChapters().then((cs) => {
      const v = new Map<string, VocabItem>()
      const t = new Map<string, string>()
      for (const c of cs) for (const l of c.lessons) {
        for (const x of l.vocab) v.set(`vocab:${x.id}`, x)
        for (const g of l.teaches) t.set(`grammar:${g}`, l.title)
      }
      setVocab(v)
      setTitles(t)
    })
  }, [])

  const card = useMemo(() => due?.[0], [due])
  if (!due || total === undefined) return <p>Đang tải…</p>
  if (!card)
    return (
      <section className="text-center">
        <Mascot mood="cheer" size={120} />
        <h1 className="text-2xl font-bold">{total === 0 ? 'Chưa có thẻ nào' : 'Hôm nay đã ôn xong!'}</h1>
        <p className="text-muted">{total === 0 ? 'Hoàn thành bài học đầu tiên để bắt đầu ôn tập.' : 'Quay lại sau để ôn các thẻ đến hạn.'}</p>
      </section>
    )

  const v = vocab.get(card.cardId)
  const front = v ? v.vi : `Ngữ pháp: ${titles.get(card.cardId) ?? card.cardId}`
  const back = v ? `${v.article ?? ''} ${v.de}`.trim() : 'Xem lại bài ngữ pháp này. Bạn còn nhớ quy tắc không?'

  async function rate(g: Grade) {
    await reviewCard(card!.cardId, g)
    await awardXp(g === Rating.Again ? 1 : 3, 'review')
    setFlipped(false)
    setDone(done + 1)
  }

  return (
    <section>
      <h1 className="mb-1 text-2xl font-bold">Ôn tập hôm nay</h1>
      <p className="mb-4 text-sm text-muted">Còn {due.length} thẻ</p>
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        {v?.emoji && <p className="text-6xl" aria-hidden>{v.emoji}</p>}
        <p className="mt-3 text-2xl font-bold">{front}</p>
        {flipped && (
          <div className="mt-4">
            <p className="text-3xl font-bold text-brand">{back}</p>
            {v && (
              <button className="btn-secondary mt-3 inline-flex items-center gap-2" onClick={() => void speak(`${v.article ?? ''} ${v.de}`)}>
                <Volume2 size={18} /> Nghe
              </button>
            )}
          </div>
        )}
      </div>
      {!flipped ? (
        <button className="btn-primary mt-4 w-full" onClick={() => setFlipped(true)}>Hiện đáp án</button>
      ) : (
        <div className="mt-4 grid grid-cols-4 gap-2">
          <button className="btn-secondary" onClick={() => void rate(Rating.Again)}>Quên</button>
          <button className="btn-secondary" onClick={() => void rate(Rating.Hard)}>Khó</button>
          <button className="btn-secondary" onClick={() => void rate(Rating.Good)}>Tốt</button>
          <button className="btn-secondary" onClick={() => void rate(Rating.Easy)}>Dễ</button>
        </div>
      )}
    </section>
  )
}
