import { audioUrl } from './key'

let current: HTMLAudioElement | null = null
const settings = { muted: false }
export const setMuted = (m: boolean) => (settings.muted = m)

/** Phát giọng đọc tiếng Đức. Chỉ gọi sau thao tác người dùng (iOS). */
export function speak(text: string, rate = 1): Promise<void> {
  if (settings.muted) return Promise.resolve()
  current?.pause()
  const a = new Audio(audioUrl(text))
  a.playbackRate = rate
  current = a
  return a.play().catch(() => {
    // fallback: giọng trình duyệt nếu thiếu file
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'de-DE'
      u.rate = rate
      speechSynthesis.speak(u)
    }
  })
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
