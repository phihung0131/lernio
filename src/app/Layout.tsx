import { Suspense } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Dumbbell, Flame, Home, Map, Repeat, Star, UserRound } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import { Mascot } from '@/features/art/Art'
import { useStats } from '@/features/home/useStats'

const NAV = [
  { to: '/', label: 'Trang chủ', icon: Home, end: true },
  { to: '/path', label: 'Lộ trình', icon: Map },
  { to: '/review', label: 'Ôn tập', icon: Repeat },
  { to: '/practice', label: 'Luyện tập', icon: Dumbbell },
  { to: '/profile', label: 'Hồ sơ', icon: UserRound },
]

function StatPills() {
  const s = useStats()
  return (
    <div className="flex items-center gap-2 text-sm font-bold">
      <span className="flex items-center gap-1 rounded-full bg-surface px-3 py-1 shadow-sm" title="Chuỗi ngày học">
        <Flame size={16} className={s && s.streak > 0 ? 'text-orange-500' : 'text-muted'} /> {s?.streak ?? 0}
      </span>
      <span className="flex items-center gap-1 rounded-full bg-surface px-3 py-1 shadow-sm" title="XP hôm nay">
        <Star size={16} className="text-accent" /> {s?.xpToday ?? 0}
      </span>
    </div>
  )
}

export default function Layout() {
  const loc = useLocation()
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[15rem_1fr]">
      <aside className="hidden md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:border-r md:border-line md:bg-surface md:p-4">
        <div className="mb-6 flex items-center gap-2 px-2">
          <Mascot size={40} />
          <span className="text-2xl font-extrabold tracking-tight text-brand">Lernio</span>
        </div>
        <nav aria-label="Chính" className="flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 font-bold transition ${
                  isActive ? 'border-brand/40 bg-brand-soft text-brand' : 'border-transparent text-muted hover:bg-surface-2'
                }`
              }
            >
              <Icon size={22} aria-hidden /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-bg/90 px-4 py-2 backdrop-blur md:justify-end">
          <span className="flex items-center gap-2 md:hidden">
            <Mascot size={30} />
            <span className="text-lg font-extrabold text-brand">Lernio</span>
          </span>
          <StatPills />
        </header>
        <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-2 md:pb-10">
          <ErrorBoundary resetKey={loc.pathname}>
            <Suspense fallback={<p className="p-8 text-center text-muted">Đang tải…</p>}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
      <nav aria-label="Chính" className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-bold ${isActive ? 'text-brand' : 'text-muted'}`}
          >
            <Icon size={24} aria-hidden /> {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
