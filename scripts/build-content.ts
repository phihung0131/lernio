// Biên dịch content-src/**/*.ts -> content/<LEVEL>/chapters/NN.json (kiểm tra bằng Zod)
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { Chapter } from '../src/core/content/schema'

for (const level of ['A0', 'A1', 'A2', 'B1']) {
  const src = join('content-src', level)
  const out = join('content', level, 'chapters')
  rmSync(out, { recursive: true, force: true })
  mkdirSync(out, { recursive: true })
  const files = readdirSync(src).filter((f) => /^c\d+\.ts$/.test(f)).sort()
  for (const f of files) {
    const mod = await import(pathToFileURL(resolve(src, f)).href)
    const ch = Chapter.parse(mod.default)
    writeFileSync(join(out, `${String(ch.order).padStart(2, '0')}.json`), JSON.stringify(ch))
  }
  console.log(`${level}: ${files.length} chapter`)
}
