import { Chapter, type LevelId } from './schema'

const files = import.meta.glob('/content/*/chapters/*.json', { import: 'default' })

export const LEVELS: { id: LevelId; title: string; blurb: string }[] = [
  { id: 'A0', title: 'A0 – Làm quen', blurb: 'Bảng chữ cái, phát âm, những câu đầu tiên' },
  { id: 'A1', title: 'A1 – Cơ bản', blurb: 'Giới thiệu bản thân, gia đình, mua sắm, sinh hoạt' },
  { id: 'A2', title: 'A2 – Sơ cấp', blurb: 'Kể chuyện quá khứ, du lịch, sức khỏe, công việc' },
  { id: 'B1', title: 'B1 – Trung cấp', blurb: 'Diễn đạt quan điểm, thảo luận, viết email' },
]

const cache = new Map<LevelId, Chapter[]>()

export async function loadLevel(level: LevelId): Promise<Chapter[]> {
  const hit = cache.get(level)
  if (hit) return hit
  const entries = Object.entries(files).filter(([p]) => p.startsWith(`/content/${level}/`))
  const chapters = await Promise.all(entries.map(async ([, f]) => Chapter.parse(await f())))
  chapters.sort((a, b) => a.order - b.order)
  cache.set(level, chapters)
  return chapters
}

export async function loadAllChapters(): Promise<Chapter[]> {
  const out: Chapter[] = []
  for (const l of LEVELS) out.push(...(await loadLevel(l.id)))
  return out
}

