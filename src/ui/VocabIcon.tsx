import { VOCAB_ICONS } from '@/generated/vocabIcons'

const ART_COLOR = { der: '#2563eb', die: '#dc2626', das: '#16a34a' } as const

/** Icon minh họa cho từ vựng. Không có icon thì hiển thị ô chữ cái đầu theo màu giống. */
export default function VocabIcon({ icon, word, article, size = 44 }: { icon?: string; word: string; article?: 'der' | 'die' | 'das'; size?: number }) {
  const color = article ? ART_COLOR[article] : '#7c3aed'
  const I = icon ? VOCAB_ICONS[icon] : undefined
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-2xl"
      style={{ width: size, height: size, background: `${color}14`, color, border: `1.5px solid ${color}33` }}
    >
      {I ? <I size={size * 0.58} stroke={1.75} /> : <span style={{ fontSize: size * 0.45, fontWeight: 800 }}>{word.replace(/^(der|die|das) /, '').charAt(0).toUpperCase()}</span>}
    </span>
  )
}
