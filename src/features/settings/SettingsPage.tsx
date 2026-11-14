import { useRef, useState } from 'react'
import { db } from '@/core/db/db'
import { supabase } from '@/core/sync/supabase'
import { setMuted } from '@/core/audio/player'
import { useAuth } from '@/features/auth/AuthProvider'

const TABLES = ['lessonProgress', 'chapterResults', 'srsCards', 'reviewLogs', 'xpEvents', 'badges'] as const

export default function SettingsPage() {
  const { session } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)
  const [muted, setM] = useState(() => localStorage.getItem('muted') === '1')
  const [msg, setMsg] = useState('')

  async function exportData() {
    const out: Record<string, unknown[]> = {}
    for (const t of TABLES) out[t] = await (db[t] as unknown as { toArray(): Promise<unknown[]> }).toArray()
    const blob = new Blob([JSON.stringify({ app: 'lernio', version: 1, data: out })], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `lernio-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  }

  async function importData(file: File) {
    try {
      const json = JSON.parse(await file.text())
      if (json.app !== 'lernio') throw new Error('File không đúng định dạng Lernio')
      for (const t of TABLES) if (Array.isArray(json.data?.[t])) await (db[t] as unknown as { bulkPut(r: unknown[]): Promise<unknown> }).bulkPut(json.data[t])
      setMsg('Đã nhập dữ liệu.')
    } catch (e) {
      setMsg((e as Error).message)
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt</h1>
      <p className="text-sm text-muted">Tài khoản: {session?.user.email}</p>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={muted} onChange={(e) => { setM(e.target.checked); setMuted(e.target.checked); localStorage.setItem('muted', e.target.checked ? '1' : '0') }} />
        Tắt âm thanh hiệu ứng và giọng đọc
      </label>
      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={exportData}>Xuất dữ liệu</button>
        <button className="btn-secondary" onClick={() => fileRef.current?.click()}>Nhập dữ liệu</button>
        <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && void importData(e.target.files[0])} />
      </div>
      {msg && <p role="status" className="text-sm">{msg}</p>}
      <button className="btn-secondary" onClick={() => void supabase.auth.signOut()}>Đăng xuất</button>
    </section>
  )
}
