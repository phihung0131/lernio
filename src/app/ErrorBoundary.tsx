import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface State {
  error: Error | null
}

/** Bắt lỗi render của từng trang để không làm trắng toàn bộ app. */
export default class ErrorBoundary extends Component<{ children: ReactNode; resetKey?: string }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidUpdate(prev: { resetKey?: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }

  componentDidCatch(error: Error) {
    console.error('[Lernio] Lỗi giao diện:', error)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div role="alert" className="mx-auto mt-10 max-w-md rounded-2xl border border-line bg-surface p-6 text-center">
        <AlertTriangle className="mx-auto mb-2 text-amber-500" size={40} aria-hidden />
        <h1 className="text-lg font-bold">Có lỗi xảy ra</h1>
        <p className="mt-1 text-sm text-muted">Trang này gặp sự cố. Tiến độ của bạn vẫn được lưu.</p>
        <button className="btn-primary mt-4" onClick={() => location.reload()}>
          Tải lại trang
        </button>
      </div>
    )
  }
}
