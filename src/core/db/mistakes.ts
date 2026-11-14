import { db } from './db'

/** Ghi nhận lỗi sai theo tag (vocab:..., grammar:...). Đúng thì giảm dần trọng số. */
export async function recordResult(tags: string[], correct: boolean) {
  const now = new Date().toISOString()
  for (const tag of tags) {
    const prev = await db.mistakes.get(tag)
    if (correct) {
      if (prev && prev.count > 0) await db.mistakes.put({ ...prev, count: prev.count - 1 })
    } else await db.mistakes.put({ tag, count: (prev?.count ?? 0) + 1, lastAt: now })
  }
}

export const topMistakes = (n = 20) =>
  db.mistakes
    .orderBy('count')
    .reverse()
    .filter((m) => m.count > 0)
    .limit(n)
    .toArray()
