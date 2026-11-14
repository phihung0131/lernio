import { db } from './db'
import { enqueue } from './repo'

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export async function awardXp(amount: number, source: string) {
  if (amount <= 0) return
  const row = {
    id: crypto.randomUUID(),
    amount,
    source,
    day: dayKey(),
    createdAt: new Date().toISOString(),
  }
  await db.xpEvents.add(row)
  await enqueue('xp_events', { id: row.id, amount, source, day: row.day, created_at: row.createdAt })
}

/** Streak = số ngày liên tiếp (tính đến hôm nay hoặc hôm qua) có XP. */
export function computeStreak(days: string[], today = new Date()): number {
  const set = new Set(days)
  const d = new Date(today)
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (set.has(dayKey(d))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}
