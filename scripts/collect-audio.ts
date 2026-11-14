// Gom mọi văn bản tiếng Đức cần phát âm từ content/**.json -> .audio-manifest.json { key: text }
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { voiceKey } from '../src/core/audio/key'

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.json') ? [p] : []
  })
}

const texts = new Map<string, { text: string; voice: 'm' | 'f' }>()
const add = (t?: string, voice: 'm' | 'f' = 'm') => {
  if (!t || !t.trim()) return
  const text = t.trim()
  texts.set(voiceKey(text, voice), { text, voice })
}
const PRON = ['ich', 'du', 'er', 'wir', 'ihr', 'sie']

function visit(o: unknown, parentIsVocab = false) {
  if (Array.isArray(o)) return o.forEach((x) => visit(x))
  if (!o || typeof o !== 'object') return
  const r = o as Record<string, unknown>
  // vocab: phát "der Hund"
  if (typeof r.de === 'string' && typeof r.pos === 'string')
    add(r.article ? `${r.article} ${r.de}` : (r.de as string)), add(r.de as string)
  else if (typeof r.speaker === 'string' && typeof r.de === 'string') add(r.de as string, (r.voice as 'm' | 'f') ?? 'm')
  else if (r.kind === 'reading' && typeof r.de === 'string') (r.de as string).split(/\n+/).forEach((p) => add(p))
  else if (typeof r.de === 'string') add(r.de) // example, câu mẫu
  if (r.kind === 'conjugation') {
    add(r.verb as string)
    ;(r.forms as string[]).forEach((f, i) => add(`${PRON[i]} ${f}`))
  }
  if (r.kind === 'steps') return void (r.items as unknown[]).forEach((x) => visit(x))
  if (r.kind === 'pronunciation') add((r.audio as string) ?? (r.letter as string))
  if (typeof r.audio === 'string') add(r.audio)
  if (typeof r.noun === 'string') add(r.noun)
  for (const v of Object.values(r)) visit(v, parentIsVocab)
}

for (const f of walk('content')) visit(JSON.parse(readFileSync(f, 'utf8')))
const manifest = Object.fromEntries(texts)
writeFileSync('.audio-manifest.json', JSON.stringify(manifest, null, 0))
console.log(`${Object.keys(manifest).length} câu cần audio`)
