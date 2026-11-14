/** Khóa file audio ổn định từ văn bản tiếng Đức. Dùng chung cho app và script sinh audio. */
export function audioKey(text: string): string {
  const s = text.trim().toLowerCase().normalize('NFC')
  let h1 = 0x811c9dc5
  let h2 = 0x01000193
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i)
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0
    h2 = Math.imul(h2 + c, 0x85ebca6b) >>> 0
  }
  return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0')
}
/** Giọng nam 'm' giữ khóa cũ; giọng nữ 'f' dùng khóa có tiền tố. */
export const voiceKey = (text: string, voice: 'm' | 'f' = 'm') => (voice === 'f' ? audioKey(`f:${text}`) : audioKey(text))
export const audioUrl = (text: string, voice: 'm' | 'f' = 'm') => `${import.meta.env?.BASE_URL ?? '/'}audio/${voiceKey(text, voice)}.mp3`
