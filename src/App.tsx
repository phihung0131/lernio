import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthProvider'
import LoginPage from '@/features/auth/LoginPage'
import RequireAuth from '@/features/auth/RequireAuth'
import Layout from '@/app/Layout'
import ErrorBoundary from '@/app/ErrorBoundary'
import { ToastProvider } from '@/ui/Toast'
import HomePage from '@/features/home/HomePage'
import PathMap from '@/features/roadmap/PathMap'
import LessonPlayer from '@/features/lesson/LessonPlayer'
import TestPage from '@/features/tests/TestPage'
import ReviewPage from '@/features/practice/ReviewPage'
import PracticeHub from '@/features/practice/PracticeHub'
import WeakPage from '@/features/practice/WeakPage'
import MixPractice from '@/features/practice/MixPractice'
import MockList from '@/features/mock/MockList'
import MockTest from '@/features/mock/MockTest'
import VocabularyPage from '@/features/vocabulary/VocabularyPage'
import GrammarPage from '@/features/grammar/GrammarPage'
import ListeningPage from '@/features/listening/ListeningPage'
import ProfilePage from '@/features/progress/ProfilePage'
import SettingsPage from '@/features/settings/SettingsPage'
import UpdatePrompt from '@/app/UpdatePrompt'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <UpdatePrompt />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route path="lesson/:lessonId" element={<ErrorBoundary><LessonPlayer /></ErrorBoundary>} />
              <Route path="test/:chapterId" element={<ErrorBoundary><TestPage /></ErrorBoundary>} />
              <Route path="mock/:level" element={<ErrorBoundary><MockTest /></ErrorBoundary>} />
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
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
