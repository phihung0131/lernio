import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase, supabaseConfigured } from '@/core/sync/supabase'
import { useAuth } from './AuthProvider'
import { Mascot } from '@/features/art/Art'

export default function LoginPage() {
  const { session, devLogin } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (session) return <Navigate to="/" replace />

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const { error, data } =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })
    setBusy(false)
    if (error) setMsg(error.message)
    else if (mode === 'signup' && !data.session) setMsg('Đã gửi email xác nhận. Hãy mở email rồi đăng nhập.')
  }

  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) setMsg(error.message)
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center gap-6 px-4">
      <header className="flex flex-col items-center text-center">
        <Mascot size={110} mood="cheer" />
        <h1 className="text-3xl font-bold">Lernio</h1>
        <p className="text-muted">Học tiếng Đức từ số 0</p>
      </header>
      {!supabaseConfigured && (
        <p role="alert" className="rounded-lg bg-amber-100 p-3 text-sm text-amber-900">
          Chưa cấu hình Supabase. Tạo file .env theo .env.example.
        </p>
      )}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input className="field" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Mật khẩu
          <input
            className="field"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn-primary" disabled={busy}>
          {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </button>
        <button type="button" className="btn-secondary" onClick={google}>
          Tiếp tục với Google
        </button>
        {msg && <p role="status" className="text-sm text-red-600">{msg}</p>}
      </form>
      {devLogin && (
        <button className="btn-secondary" onClick={devLogin}>
          Dev: vào nhanh (không đồng bộ)
        </button>
      )}
      <button className="text-sm underline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
      </button>
    </main>
  )
}
