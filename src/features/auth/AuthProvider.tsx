import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/core/sync/supabase'
import { pushOutbox } from '@/core/sync/push'
import { pullAll } from '@/core/sync/pull'

interface AuthCtx {
  session: Session | null
  loading: boolean
}
const Ctx = createContext<AuthCtx>({ session: null, loading: true })
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    // Luôn kéo và hợp nhất trước khi đẩy để không ghi đè tiến độ từ thiết bị khác.
    const flush = () => void pullAll(session.user.id).then((ok) => (ok ? pushOutbox(session.user.id) : 0))
    flush()
    window.addEventListener('online', flush)
    document.addEventListener('visibilitychange', flush)
    return () => {
      window.removeEventListener('online', flush)
      document.removeEventListener('visibilitychange', flush)
    }
  }, [session])

  return <Ctx.Provider value={{ session, loading }}>{children}</Ctx.Provider>
}
