import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { OUTLINE } from '../src/generated/outline'

describe('mục lục sinh tự động', () => {
  it('khớp đúng thứ tự và id bài với nội dung đầy đủ', () => {
    const full = ['A0', 'A1', 'A2', 'B1'].flatMap((lv) =>
      readdirSync(`content/${lv}/chapters`)
        .sort()
        .map((f) => JSON.parse(readFileSync(`content/${lv}/chapters/${f}`, 'utf8'))),
    )
    expect(OUTLINE.map((c) => c.id)).toEqual(full.map((c) => c.id))
    for (const [i, c] of full.entries()) expect(OUTLINE[i].lessons.map((l) => l.id)).toEqual(c.lessons.map((l: { id: string }) => l.id))
  })
})
