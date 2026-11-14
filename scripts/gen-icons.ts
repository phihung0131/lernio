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
for (const f of walk('content')) visit(JSON.parse(readFileSync(f, 'utf8')))

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
console.log(`✓ ${list.length} icon từ vựng`)
