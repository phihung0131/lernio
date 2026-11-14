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
})
