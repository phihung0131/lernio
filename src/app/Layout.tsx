import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, BookOpen, Headphones, Map, Repeat, Settings } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Lộ trình', icon: Map },
  { to: '/review', label: 'Ôn tập', icon: Repeat },
  { to: '/vocabulary', label: 'Từ vựng', icon: BookOpen },
  { to: '/listening', label: 'Nghe', icon: Headphones },
  { to: '/progress', label: 'Tiến độ', icon: BarChart3 },
  { to: '/settings', label: 'Cài đặt', icon: Settings },
]

export default function Layout() {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[14rem_1fr]">
      <nav
        aria-label="Chính"
        className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-line bg-surface md:static md:flex-col md:justify-start md:gap-1 md:border-r md:border-t-0 md:p-3"
      >
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-2 text-xs md:flex-row md:gap-3 md:rounded-lg md:px-3 md:text-sm ${
                isActive ? 'font-semibold text-brand' : 'text-muted'
              }`
            }
          >
            <Icon size={20} aria-hidden /> {label}
          </NavLink>
        ))}
      </nav>
      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-6 md:pb-6">
        <Outlet />
      </main>
    </div>
  )
}
