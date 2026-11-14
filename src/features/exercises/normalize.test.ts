import { describe, expect, it } from 'vitest'
import { matchesAny } from './normalize'

describe('matchesAny', () => {
  it('ignores case, punctuation, spaces', () => {
    expect(matchesAny('  Ich  heiße Anna. ', ['Ich heiße Anna'])).toBe(true)
  })
  it('accepts ae/oe/ue/ss', () => {
    expect(matchesAny('Schoen', ['schön'])).toBe(true)
    expect(matchesAny('Strasse', ['Straße'])).toBe(true)
  })
  it('rejects wrong', () => {
    expect(matchesAny('Haus', ['Maus'])).toBe(false)
  })
  it('bỏ qua dấu phẩy giữa câu và ngoặc kép Đức', () => {
    expect(matchesAny('Leider kann ich nicht ich muss arbeiten', ['Leider kann ich nicht, ich muss arbeiten.'])).toBe(true)
    expect(matchesAny('"Hallo"', ['„Hallo“'])).toBe(true)
  })
  it('vẫn phân biệt đuôi ngữ pháp', () => {
    expect(matchesAny('Ich helfe dem Mann', ['Ich helfe den Mann'])).toBe(false)
  })
})
