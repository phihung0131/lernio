import { describe, expect, it } from 'vitest'
import { chapter, conj, conjEx, dlg, lesson, sortEx, tr, voiceOf } from './lib'

describe('content DSL', () => {
  it('voiceOf guesses female speakers', () => {
    expect(voiceOf('Anna')).toBe('f')
    expect(voiceOf('Frau Weber')).toBe('f')
    expect(voiceOf('Ärztin')).toBe('f')
    expect(voiceOf('Kellnerin')).toBe('f')
    expect(voiceOf('Tom')).toBe('m')
    expect(voiceOf('Herr Nguyen')).toBe('m')
    expect(voiceOf('Martin')).toBe('m')
  })
  it('dlg assigns voices, override wins', () => {
    const b = dlg(['Anna', 'Hallo', 'Chào'], ['Tom', 'Hi', 'Chào'], ['Kim', 'Hey', 'Ê', 'f'])
    expect(b.kind === 'dialogue' && b.lines.map((l) => l.voice)).toEqual(['f', 'm', 'f'])
  })
  it('conj splits 6 forms; conjEx parses rows', () => {
    const c = conj('sein', 'là', 'bin, bist, ist, sind, seid, sind')
    expect(c.kind === 'conjugation' && c.forms).toHaveLength(6)
    const e = conjEx('sein', 'là', 'ich:bin, du:bist')
    expect(e.type === 'conjugate' && e.rows).toEqual([{ pronoun: 'ich', answer: 'bin' }, { pronoun: 'du', answer: 'bist' }])
  })
  it('chapter v2 draws 20 test questions and prefixes ids', () => {
    const ex = Array.from({ length: 30 }, (_, i) => tr(`câu ${i}`, `Satz ${i}`))
    const l = lesson({ id: 'x-l1', title: 't', goals: ['g'], intro: 'i', ex, auto: false, review: 'r' })
    const ch = chapter({ version: 2, level: 'A1', order: 1, title: 'T', titleVi: 'T', lessons: [l], testExtra: [sortEx('p', ['a', 'b'], [['x', 0], ['y', 1]], 'e')] })
    expect(ch.test.questionCount).toBe(20)
    expect(ch.test.questions).toHaveLength(31)
    expect(new Set(ch.test.questions.map((q) => q.id)).size).toBe(31)
  })
})
