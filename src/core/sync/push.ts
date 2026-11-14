import { db } from '@/core/db/db'
import { supabase } from './supabase'

const CONFLICT: Record<string, string> = {
  lesson_progress: 'user_id,lesson_id',
  chapter_results: 'user_id,chapter_id',
  srs_cards: 'user_id,card_id',
  review_logs: 'id',
  xp_events: 'id',
  badges: 'user_id,badge_id',
  profiles: 'user_id',
}

let running = false

/** Đẩy outbox lên Supabase theo thứ tự. Dừng ở lỗi đầu tiên, giữ lại để thử lại sau. */
export async function pushOutbox(userId: string): Promise<number> {
  if (running || !navigator.onLine) return 0
  running = true
  let sent = 0
  try {
    const rows = await db.outbox.orderBy('seq').limit(200).toArray()
    for (const row of rows) {
      const { error } = await supabase
        .from(row.table)
        .upsert({ ...row.payload, user_id: userId }, { onConflict: CONFLICT[row.table] })
      if (error) break
      await db.outbox.delete(row.seq!)
      sent++
    }
  } finally {
    running = false
  }
  return sent
}
