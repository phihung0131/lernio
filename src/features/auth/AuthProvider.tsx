import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/core/sync/supabase'
import { pushOutbox } from '@/core/sync/push'
import { pullAll } from '@/core/sync/pull'
import { closeUserDb, openUserDb } from '@/core/db/db'
import { getProfile } from '@/core/db/profile'
import { setAudioRate } from '@/core/audio/player'
import { applyTheme } from '@/ui/theme'
import { DEV_MOCK_AUTH, devSession, devSignIn, devSignOut } from '@/core/sync/devMock'

interface AuthCtx {
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  devLogin?: () => void
}
const Ctx = createContext<AuthCtx>({ session: null, loading: true, signOut: async () => {} })
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [dbReady, setDbReady] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (DEV_MOCK_AUTH) {
      setSession(devSession())
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  // Mở DB riêng của người dùng trước khi hiển thị nội dung.
  const uid = session?.user.id ?? null
  useEffect(() => {
    let alive = true
    if (!uid) {
      closeUserDb()
      setDbReady(null)
      return
    }
    openUserDb(uid)
      .then(async () => {
        const p = await getProfile()
        setAudioRate(p.audioRate)
        if (p.updatedAt > '1970-01-02') applyTheme(p.theme)
      })
      .then(() => alive && setDbReady(uid))
    return () => {
      alive = false
    }
  }, [uid])

  useEffect(() => {
    if (!uid || dbReady !== uid || DEV_MOCK_AUTH) return
    // Luôn kéo và hợp nhất trước khi đẩy để không ghi đè tiến độ từ thiết bị khác.
    const flush = () => void pullAll(uid).then((ok) => (ok ? pushOutbox(uid) : 0))
    flush()
    window.addEventListener('online', flush)
    document.addEventListener('visibilitychange', flush)
    return () => {
      window.removeEventListener('online', flush)
      document.removeEventListener('visibilitychange', flush)
    }
  }, [uid, dbReady])

  const signOut = useCallback(async () => {
    if (DEV_MOCK_AUTH) devSignOut()
    else await supabase.auth.signOut()
    setSession(null)
  }, [])

  const devLogin = DEV_MOCK_AUTH ? () => setSession(devSignIn()) : undefined
  const ready = !loading && (!uid || dbReady === uid)

  return <Ctx.Provider value={{ session, loading: !ready, signOut, devLogin }}>{ready ? children : <p className="p-8 text-center">Đang tải…</p>}</Ctx.Provider>
}
