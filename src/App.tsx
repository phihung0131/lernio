import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthProvider'
import LoginPage from '@/features/auth/LoginPage'
import RequireAuth from '@/features/auth/RequireAuth'
import Layout from '@/app/Layout'
import RoadmapPage from '@/features/roadmap/RoadmapPage'
import LessonPage from '@/features/lesson/LessonPage'
import TestPage from '@/features/tests/TestPage'
import ReviewPage from '@/features/practice/ReviewPage'
import VocabularyPage from '@/features/vocabulary/VocabularyPage'
import ProgressPage from '@/features/progress/ProgressPage'
import GrammarPage from '@/features/grammar/GrammarPage'
import ListeningPage from '@/features/listening/ListeningPage'
import SettingsPage from '@/features/settings/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route index element={<RoadmapPage />} />
              <Route path="lesson/:lessonId" element={<LessonPage />} />
              <Route path="test/:chapterId" element={<TestPage />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="vocabulary" element={<VocabularyPage />} />
              <Route path="listening" element={<ListeningPage />} />
              <Route path="grammar" element={<GrammarPage />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
