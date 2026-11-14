import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Download, Upload } from 'lucide-react'
import { db } from '@/core/db/db'
import { DEFAULT_PROFILE, enqueueAll, saveProfile } from '@/core/db/profile'
import { setAudioRate, setMuted } from '@/core/audio/player'
import { supabase } from '@/core/sync/supabase'
import { DEV_MOCK_AUTH } from '@/core/sync/devMock'
import { useAuth } from '@/features/auth/AuthProvider'
import AudioDownload from './AudioDownload'
import { applyTheme, type Theme } from '@/ui/theme'

const TABLES = ['lessonProgress', 'chapterResults', 'srsCards', 'reviewLogs', 'xpEvents', 'badges', 'mistakes'] as const

function Segmented<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; t: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset className="py-3">
      <legend className="mb-2 font-bold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={String(o.v)} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)} className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${value === o.v ? 'border-brand bg-brand-soft text-brand' : 'border-line'}`}>
            {o.t}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card divide-y divide-line px-4">
      <h2 className="py-3 text-lg font-extrabold">{title}</h2>
      {children}
    </section>
  )
}

export default function SettingsPage() {
  const { session } = useAuth()
  const profile = useLiveQuery(async () => (await db.profile.get('me')) ?? DEFAULT_PROFILE, [])
  const fileRef = useRef<HTMLInputElement>(null)
  const [muted, setM] = useState(() => localStorage.getItem('muted') === '1')
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [msg, setMsg] = useState('')
  useEffect(() => {
    if (profile) setName(profile.displayName ?? '')
  }, [profile])
  if (!profile) return <p className="p-6 text-center text-muted">Đang tải…</p>

  async function exportData() {
    const out: Record<string, unknown[]> = {}
    for (const t of TABLES) out[t] = await (db[t] as unknown as { toArray(): Promise<unknown[]> }).toArray()
    const blob = new Blob([JSON.stringify({ app: 'lernio', version: 2, exportedAt: new Date().toISOString(), data: out })], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `lernio-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    setMsg('Đã xuất dữ liệu.')
  }

  async function importData(file: File) {
    try {
      const json = JSON.parse(await file.text())
      if (json.app !== 'lernio') throw new Error('File không đúng định dạng Lernio.')
      for (const t of TABLES) if (Array.isArray(json.data?.[t])) await (db[t] as unknown as { bulkPut(r: unknown[]): Promise<unknown> }).bulkPut(json.data[t])
      await enqueueAll()
      setMsg('Đã nhập dữ liệu. Tiến độ sẽ được đồng bộ khi có mạng.')
    } catch (e) {
      setMsg((e as Error).message)
    }
  }

  async function changePassword() {
    if (pw.length < 6) return setMsg('Mật khẩu cần ít nhất 6 ký tự.')
    const { error } = await supabase.auth.updateUser({ password: pw })
    setMsg(error ? `Không đổi được mật khẩu: ${error.message}` : 'Đã đổi mật khẩu.')
    setPw('')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Cài đặt</h1>
      {msg && <p role="status" className="rounded-xl bg-brand-soft p-3 text-sm font-bold text-brand">{msg}</p>}

      <Section title="Hồ sơ">
        <label className="block py-3">
          <span className="mb-1 block font-bold">Tên hiển thị</span>
          <div className="flex gap-2">
            <input className="field flex-1" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />
            <button className="btn-primary" disabled={name === (profile.displayName ?? '')} onClick={() => void saveProfile({ displayName: name.trim() || undefined }).then(() => setMsg('Đã lưu tên.'))}>
              Lưu
            </button>
          </div>
        </label>
        <p className="py-3 text-sm text-muted">Tài khoản: {session?.user.email}</p>
      </Section>

      <Section title="Học tập">
        <Segmented label="Mục tiêu XP mỗi ngày" value={profile.dailyGoalXp} options={[10, 20, 30, 50].map((v) => ({ v, t: `${v} XP` }))} onChange={(v) => void saveProfile({ dailyGoalXp: v })} />
        <Segmented label="Số thẻ mới tối đa mỗi ngày" value={profile.newCardsPerDay} options={[10, 20, 30, 50].map((v) => ({ v, t: `${v} thẻ` }))} onChange={(v) => void saveProfile({ newCardsPerDay: v })} />
      </Section>

      <Section title="Học offline">
        <AudioDownload />
      </Section>

      <Section title="Âm thanh và giao diện">
        <Segmented
          label="Tốc độ giọng đọc"
          value={profile.audioRate}
          options={[{ v: 0.75, t: 'Chậm (0.75×)' }, { v: 1, t: 'Bình thường' }]}
          onChange={(v) => {
            setAudioRate(v)
            void saveProfile({ audioRate: v })
          }}
        />
        <label className="flex items-center justify-between py-3 font-bold">
          Tắt toàn bộ âm thanh
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={muted}
            onChange={(e) => {
              setM(e.target.checked)
              setMuted(e.target.checked)
              localStorage.setItem('muted', e.target.checked ? '1' : '0')
            }}
          />
        </label>
        <Segmented<Theme>
          label="Giao diện"
          value={profile.theme}
          options={[{ v: 'auto', t: 'Theo hệ thống' }, { v: 'light', t: 'Sáng' }, { v: 'dark', t: 'Tối' }]}
          onChange={(v) => {
            applyTheme(v)
            void saveProfile({ theme: v })
          }}
        />
      </Section>

      <Section title="Dữ liệu">
        <div className="flex flex-wrap gap-2 py-3">
          <button className="btn-secondary flex items-center gap-2" onClick={exportData}><Download size={18} /> Xuất dữ liệu</button>
          <button className="btn-secondary flex items-center gap-2" onClick={() => fileRef.current?.click()}><Upload size={18} /> Nhập dữ liệu</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && void importData(e.target.files[0])} />
        </div>
        <p className="py-3 text-sm text-muted">Tiến độ tự đồng bộ giữa các thiết bị khi đăng nhập cùng tài khoản. File xuất dùng để sao lưu.</p>
      </Section>

      {!DEV_MOCK_AUTH && (
        <Section title="Bảo mật">
          <div className="flex gap-2 py-3">
            <input className="field flex-1" type="password" autoComplete="new-password" placeholder="Mật khẩu mới" aria-label="Mật khẩu mới" value={pw} onChange={(e) => setPw(e.target.value)} />
            <button className="btn-primary" disabled={!pw} onClick={() => void changePassword()}>Đổi</button>
          </div>
        </Section>
      )}
    </div>
  )
}
