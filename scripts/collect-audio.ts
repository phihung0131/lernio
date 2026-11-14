// Gom mọi văn bản tiếng Đức cần phát âm từ content/**.json -> .audio-manifest.json { key: text }
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { audioKey } from '../src/core/audio/key'

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.json') ? [p] : []
  })
}

const texts = new Set<string>()
const add = (t?: string) => t && texts.add(t.trim())

function visit(o: unknown, parentIsVocab = false) {
  if (Array.isArray(o)) return o.forEach((x) => visit(x))
  if (!o || typeof o !== 'object') return
  const r = o as Record<string, unknown>
  // vocab: phát "der Hund"
  if (typeof r.de === 'string' && typeof r.pos === 'string')
    add(r.article ? `${r.article} ${r.de}` : (r.de as string)), add(r.de as string)
  else if (typeof r.de === 'string') add(r.de) // example / dialogue line
  if (r.kind === 'pronunciation') add((r.audio as string) ?? (r.letter as string))
  if (typeof r.audio === 'string') add(r.audio)
  if (typeof r.noun === 'string') add(r.noun)
  for (const v of Object.values(r)) visit(v, parentIsVocab)
}

for (const f of walk('content')) visit(JSON.parse(readFileSync(f, 'utf8')))
const manifest = Object.fromEntries([...texts].map((t) => [audioKey(t), t]))
writeFileSync('.audio-manifest.json', JSON.stringify(manifest, null, 0))
console.log(`${Object.keys(manifest).length} câu cần audio`)
