import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function RequireAuth() {
  const { session, loading } = useAuth()
  if (loading) return <p className="p-8 text-center">Đang tải…</p>
  if (!session) return <Navigate to="/login" replace />
  return <Outlet />
}
