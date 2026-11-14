import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase, supabaseConfigured } from '@/core/sync/supabase'
import { useAuth } from './AuthProvider'
import { Mascot } from '@/features/art/Art'

const GOOGLE = import.meta.env.VITE_GOOGLE_ENABLED === '1'

function vi(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'Email hoặc mật khẩu không đúng.'
  if (m.includes('email not confirmed')) return 'Email chưa được xác nhận. Hãy mở email và bấm vào đường link xác nhận.'
  if (m.includes('already registered')) return 'Email này đã có tài khoản. Hãy đăng nhập.'
  if (m.includes('password should be')) return 'Mật khẩu cần ít nhất 6 ký tự.'
  if (m.includes('rate limit')) return 'Bạn thử quá nhiều lần. Hãy đợi vài phút.'
  if (m.includes('failed to fetch') || m.includes('network')) return 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.'
  return msg
}

export default function LoginPage() {
  const { session, devLogin } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  if (session) return <Navigate to="/" replace />

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    try {
      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/settings` })
        setMsg(error ? { ok: false, text: vi(error.message) } : { ok: true, text: 'Đã gửi email đặt lại mật khẩu. Hãy kiểm tra hộp thư.' })
      } else if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setMsg({ ok: false, text: vi(error.message) })
      } else {
        const { error, data } = await supabase.auth.signUp({ email, password })
        if (error) setMsg({ ok: false, text: vi(error.message) })
        else if (!data.session) setMsg({ ok: true, text: 'Đã tạo tài khoản. Hãy mở email, bấm link xác nhận rồi đăng nhập.' })
      }
    } finally {
      setBusy(false)
    }
  }

  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })
    if (error) setMsg({ ok: false, text: vi(error.message) })
  }

  const title = mode === 'login' ? 'Đăng nhập' : mode === 'signup' ? 'Tạo tài khoản' : 'Quên mật khẩu'
  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center gap-5 px-4 py-8">
      <header className="flex flex-col items-center text-center">
        <Mascot size={120} mood="cheer" />
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-brand">Lernio</h1>
        <p className="text-muted">Học tiếng Đức từ số 0 đến B1</p>
      </header>
      {!supabaseConfigured && !devLogin && (
        <p role="alert" className="rounded-xl bg-accent/15 p-3 text-sm">Chưa cấu hình Supabase. Tạo file .env theo .env.example.</p>
      )}
      <form onSubmit={submit} className="card flex flex-col gap-3 p-5">
        <h2 className="text-xl font-extrabold">{title}</h2>
        <label className="flex flex-col gap-1 text-sm font-bold">
          Email
          <input className="field" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {mode !== 'reset' && (
          <label className="flex flex-col gap-1 text-sm font-bold">
            Mật khẩu
            <input className="field" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        )}
        {msg && <p role="status" className={`rounded-xl p-2 text-sm ${msg.ok ? 'bg-ok-bg text-ok' : 'bg-bad-bg text-bad'}`}>{msg.text}</p>}
        <button className="btn-primary" disabled={busy}>
          {busy ? 'Đang xử lý…' : mode === 'login' ? 'Đăng nhập' : mode === 'signup' ? 'Tạo tài khoản' : 'Gửi email đặt lại'}
        </button>
        {mode === 'login' && (
          <button type="button" className="text-sm font-bold text-brand" onClick={() => { setMode('reset'); setMsg(null) }}>
            Quên mật khẩu?
          </button>
        )}
        {GOOGLE && mode !== 'reset' && (
          <button type="button" className="btn-secondary" onClick={google}>Tiếp tục với Google</button>
        )}
      </form>
      {devLogin && (
        <button className="btn-secondary" onClick={devLogin}>Dev: vào nhanh (không đồng bộ)</button>
      )}
      <button type="button" className="text-sm font-bold text-brand" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMsg(null) }}>
        {mode === 'login' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
      </button>
    </main>
  )
}
