/** Chuẩn hóa đáp án gõ: bỏ hoa/thường, dấu câu cuối, khoảng trắng thừa; chấp nhận ae/oe/ue/ss thay ä/ö/ü/ß. */
export function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFC')
    .replace(/[’‘´`]/g, "'")
    .replace(/[.!?,;]+$/g, '')
    .replace(/\s+/g, ' ')
}
const fold = (s: string) =>
  s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')

export function matchesAny(input: string, answers: string[]): boolean {
  const i = fold(norm(input))
  return answers.some((a) => fold(norm(a)) === i)
}
