// Gom tên icon dùng trong content/**.json -> src/generated/vocabIcons.ts (chỉ import icon thực sự dùng).
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import * as Tabler from '@tabler/icons-react'

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.json') ? [p] : []
  })
}
const names = new Set<string>()
const visit = (o: unknown) => {
  if (Array.isArray(o)) return o.forEach(visit)
  if (!o || typeof o !== 'object') return
  const r = o as Record<string, unknown>
  if (typeof r.icon === 'string') names.add(r.icon)
  Object.values(r).forEach(visit)
}
// Từ vựng trùng (cùng mạo từ + từ, nghĩa tiếng Việt có từ chung) giữa các bài: map id lặp -> id xuất hiện
// đầu tiên, để mỗi từ chỉ có một thẻ ôn tập và một dòng trong trang Từ vựng. Từ đồng âm khác nghĩa
// (Sie = ông/bà vs họ; vor = kém vs phía trước) không có từ chung nên được giữ riêng.
// Hư từ và đại từ không đủ để coi hai nghĩa là một (ihr: “của cô ấy” ≠ “cho cô ấy”).
const STOP = new Set(['của', 'cho', 'là', 'một', 'với', 'các', 'những', 'cái', 'đi', 'cô', 'ấy', 'anh', 'họ', 'nó', 'và'])
const tokens = (vi: string) => new Set(vi.toLowerCase().split(/[^\p{L}]+/u).filter((t) => t && !STOP.has(t)))
const canonByKey = new Map<string, { id: string; tk: Set<string> }[]>()
const canon: Record<string, string> = {}
const files = walk('content').filter((f) => f.includes('/chapters/')).sort()
for (const f of walk('content')) visit(JSON.parse(readFileSync(f, 'utf8')))
for (const f of files) {
  const ch = JSON.parse(readFileSync(f, 'utf8')) as { lessons: { vocab: { id: string; de: string; vi: string; article?: string }[] }[] }
  for (const l of ch.lessons)
    for (const v of l.vocab) {
      const key = `${v.article ?? ''}|${v.de.trim().toLowerCase()}`
      const tk = tokens(v.vi)
      const list = canonByKey.get(key) ?? []
      const hit = list.find((e) => e.id === v.id || [...tk].some((t) => e.tk.has(t)))
      if (!hit) canonByKey.set(key, [...list, { id: v.id, tk }])
      else if (hit.id !== v.id) canon[v.id] = hit.id
    }
}
writeFileSync(
  'src/generated/vocabCanon.ts',
  `// Tự sinh bởi scripts/gen-icons.ts. Không sửa tay.\n// id từ vựng lặp lại -> id gốc (lần xuất hiện đầu tiên theo lộ trình).\nexport const VOCAB_CANON: Record<string, string> = ${JSON.stringify(canon, null, 0)}\n\nexport const canonVocabId = (id: string) => VOCAB_CANON[id] ?? id\n`,
)

const missing = [...names].filter((n) => !(n in Tabler))
if (missing.length) {
  console.error('✗ icon không tồn tại trong @tabler/icons-react:', missing.join(', '))
  process.exit(1)
}
const list = [...names].sort()
writeFileSync(
  'src/generated/vocabIcons.ts',
  `// Tự sinh bởi scripts/gen-icons.ts. Không sửa tay.\nimport type { Icon } from '@tabler/icons-react'\n` +
    (list.length ? `import { ${list.join(', ')} } from '@tabler/icons-react'\n` : '') +
    `\nexport const VOCAB_ICONS: Record<string, Icon> = { ${list.join(', ')} }\n`,
)
console.log(`✓ ${list.length} icon từ vựng, ${Object.keys(canon).length} từ lặp được gộp`)
