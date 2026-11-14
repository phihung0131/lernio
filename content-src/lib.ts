import type { Block, Chapter, Exercise, Lesson, LevelId, VocabItem } from '../src/core/content/schema'

// ---------- Block helpers ----------
export const T = (md: string): Block => ({ kind: 'text', md })
export const tip = (md: string): Block => ({ kind: 'callout', tone: 'tip', md })
export const info = (md: string): Block => ({ kind: 'callout', tone: 'info', md })
export const warn = (md: string): Block => ({ kind: 'callout', tone: 'warn', md })
export const table = (head: string[], ...rows: string[][]): Block => ({ kind: 'table', head, rows })
export const illus = (name: 'mouth-vowels' | 'genders' | 'alphabet'): Block => ({ kind: 'illustration', name })
export const ex = (de: string, vi: string): Block => ({ kind: 'example', de, vi })
export const dlg = (...lines: [string, string, string][]): Block => ({
  kind: 'dialogue',
  lines: lines.map(([speaker, de, vi]) => ({ speaker, de, vi })),
})
export const pron = (letter: string, viRespelling: string, note?: string, examples: string[] = [], audio?: string): Block => ({
  kind: 'pronunciation',
  letter,
  viRespelling,
  note,
  examples,
  audio,
})

// ---------- Vocab ----------
export interface VOpts {
  art?: 'der' | 'die' | 'das'
  pl?: string
  pos?: string
  e?: string // emoji
  r?: string // phiên âm tiếng Việt
  ipa?: string
}
export const v = (id: string, de: string, vi: string, o: VOpts = {}): VocabItem => ({
  id,
  de,
  vi,
  article: o.art,
  plural: o.pl,
  pos: o.pos ?? (o.art ? 'danh từ' : 'từ'),
  emoji: o.e,
  viRespelling: o.r,
  ipa: o.ipa,
  tags: [],
})
const full = (x: VocabItem) => (x.article ? `${x.article} ${x.de}` : x.de)

// ---------- Exercise helpers (id gán sau trong lesson()) ----------
type NoId<T> = T extends unknown ? Omit<T, 'id'> : never
type Ex = NoId<Exercise>
const base = (expl: string, tags: string[] = []) => ({ explanationVi: expl, tags })
export const mc = (prompt: string, options: string[], answer: number, expl: string, tags?: string[]): Ex => ({
  type: 'multipleChoice', prompt, options, answer, ...base(expl, tags),
})
export const fill = (prompt: string, answers: string | string[], expl: string, hint?: string, tags?: string[]): Ex => ({
  type: 'fillBlank', prompt, answers: [answers].flat(), hint, ...base(expl, tags),
})
export const order = (promptVi: string, sentence: string, expl?: string, tags?: string[]): Ex => {
  const words = sentence.split(' ')
  return { type: 'wordOrder', promptVi, words, answer: words, ...base(expl ?? `Câu đúng: ${sentence}`, tags) }
}
export const typ = (prompt: string, answers: string | string[], expl: string, tags?: string[]): Ex => ({
  type: 'typeAnswer', prompt, answers: [answers].flat(), ...base(expl, tags),
})
export const art = (noun: string, answer: 'der' | 'die' | 'das', expl?: string): Ex => ({
  type: 'articlePick', noun, answer, ...base(expl ?? `${answer} ${noun}. Học danh từ luôn kèm mạo từ.`),
})
export const dict = (text: string, expl?: string): Ex => ({
  type: 'dictation', audio: text, answers: [text], ...base(expl ?? `Câu đúng: ${text}`),
})
export const listen = (text: string, options: string[], answer: number, expl?: string): Ex => ({
  type: 'listenAndChoose', audio: text, options, answer, ...base(expl ?? `Bạn nghe: ${text}`),
})
export const match = (expl: string, ...pairs: [string, string][]): Ex => ({
  type: 'matchPairs', pairs: pairs.map(([left, right]) => ({ left, right })), ...base(expl),
})

// ---------- Auto exercises từ từ vựng ----------
function pick<T>(arr: T[], n: number, seed: number, skip: T): T[] {
  const pool = arr.filter((x) => x !== skip)
  const out: T[] = []
  for (let i = 0; out.length < n && i < pool.length * 2; i++) {
    const c = pool[(seed * 7 + i * 3 + i * i) % pool.length]
    if (!out.includes(c)) out.push(c)
  }
  return out
}
function place(correct: string, wrong: string[], seed: number): { options: string[]; answer: number } {
  const pos = seed % (wrong.length + 1)
  const options = [...wrong]
  options.splice(pos, 0, correct)
  return { options, answer: pos }
}

export interface AutoOpts {
  mc?: number
  listen?: number
  article?: number
  match?: boolean
  type?: number
}
function autoExercises(vocab: VocabItem[], extraPool: VocabItem[], o: AutoOpts): Ex[] {
  const out: Ex[] = []
  const pool = [...vocab, ...extraPool].filter((x, i, a) => a.findIndex((y) => full(y) === full(x)) === i)
  if (vocab.length < 2) return out
  const fulls = pool.map(full)
  const nMc = Math.min(o.mc ?? 3, vocab.length)
  const nListen = Math.min(o.listen ?? 2, vocab.length)
  vocab.slice(0, nMc).forEach((x, i) => {
    const w = pick(fulls, Math.min(3, fulls.length - 1), i + 1, full(x))
    const { options, answer } = place(full(x), w, i)
    out.push(mc(`“${x.vi}” trong tiếng Đức là gì?`, options, answer, `${x.vi} = ${full(x)}.`, [`vocab:${x.id}`]))
  })
  vocab.slice(-nListen).forEach((x, i) => {
    const w = pick(fulls, Math.min(3, fulls.length - 1), i + 5, full(x))
    const { options, answer } = place(full(x), w, i + 1)
    out.push({ ...listen(full(x), options, answer, `Từ bạn nghe là ${full(x)} (${x.vi}).`), tags: [`vocab:${x.id}`] })
  })
  const nouns = vocab.filter((x) => x.article)
  nouns.slice(0, o.article ?? 3).forEach((x) => out.push({ ...art(x.de, x.article!), tags: [`vocab:${x.id}`] }))
  if (o.match !== false && vocab.length >= 3)
    out.push(match('Ghép từ tiếng Đức với nghĩa tiếng Việt.', ...vocab.slice(0, 5).map((x) => [full(x), x.vi] as [string, string])))
  vocab.slice(1, 1 + (o.type ?? 2)).forEach((x) =>
    out.push({
      ...typ(`Gõ từ tiếng Đức có nghĩa “${x.vi}”`, x.article ? [full(x), x.de] : [x.de], `${x.vi} = ${full(x)}.`),
      tags: [`vocab:${x.id}`],
    }),
  )
  return out
}

// ---------- Lesson / Chapter ----------
export interface LessonInput {
  id: string
  title: string
  goals: string[]
  intro: string
  vocab?: VocabItem[]
  vocabNote?: Block[]
  grammar?: Block[]
  examples?: Block[]
  ex?: Ex[]
  auto?: AutoOpts | false
  pool?: VocabItem[]
  review: string
  teaches?: string[]
}

export function lesson(i: LessonInput): Lesson {
  const vocab = i.vocab ?? []
  const all: Ex[] = [...(i.auto === false ? [] : autoExercises(vocab, i.pool ?? [], i.auto ?? {})), ...(i.ex ?? [])]
  const exercises = all.map((e, n) => ({ ...e, id: `${i.id}-e${n + 1}` }) as Exercise)
  return {
    id: i.id,
    title: i.title,
    objectives: i.goals,
    teaches: i.teaches ?? [],
    vocab,
    exercises,
    sections: {
      introduction: [T(i.intro)],
      vocabulary: vocab.length
        ? [{ kind: 'vocabList', vocabIds: vocab.map((x) => x.id) }, ...(i.vocabNote ?? [])]
        : [T('Bài này không giới thiệu từ vựng mới. Hãy tập trung vào phần ngữ pháp và ví dụ.')],
      grammar: i.grammar ?? [T('Bài này tập trung vào từ vựng và cách dùng, không có quy tắc ngữ pháp mới.')],
      examples: i.examples ?? [],
      practice: [{ kind: 'exercises', exerciseIds: exercises.map((e) => e.id) }],
      review: [T(i.review)],
    },
  }
}

export function chapter(o: {
  level: LevelId
  order: number
  title: string
  titleVi: string
  lessons: Lesson[]
  testExtra?: Ex[]
}): Chapter {
  const id = `${o.level.toLowerCase()}-c${String(o.order).padStart(2, '0')}`
  const pool = o.lessons.flatMap((l) => l.exercises).filter((e) => e.type !== 'matchPairs')
  const extra = (o.testExtra ?? []).map((e, n) => ({ ...e, id: `${id}-tx${n + 1}` }) as Exercise)
  const questions = [...pool, ...extra].map((q) => ({ ...q, id: `${id}-t-${q.id}` }) as Exercise)
  return {
    id,
    levelId: o.level,
    order: o.order,
    title: o.title,
    titleVi: o.titleVi,
    lessons: o.lessons,
    test: { id: `${id}-test`, passScore: 0.8, questionCount: Math.min(10, questions.length), questions },
  }
}
