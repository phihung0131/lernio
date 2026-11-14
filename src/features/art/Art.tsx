import { IconCat, IconDog, IconHome, type Icon as TablerIcon } from '@tabler/icons-react'
import { useId } from 'react'
import type { LevelId } from '@/core/content/schema'

const LEVEL_COLORS: Record<LevelId, [string, string]> = {
  A0: ['#34d399', '#059669'],
  A1: ['#60a5fa', '#2563eb'],
  A2: ['#f59e0b', '#d97706'],
  B1: ['#f472b6', '#be185d'],
}

/** Huy hiệu cấp độ: khiên gradient. */
export function LevelBadge({ level, size = 52 }: { level: LevelId; size?: number }) {
  const id = useId()
  const [a, b] = LEVEL_COLORS[level]
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`Cấp ${level}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <path d="M32 3 56 12v20c0 14-10 25-24 29C18 57 8 46 8 32V12z" fill={`url(#${id})`} />
      <path d="M32 3 56 12v20c0 14-10 25-24 29" fill="#fff" opacity=".12" />
      <path d="M32 9 50 16v16c0 11-8 19-18 23" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
      <text x="32" y="39" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="system-ui">
        {level}
      </text>
    </svg>
  )
}

/** Linh vật cú Lerni. */
export function Mascot({ size = 96, mood = 'happy' }: { size?: number; mood?: 'happy' | 'cheer' }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Linh vật cú Lerni">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="110" rx="30" ry="5" fill="#000" opacity=".12" />
      <path d="M30 40 22 18l22 10zM90 40l8-22-22 10z" fill="#b45309" />
      <ellipse cx="60" cy="68" rx="38" ry="42" fill={`url(#${id}b)`} />
      <ellipse cx="60" cy="82" rx="24" ry="26" fill="#fef3c7" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${48 + i * 12} 78q6 6 12 0`} fill="none" stroke="#f59e0b" strokeWidth="2" opacity=".7" />
      ))}
      <circle cx="44" cy="54" r="15" fill="#fff" />
      <circle cx="76" cy="54" r="15" fill="#fff" />
      <circle cx="46" cy="55" r="7" fill="#111827" />
      <circle cx="74" cy="55" r="7" fill="#111827" />
      <circle cx="48" cy="52" r="2.5" fill="#fff" />
      <circle cx="76" cy="52" r="2.5" fill="#fff" />
      <path d="M54 64 60 74 66 64z" fill="#ea580c" />
      {mood === 'cheer' && (
        <>
          <path d="M14 70q-8-14 2-26M106 70q8-14-2-26" stroke="#b45309" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M60 2l2.5 6 6 2.5-6 2.5L60 19l-2.5-6-6-2.5 6-2.5z" fill="#facc15" />
        </>
      )}
      <path d="M38 36q6-6 14-2M82 36q-6-6-14-2" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

const HERO_THEMES: [string, string, string][] = [
  ['#dbeafe', '#93c5fd', '#2563eb'],
  ['#fce7f3', '#f9a8d4', '#db2777'],
  ['#dcfce7', '#86efac', '#16a34a'],
  ['#fef3c7', '#fcd34d', '#d97706'],
  ['#ede9fe', '#c4b5fd', '#7c3aed'],
  ['#ffedd5', '#fdba74', '#ea580c'],
]

function hash(s: string) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

/** Banner minh họa đầu bài: bầu trời, đồi, nhà kiểu Đức, mây; màu theo chapter. */
export function LessonHero({ chapterId }: { chapterId: string }) {
  const id = useId()
  const [sky, hill, accent] = HERO_THEMES[hash(chapterId) % HERO_THEMES.length]
  return (
    <svg viewBox="0 0 400 110" className="my-3 w-full rounded-2xl" role="img" aria-label="Minh họa chủ đề bài học" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky} />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      <rect width="400" height="110" fill={`url(#${id})`} />
      <circle cx="340" cy="30" r="16" fill="#fde68a" />
      <g fill="#fff" opacity=".9">
        <ellipse cx="80" cy="28" rx="26" ry="9" />
        <ellipse cx="100" cy="22" rx="18" ry="8" />
        <ellipse cx="250" cy="40" rx="22" ry="7" />
      </g>
      <path d="M0 86q60-34 130-8t150-6 120 10v28H0z" fill={hill} />
      <path d="M0 98q80-22 170-4t230-8v24H0z" fill={accent} opacity=".85" />
      {/* nhà */}
      <g transform="translate(170 54)">
        <rect x="0" y="14" width="46" height="30" fill="#fff" stroke="#94a3b8" />
        <path d="M-5 16 23 -4l28 20z" fill={accent} />
        <rect x="18" y="26" width="10" height="18" fill="#92400e" />
        <rect x="5" y="22" width="9" height="9" fill="#bae6fd" />
        <rect x="32" y="22" width="9" height="9" fill="#bae6fd" />
      </g>
      <g transform="translate(300 62)">
        <rect x="8" y="14" width="5" height="22" fill="#92400e" />
        <circle cx="10" cy="10" r="14" fill="#22c55e" />
        <circle cx="2" cy="16" r="9" fill="#16a34a" />
      </g>
    </svg>
  )
}

/** Sơ đồ khẩu hình cho nguyên âm: độ mở và độ tròn của môi. */
export function MouthDiagram({ shape, label }: { shape: 'open' | 'round' | 'smile' | 'small-round'; label: string }) {
  const lip = '#e11d48'
  const paths = {
    open: <ellipse cx="50" cy="52" rx="20" ry="16" fill="#7f1d1d" stroke={lip} strokeWidth="5" />,
    round: <ellipse cx="50" cy="52" rx="10" ry="12" fill="#7f1d1d" stroke={lip} strokeWidth="5" />,
    'small-round': <ellipse cx="50" cy="52" rx="7" ry="6" fill="#7f1d1d" stroke={lip} strokeWidth="5" />,
    smile: <path d="M26 50q24 14 48 0q-24 4-48 0z" fill="#7f1d1d" stroke={lip} strokeWidth="5" strokeLinejoin="round" />,
  }
  return (
    <figure className="inline-flex flex-col items-center">
      <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label={`Khẩu hình ${label}`}>
        <circle cx="50" cy="50" r="46" fill="#fde7d4" />
        <circle cx="36" cy="30" r="4" fill="#1f2937" />
        <circle cx="64" cy="30" r="4" fill="#1f2937" />
        <path d="M50 34v10" stroke="#e8b89a" strokeWidth="3" strokeLinecap="round" />
        {paths[shape]}
      </svg>
      <figcaption className="text-sm font-semibold">{label}</figcaption>
    </figure>
  )
}

/** Thẻ danh từ theo giống: der xanh dương, die đỏ, das xanh lá. */
export function GenderCard({ article, noun, Icon }: { article: 'der' | 'die' | 'das'; noun: string; Icon: TablerIcon }) {
  const c = { der: '#2563eb', die: '#dc2626', das: '#16a34a' }[article]
  return (
    <figure className="flex w-28 flex-col overflow-hidden rounded-2xl border-4 bg-white text-center" style={{ borderColor: c }} aria-label={`${article} ${noun}`}>
      <figcaption className="py-1 text-lg font-extrabold text-white" style={{ background: c }}>{article}</figcaption>
      <div className="flex justify-center py-3" style={{ color: c }}><Icon size={44} stroke={1.6} aria-hidden /></div>
      <p className="pb-2 font-bold text-slate-900">{noun}</p>
    </figure>
  )
}

const TILE_COLORS = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#0891b2']

export function AlphabetStrip() {
  const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'Ä', 'Ö', 'Ü', 'ß']
  return (
    <svg viewBox="0 0 400 150" className="my-3 w-full" role="img" aria-label="Bảng chữ cái tiếng Đức">
      {letters.map((l, i) => {
        const col = i % 10
        const row = Math.floor(i / 10)
        const special = i >= 26
        return (
          <g key={l} transform={`translate(${col * 40 + 2} ${row * 48 + 2})`}>
            <rect width="36" height="42" rx="8" fill={special ? '#fef3c7' : '#fff'} stroke={special ? '#d97706' : TILE_COLORS[i % TILE_COLORS.length]} strokeWidth="2.5" />
            <text x="18" y="29" textAnchor="middle" fontSize="22" fontWeight="800" fill={special ? '#b45309' : TILE_COLORS[i % TILE_COLORS.length]} fontFamily="system-ui">{l}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function MouthVowels() {
  return (
    <div className="my-3 flex flex-wrap justify-center gap-4 rounded-xl bg-surface p-3">
      <MouthDiagram shape="smile" label="e / ä" />
      <MouthDiagram shape="round" label="o" />
      <MouthDiagram shape="small-round" label="ö (ê tròn môi)" />
      <MouthDiagram shape="small-round" label="ü (i tròn môi)" />
    </div>
  )
}

export function GenderGallery() {
  return (
    <div className="my-3 flex flex-wrap justify-center gap-3 rounded-xl bg-surface p-3">
      <GenderCard article="der" noun="Hund" Icon={IconDog} />
      <GenderCard article="die" noun="Katze" Icon={IconCat} />
      <GenderCard article="das" noun="Haus" Icon={IconHome} />
    </div>
  )
}

/** Ngọn lửa streak, sáng khi active. */
export function StreakFlame({ active, size = 56 }: { active: boolean; size?: number }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={active ? 'Đang giữ chuỗi ngày học' : 'Chưa học hôm nay'}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={active ? '#ffcf3f' : '#cfd5e3'} />
          <stop offset="1" stopColor={active ? '#ff6a13' : '#9aa3bd'} />
        </linearGradient>
      </defs>
      <path d="M32 4c4 10 16 16 16 32a16 16 0 0 1-32 0c0-8 4-13 8-17 0 6 3 9 6 10-2-9 0-18 2-25z" fill={`url(#${id})`} />
      <path d="M32 30c3 5 8 8 8 15a8 8 0 0 1-16 0c0-4 2-7 4-9 0 3 2 5 3 5-1-4 0-8 1-11z" fill={active ? '#fff3c4' : '#e7eaf2'} />
    </svg>
  )
}

/** Rương bài kiểm tra: đóng / mở / khóa. */
export function Chest({ state, size = 64 }: { state: 'locked' | 'open' | 'done'; size?: number }) {
  const body = state === 'locked' ? '#b8bfd1' : '#c47a2c'
  const band = state === 'locked' ? '#8d95ab' : '#f2b233'
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={state === 'locked' ? 'Bài kiểm tra đang khóa' : state === 'done' ? 'Đã đạt bài kiểm tra' : 'Bài kiểm tra'}>
      <ellipse cx="32" cy="58" rx="22" ry="4" fill="#000" opacity=".1" />
      {state === 'done' ? (
        <path d="M10 22 32 12l22 10-4 8H14z" fill={body} />
      ) : (
        <path d="M10 26c0-8 10-14 22-14s22 6 22 14z" fill={body} />
      )}
      <rect x="10" y="26" width="44" height="28" rx="4" fill={body} />
      <rect x="10" y="30" width="44" height="6" fill={band} />
      <rect x="27" y="28" width="10" height="12" rx="2" fill={band} stroke="#7a4a12" strokeWidth="1.5" />
      {state === 'done' && <path d="M22 18l4 4 10-10" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />}
      {state === 'locked' && <circle cx="32" cy="34" r="2" fill="#5b6378" />}
    </svg>
  )
}
