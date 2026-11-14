import type { Session } from '@supabase/supabase-js'

/** Chế độ đăng nhập giả chỉ dùng khi phát triển local (không bao giờ có trong bản build). */
export const DEV_MOCK_AUTH = import.meta.env.DEV && import.meta.env.VITE_DEV_MOCK_AUTH === '1'

const KEY = 'lernio-dev-session'

export function devSession(): Session | null {
  if (!DEV_MOCK_AUTH) return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function devSignIn(email = 'dev@lernio.test'): Session {
  const id = '00000000-0000-4000-8000-' + email.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7).toString(16).padStart(12, '0').slice(-12)
  const s = {
    access_token: 'dev',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: 4102444800,
    refresh_token: 'dev',
    user: { id, aud: 'authenticated', role: 'authenticated', email, app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() },
  } as unknown as Session
  localStorage.setItem(KEY, JSON.stringify(s))
  return s
}

export function devSignOut() {
  localStorage.removeItem(KEY)
}
