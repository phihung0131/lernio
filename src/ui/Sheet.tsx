import type { ReactNode } from 'react'

/** Thanh phản hồi cố định ở đáy màn hình (đúng/sai). */
export function FeedbackSheet({ tone, title, children, action }: { tone: 'ok' | 'bad'; title: ReactNode; children?: ReactNode; action: ReactNode }) {
  const bg = tone === 'ok' ? 'bg-ok-bg' : 'bg-bad-bg'
  const fg = tone === 'ok' ? 'text-ok' : 'text-bad'
  return (
    <div role="status" className={`sheet-in fixed inset-x-0 bottom-0 z-30 border-t-2 border-line ${bg}`}>
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className={`flex items-center gap-2 text-lg font-extrabold ${fg}`}>{title}</p>
          {children && <div className="mt-1 text-sm">{children}</div>}
        </div>
        <div className="sm:w-48">{action}</div>
      </div>
    </div>
  )
}
