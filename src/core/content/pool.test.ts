import { describe, expect, it } from 'vitest'
import type { Chapter } from './schema'
import { buildMock, exercisePool, skillOf } from './pool'

const ex = (id: string, type: string, tags: string[] = []) => ({ id, type, tags, explanationVi: '', options: ['a', 'b'], answer: 0, audio: 'x', prompt: 'p', answers: ['a'] })
const ch = (id: string, level: string, exs: unknown[]) => ({ id, levelId: level, lessons: [{ id: `${id}-l`, exercises: exs }] }) as unknown as Chapter

describe('pool', () => {
  const chapters = [ch('a', 'A1', [ex('1', 'listenAndChoose'), ex('2', 'fillBlank', ['grammar:x']), ex('3', 'articlePick', ['vocab:y'])]), ch('b', 'A2', [ex('4', 'dictation')])]
  it('classifies skills', () => {
    expect(skillOf(chapters[0].lessons[0].exercises[0])).toBe('listening')
    expect(skillOf(chapters[0].lessons[0].exercises[1])).toBe('grammar')
    expect(skillOf(chapters[0].lessons[0].exercises[2])).toBe('vocab')
  })
  it('filters by level, skill and tags', () => {
    expect(exercisePool(chapters, { levels: ['A1'], skills: ['listening'] }).map((p) => p.ex.id)).toEqual(['1'])
    expect(exercisePool(chapters, { tags: ['vocab:y'] }).map((p) => p.ex.id)).toEqual(['3'])
  })
  it('mock for A1 never uses higher levels', () => {
    const ids = buildMock(chapters, 'A1').flatMap((s) => s.exercises.map((e) => e.id))
    expect(ids).not.toContain('4')
  })
})
