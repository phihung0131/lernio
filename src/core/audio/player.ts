import { audioUrl } from './key'

export type Voice = 'm' | 'f'

let current: HTMLAudioElement | null = null
const settings = { muted: readMuted(), rate: 1 }
function readMuted() {
  try {
    return localStorage.getItem('muted') === '1'
  } catch {
    return false
  }
}
export const setAudioRate = (r: number) => (settings.rate = r)
export const setMuted = (m: boolean) => (settings.muted = m)

/** Phát giọng đọc tiếng Đức. Chỉ gọi sau thao tác người dùng (iOS). */
export function speak(text: string, opts: { voice?: Voice; rate?: number } | number = {}): Promise<void> {
  const o = typeof opts === 'number' ? { rate: opts } : opts
  const rate = (o.rate ?? 1) * settings.rate
  if (settings.muted) return Promise.resolve()
  current?.pause()
  const a = new Audio(audioUrl(text, o.voice ?? 'm'))
  a.playbackRate = rate
  current = a
  return new Promise<void>((resolve) => {
    let settled = false
    const finish = () => {
      if (!settled) {
        settled = true
        resolve()
      }
    }
    a.onended = finish
    a.onerror = () => fallback(text, rate, finish)
    a.play().catch((e: Error) => {
      // NotAllowedError = trình duyệt chặn autoplay; lỗi khác = thiếu file
      if (e?.name === 'NotAllowedError') finish()
      else if (!a.error) fallback(text, rate, finish)
    })
  })
}

let seqToken = 0
/** Phát lần lượt nhiều câu (hội thoại). Gọi lại sẽ dừng chuỗi đang phát. */
export async function speakSequence(items: { text: string; voice?: Voice }[]) {
  const token = ++seqToken
  for (const it of items) {
    if (token !== seqToken) return
    await speak(it.text, { voice: it.voice })
    await new Promise((r) => setTimeout(r, 350))
  }
}

/** Thiếu file audio: dùng giọng tiếng Đức của trình duyệt (nếu có). */
function fallback(text: string, rate: number, done?: () => void) {
  if (!('speechSynthesis' in window)) return done?.()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'de-DE'
  u.rate = rate
  u.onend = () => done?.()
  u.onerror = () => done?.()
  speechSynthesis.speak(u)
}

/** Âm thanh đúng/sai tạo bằng WebAudio, không cần file. */
export function sfx(kind: 'ok' | 'bad' | 'win') {
  if (settings.muted) return
  try {
    const ctx = new AudioContext()
    const notes = kind === 'ok' ? [660, 880] : kind === 'win' ? [523, 659, 784, 1046] : [220, 165]
    notes.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = kind === 'bad' ? 'sawtooth' : 'sine'
      o.frequency.value = f
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.11)
      g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + i * 0.11 + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.11 + 0.18)
      o.connect(g).connect(ctx.destination)
      o.start(ctx.currentTime + i * 0.11)
      o.stop(ctx.currentTime + i * 0.11 + 0.2)
    })
    setTimeout(() => ctx.close(), 1200)
  } catch {
    /* ignore */
  }
}
