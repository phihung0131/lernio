import { useMemo } from 'react'

const COLORS = ['#2f6bff', '#ffb020', '#19a55d', '#e5484d', '#8b5cf6', '#06b6d4']

/** Pháo giấy SVG rơi một lần (tự tắt nếu người dùng giảm chuyển động). */
export default function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i * 37) % 100,
        delay: (i % 10) * 0.08,
        dur: 1.6 + ((i * 7) % 10) / 10,
        rot: (i * 53) % 360,
        color: COLORS[i % COLORS.length],
        w: 6 + (i % 3) * 3,
      })),
    [count],
  )
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <style>{`@keyframes fall{0%{transform:translateY(-10vh) rotate(0)}100%{transform:translateY(110vh) rotate(720deg)}}`}</style>
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: 0,
            width: p.w,
            height: p.w * 1.6,
            background: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rot}deg)`,
            animation: `fall ${p.dur}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  )
}
