import type { Chapter, Exercise, LevelId } from './schema'

export type Skill = 'vocab' | 'grammar' | 'listening' | 'reading'

export function skillOf(e: Exercise): Skill {
  if (e.type === 'listenAndChoose' || e.type === 'dictation') return 'listening'
  if (e.type === 'trueFalse') return 'reading'
  if (e.type === 'articlePick' || e.type === 'matchPairs' || (e.tags.some((t) => t.startsWith('vocab:')) && !e.tags.some((t) => t.startsWith('grammar:')))) return 'vocab'
  return 'grammar'
}

export interface PoolItem {
  ex: Exercise
  chapter: Chapter
  lessonId: string
}

export function exercisePool(chapters: Chapter[], f: { levels?: LevelId[]; chapterIds?: string[]; skills?: Skill[]; tags?: string[] } = {}): PoolItem[] {
  const out: PoolItem[] = []
  for (const ch of chapters) {
    if (f.levels && !f.levels.includes(ch.levelId)) continue
    if (f.chapterIds && !f.chapterIds.includes(ch.id)) continue
    for (const l of ch.lessons)
      for (const ex of l.exercises) {
        if (f.skills && !f.skills.includes(skillOf(ex))) continue
        if (f.tags && !ex.tags.some((t) => f.tags!.includes(t))) continue
        out.push({ ex, chapter: ch, lessonId: l.id })
      }
  }
  return out
}

export function sample<T>(arr: T[], n: number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

/** Đề thi thử theo cấp độ: các phần Hören, Lesen, Sprachbausteine (ngữ pháp + từ vựng). */
export function buildMock(chapters: Chapter[], level: LevelId) {
  const upto = ['A0', 'A1', 'A2', 'B1'].slice(0, ['A0', 'A1', 'A2', 'B1'].indexOf(level) + 1) as LevelId[]
  const own = exercisePool(chapters, { levels: [level] })
  const all = exercisePool(chapters, { levels: upto })
  const pick = (skills: Skill[], n: number) => {
    const fromOwn = own.filter((p) => skills.includes(skillOf(p.ex)))
    const rest = all.filter((p) => skills.includes(skillOf(p.ex)) && !fromOwn.includes(p))
    return [...sample(fromOwn, n), ...sample(rest, Math.max(0, n - fromOwn.length))].slice(0, n).map((p) => p.ex)
  }
  return [
    { id: 'hoeren', title: 'Hören (Nghe)', exercises: pick(['listening'], 8) },
    { id: 'lesen', title: 'Lesen (Đọc hiểu)', exercises: pick(['reading', 'vocab'], 8) },
    { id: 'sprache', title: 'Sprachbausteine (Ngữ pháp)', exercises: pick(['grammar'], 12) },
  ].filter((s) => s.exercises.length > 0)
}
