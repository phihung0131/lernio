import type { Chapter, LevelId } from './schema'

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
  // JSON đã được Zod kiểm tra và điền mặc định lúc build (scripts/build-content.ts):
  // chỉ parse lại ở dev để bắt lỗi sớm, bản build bỏ qua cho nhanh trên điện thoại.
  const chapters = await Promise.all(
    entries.map(async ([, f]) => (import.meta.env.DEV ? (await import('./schema')).Chapter.parse(await f()) : ((await f()) as Chapter))),
  )
  chapters.sort((a, b) => a.order - b.order)
  cache.set(level, chapters)
  return chapters
}

export async function loadAllChapters(): Promise<Chapter[]> {
  return (await Promise.all(LEVELS.map((l) => loadLevel(l.id)))).flat()
}

