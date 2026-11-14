import { describe, expect, it } from 'vitest'
import { computeStreak } from './xp'

describe('computeStreak', () => {
  const today = new Date(2026, 10, 15)
  it('counts consecutive days incl. today', () => {
    expect(computeStreak(['2026-11-15', '2026-11-14', '2026-11-13'], today)).toBe(3)
  })
  it('still alive if only yesterday', () => {
    expect(computeStreak(['2026-11-14', '2026-11-13'], today)).toBe(2)
  })
  it('broken by a gap', () => {
    expect(computeStreak(['2026-11-15', '2026-11-13'], today)).toBe(1)
    expect(computeStreak(['2026-11-12'], today)).toBe(0)
  })
  it('crosses month boundary', () => {
    expect(computeStreak(['2026-12-01', '2026-11-30'], new Date(2026, 11, 1))).toBe(2)
  })
})
