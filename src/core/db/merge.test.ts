import { describe, expect, it } from 'vitest'
import { mergeChapter, mergeLesson } from './merge'

describe('merge', () => {
  it('completed beats in_progress regardless of time', () => {
    const r = mergeLesson(
      { lessonId: 'l', status: 'completed', bestScore: 0.9, updatedAt: '2026-01-01' },
      { lessonId: 'l', status: 'in_progress', bestScore: 0.5, updatedAt: '2026-02-01' },
    )
    expect(r.status).toBe('completed')
    expect(r.bestScore).toBe(0.9)
    expect(r.updatedAt).toBe('2026-02-01')
  })
  it('chapter passed sticks, best score max', () => {
    const r = mergeChapter(
      { chapterId: 'c', attempts: 3, bestScore: 0.6, passed: false, updatedAt: 'b' },
      { chapterId: 'c', attempts: 1, bestScore: 0.85, passed: true, updatedAt: 'a' },
    )
    expect(r).toMatchObject({ attempts: 3, bestScore: 0.85, passed: true, updatedAt: 'b' })
  })
})

import { mergeSrs } from './merge'
describe('mergeSrs', () => {
  const base = { cardId: 'c', kind: 'vocab' as const, due: 'd', stability: 1, difficulty: 1, lapses: 0, state: 2, updatedAt: 'u' }
  it('keeps the most recently reviewed card', () => {
    const a = { ...base, reps: 5, lastReview: '2026-01-02' }
    const b = { ...base, reps: 9, lastReview: '2026-01-01' }
    expect(mergeSrs(a, b)).toBe(a)
  })
  it('never-reviewed vs reviewed keeps reviewed', () => {
    const a = { ...base, reps: 0 }
    const b = { ...base, reps: 1, lastReview: '2026-01-01' }
    expect(mergeSrs(a, b)).toBe(b)
  })
})
