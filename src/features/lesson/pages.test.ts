import { describe, expect, it } from 'vitest'
import type { Lesson } from '@/core/content/schema'
import { buildPages } from './pages'

const lesson = {
  id: 'l',
  title: 't',
  objectives: ['o'],
  teaches: [],
  exercises: [],
  vocab: [],
  sections: {
    introduction: [{ kind: 'text', md: 'hi' }],
    vocabulary: [{ kind: 'vocabList', vocabIds: ['a', 'b', 'c', 'd', 'e', 'f', 'g'] }],
    grammar: [{ kind: 'steps', items: [{ title: '1', md: 'x' }, { title: '2', md: 'y' }] }, { kind: 'text', md: 'z' }],
    examples: [{ kind: 'dialogue', lines: [] }, { kind: 'reading', title: 'r', de: 'd', vi: 'v', glossary: [] }],
    practice: [{ kind: 'exercises', exerciseIds: ['e1'] }],
    review: [{ kind: 'text', md: 'sum' }, { kind: 'writingTask', prompt: 'p', model: 'm', hints: [], checklist: [] }],
  },
} as unknown as Lesson

describe('buildPages', () => {
  it('splits sections into small pages', () => {
    const pages = buildPages(lesson)
    expect(pages.map((p) => p.section)).toEqual([
      'introduction', 'vocabulary', 'vocabulary', 'grammar', 'grammar', 'grammar', 'examples', 'examples', 'practice', 'review', 'review',
    ])
    expect(pages[3].step).toMatchObject({ no: 1, total: 2 })
  })
})
