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
  emoji: z.string().optional(),
  svg: z.string().optional(),
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
    lines: z.array(
      z.object({ speaker: z.string(), de: z.string(), vi: z.string(), audio: z.string().optional() }),
    ),
  }),
  z.object({
    kind: z.literal('pronunciation'),
    letter: z.string(),
    viRespelling: z.string(),
    note: z.string().optional(),
    audio: z.string().optional(),
    examples: z.array(z.string()).default([]),
  }),
  z.object({ kind: z.literal('illustration'), name: z.enum(['mouth-vowels', 'genders', 'alphabet']) }),
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
