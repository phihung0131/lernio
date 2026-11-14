import { useEffect, useRef, useState } from 'react'
import { Mic, Square, Play } from 'lucide-react'

/** Thu âm giọng người học để nghe lại. Dữ liệu chỉ nằm trong bộ nhớ trình duyệt. */
export default function Recorder() {
  const [state, setState] = useState<'idle' | 'rec' | 'ready'>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const rec = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  useEffect(() => () => { if (url) URL.revokeObjectURL(url) }, [url])

  if (typeof MediaRecorder === 'undefined')
    return <span className="text-xs text-muted">Trình duyệt chưa hỗ trợ thu âm.</span>

  async function start() {
    setErr(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      chunks.current = []
      mr.ondataavailable = (e) => chunks.current.push(e.data)
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        setUrl(URL.createObjectURL(new Blob(chunks.current, { type: mr.mimeType })))
        setState('ready')
      }
      mr.start()
      rec.current = mr
      setState('rec')
    } catch {
      setErr('Không truy cập được micro. Hãy cấp quyền micro cho trang này.')
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      {state !== 'rec' ? (
        <button className="btn-secondary !min-h-9 !px-3 !py-1 inline-flex items-center gap-1" onClick={start} aria-label="Thu âm">
          <Mic size={16} /> Thu âm
        </button>
      ) : (
        <button className="btn-secondary !min-h-9 !px-3 !py-1 inline-flex items-center gap-1 text-red-600" onClick={() => rec.current?.stop()} aria-label="Dừng thu">
          <Square size={16} /> Dừng
        </button>
      )}
      {state === 'ready' && url && (
        <button className="btn-secondary !min-h-9 !px-3 !py-1 inline-flex items-center gap-1" onClick={() => void new Audio(url).play()} aria-label="Nghe lại giọng của bạn">
          <Play size={16} /> Nghe lại
        </button>
      )}
      {err && <span className="text-xs text-red-600">{err}</span>}
    </span>
  )
}
