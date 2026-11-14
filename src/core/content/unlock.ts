import type { Chapter } from './schema'

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
