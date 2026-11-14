import type { ChapterResultRow, LessonProgressRow } from './db'

const RANK = { not_started: 0, in_progress: 1, completed: 2 } as const

/** Tiến độ bài học: giữ trạng thái "tiến xa nhất" và điểm cao nhất. */
export function mergeLesson(a: LessonProgressRow, b: LessonProgressRow): LessonProgressRow {
  const winner = RANK[a.status] >= RANK[b.status] ? a : b
  const best = Math.max(a.bestScore ?? 0, b.bestScore ?? 0)
  return {
    ...winner,
    bestScore: best || undefined,
    updatedAt: a.updatedAt > b.updatedAt ? a.updatedAt : b.updatedAt,
  }
}

export function mergeChapter(a: ChapterResultRow, b: ChapterResultRow): ChapterResultRow {
  return {
    chapterId: a.chapterId,
    attempts: Math.max(a.attempts, b.attempts),
    bestScore: Math.max(a.bestScore, b.bestScore),
    passed: a.passed || b.passed,
    updatedAt: a.updatedAt > b.updatedAt ? a.updatedAt : b.updatedAt,
  }
}

import type { SrsCardRow } from './db'

/** Thẻ SRS: giữ bản có lần ôn gần nhất; hòa thì bản có nhiều lượt ôn hơn. */
export function mergeSrs(a: SrsCardRow, b: SrsCardRow): SrsCardRow {
  const la = a.lastReview ?? ''
  const lb = b.lastReview ?? ''
  if (la !== lb) return la > lb ? a : b
  return a.reps >= b.reps ? a : b
}
