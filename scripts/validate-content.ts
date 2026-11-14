import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { Chapter } from '../src/core/content/schema'

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.json') ? [p] : []
  })
}

let errors = 0
const fail = (m: string) => {
  console.error('✗ ' + m)
  errors++
}
const ids = new Set<string>()
const vocabSeen = new Map<string, string>()
const dup = (id: string, where: string) => {
  if (ids.has(id)) fail(`id trùng "${id}" (${where})`)
  ids.add(id)
}

for (const file of walk('content')) {
  const parsed = Chapter.safeParse(JSON.parse(readFileSync(file, 'utf8')))
  if (!parsed.success) {
    fail(`${file}: ${parsed.error.message}`)
    continue
  }
  const ch = parsed.data
  dup(ch.id, file)
  for (const l of ch.lessons) {
    dup(l.id, file)
    const exIds = new Set(l.exercises.map((e) => e.id))
    const vIds = new Set(l.vocab.map((v) => v.id))
    for (const e of l.exercises) dup(e.id, file)
    for (const v of l.vocab) {
      const sig = `${v.article ?? ''}|${v.de}|${v.vi}`
      const prev = vocabSeen.get(v.id)
      if (prev && prev !== sig) fail(`vocab id "${v.id}" trùng nhưng khác nội dung (${file})`)
      vocabSeen.set(v.id, sig)
    }
    for (const blocks of Object.values(l.sections))
      for (const b of blocks) {
        if (b.kind === 'exercises')
          for (const id of b.exerciseIds) if (!exIds.has(id)) fail(`${l.id}: exercise "${id}" không tồn tại`)
        if (b.kind === 'vocabList')
          for (const id of b.vocabIds) if (!vIds.has(id)) fail(`${l.id}: vocab "${id}" không tồn tại`)
      }
  }
  if (ch.test.questions.length < ch.test.questionCount)
    fail(`${ch.id}: test có ${ch.test.questions.length} câu < questionCount ${ch.test.questionCount}`)
}

if (errors) process.exit(1)
console.log(`✓ nội dung hợp lệ (${ids.size} id)`)
