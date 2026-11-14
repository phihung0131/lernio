import { db, type SyncTable } from './db'

/** Ghi vào Dexie trước, xếp hàng outbox để đồng bộ nền. */
export async function enqueue(table: SyncTable, payload: Record<string, unknown>) {
  await db.outbox.add({ table, op: 'upsert', payload, createdAt: new Date().toISOString() })
}

export async function saveLessonStatus(
  lessonId: string,
  status: 'in_progress' | 'completed',
  bestScore?: number,
) {
  const now = new Date().toISOString()
  const prev = await db.lessonProgress.get(lessonId)
  if (prev?.status === 'completed' && status === 'in_progress') return prev
  const row = {
    lessonId,
    status,
    bestScore: Math.max(prev?.bestScore ?? 0, bestScore ?? 0) || undefined,
    completedAt: status === 'completed' ? (prev?.completedAt ?? now) : prev?.completedAt,
    updatedAt: now,
  }
  await db.lessonProgress.put(row)
  await enqueue('lesson_progress', {
    lesson_id: row.lessonId,
    status: row.status,
    best_score: row.bestScore ?? null,
    completed_at: row.completedAt ?? null,
    updated_at: row.updatedAt,
  })
  return row
}

export async function saveChapterResult(chapterId: string, score: number, passed: boolean) {
  const now = new Date().toISOString()
  const prev = await db.chapterResults.get(chapterId)
  const row = {
    chapterId,
    attempts: (prev?.attempts ?? 0) + 1,
    bestScore: Math.max(prev?.bestScore ?? 0, score),
    passed: (prev?.passed ?? false) || passed,
    updatedAt: now,
  }
  await db.chapterResults.put(row)
  await enqueue('chapter_results', {
    chapter_id: row.chapterId,
    attempts: row.attempts,
    best_score: row.bestScore,
    passed: row.passed,
    updated_at: row.updatedAt,
  })
  return row
}
