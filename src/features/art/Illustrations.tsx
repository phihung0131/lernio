import type { ReactNode } from 'react'
import { AlphabetStrip, GenderGallery, MouthVowels } from './Art'
import type { IllustrationName } from './illustrationNames'

const T = { fontFamily: 'Be Vietnam Pro, system-ui', fill: 'currentColor' }

function Frame({ label, children, viewBox, caption }: { label: string; children: ReactNode; viewBox: string; caption?: string }) {
  return (
    <figure className="my-4 rounded-2xl border border-line bg-surface p-3 text-text">
      <svg viewBox={viewBox} className="w-full" role="img" aria-label={label}>
        {children}
      </svg>
      {caption && <figcaption className="mt-1 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  )
}

function Clock({ x, h, m, label, sub }: { x: number; h: number; m: number; label: string; sub: string }) {
  const ha = ((h % 12) + m / 60) * 30 - 90
  const ma = m * 6 - 90
  const rad = (d: number) => (d * Math.PI) / 180
  return (
    <g transform={`translate(${x} 0)`}>
      <circle cx="50" cy="50" r="44" fill="var(--surface)" stroke="var(--brand)" strokeWidth="4" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={50 + 36 * Math.cos(rad(i * 30))} y1={50 + 36 * Math.sin(rad(i * 30))} x2={50 + 40 * Math.cos(rad(i * 30))} y2={50 + 40 * Math.sin(rad(i * 30))} stroke="var(--muted)" strokeWidth="2" />
      ))}
      <line x1="50" y1="50" x2={50 + 22 * Math.cos(rad(ha))} y2={50 + 22 * Math.sin(rad(ha))} stroke="var(--text)" strokeWidth="5" strokeLinecap="round" />
      <line x1="50" y1="50" x2={50 + 33 * Math.cos(rad(ma))} y2={50 + 33 * Math.sin(rad(ma))} stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" fill="var(--text)" />
      <text x="50" y="116" textAnchor="middle" fontSize="13" fontWeight="700" {...T}>{label}</text>
      <text x="50" y="132" textAnchor="middle" fontSize="11" style={{ fill: 'var(--muted)' }}>{sub}</text>
    </g>
  )
}

function ClockTimes() {
  return (
    <Frame label="Bốn đồng hồ: Viertel nach acht, halb neun, Viertel vor neun, neun Uhr" viewBox="0 0 460 140" caption="halb neun = 8:30 (nửa giờ trước 9 giờ)">
      <Clock x={5} h={8} m={15} label="Viertel nach acht" sub="8:15" />
      <Clock x={120} h={8} m={30} label="halb neun" sub="8:30" />
      <Clock x={235} h={8} m={45} label="Viertel vor neun" sub="8:45" />
      <Clock x={350} h={9} m={0} label="neun Uhr" sub="9:00" />
    </Frame>
  )
}

function Slot({ x, w, title, word, color }: { x: number; w: number; title: string; word: string; color: string }) {
  return (
    <g>
      <rect x={x} y="30" width={w} height="44" rx="10" fill={color} opacity=".15" stroke={color} strokeWidth="2" />
      <text x={x + w / 2} y="58" textAnchor="middle" fontSize="15" fontWeight="700" {...T}>{word}</text>
      <text x={x + w / 2} y="20" textAnchor="middle" fontSize="11" style={{ fill: 'var(--muted)' }}>{title}</text>
    </g>
  )
}

function VerbPosition() {
  return (
    <Frame label="Sơ đồ vị trí động từ: vị trí 1, động từ ở vị trí 2, phần giữa, cuối câu" viewBox="0 0 470 150" caption="Câu kể: động từ chia luôn ở vị trí 2; phần thứ hai của động từ ở cuối câu">
      <Slot x={5} w={90} title="Vị trí 1" word="Heute" color="#8b5cf6" />
      <Slot x={105} w={90} title="Vị trí 2 (động từ)" word="stehe" color="#e5484d" />
      <Slot x={205} w={160} title="Phần giữa" word="ich um 7 Uhr" color="#2f6bff" />
      <Slot x={375} w={90} title="Cuối câu" word="auf" color="#e5484d" />
      <path d="M150 80 q 140 50 270 0" fill="none" stroke="#e5484d" strokeWidth="2" strokeDasharray="5 4" />
      <text x="285" y="130" textAnchor="middle" fontSize="11" style={{ fill: 'var(--muted)' }}>khung động từ (Satzklammer)</text>
    </Frame>
  )
}

function Person({ x, y, label, sub, female }: { x: number; y: number; label: string; sub: string; female?: boolean }) {
  const c = female ? '#e5484d' : '#2f6bff'
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="16" fill={c} opacity=".18" stroke={c} strokeWidth="2" />
      <circle cx="0" cy="-4" r="6" fill={c} />
      <path d="M-10 12 q10 -14 20 0" fill={c} />
      <text x="0" y="32" textAnchor="middle" fontSize="12" fontWeight="700" {...T}>{label}</text>
      <text x="0" y="46" textAnchor="middle" fontSize="10" style={{ fill: 'var(--muted)' }}>{sub}</text>
    </g>
  )
}

function FamilyTree() {
  return (
    <Frame label="Cây gia đình: ông bà, bố mẹ, anh chị em" viewBox="0 0 420 250">
      <path d="M150 40 H270 M210 40 V95 M110 110 H310 M110 110 V95 M310 110 V95 M210 110 V160 M110 175 H310 M110 175 V165 M210 175 V165 M310 175 V165" stroke="var(--line)" strokeWidth="3" fill="none" />
      <Person x={150} y={30} label="der Opa" sub="ông" />
      <Person x={270} y={30} label="die Oma" sub="bà" female />
      <Person x={110} y={95} label="der Vater" sub="bố" />
      <Person x={310} y={95} label="die Mutter" sub="mẹ" female />
      <Person x={110} y={190} label="der Bruder" sub="anh/em trai" />
      <Person x={210} y={190} label="ich" sub="tôi" />
      <Person x={310} y={190} label="die Schwester" sub="chị/em gái" female />
    </Frame>
  )
}

function Room({ x, y, w, h, de, vi, color }: { x: number; y: number; w: number; h: number; de: string; vi: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={color} opacity=".14" stroke="var(--text)" strokeWidth="3" />
      <text x={x + w / 2} y={y + h / 2} textAnchor="middle" fontSize="14" fontWeight="700" {...T}>{de}</text>
      <text x={x + w / 2} y={y + h / 2 + 16} textAnchor="middle" fontSize="11" style={{ fill: 'var(--muted)' }}>{vi}</text>
    </g>
  )
}

function Apartment() {
  return (
    <Frame label="Sơ đồ căn hộ: phòng khách, bếp, phòng ngủ, phòng tắm, hành lang, ban công" viewBox="0 0 420 240">
      <Room x={10} y={10} w={200} h={130} de="das Wohnzimmer" vi="phòng khách" color="#2f6bff" />
      <Room x={210} y={10} w={200} h={80} de="die Küche" vi="bếp" color="#19a55d" />
      <Room x={210} y={90} w={120} h={90} de="das Bad" vi="phòng tắm" color="#06b6d4" />
      <Room x={330} y={90} w={80} h={90} de="der Flur" vi="hành lang" color="#f59e0b" />
      <Room x={10} y={140} w={200} h={90} de="das Schlafzimmer" vi="phòng ngủ" color="#8b5cf6" />
      <Room x={210} y={180} w={200} h={50} de="der Balkon" vi="ban công" color="#ec4899" />
    </Frame>
  )
}

function Body() {
  const label = (x: number, y: number, tx: number, de: string, vi: string) => (
    <g>
      <line x1={x} y1={y} x2={tx} y2={y} stroke="var(--muted)" strokeWidth="1.5" />
      <text x={tx + (tx > x ? 6 : -6)} y={y + 4} textAnchor={tx > x ? 'start' : 'end'} fontSize="12" fontWeight="700" {...T}>{de}</text>
      <text x={tx + (tx > x ? 6 : -6)} y={y + 18} textAnchor={tx > x ? 'start' : 'end'} fontSize="10" style={{ fill: 'var(--muted)' }}>{vi}</text>
    </g>
  )
  return (
    <Frame label="Hình người với tên các bộ phận cơ thể bằng tiếng Đức" viewBox="0 0 420 300">
      <g fill="#f4c7a1" stroke="#c98b5e" strokeWidth="2">
        <circle cx="210" cy="50" r="30" />
        <rect x="180" y="85" width="60" height="100" rx="20" />
        <rect x="150" y="90" width="22" height="90" rx="11" />
        <rect x="248" y="90" width="22" height="90" rx="11" />
        <rect x="185" y="180" width="22" height="100" rx="11" />
        <rect x="213" y="180" width="22" height="100" rx="11" />
      </g>
      {label(195, 45, 90, 'der Kopf', 'đầu')}
      {label(222, 45, 330, 'das Auge', 'mắt')}
      {label(210, 88, 330, 'der Hals', 'cổ')}
      {label(160, 130, 90, 'der Arm', 'cánh tay')}
      {label(225, 140, 330, 'der Bauch', 'bụng')}
      {label(160, 180, 90, 'die Hand', 'bàn tay')}
      {label(224, 240, 330, 'das Bein', 'chân')}
      {label(196, 275, 90, 'der Fuß', 'bàn chân')}
    </Frame>
  )
}

function Cases() {
  const rows = [
    ['', 'đực', 'cái', 'trung', 'số nhiều'],
    ['Nominativ', 'der', 'die', 'das', 'die'],
    ['Akkusativ', 'den', 'die', 'das', 'die'],
    ['Dativ', 'dem', 'der', 'dem', 'den (+n)'],
  ]
  const colors = ['', 'var(--der)', 'var(--die)', 'var(--das)', 'var(--muted)']
  return (
    <Frame label="Bảng mạo từ theo cách: Nominativ, Akkusativ, Dativ" viewBox="0 0 440 170" caption="Ô tô đậm là chỗ mạo từ thay đổi so với Nominativ">
      {rows.map((r, i) =>
        r.map((c, j) => {
          const changed = i > 0 && j > 0 && c !== rows[1][j]
          return (
            <g key={`${i}-${j}`}>
              <rect x={j * 88} y={i * 40} width="86" height="38" rx="6" fill={changed ? colors[j] : 'transparent'} opacity={changed ? 0.18 : 1} stroke="var(--line)" />
              <text x={j * 88 + 43} y={i * 40 + 24} textAnchor="middle" fontSize="14" fontWeight={i === 0 || j === 0 ? 700 : 600} style={{ fill: j > 0 && i > 0 ? colors[j] : 'var(--text)' }}>
                {c}
              </text>
            </g>
          )
        }),
      )}
    </Frame>
  )
}

function Timeline() {
  return (
    <Frame label="Dòng thời gian: Plusquamperfekt trước Präteritum hoặc Perfekt, trước hiện tại" viewBox="0 0 460 130">
      <line x1="20" y1="60" x2="440" y2="60" stroke="var(--text)" strokeWidth="3" />
      <path d="M440 60 l-12 -7 v14z" fill="var(--text)" />
      {[
        { x: 90, t: 'Plusquamperfekt', s: 'hatte gegessen', c: '#8b5cf6' },
        { x: 230, t: 'Präteritum / Perfekt', s: 'ging / bin gegangen', c: '#2f6bff' },
        { x: 380, t: 'Präsens', s: 'jetzt: gehe', c: '#19a55d' },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="60" r="10" fill={p.c} />
          <text x={p.x} y="35" textAnchor="middle" fontSize="13" fontWeight="700" {...T}>{p.t}</text>
          <text x={p.x} y="92" textAnchor="middle" fontSize="12" style={{ fill: 'var(--muted)' }}>{p.s}</text>
        </g>
      ))}
    </Frame>
  )
}

function Directions() {
  return (
    <Frame label="Ngã tư với chỉ dẫn: geradeaus, links, rechts" viewBox="0 0 300 220">
      <rect x="120" y="0" width="60" height="220" fill="var(--surface-2)" />
      <rect x="0" y="80" width="300" height="60" fill="var(--surface-2)" />
      <path d="M150 200 V60" stroke="#2f6bff" strokeWidth="5" markerEnd="url(#a)" />
      <path d="M150 110 H40" stroke="#e5484d" strokeWidth="5" />
      <path d="M150 110 H260" stroke="#19a55d" strokeWidth="5" />
      <defs>
        <marker id="a" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8z" fill="#2f6bff" />
        </marker>
      </defs>
      <text x="150" y="40" textAnchor="middle" fontSize="14" fontWeight="700" {...T}>geradeaus</text>
      <text x="40" y="100" textAnchor="middle" fontSize="14" fontWeight="700" style={{ fill: '#e5484d' }}>links</text>
      <text x="260" y="100" textAnchor="middle" fontSize="14" fontWeight="700" style={{ fill: '#19a55d' }}>rechts</text>
      <text x="150" y="215" textAnchor="middle" fontSize="11" style={{ fill: 'var(--muted)' }}>die Kreuzung (ngã tư)</text>
    </Frame>
  )
}

function Weather() {
  const items = [
    { de: 'Die Sonne scheint.', vi: 'Trời nắng', draw: <circle cx="40" cy="40" r="18" fill="#fbbf24" /> },
    { de: 'Es regnet.', vi: 'Trời mưa', draw: <g><ellipse cx="40" cy="34" rx="24" ry="13" fill="#94a3b8" />{[26, 40, 54].map((x) => <line key={x} x1={x} y1="52" x2={x - 4} y2="64" stroke="#2f6bff" strokeWidth="3" strokeLinecap="round" />)}</g> },
    { de: 'Es schneit.', vi: 'Có tuyết', draw: <g><ellipse cx="40" cy="34" rx="24" ry="13" fill="#cbd5e1" />{[26, 40, 54].map((x) => <circle key={x} cx={x} cy="58" r="4" fill="#93c5fd" />)}</g> },
    { de: 'Es ist windig.', vi: 'Có gió', draw: <g stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M14 30 h40 a8 8 0 1 0 -8 -8" /><path d="M14 44 h50 a8 8 0 1 1 -8 8" /></g> },
  ]
  return (
    <Frame label="Thời tiết: nắng, mưa, tuyết, gió" viewBox="0 0 400 120">
      {items.map((it, i) => (
        <g key={i} transform={`translate(${i * 100} 0)`}>
          <g transform="translate(10 0)">{it.draw}</g>
          <text x="50" y="96" textAnchor="middle" fontSize="11" fontWeight="700" {...T}>{it.de}</text>
          <text x="50" y="112" textAnchor="middle" fontSize="10" style={{ fill: 'var(--muted)' }}>{it.vi}</text>
        </g>
      ))}
    </Frame>
  )
}

function Nebensatz() {
  return (
    <Frame label="Sơ đồ câu phụ: động từ chia chuyển xuống cuối câu phụ" viewBox="0 0 480 150" caption="Câu phụ: liên từ đứng đầu, động từ chia đứng CUỐI">
      <Slot x={5} w={120} title="Câu chính" word="Ich lerne," color="#2f6bff" />
      <Slot x={135} w={70} title="Liên từ" word="weil" color="#8b5cf6" />
      <Slot x={215} w={170} title="Phần giữa" word="ich in Berlin" color="#2f6bff" />
      <Slot x={395} w={80} title="Động từ" word="wohne" color="#e5484d" />
      <path d="M435 80 q -160 55 -330 5" fill="none" stroke="#e5484d" strokeWidth="2" strokeDasharray="5 4" />
      <text x="270" y="138" textAnchor="middle" fontSize="11" style={{ fill: 'var(--muted)' }}>so với câu thường: ich wohne in Berlin</text>
    </Frame>
  )
}

export const ILLUSTRATIONS: Record<IllustrationName, () => ReactNode> = {
  alphabet: AlphabetStrip,
  'mouth-vowels': MouthVowels,
  genders: GenderGallery,
  'clock-times': ClockTimes,
  'verb-position': VerbPosition,
  'family-tree': FamilyTree,
  apartment: Apartment,
  body: Body,
  cases: Cases,
  timeline: Timeline,
  directions: Directions,
  weather: Weather,
  nebensatz: Nebensatz,
}
