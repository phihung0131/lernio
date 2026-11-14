import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw } from 'lucide-react'

/** Thông báo khi có phiên bản/nội dung mới. */
export default function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()
  if (!needRefresh) return null
  return (
    <div role="alert" className="card fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-md items-center gap-3 p-3 md:bottom-6">
      <RefreshCw className="text-brand" />
      <p className="flex-1 text-sm font-bold">Có nội dung mới. Tải lại để cập nhật.</p>
      <button className="btn-secondary !min-h-9 !px-3 !py-1" onClick={() => setNeedRefresh(false)}>Để sau</button>
      <button className="btn-primary !min-h-9 !px-3 !py-1" onClick={() => void updateServiceWorker(true)}>Tải lại</button>
    </div>
  )
}
