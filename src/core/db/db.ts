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

export class LernioDB extends Dexie {
  lessonProgress!: EntityTable<LessonProgressRow, 'lessonId'>
  chapterResults!: EntityTable<ChapterResultRow, 'chapterId'>
  srsCards!: EntityTable<SrsCardRow, 'cardId'>
  reviewLogs!: EntityTable<ReviewLogRow, 'id'>
  xpEvents!: EntityTable<XpEventRow, 'id'>
  badges!: EntityTable<BadgeRow, 'badgeId'>
  outbox!: EntityTable<OutboxRow, 'seq'>
  meta!: EntityTable<{ key: string; value: string }, 'key'>

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
  }
}

export const db = new LernioDB()
