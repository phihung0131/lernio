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

const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{FE0F}]/u
for (const file of walk('content')) {
  const rawText = readFileSync(file, 'utf8')
  const em = rawText.match(EMOJI)
  if (em) fail(`${file}: chứa emoji "${em[0]}" (không dùng emoji, dùng icon/SVG)`)
  const parsed = Chapter.safeParse(JSON.parse(readFileSync(file, 'utf8')))
  if (!parsed.success) {
    fail(`${file}: ${parsed.error.message}`)
    continue
  }
  const ch = parsed.data
  if (ch.version >= 2) {
    const a0 = ch.levelId === 'A0'
    const isTest = /Gesamttest/.test(ch.title)
    if (ch.lessons.length < 4) fail(`${ch.id}: cần ít nhất 4 bài (có ${ch.lessons.length})`)
    for (const l of ch.lessons) {
      const blocks = Object.values(l.sections).flat()
      const minVocab = isTest ? 0 : a0 ? 8 : 12
      const minEx = a0 ? 10 : 15
      if (l.vocab.length < minVocab) fail(`${l.id}: cần ≥${minVocab} từ vựng (có ${l.vocab.length})`)
      if (l.exercises.length < minEx) fail(`${l.id}: cần ≥${minEx} bài tập (có ${l.exercises.length})`)
      if (!(a0 && ch.order <= 4) && !blocks.some((b) => b.kind === 'reading' || b.kind === 'dialogue'))
        fail(`${l.id}: cần ít nhất 1 bài đọc hoặc hội thoại`)
      if (!blocks.some((b) => b.kind === 'writingTask' || b.kind === 'speakingTask')) fail(`${l.id}: cần nhiệm vụ viết hoặc nói`)
      if (!isTest && l.vocab.some((v) => !v.example)) fail(`${l.id}: mọi từ vựng cần câu ví dụ`)
    }
    if (ch.test.questions.length < 25) fail(`${ch.id}: ngân hàng câu kiểm tra cần ≥25 (có ${ch.test.questions.length})`)
  }
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
  const allEx = [...ch.lessons.flatMap((l) => l.exercises), ...ch.test.questions]
  for (const e of allEx) {
    if ((e.type === 'multipleChoice' || e.type === 'listenAndChoose') && (e.answer < 0 || e.answer >= e.options.length))
      fail(`${e.id}: answer ngoài phạm vi`)
    if ((e.type === 'multipleChoice' || e.type === 'listenAndChoose') && new Set(e.options).size !== e.options.length)
      fail(`${e.id}: options trùng nhau`)
    if (e.type === 'categorize' && e.items.some((it) => it.category < 0 || it.category >= e.categories.length))
      fail(`${e.id}: category ngoài phạm vi`)
    if (e.type === 'wordOrder' && [...e.words].sort().join('|') !== [...e.answer].sort().join('|'))
      fail(`${e.id}: words và answer không khớp`)
  }
  if (ch.test.questions.length < ch.test.questionCount)
    fail(`${ch.id}: test có ${ch.test.questions.length} câu < questionCount ${ch.test.questionCount}`)
}

if (errors) process.exit(1)
console.log(`✓ nội dung hợp lệ (${ids.size} id)`)
