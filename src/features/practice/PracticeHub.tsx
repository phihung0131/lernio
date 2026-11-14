import { Link } from 'react-router-dom'
import { BookMarked, ClipboardCheck, Dumbbell, GraduationCap, Headphones, Repeat, Target } from 'lucide-react'
import { useStats } from '@/features/home/useStats'

export default function PracticeHub() {
  const s = useStats()
  const items = [
    { to: '/review', Icon: Repeat, title: 'Ôn tập lặp lại', desc: s && s.due > 0 ? `${s.due} thẻ đến hạn hôm nay` : 'Thẻ từ vựng và ngữ pháp theo FSRS', color: 'var(--brand)' },
    { to: '/practice/weak', Icon: Target, title: 'Luyện điểm yếu', desc: s && s.mistakes > 0 ? `${s.mistakes} mục hay sai` : 'Tự động gom câu bạn làm sai', color: 'var(--bad)' },
    { to: '/practice/mix', Icon: Dumbbell, title: 'Luyện tập tự chọn', desc: 'Chọn cấp độ, chapter, kỹ năng', color: 'var(--ok)' },
    { to: '/mock', Icon: ClipboardCheck, title: 'Thi thử A1 · A2 · B1', desc: 'Đề mô phỏng có tính giờ', color: 'var(--accent)' },
    { to: '/vocabulary', Icon: BookMarked, title: 'Từ điển của tôi', desc: 'Tra và lọc từ đã học', color: '#8b5cf6' },
    { to: '/grammar', Icon: GraduationCap, title: 'Thư viện ngữ pháp', desc: 'Tra cứu mọi chủ điểm', color: '#06b6d4' },
    { to: '/listening', Icon: Headphones, title: 'Luyện nghe', desc: 'Hội thoại 2 giọng, chính tả', color: '#ec4899' },
  ]
  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold">Luyện tập</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map(({ to, Icon, title, desc, color }) => (
          <li key={to}>
            <Link to={to} className="card flex items-center gap-4 p-4 transition hover:-translate-y-0.5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: color }}>
                <Icon size={28} />
              </span>
              <div>
                <p className="font-extrabold">{title}</p>
                <p className="text-sm text-muted">{desc}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
