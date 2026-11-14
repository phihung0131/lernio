import { useEffect, useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, Headphones } from 'lucide-react'
import type { Block, Exercise, Lesson } from '@/core/content/schema'
import { loadAllChapters } from '@/core/content/loader'
import { speakSequence, type Voice } from '@/core/audio/player'
import { BlockView } from '@/features/lesson/BlockView'

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
  // Bài tập từ vựng tự sinh (có tag vocab:) không phụ thuộc đoạn văn.
  const lessonId = ex.tags.some((t) => t.startsWith('vocab:')) ? undefined : ex.tags.find((t) => t.startsWith('lesson:'))?.slice(7)
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
        <div className="mt-2 max-h-80 overflow-y-auto rounded-2xl border border-line bg-bg p-2">
          {data.blocks.map((b, i) => <BlockView key={i} b={b} lesson={data.lesson} />)}
        </div>
      )}
    </div>
  )
}
