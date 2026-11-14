import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Download } from 'lucide-react'
import { LEVELS } from '@/core/content/loader'
import type { LevelId } from '@/core/content/schema'

const BASE = import.meta.env.BASE_URL ?? '/'
const CACHE = 'lernio-audio' // trùng cacheName trong vite.config.ts (workbox runtimeCaching)

type Lists = Record<LevelId, string[]>

async function cachedCount(keys: string[]) {
  if (!('caches' in window)) return 0
  const c = await caches.open(CACHE)
  const hits = await Promise.all(keys.map((k) => c.match(`${BASE}audio/${k}.mp3`, { ignoreSearch: true })))
  return hits.filter(Boolean).length
}

/** Tải trước toàn bộ audio của một cấp độ vào cache để học offline (service worker lưu theo CacheFirst). */
export default function AudioDownload() {
  const [lists, setLists] = useState<Lists | null>(null)
  const [have, setHave] = useState<Partial<Record<LevelId, number>>>({})
  const [busy, setBusy] = useState<{ level: LevelId; done: number } | null>(null)
  const stop = useRef(false)

  useEffect(() => {
    let alive = true
    void fetch(`${BASE}audio/levels.json`)
      .then((r) => r.json() as Promise<Lists>)
      .then(async (l) => {
        if (!alive) return
        setLists(l)
        const counts: Partial<Record<LevelId, number>> = {}
        for (const lv of LEVELS) counts[lv.id] = await cachedCount(l[lv.id] ?? [])
        if (alive) setHave(counts)
      })
      .catch(() => alive && setLists(null))
    return () => {
      alive = false
      stop.current = true
    }
  }, [])

  async function download(level: LevelId) {
    const keys = lists?.[level] ?? []
    stop.current = false
    setBusy({ level, done: 0 })
    let done = 0
    let i = 0
    const worker = async () => {
      while (i < keys.length && !stop.current) {
        const k = keys[i++]
        try {
          const res = await fetch(`${BASE}audio/${k}.mp3`)
          // Không có service worker (chế độ dev): tự lưu vào cache.
          if (res.ok && 'caches' in window && !navigator.serviceWorker?.controller) await (await caches.open(CACHE)).put(`${BASE}audio/${k}.mp3`, res.clone())
        } catch {
          /* mất mạng giữa chừng: bỏ qua file này */
        }
        done++
        if (done % 20 === 0 || done === keys.length) setBusy({ level, done })
      }
    }
    await Promise.all(Array.from({ length: 6 }, worker))
    setHave((h) => ({ ...h, [level]: done }))
    setBusy(null)
    void cachedCount(keys).then((n) => setHave((h) => ({ ...h, [level]: n })))
  }

  if (!lists) return <p className="py-3 text-sm text-muted">Không đọc được danh sách audio (cần kết nối mạng).</p>
  return (
    <div className="py-2">
      <p className="mb-2 text-sm text-muted">Tải trước giọng đọc để học khi không có mạng. Mỗi cấp độ khoảng 10–25 MB.</p>
      <ul className="grid gap-2">
        {LEVELS.map((lv) => {
          const total = lists[lv.id]?.length ?? 0
          const n = have[lv.id] ?? 0
          const full = total > 0 && n >= total
          const running = busy?.level === lv.id
          return (
            <li key={lv.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
              <div className="min-w-0 flex-1">
                <p className="font-bold">{lv.title}</p>
                <p className="text-xs text-muted">{running ? `Đang tải ${busy.done}/${total}` : `${n}/${total} file đã lưu`}</p>
              </div>
              {full ? (
                <span className="flex items-center gap-1 text-sm font-bold text-ok"><CheckCircle2 size={18} aria-hidden /> Đã tải</span>
              ) : (
                <button type="button" className="btn-secondary flex items-center gap-1 !min-h-9 !py-1.5 text-sm" disabled={!!busy} onClick={() => void download(lv.id)}>
                  <Download size={16} aria-hidden /> Tải
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
