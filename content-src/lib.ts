import type { IllustrationName } from '../src/features/art/illustrationNames'
import type { Block, Chapter, Exercise, Lesson, LevelId, VocabItem } from '../src/core/content/schema'

// ---------- Block helpers ----------
export const T = (md: string): Block => ({ kind: 'text', md })
export const tip = (md: string): Block => ({ kind: 'callout', tone: 'tip', md })
export const info = (md: string): Block => ({ kind: 'callout', tone: 'info', md })
export const warn = (md: string): Block => ({ kind: 'callout', tone: 'warn', md })
export const table = (head: string[], ...rows: string[][]): Block => ({ kind: 'table', head, rows })
export const illus = (name: IllustrationName): Block => ({ kind: 'illustration', name })
export const ex = (de: string, vi: string): Block => ({ kind: 'example', de, vi })
const FEMALE = new Set(['Anna', 'Lea', 'Linh', 'Lisa', 'Maria', 'Eva', 'Sara', 'Julia', 'Mia', 'Emma', 'Laura', 'Sophie', 'Hanna', 'Mai', 'Lan', 'Hoa', 'Oma', 'Mutter', 'Mama', 'Schwester', 'Tante', 'Rezeption', 'Kundin', 'Frau'])
/** Đoán giọng theo tên người nói: tên nữ, 'Frau …', hoặc danh từ nghề đuôi -in (Ärztin, Kellnerin). */
export function voiceOf(speaker: string): 'm' | 'f' {
  const s = speaker.trim()
  const first = s.split(' ')[0]
  if (FEMALE.has(first) || s.startsWith('Frau ')) return 'f'
  if (/in$/.test(first) && first[0] === first[0].toUpperCase() && first.length > 4 && !['Martin', 'Kevin', 'Benjamin', 'Justin'].includes(first)) return 'f'
  return 'm'
}
type Line = [string, string, string] | [string, string, string, 'm' | 'f']
export const dlg = (...lines: Line[]): Block => ({
  kind: 'dialogue',
  lines: lines.map(([speaker, de, vi, voice]) => ({ speaker, de, vi, voice: voice ?? voiceOf(speaker) })),
})
export const dlgT = (title: string, ...lines: Line[]): Block => ({
  ...(dlg(...lines) as Extract<Block, { kind: 'dialogue' }>),
  title,
})
export const reading = (title: string, de: string, vi: string, glossary: [string, string][] = []): Block => ({
  kind: 'reading', title, de, vi, glossary: glossary.map(([d, g]) => ({ de: d, vi: g })),
})
export const writing = (prompt: string, model: string, o: { hints?: string[]; checklist?: string[]; modelVi?: string } = {}): Block => ({
  kind: 'writingTask', prompt, model, hints: o.hints ?? [], checklist: o.checklist ?? [], modelVi: o.modelVi,
})
export const speaking = (prompt: string, ...model: [string, string][]): Block => ({
  kind: 'speakingTask', prompt, model: model.map(([de, vi]) => ({ de, vi })),
})
/** Bảng chia: forms theo thứ tự ich, du, er/sie/es, wir, ihr, sie/Sie, phân cách bằng dấu phẩy. */
export const conj = (verb: string, vi: string, forms: string, note?: string): Block => ({
  kind: 'conjugation', verb, vi, forms: forms.split(/\s*,\s*/), note,
})
export interface Step { title: string; md: string; quiz?: { q: string; options: string[]; answer: number; why: string } }
export const steps = (...items: Step[]): Block => ({ kind: 'steps', items })
export const step = (title: string, md: string, quiz?: [string, string[], number, string]): Step => ({
  title, md, quiz: quiz ? { q: quiz[0], options: quiz[1], answer: quiz[2], why: quiz[3] } : undefined,
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
  i?: string // tên icon @tabler/icons-react, ví dụ 'IconApple'
  ex?: [string, string] // câu ví dụ [de, vi]
  t?: string // chủ đề
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
  icon: o.i ? (o.i.startsWith('Icon') ? o.i : `Icon${o.i}`) : undefined,
  example: o.ex ? { de: o.ex[0], vi: o.ex[1] } : undefined,
  topic: o.t,
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
export const tf = (statement: string, answer: boolean, expl: string, context?: string): Ex => ({
  type: 'trueFalse', statement, answer, context, ...base(expl),
})
/** Bài chia động từ: rows dạng 'ich:bin, du:bist'. */
export const conjEx = (verb: string, vi: string, rows: string, expl?: string): Ex => ({
  type: 'conjugate', verb, vi,
  rows: rows.split(/\s*,\s*/).map((r) => {
    const [pronoun, answer] = r.split(':')
    return { pronoun: pronoun.trim(), answer: answer.trim() }
  }),
  ...base(expl ?? `Chia động từ ${verb}.`),
})
export const sortEx = (prompt: string, categories: string[], items: [string, number][], expl: string): Ex => ({
  type: 'categorize', prompt, categories, items: items.map(([text, category]) => ({ text, category })), ...base(expl),
})
export const tr = (vi: string, answers: string | string[], expl?: string): Ex => {
  const a = [answers].flat()
  return { type: 'translate', vi, answers: a, ...base(expl ?? `Đáp án: ${a[0]}`) }
}
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
  // Từ đồng nghĩa (cùng nghĩa tiếng Việt) không được làm phương án nhiễu, và đều được chấp nhận khi gõ.
  const viKey = (x: VocabItem) => x.vi.trim().toLowerCase()
  const syns = (x: VocabItem) => [x, ...pool.filter((y) => full(y) !== full(x) && viKey(y) === viKey(x))]
  const others = (x: VocabItem) => {
    const s = new Set(syns(x).map(full))
    return fulls.filter((f) => f === full(x) || !s.has(f))
  }
  vocab.slice(0, nMc).forEach((x, i) => {
    const fs = others(x)
    const w = pick(fs, Math.min(3, fs.length - 1), i + 1, full(x))
    const { options, answer } = place(full(x), w, i)
    out.push(mc(`“${x.vi}” trong tiếng Đức là gì?`, options, answer, `${x.vi} = ${full(x)}.`, [`vocab:${x.id}`]))
  })
  vocab.slice(-nListen).forEach((x, i) => {
    const fs = others(x)
    const w = pick(fs, Math.min(3, fs.length - 1), i + 5, full(x))
    const { options, answer } = place(full(x), w, i + 1)
    out.push({ ...listen(full(x), options, answer, `Từ bạn nghe là ${full(x)} (${x.vi}).`), tags: [`vocab:${x.id}`] })
  })
  const nouns = vocab.filter((x) => x.article)
  nouns.slice(0, o.article ?? 3).forEach((x) => out.push({ ...art(x.de, x.article!), tags: [`vocab:${x.id}`] }))
  if (o.match !== false && vocab.length >= 3)
    out.push(
      match(
        'Ghép từ tiếng Đức với nghĩa tiếng Việt.',
        ...vocab
          .filter((x, i, a) => a.findIndex((y) => viKey(y) === viKey(x) || full(y) === full(x)) === i)
          .slice(0, 5)
          .map((x) => [full(x), x.vi] as [string, string]),
      ),
    )
  vocab.slice(1, 1 + (o.type ?? 2)).forEach((x) =>
    out.push({
      ...typ(
        `Gõ từ tiếng Đức có nghĩa “${x.vi}”`,
        // "Großvater / Opa": chấp nhận từng dạng riêng lẻ.
        [...new Set(syns(x).flatMap((y) => [y.de, ...y.de.split(' / ')].flatMap((d) => (y.article ? [`${y.article} ${d}`, d] : [d]))))],
        syns(x).length > 1 ? `${x.vi} = ${syns(x).map(full).join(' hoặc ')}.` : `${x.vi} = ${full(x)}.`,
      ),
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
  reviewBlocks?: Block[]
  teaches?: string[]
}


// ---------- Giải thích đúng/sai: trích câu căn cứ trong bài đọc/hội thoại ----------
type Src = { de: string; vi?: string; who?: string; next?: Src }
const STOP = new Set('der die das den dem des ein eine einen einem einer und oder aber ist sind war hat haben ich du er sie es wir ihr man nicht kein keine mit von zu für auf in im am an bei nach aus auch sehr so wie was wer dass weil wenn noch schon mein meine sein seine ihre'.split(' '))
const words = (t: string) =>
  t.toLowerCase().replace(/[.,!?;:„“”"()–-]/g, ' ').split(/\s+/).filter((w) => (w.length >= 3 || /\d/.test(w)) && !STOP.has(w))
function sources(blocks: Block[]): Src[] {
  const out: Src[] = []
  for (const b of blocks) {
    if (b.kind === 'dialogue') {
      const ls: Src[] = b.lines.map((l) => ({ de: l.de, vi: l.vi, who: l.speaker }))
      ls.forEach((l, k) => out.push({ ...l, next: ls[k + 1] }))
    }
    if (b.kind === 'example') out.push({ de: b.de, vi: b.vi })
    // Không cắt sau số thứ tự (“im 2. Stock”, “am 1. Mai”).
    if (b.kind === 'reading') for (const s of b.de.split(/(?<=[^\d\s][.!?])\s+|\n+/)) if (s.trim()) out.push({ de: s.trim() })
  }
  return out
}
function enrichTrueFalse(e: Ex, src: Src[]): Ex {
  if (e.type !== 'trueFalse' || e.explanationVi.trim().length >= 12 || !src.length) return e
  // Trọng số theo độ hiếm: từ xuất hiện ở nhiều câu (tên nhân vật…) ít giá trị phân biệt.
  const sets = src.map((s) => new Set(words(s.de)))
  const df = (w: string) => sets.filter((x) => x.has(w)).length
  // Ghi chú ngắn gốc (“um elf.”, “Nur bar.”) là từ khóa của đáp án: tính gấp đôi.
  const note = new Set(words(e.explanationVi))
  const q = [...new Set([...words(e.statement), ...note])]
  let best: Src | undefined
  let score = 0
  let hits = 0
  src.forEach((s, k) => {
    const m = q.filter((w) => sets[k].has(w))
    const n = m.reduce((a, w) => a + (note.has(w) ? 2 : 1) / df(w), 0)
    if (n > score) [best, score, hits] = [s, n, m.length + m.filter((w) => note.has(w)).length]
  })
  if (!best || hits < 2) return e
  const b = best as Src
  const fmt = (x: Src) => `${x.who ? `${x.who}: ` : ''}“${x.de}”${x.vi ? ` (${x.vi})` : ''}`
  // Câu hỏi trong hội thoại: căn cứ thật nằm ở câu trả lời ngay sau.
  const lastQ = b.de.trim().split(/(?<=[.!])\s+/).pop() ?? ''
  const asks = lastQ.endsWith('?') && words(lastQ).some((w) => q.includes(w))
  const quote = asks && b.next ? `${fmt(b)} – ${fmt(b.next)}` : fmt(b)
  return { ...e, explanationVi: `${e.answer ? 'Đúng' : 'Sai'}. Trong bài: ${quote}` }
}


// ---------- Giải thích ngắn (chỉ lặp đáp án) → bổ sung quy tắc ----------
const RULES: Record<string, string> = {
  ob: '“ob” (liệu… không) mở câu hỏi gián tiếp dạng có/không; động từ chia đứng cuối câu.',
  als: '“als” có hai cách dùng: sau so sánh hơn (größer als = lớn hơn) và mở mệnh đề cho một sự việc xảy ra một lần trong quá khứ (khi…, động từ đứng cuối).',
  wenn: '“wenn” dùng cho việc lặp lại (mỗi khi) hoặc ở hiện tại/tương lai, hay điều kiện (nếu); động từ đứng cuối.',
  dass: '“dass” (rằng) mở mệnh đề phụ; động từ chia đứng cuối câu.',
  weil: '“weil” (vì) nêu lý do; động từ chia đứng cuối câu.',
  damit: '“damit” (để mà) nêu mục đích khi hai vế có chủ ngữ khác nhau (hoặc nhấn mạnh chủ ngữ); động từ đứng cuối.',
  um: '“um … zu + nguyên mẫu” nêu mục đích khi hai vế cùng chủ ngữ.',
  zu: 'Sau các cụm như Lust haben, versuchen, vergessen, um … dùng “zu + động từ nguyên mẫu” ở cuối câu.',
  obwohl: '“obwohl” (mặc dù) mở mệnh đề phụ; động từ đứng cuối.',
  trotzdem: '“trotzdem” (tuy vậy) là trạng từ đứng vị trí 1, nên động từ đứng ngay sau (vị trí 2).',
  während: '“während” (trong khi) mở mệnh đề phụ chỉ hai việc diễn ra cùng lúc; động từ đứng cuối.',
  bevor: '“bevor” (trước khi) mở mệnh đề phụ; động từ đứng cuối.',
  bis: '“bis” (cho đến khi) mở mệnh đề phụ; động từ đứng cuối.',
  nachdem: '“nachdem” (sau khi): mệnh đề phụ thường ở Plusquamperfekt, mệnh đề chính ở Präteritum/Perfekt.',
  seit: '“seit” + Dativ: việc bắt đầu trong quá khứ và vẫn còn tiếp diễn (từ … đến nay).',
  vor: '“vor” + Dativ chỉ thời gian: cách đây (vor zwei Jahren = cách đây hai năm).',
  des: 'Genitiv giống đực/trung: des + danh từ thêm -s/-es. Các giới từ wegen, trotz, während đi với Genitiv.',
  denen: 'Đại từ quan hệ số nhiều ở Dativ là “denen” (mit + Dativ).',
  wird: 'werden chia với er/sie/es là “wird”: Futur I (wird + nguyên mẫu), Passiv (wird + Partizip II) hoặc nghĩa “trở nên”.',
  wurde: 'Passiv Präteritum: wurde (số ít) / wurden (số nhiều) + Partizip II cuối câu.',
  wurden: 'Passiv Präteritum: wurde (số ít) / wurden (số nhiều) + Partizip II cuối câu.',
  worden: 'Passiv Perfekt: sein + Partizip II + “worden” (không dùng “geworden”).',
  hätte: 'Konjunktiv II của haben: ich/er hätte, du hättest… dùng cho điều không có thật hoặc mong ước.',
  wäre: 'Konjunktiv II của sein: ich/er wäre, du wärst… dùng cho điều không có thật (Wenn ich du wäre…).',
  könnte: 'Konjunktiv II của können: könnte – dùng cho khả năng giả định hoặc lời đề nghị lịch sự.',
  könntest: 'Konjunktiv II của können với du: könntest – lời gợi ý nhẹ nhàng (bạn có thể…).',
  solltest: 'Konjunktiv II của sollen với du: solltest – lời khuyên (bạn nên…).',
  man: '“man” (người ta) là chủ ngữ chung, động từ chia như er/sie/es.',
  sich: 'Động từ phản thân: đại từ phản thân ngôi thứ ba (er/sie/es/sie/Sie) luôn là “sich”.',
  durch: '“durch” + Akkusativ: xuyên qua.',
  auf: '“warten auf” + Akkusativ: chờ đợi ai/cái gì. Giới từ đi kèm động từ cần học thuộc theo cụm.',
  woran: 'Hỏi về vật với động từ có giới từ “an”: wo(r) + an → woran (người: an wen).',
  herrn: '“Herr” thuộc n-Deklination: ngoài Nominativ đều thêm -n (den/dem/des Herrn).',
  ging: 'gehen là động từ mạnh: Präteritum ging (ich/er ging, du gingst).',
  kam: 'kommen là động từ mạnh: Präteritum kam (ich/er kam, du kamst).',
  fuhr: 'fahren là động từ mạnh: Präteritum fuhr (ich/er fuhr).',
  dachte: 'denken là động từ hỗn hợp: đổi gốc và thêm -te → dachte.',
  durfte: 'Động từ khuyết thiếu ở Präteritum bỏ Umlaut và thêm -te: dürfen → durfte.',
  wohnte: 'Động từ yếu ở Präteritum: gốc + -te (ich/er wohnte, wir wohnten).',
  warteten: 'Gốc tận cùng -t/-d thêm -ete để dễ đọc: warten → wartete, wir warteten.',
  arbeitete: 'Gốc tận cùng -t/-d thêm -ete để dễ đọc: arbeiten → arbeitete.',
  gilt: 'gelten đổi nguyên âm e → i ở du/er: du giltst, er gilt.',
  n: 'n-Deklination: danh từ giống đực tận cùng -e (der Kunde, der Junge…) thêm -n ở mọi cách trừ Nominativ.',
  weitergegeben: 'Passiv với động từ khuyết thiếu: Modal + Partizip II + werden. weitergeben là động từ tách → weiter-ge-geben.',
  gewöhnt: 'Perfekt của động từ yếu: ge- + gốc + -t → gewöhnt (sich gewöhnen an + Akk).',
}
const EXPAND: Record<string, string> = {
  'e → i.': 'Động từ mạnh đổi e → i ở du và er/sie/es (essen → er isst, sprechen → er spricht).',
  'a→ä.': 'Động từ mạnh đổi a → ä ở du và er/sie/es (tragen → er trägt, fahren → er fährt).',
  'e→i giữ.': 'Imperativ với du: động từ đổi e → i vẫn giữ i và bỏ đuôi -st (du nimmst → Nimm!).',
  'a→ä bỏ.': 'Imperativ với du: động từ đổi a → ä thì bỏ Umlaut (du schläfst → Schlaf!).',
  'Sie-Form.': 'Imperativ lịch sự: động từ nguyên mẫu đứng đầu + Sie (Trinken Sie …!).',
  'Dat cái.': 'Đại từ quan hệ giống cái ở Dativ là “der” (helfen + Dativ).',
  'Gen cái.': 'Genitiv giống cái: die → der (trotz/wegen + Genitiv: trotz der Hitze).',
  'Nom đực.': 'Đại từ quan hệ giống đực làm chủ ngữ (Nominativ) là “der”.',
  'Số nhiều.': 'Danh từ liên quan ở số nhiều nên dùng dạng số nhiều.',
  'Lệch thì.': 'nachdem + Plusquamperfekt (hatte/war + Partizip II) khi mệnh đề chính ở Präteritum.',
  'Không in.': 'Năm đứng một mình không dùng “in”: “1990 kam er …” hoặc “im Jahr 1990”.',
  'Đảo ngữ.': 'Động từ chia luôn ở vị trí 2: khi một thành phần khác (kể cả mệnh đề phụ) đứng đầu câu, chủ ngữ đứng sau động từ.',
  'Akk đực.': 'Giống đực ở Akkusativ: der → den, ein → einen; đuôi tính từ là -en.',
  'Dativ.': 'Động từ/giới từ này đi với Dativ (mir, dir, ihm, ihr, Ihnen; einem, einer, meiner…).',
  'Dat.': 'Cần Dativ: giới từ chỉ vị trí (Wo?) và các động từ như helfen đi với Dativ (dem, der, einer…; đuôi tính từ sau einer là -en).',
  'Lịch sự.': 'Konjunktiv II (Könnten Sie …? / Würden Sie …?) là cách nhờ vả lịch sự.',
  'Xin phép.': '“Dürfte ich …?” là cách xin phép rất lịch sự (Konjunktiv II của dürfen).',
  'Kết quả.': '“sodass” nêu kết quả (đến nỗi, vì vậy); động từ đứng cuối mệnh đề.',
  'Đuôi -s.': 'Genitiv giống đực/trung: meines Vaters – danh từ thêm -s.',
  'Bị động.': 'Partizip II làm tính từ mang nghĩa bị động: das reparierte Auto = das Auto, das repariert wurde.',
  'zu-Inf.': 'Sau “Es ist üblich, …” dùng zu + nguyên mẫu; động từ tách chèn zu vào giữa: mitzubringen.',
  'KM + NK.': 'Warmmiete = Kaltmiete (tiền thuê) + Nebenkosten (phí phụ: nước, sưởi, rác…).',
  'MfG.': '“Mit freundlichen Grüßen” là lời kết chuẩn của thư trang trọng.',
  'Ghép từ.': 'Danh từ ghép viết liền: Zahn + Schmerzen → Zahnschmerzen.',
  'Umlaut.': 'Tính từ ngắn một âm tiết thường thêm Umlaut ở Komparativ: alt → älter, groß → größer.',
  'so … wie.': 'So sánh bằng: so + tính từ + wie (so groß wie ich).',
  'am …sten.': 'Superlativ dùng như trạng từ: am + tính từ + -sten (am schnellsten).',
  'Perfekt.': 'Perfekt: haben/sein chia ở vị trí 2 + Partizip II cuối câu.',
  'Đề xuất.': '“Wie wäre es mit …?” là cách đề xuất lịch sự.',
  'Cuối câu.': 'Trong câu có động từ khuyết thiếu, động từ nguyên mẫu đứng cuối câu.',
  'K II.': 'Konjunktiv II (hätte, wäre, würde + nguyên mẫu) dùng cho điều không có thật hoặc lời nói lịch sự.',
  'Gợi ý.': 'Lời gợi ý nhẹ nhàng dùng Konjunktiv II: du könntest … (bạn có thể …).',
  'Ước.': '“Ich wünschte, …” + Konjunktiv II diễn tả điều ước không có thật: ich hätte, ich wäre.',
  'Gen.': 'wegen/trotz/während + Genitiv: giống đực/trung dùng des, danh từ thêm -s/-es.',
  'P II.': 'Động từ (Partizip II) đứng cuối câu, sau đó là trợ động từ nếu có.',
  'Lý do.': '“weil” (vì) nêu lý do; động từ chia đứng cuối mệnh đề.',
  'Số ít.': 'Passiv Präsens: chủ ngữ số ít → wird + Partizip II cuối câu.',
  'Akk.': 'Đại từ quan hệ giống đực ở Akkusativ là “den” (tân ngữ của động từ trong mệnh đề quan hệ).',
}
const short = (x: string) => x.trim().length < 10
function enrichShort(e: Ex): Ex {
  if (!short(e.explanationVi) || e.type === 'trueFalse' || e.type === 'matchPairs') return e
  const full = EXPAND[e.explanationVi.trim()]
  if (full) return { ...e, explanationVi: full }
  const ans = 'answers' in e ? e.answers[0] : 'options' in e && 'answer' in e && typeof e.answer === 'number' ? e.options[e.answer] : undefined
  if (!ans) return e
  const key = ans.toLowerCase().replace(/[.!?]/g, '').trim().split(' ')[0]
  const rule = RULES[key]
  return rule ? { ...e, explanationVi: rule } : e
}

export function lesson(i: LessonInput): Lesson {
  const vocab = i.vocab ?? []
  const src = sources(i.examples ?? [])
  const all: Ex[] = [...(i.auto === false ? [] : autoExercises(vocab, i.pool ?? [], i.auto ?? {})), ...(i.ex ?? []).map((e) => enrichShort(enrichTrueFalse(e, src)))]
  const auto = [...(i.teaches ?? []).map((g) => `grammar:${g}`), `lesson:${i.id}`]
  const exercises = all.map((e, n) => ({ ...e, id: `${i.id}-e${n + 1}`, tags: [...new Set([...(e.tags ?? []), ...auto])] }) as Exercise)
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
      review: [T(i.review), ...(i.reviewBlocks ?? [])],
    },
  }
}

export function chapter(o: {
  version?: number
  level: LevelId
  order: number
  title: string
  titleVi: string
  lessons: Lesson[]
  testExtra?: Ex[]
}): Chapter {
  const id = `${o.level.toLowerCase()}-c${String(o.order).padStart(2, '0')}`
  const pool = o.lessons.flatMap((l) => l.exercises).filter((e) => e.type !== 'matchPairs')
  const extra = (o.testExtra ?? []).map((e, n) => ({ ...enrichShort(e), id: `${id}-tx${n + 1}` }) as Exercise)
  const questions = [...pool, ...extra].map((q) => ({ ...q, id: `${id}-t-${q.id}` }) as Exercise)
  return {
    id,
    levelId: o.level,
    order: o.order,
    version: o.version ?? 1,
    title: o.title,
    titleVi: o.titleVi,
    lessons: o.lessons,
    test: { id: `${id}-test`, passScore: 0.8, questionCount: Math.min((o.version ?? 1) >= 2 ? 20 : 10, questions.length), questions },
  }
}
