import Dexie, { type EntityTable } from 'dexie'
import type { LessonStatus } from '@/core/content/unlock'

export interface LessonProgressRow {
  lessonId: string
  status: LessonStatus
  bestScore?: number
  completedAt?: string
  updatedAt: string
}
export interface ChapterResultRow {
  chapterId: string
  attempts: number
  bestScore: number
  passed: boolean
  updatedAt: string
}
export interface SrsCardRow {
  cardId: string
  kind: 'vocab' | 'grammar'
  due: string
  stability: number
  difficulty: number
  reps: number
  lapses: number
  state: number
  lastReview?: string
  updatedAt: string
}
export interface ReviewLogRow {
  id: string
  cardId: string
  rating: 1 | 2 | 3 | 4
  reviewedAt: string
}
export interface XpEventRow {
  id: string
  amount: number
  source: string
  day: string
  createdAt: string
}
export interface BadgeRow {
  badgeId: string
  earnedAt: string
}
export interface MistakeRow {
  tag: string
  count: number
  lastAt: string
}
export interface LessonStateRow {
  lessonId: string
  step: number
  sub: number
  updatedAt: string
}
export interface ProfileRow {
  key: 'me'
  displayName?: string
  dailyGoalXp: number
  newCardsPerDay: number
  audioRate: number
  theme: 'auto' | 'light' | 'dark'
  updatedAt: string
}
export interface MockResultRow {
  id: string
  level: string
  score: number
  total: number
  sections: Record<string, { score: number; total: number }>
  at: string
}
export interface OutboxRow {
  seq?: number
  table: SyncTable
  op: 'upsert'
  payload: Record<string, unknown>
  createdAt: string
}
export type SyncTable =
  | 'lesson_progress'
  | 'chapter_results'
  | 'srs_cards'
  | 'review_logs'
  | 'xp_events'
  | 'badges'
  | 'profiles'

export class LernioDB extends Dexie {
  lessonProgress!: EntityTable<LessonProgressRow, 'lessonId'>
  chapterResults!: EntityTable<ChapterResultRow, 'chapterId'>
  srsCards!: EntityTable<SrsCardRow, 'cardId'>
  reviewLogs!: EntityTable<ReviewLogRow, 'id'>
  xpEvents!: EntityTable<XpEventRow, 'id'>
  badges!: EntityTable<BadgeRow, 'badgeId'>
  outbox!: EntityTable<OutboxRow, 'seq'>
  meta!: EntityTable<{ key: string; value: string }, 'key'>
  mistakes!: EntityTable<MistakeRow, 'tag'>
  lessonState!: EntityTable<LessonStateRow, 'lessonId'>
  profile!: EntityTable<ProfileRow, 'key'>
  mockResults!: EntityTable<MockResultRow, 'id'>

  constructor(name = 'lernio') {
    super(name)
    this.version(1).stores({
      lessonProgress: 'lessonId, updatedAt',
      chapterResults: 'chapterId, updatedAt',
      srsCards: 'cardId, due, updatedAt',
      reviewLogs: 'id, cardId, reviewedAt',
      xpEvents: 'id, day',
      badges: 'badgeId',
      outbox: '++seq, table',
      meta: 'key',
    })
    this.version(2).stores({
      lessonProgress: 'lessonId, status, updatedAt',
      mistakes: 'tag, count, lastAt',
      lessonState: 'lessonId',
      profile: 'key',
      mockResults: 'id, level, at',
    })
  }
}

/** DB hiện tại. Là live binding: các module import `db` luôn thấy DB của người dùng đang đăng nhập. */
export let db = new LernioDB('lernio-anon')
let currentUser: string | null = null

const TABLES = ['lessonProgress', 'chapterResults', 'srsCards', 'reviewLogs', 'xpEvents', 'badges', 'outbox'] as const

/** Mở DB riêng của người dùng. Lần đầu: chuyển dữ liệu từ DB chung cũ ('lernio') sang. */
export async function openUserDb(userId: string): Promise<LernioDB> {
  if (currentUser === userId) return db
  db.close()
  db = new LernioDB(`lernio-${userId}`)
  currentUser = userId
  await db.open()
  try {
    if (await Dexie.exists('lernio')) {
      const legacy = new LernioDB('lernio')
      await legacy.open()
      const empty = (await db.lessonProgress.count()) === 0 && (await db.srsCards.count()) === 0
      if (empty)
        for (const t of TABLES) {
          const rows = await (legacy[t] as unknown as { toArray(): Promise<unknown[]> }).toArray()
          await (db[t] as unknown as { bulkPut(r: unknown[]): Promise<unknown> }).bulkPut(rows)
        }
      legacy.close()
      await Dexie.delete('lernio')
    }
  } catch {
    /* bỏ qua lỗi di chuyển dữ liệu cũ */
  }
  return db
}

export function closeUserDb() {
  db.close()
  db = new LernioDB('lernio-anon')
  currentUser = null
}
