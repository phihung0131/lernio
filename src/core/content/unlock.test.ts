import { describe, expect, it } from 'vitest'
import type { Chapter } from './schema'
import { didPass, isChapterUnlocked, isTestUnlocked, lessonState } from './unlock'

const mk = (id: string, lessons: string[]): Chapter =>
  ({ id, lessons: lessons.map((l) => ({ id: l })) }) as unknown as Chapter

const chapters = [mk('c1', ['l1', 'l2']), mk('c2', ['l3'])]

describe('unlock', () => {
  it('first lesson of first chapter is current', () => {
    expect(lessonState(chapters, 0, 0, { lessons: {}, chaptersPassed: {} })).toBe('current')
  })
  it('second lesson locked until first completed', () => {
    const p = { lessons: {}, chaptersPassed: {} }
    expect(lessonState(chapters, 0, 1, p)).toBe('locked')
    expect(lessonState(chapters, 0, 1, { ...p, lessons: { l1: 'completed' as const } })).toBe('current')
  })
  it('next chapter locked until test passed', () => {
    const p = { lessons: { l1: 'completed' as const, l2: 'completed' as const }, chaptersPassed: {} }
    expect(isChapterUnlocked(chapters, 1, p)).toBe(false)
    expect(lessonState(chapters, 1, 0, p)).toBe('locked')
    expect(isChapterUnlocked(chapters, 1, { ...p, chaptersPassed: { c1: true } })).toBe(true)
  })
  it('test needs all lessons completed', () => {
    expect(isTestUnlocked(chapters, 0, { lessons: { l1: 'completed' }, chaptersPassed: {} })).toBe(false)
    expect(
      isTestUnlocked(chapters, 0, { lessons: { l1: 'completed', l2: 'completed' }, chaptersPassed: {} }),
    ).toBe(true)
  })
  it('80% threshold', () => {
    expect(didPass(8, 10)).toBe(true)
    expect(didPass(7, 10)).toBe(false)
    expect(didPass(0, 0)).toBe(false)
  })
})
