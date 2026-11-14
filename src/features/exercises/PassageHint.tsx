import { useEffect, useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, Headphones, Play } from 'lucide-react'
import type { Block, Exercise, Lesson } from '@/core/content/schema'
import { loadAllChapters } from '@/core/content/loader'
import { speakSequence, type Voice } from '@/core/audio/player'

let lessons: Map<string, Lesson> | null = null
async function lessonById(id: string) {
  if (!lessons) {
    const m = new Map<string, Lesson>()
    for (const c of await loadAllChapters()) for (const l of c.lessons) m.set(l.id, l)
    lessons = m
  }
  return lessons.get(id)
}

const isPassage = (b: Block) => b.kind === 'reading' || b.kind === 'dialogue'
const titleOf = (b: Block) => (b.kind === 'reading' || b.kind === 'dialogue' ? b.title : undefined)

/** Câu hỏi về bài đọc/hội thoại có thể xuất hiện ngoài bài học (kiểm tra chapter, thi thử, luyện tập, ôn tập).
 *  Nút này cho xem lại đúng đoạn văn của bài gốc để trả lời được. */
export default function PassageHint({ ex }: { ex: Exercise }) {
  // Chỉ câu đúng/sai và trắc nghiệm mới có thể hỏi về đoạn văn; bài từ vựng tự sinh (tag vocab:) thì không.
  const aboutText = (ex.type === 'trueFalse' || ex.type === 'multipleChoice') && !ex.tags.some((t) => t.startsWith('vocab:'))
  const lessonId = aboutText ? ex.tags.find((t) => t.startsWith('lesson:'))?.slice(7) : undefined
  const [data, setData] = useState<{ lesson: Lesson; blocks: Block[] } | null>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false)
    if (!lessonId) return setData(null)
    let alive = true
    void lessonById(lessonId).then((l) => {
      const blocks = l?.sections.examples.filter(isPassage) ?? []
      if (alive) setData(l && blocks.length ? { lesson: l, blocks } : null)
    })
    return () => {
      alive = false
    }
  }, [lessonId, ex.id])
  if (!data) return null
  // Phần Hören của thi thử: chỉ cho nghe, không hiện chữ.
  if (ex.tags.includes('mode:listen')) {
    const items: { text: string; voice?: Voice }[] = data.blocks.flatMap((b) =>
      b.kind === 'dialogue' ? b.lines.map((l) => ({ text: l.de, voice: l.voice })) : b.kind === 'reading' ? b.de.split('\n').filter(Boolean).map((t) => ({ text: t })) : [],
    )
    return (
      <button type="button" className="btn-secondary mb-3 flex w-full items-center justify-center gap-2" onClick={() => void speakSequence(items)}>
        <Headphones size={18} aria-hidden /> Nghe đoạn hội thoại
      </button>
    )
  }
  const names = data.blocks.map(titleOf).filter(Boolean).join(' · ')
  return (
    <div className="mb-3">
      <button type="button" className="btn-secondary flex !min-h-9 w-full items-center justify-between gap-2 !py-1.5 text-left text-sm" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="flex items-center gap-2"><BookOpen size={16} aria-hidden /> {open ? 'Ẩn đoạn văn' : 'Xem đoạn văn'}{names ? `: ${names}` : ''}</span>
        {open ? <ChevronUp size={16} aria-hidden /> : <ChevronDown size={16} aria-hidden />}
      </button>
      {open && (
        <div className="mt-2 max-h-80 overflow-y-auto rounded-2xl border border-line bg-bg p-3" lang="de">
          {data.blocks.map((b, i) => <Passage key={i} b={b} />)}
        </div>
      )}
    </div>
  )
}

/** Đoạn văn chỉ tiếng Đức (không bản dịch) để không lộ đáp án khi làm bài. */
function Passage({ b }: { b: Block }) {
  const lines = b.kind === 'dialogue' ? b.lines.map((l) => ({ who: l.speaker, de: l.de, voice: l.voice })) : b.kind === 'reading' ? b.de.split('\n').filter(Boolean).map((de) => ({ who: '', de, voice: 'm' as Voice })) : []
  return (
    <section className="mb-3 last:mb-0">
      <div className="mb-1 flex items-center gap-2">
        {titleOf(b) && <h3 className="flex-1 text-sm font-bold">{titleOf(b)}</h3>}
        <button type="button" className="ml-auto inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs" onClick={() => void speakSequence(lines.map((l) => ({ text: l.de, voice: l.voice })))}>
          <Play size={14} aria-hidden /> Nghe
        </button>
      </div>
      {lines.map((l, i) => (
        <p key={i} className="py-0.5 text-sm">
          {l.who && <span className="mr-1 font-bold text-muted">{l.who}:</span>}
          {l.de}
        </p>
      ))}
    </section>
  )
}
