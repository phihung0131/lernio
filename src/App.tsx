import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthProvider'
import LoginPage from '@/features/auth/LoginPage'
import RequireAuth from '@/features/auth/RequireAuth'
import Layout from '@/app/Layout'
import ErrorBoundary from '@/app/ErrorBoundary'
import { ToastProvider } from '@/ui/Toast'
import UpdatePrompt from '@/app/UpdatePrompt'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const PathMap = lazy(() => import('@/features/roadmap/PathMap'))
const LessonPlayer = lazy(() => import('@/features/lesson/LessonPlayer'))
const TestPage = lazy(() => import('@/features/tests/TestPage'))
const ReviewPage = lazy(() => import('@/features/practice/ReviewPage'))
const PracticeHub = lazy(() => import('@/features/practice/PracticeHub'))
const WeakPage = lazy(() => import('@/features/practice/WeakPage'))
const MixPractice = lazy(() => import('@/features/practice/MixPractice'))
const MockList = lazy(() => import('@/features/mock/MockList'))
const MockTest = lazy(() => import('@/features/mock/MockTest'))
const VocabularyPage = lazy(() => import('@/features/vocabulary/VocabularyPage'))
const GrammarPage = lazy(() => import('@/features/grammar/GrammarPage'))
const ListeningPage = lazy(() => import('@/features/listening/ListeningPage'))
const ProfilePage = lazy(() => import('@/features/progress/ProfilePage'))
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'))

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <UpdatePrompt />
          {/* Mỗi trang là một chunk riêng: lần mở đầu chỉ tải phần cần thiết. */}
          <Suspense fallback={<p className="p-8 text-center text-muted">Đang tải…</p>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<RequireAuth />}>
                <Route
                  path="lesson/:lessonId"
                  element={
                    <ErrorBoundary>
                      <LessonPlayer />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="test/:chapterId"
                  element={
                    <ErrorBoundary>
                      <TestPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="mock/:level"
                  element={
                    <ErrorBoundary>
                      <MockTest />
                    </ErrorBoundary>
                  }
                />
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="path" element={<PathMap />} />
                  <Route path="review" element={<ReviewPage />} />
                  <Route path="practice" element={<PracticeHub />} />
                  <Route path="practice/weak" element={<WeakPage />} />
                  <Route path="practice/mix" element={<MixPractice />} />
                  <Route path="mock" element={<MockList />} />
                  <Route path="vocabulary" element={<VocabularyPage />} />
                  <Route path="grammar" element={<GrammarPage />} />
                  <Route path="listening" element={<ListeningPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="progress" element={<Navigate to="/profile" replace />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
