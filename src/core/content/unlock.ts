/** Chỉ cần cấu trúc (id chapter, id bài): dùng được cho cả Chapter đầy đủ và ChapterOutline. */
type Chapter = { id: string; levelId: string; lessons: { id: string }[] }

export type LessonStatus = 'not_started' | 'in_progress' | 'completed'
export type NodeState = 'locked' | 'current' | 'completed' | 'available'

export interface Progress {
  lessons: Record<string, LessonStatus>
  /** chapterId -> đã đạt bài kiểm tra cuối chapter */
  chaptersPassed: Record<string, boolean>
}

/** Chapter mở khi chapter liền trước (toàn bộ level, theo thứ tự) đã đạt ≥ 80%. */
export function isChapterUnlocked(chapters: Chapter[], idx: number, p: Progress): boolean {
  if (idx === 0) return true
  return !!p.chaptersPassed[chapters[idx - 1].id]
}

export function lessonState(
  chapters: Chapter[],
  chapterIdx: number,
  lessonIdx: number,
  p: Progress,
): NodeState {
  const ch = chapters[chapterIdx]
  const lesson = ch.lessons[lessonIdx]
  if (p.lessons[lesson.id] === 'completed') return 'completed'
  if (!isChapterUnlocked(chapters, chapterIdx, p)) return 'locked'
  if (lessonIdx === 0) return 'current'
  const prev = ch.lessons[lessonIdx - 1]
  return p.lessons[prev.id] === 'completed' ? 'current' : 'locked'
}

/** Bài kiểm tra chapter chỉ mở khi mọi lesson của chapter đã hoàn thành. */
export function isTestUnlocked(chapters: Chapter[], chapterIdx: number, p: Progress): boolean {
  if (!isChapterUnlocked(chapters, chapterIdx, p)) return false
  return chapters[chapterIdx].lessons.every((l) => p.lessons[l.id] === 'completed')
}

export function didPass(score: number, total: number, passScore = 0.8): boolean {
  return total > 0 && score / total >= passScore
}

export type NextStep =
  | { kind: 'lesson'; chapterIdx: number; lessonIdx: number }
  | { kind: 'test'; chapterIdx: number }
  | { kind: 'done' }

/** Việc tiếp theo nên làm: bài học chưa xong đầu tiên, hoặc bài kiểm tra chapter đang mở. */
export function nextStep(chapters: Chapter[], p: Progress): NextStep {
  for (let ci = 0; ci < chapters.length; ci++) {
    const ch = chapters[ci]
    if (p.chaptersPassed[ch.id]) continue
    const li = ch.lessons.findIndex((l) => p.lessons[l.id] !== 'completed')
    if (li >= 0) return { kind: 'lesson', chapterIdx: ci, lessonIdx: li }
    return { kind: 'test', chapterIdx: ci }
  }
  return { kind: 'done' }
}

/** Tỉ lệ hoàn thành chapter: mỗi bài 1 phần, bài kiểm tra 1 phần. */
export function chapterProgress(ch: Chapter, p: Progress): number {
  const done = ch.lessons.filter((l) => p.lessons[l.id] === 'completed').length + (p.chaptersPassed[ch.id] ? 1 : 0)
  return done / (ch.lessons.length + 1)
}

/** Level mở khi chapter đầu tiên của nó đã mở. */
export function isLevelUnlocked(chapters: Chapter[], levelId: string, p: Progress): boolean {
  const idx = chapters.findIndex((c) => c.levelId === levelId)
  return idx >= 0 && isChapterUnlocked(chapters, idx, p)
}
