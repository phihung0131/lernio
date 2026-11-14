import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface ToastItem {
  id: number
  title: string
  body?: string
  Icon?: LucideIcon
}
const Ctx = createContext<(t: Omit<ToastItem, 'id'>) => void>(() => {})
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(Ctx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const push = useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = Date.now() + Math.random()
    setItems((x) => [...x, { ...t, id }])
    setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 4200)
  }, [])
  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center gap-2 px-4">
        {items.map((t) => (
          <div key={t.id} className="card pop-in pointer-events-auto flex w-full max-w-sm items-center gap-3 p-3">
            {t.Icon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <t.Icon size={22} />
              </span>
            )}
            <div>
              <p className="font-bold">{t.title}</p>
              {t.body && <p className="text-sm text-muted">{t.body}</p>}
            </div>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
