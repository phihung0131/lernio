import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthProvider'
import LoginPage from '@/features/auth/LoginPage'
import RequireAuth from '@/features/auth/RequireAuth'
import Layout from '@/app/Layout'
import Placeholder from '@/app/Placeholder'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route index element={<Placeholder title="Lộ trình" />} />
              <Route path="review" element={<Placeholder title="Ôn tập" />} />
              <Route path="vocabulary" element={<Placeholder title="Từ vựng" />} />
              <Route path="listening" element={<Placeholder title="Nghe" />} />
              <Route path="progress" element={<Placeholder title="Tiến độ" />} />
              <Route path="settings" element={<Placeholder title="Cài đặt" />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
