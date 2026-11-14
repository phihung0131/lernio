import type { Block, Lesson, SectionKey } from '@/core/content/schema'
import { SECTION_KEYS } from '@/core/content/schema'

export interface Page {
  section: SectionKey
  blocks: Block[]
  /** Trang là một bước ngữ pháp riêng (đánh số). */
  step?: { no: number; total: number; item: Extract<Block, { kind: 'steps' }>['items'][number] }
}

const VOCAB_PER_PAGE = 5

/** Chia bài học thành các trang nhỏ, mỗi trang một khái niệm. */
export function buildPages(lesson: Lesson): Page[] {
  const pages: Page[] = []
  for (const section of SECTION_KEYS) {
    const blocks = lesson.sections[section]
    let buf: Block[] = []
    const flush = () => {
      if (buf.length) pages.push({ section, blocks: buf })
      buf = []
    }
    for (const b of blocks) {
      if (b.kind === 'vocabList') {
        flush()
        for (let i = 0; i < b.vocabIds.length; i += VOCAB_PER_PAGE)
          pages.push({ section, blocks: [{ kind: 'vocabList', vocabIds: b.vocabIds.slice(i, i + VOCAB_PER_PAGE) }] })
      } else if (b.kind === 'steps') {
        flush()
        b.items.forEach((item, i) => pages.push({ section, blocks: [], step: { no: i + 1, total: b.items.length, item } }))
      } else if (b.kind === 'dialogue' || b.kind === 'reading' || b.kind === 'writingTask' || b.kind === 'speakingTask' || b.kind === 'exercises') {
        flush()
        pages.push({ section, blocks: [b] })
      } else {
        buf.push(b)
        if (buf.length >= 4 && section === 'grammar') flush()
      }
    }
    flush()
    if (!pages.some((p) => p.section === section) && section !== 'practice') pages.push({ section, blocks: [] })
  }
  return pages
}
