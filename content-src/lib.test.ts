import { describe, expect, it } from 'vitest'
import { chapter, conj, conjEx, dlg, fill, lesson, reading, sortEx, tf, tr, v, voiceOf } from './lib'

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

const base = { title: 't', goals: [], intro: 'i', review: 'r' }
const ex = (o: { ex?: ReturnType<typeof tf>[]; examples?: ReturnType<typeof dlg>[] }) => lesson({ id: 'x-l1', ...base, auto: false, ...o }).exercises

describe('bài tập từ vựng tự sinh', () => {
  const vocab = [
    v('t-zuerst', 'zuerst', 'đầu tiên'),
    v('t-dann', 'dann', 'sau đó'),
    v('t-danach', 'danach', 'sau đó'),
    v('t-spaeter', 'später', 'muộn hơn'),
    v('t-schluss', 'zum Schluss', 'cuối cùng'),
  ]
  const all = lesson({ id: 'x-l1', ...base, vocab }).exercises

  it('gõ từ chấp nhận mọi từ đồng nghĩa', () => {
    const t = all.find((e) => e.type === 'typeAnswer' && e.tags.includes('vocab:t-dann'))
    expect(t && 'answers' in t && t.answers).toEqual(['dann', 'danach'])
  })
  it('phương án nhiễu không chứa từ đồng nghĩa', () => {
    for (const e of all)
      if (e.type === 'multipleChoice' && e.tags.includes('vocab:t-dann')) expect(e.options).not.toContain('danach')
  })
  it('ghép cặp không có nghĩa trùng', () => {
    const m = all.find((e) => e.type === 'matchPairs')
    const rights = m && m.type === 'matchPairs' ? m.pairs.map((p) => p.right) : []
    expect(new Set(rights).size).toBe(rights.length)
  })
})

describe('giải thích đúng/sai', () => {
  it('trích câu căn cứ trong bài đọc, không cắt sau số thứ tự', () => {
    const [e] = ex({
      examples: [reading('R', 'Die Küche ist klein. Dokumente können im 2. Stock gedruckt werden.', 'v')],
      ex: [tf('Man kann im 2. Stock drucken.', true, 'Đúng.')],
    })
    expect(e.explanationVi).toBe('Đúng. Trong bài: “Dokumente können im 2. Stock gedruckt werden.”')
  })
  it('câu hỏi trong hội thoại kèm câu trả lời ngay sau', () => {
    const [e] = ex({
      examples: [dlg(['Kundin', 'Einfach. Muss ich umsteigen?', 'Một chiều. Có phải đổi tàu không?'], ['Mann', 'Ja, in Hannover.', 'Có, ở Hannover.'])],
      ex: [tf('Sie muss in Hannover umsteigen.', true, 'Đúng.')],
    })
    expect(e.explanationVi).toContain('– Mann: “Ja, in Hannover.”')
  })
  it('giữ nguyên lời giải đã đủ dài', () => {
    const [e] = ex({ examples: [reading('R', 'Linh wohnt im dritten Stock.', 'v')], ex: [tf('Linh wohnt im ersten Stock.', false, 'Linh wohnt im dritten Stock.')] })
    expect(e.explanationVi).toBe('Linh wohnt im dritten Stock.')
  })
  it('lời giải chỉ lặp đáp án được thay bằng quy tắc', () => {
    const e = lesson({ id: 'x-l1', ...base, auto: false, ex: [fill('Ich frage mich, ___ er recht hat.', 'ob', 'ob.')] }).exercises[0]
    expect(e.explanationVi).toMatch(/câu hỏi gián tiếp/)
  })
})
