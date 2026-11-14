/** Tên các hình minh họa SVG có thể dùng trong nội dung (block 'illustration'). */
export const ILLUSTRATION_NAMES = [
  'alphabet',
  'mouth-vowels',
  'genders',
  'clock-times',
  'verb-position',
  'family-tree',
  'apartment',
  'body',
  'cases',
  'timeline',
  'directions',
  'weather',
  'nebensatz',
] as const
export type IllustrationName = (typeof ILLUSTRATION_NAMES)[number]
