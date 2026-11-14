import { z } from 'zod'

export const LevelId = z.enum(['A0', 'A1', 'A2', 'B1'])
export type LevelId = z.infer<typeof LevelId>

export const Gender = z.enum(['der', 'die', 'das'])

export const VocabItem = z.object({
  id: z.string(),
  de: z.string(),
  article: Gender.optional(),
  plural: z.string().optional(),
  pos: z.string(),
  vi: z.string(),
  ipa: z.string().optional(),
  viRespelling: z.string().optional(),
  audio: z.string().optional(),
  /** Tên icon trong @tabler/icons-react, ví dụ 'IconApple'. Không dùng emoji. */
  icon: z.string().optional(),
  example: z.object({ de: z.string(), vi: z.string() }).optional(),
  topic: z.string().optional(),
  tags: z.array(z.string()).default([]),
})
export type VocabItem = z.infer<typeof VocabItem>

const Tags = z.array(z.string()).default([])

const base = { id: z.string(), explanationVi: z.string(), tags: Tags }

export const Exercise = z.discriminatedUnion('type', [
  z.object({
    ...base,
    type: z.literal('multipleChoice'),
    prompt: z.string(),
    options: z.array(z.string()).min(2),
    answer: z.number().int(),
    audio: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal('fillBlank'),
    prompt: z.string(), // dùng ___ cho chỗ trống
    answers: z.array(z.string()).min(1),
    hint: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal('wordOrder'),
    promptVi: z.string(),
    words: z.array(z.string()).min(2),
    answer: z.array(z.string()).min(2),
  }),
  z.object({
    ...base,
    type: z.literal('matchPairs'),
    pairs: z.array(z.object({ left: z.string(), right: z.string() })).min(2),
  }),
  z.object({
    ...base,
    type: z.literal('listenAndChoose'),
    audio: z.string(),
    options: z.array(z.string()).min(2),
    answer: z.number().int(),
  }),
  z.object({
    ...base,
    type: z.literal('dictation'),
    audio: z.string(),
    answers: z.array(z.string()).min(1),
  }),
  z.object({
    ...base,
    type: z.literal('typeAnswer'),
    prompt: z.string(),
    answers: z.array(z.string()).min(1),
  }),
  z.object({
    ...base,
    type: z.literal('articlePick'),
    noun: z.string(),
    answer: Gender,
  }),
  z.object({
    ...base,
    type: z.literal('trueFalse'),
    statement: z.string(),
    context: z.string().optional(),
    answer: z.boolean(),
  }),
  z.object({
    ...base,
    type: z.literal('conjugate'),
    verb: z.string(),
    vi: z.string(),
    rows: z.array(z.object({ pronoun: z.string(), answer: z.string() })).min(2),
  }),
  z.object({
    ...base,
    type: z.literal('categorize'),
    prompt: z.string(),
    categories: z.array(z.string()).min(2),
    items: z.array(z.object({ text: z.string(), category: z.number().int() })).min(2),
  }),
  z.object({
    ...base,
    type: z.literal('translate'),
    vi: z.string(),
    answers: z.array(z.string()).min(1),
  }),
])
export type Exercise = z.infer<typeof Exercise>

export const Block = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('text'), md: z.string() }),
  z.object({
    kind: z.literal('callout'),
    tone: z.enum(['info', 'tip', 'warn']),
    md: z.string(),
  }),
  z.object({
    kind: z.literal('table'),
    head: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }),
  z.object({ kind: z.literal('vocabList'), vocabIds: z.array(z.string()) }),
  z.object({
    kind: z.literal('example'),
    de: z.string(),
    vi: z.string(),
    audio: z.string().optional(),
  }),
  z.object({
    kind: z.literal('dialogue'),
    title: z.string().optional(),
    lines: z.array(
      z.object({ speaker: z.string(), de: z.string(), vi: z.string(), voice: z.enum(['m', 'f']).default('m') }),
    ),
  }),
  z.object({
    kind: z.literal('reading'),
    title: z.string(),
    de: z.string(),
    vi: z.string(),
    glossary: z.array(z.object({ de: z.string(), vi: z.string() })).default([]),
  }),
  z.object({
    kind: z.literal('writingTask'),
    prompt: z.string(),
    hints: z.array(z.string()).default([]),
    model: z.string(),
    modelVi: z.string().optional(),
    checklist: z.array(z.string()).default([]),
  }),
  z.object({
    kind: z.literal('speakingTask'),
    prompt: z.string(),
    model: z.array(z.object({ de: z.string(), vi: z.string() })).min(1),
  }),
  z.object({
    kind: z.literal('conjugation'),
    verb: z.string(),
    vi: z.string(),
    forms: z.array(z.string()).length(6),
    note: z.string().optional(),
  }),
  z.object({
    kind: z.literal('steps'),
    items: z.array(
      z.object({
        title: z.string(),
        md: z.string(),
        quiz: z.object({ q: z.string(), options: z.array(z.string()).min(2), answer: z.number().int(), why: z.string() }).optional(),
      }),
    ).min(1),
  }),
  z.object({
    kind: z.literal('pronunciation'),
    letter: z.string(),
    viRespelling: z.string(),
    note: z.string().optional(),
    audio: z.string().optional(),
    examples: z.array(z.string()).default([]),
  }),
  z.object({ kind: z.literal('illustration'), name: z.string() }),
  z.object({ kind: z.literal('exercises'), exerciseIds: z.array(z.string()) }),
])
export type Block = z.infer<typeof Block>

export const SECTION_KEYS = [
  'introduction',
  'vocabulary',
  'grammar',
  'examples',
  'practice',
  'review',
] as const
export type SectionKey = (typeof SECTION_KEYS)[number]

export const Lesson = z.object({
  id: z.string(),
  title: z.string(),
  objectives: z.array(z.string()).min(1),
  sections: z.object(
    Object.fromEntries(SECTION_KEYS.map((k) => [k, z.array(Block)])) as Record<
      SectionKey,
      z.ZodArray<typeof Block>
    >,
  ),
  exercises: z.array(Exercise).default([]),
  vocab: z.array(VocabItem).default([]),
  /** id ngữ pháp được dạy lần đầu trong bài này */
  teaches: z.array(z.string()).default([]),
})
export type Lesson = z.infer<typeof Lesson>

export const ChapterTest = z.object({
  id: z.string(),
  passScore: z.number().min(0).max(1).default(0.8),
  questionCount: z.number().int().positive(),
  questions: z.array(Exercise).min(1),
})
export type ChapterTest = z.infer<typeof ChapterTest>

export const Chapter = z.object({
  id: z.string(),
  levelId: LevelId,
  order: z.number().int(),
  /** 2 = nội dung chuẩn toàn diện (validator áp ngưỡng số lượng). */
  version: z.number().int().default(1),
  title: z.string(),
  titleVi: z.string(),
  lessons: z.array(Lesson).min(1),
  test: ChapterTest,
})
export type Chapter = z.infer<typeof Chapter>

export const GrammarTopic = z.object({
  id: z.string(),
  title: z.string(),
  level: LevelId,
  explanation: z.array(Block),
  commonMistakes: z.array(z.string()).default([]),
})
export type GrammarTopic = z.infer<typeof GrammarTopic>
