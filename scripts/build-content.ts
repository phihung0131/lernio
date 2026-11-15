// Biên dịch content-src/**/*.ts -> content/<LEVEL>/chapters/NN.json (kiểm tra bằng Zod)
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { Chapter } from '../src/core/content/schema'

const outline: unknown[] = []
for (const level of ['A0', 'A1', 'A2', 'B1']) {
  const src = join('content-src', level)
  const out = join('content', level, 'chapters')
  mkdirSync(out, { recursive: true })
  const written = new Set<string>()
  const files = readdirSync(src).filter((f) => /^c\d+\.ts$/.test(f)).sort()
  for (const f of files) {
    const mod = await import(pathToFileURL(resolve(src, f)).href)
    const ch = Chapter.parse(mod.default)
    const file = join(out, `${String(ch.order).padStart(2, '0')}.json`)
    const json = JSON.stringify(ch)
    // Chỉ ghi khi đổi, không xóa thư mục: giữ watcher của dev server hoạt động.
    if (!existsSync(file) || readFileSync(file, 'utf8') !== json) writeFileSync(file, json)
    written.add(file)
    outline.push({ id: ch.id, levelId: ch.levelId, order: ch.order, title: ch.title, titleVi: ch.titleVi, lessons: ch.lessons.map((l) => ({ id: l.id, title: l.title, objectives: l.objectives })) })
  }
  for (const f of readdirSync(out)) if (!written.has(join(out, f))) unlinkSync(join(out, f))
  console.log(`${level}: ${files.length} chapter`)
}

// Mục lục nhẹ cho Trang chủ / Lộ trình: không phải tải toàn bộ nội dung 43 chapter khi mở app.
const sorted = (outline as { levelId: string; order: number }[]).sort((a, b) => a.levelId.localeCompare(b.levelId) || a.order - b.order)
const ts = `// Sinh tự động bởi scripts/build-content.ts – không sửa tay.\nimport type { ChapterOutline } from '../core/content/outline'\n\nexport const OUTLINE: ChapterOutline[] = ${JSON.stringify(sorted)}\n`
const outFile = join('src', 'generated', 'outline.ts')
if (!existsSync(outFile) || readFileSync(outFile, 'utf8') !== ts) writeFileSync(outFile, ts)
