import { Award, BookOpen, Brain, Crown, Flame, Footprints, GraduationCap, Headphones, Medal, MessagesSquare, Rocket, Sparkles, Star, Trophy, Zap, type LucideIcon } from 'lucide-react'

export interface Stats {
  streak: number
  lessons: number
  cards: number
  chapters: number
  xp: number
  reviews: number
  levelsPassed: string[]
}

export interface Badge {
  id: string
  Icon: LucideIcon
  name: string
  desc: string
  test: (s: Stats) => boolean
}

export const BADGES: Badge[] = [
  { id: 'first-lesson', Icon: Footprints, name: 'Bước đầu tiên', desc: 'Hoàn thành bài học đầu tiên', test: (s) => s.lessons >= 1 },
  { id: 'ten-lessons', Icon: BookOpen, name: 'Chăm chỉ', desc: 'Hoàn thành 10 bài học', test: (s) => s.lessons >= 10 },
  { id: 'fifty-lessons', Icon: GraduationCap, name: 'Học giả', desc: 'Hoàn thành 50 bài học', test: (s) => s.lessons >= 50 },
  { id: 'streak-3', Icon: Flame, name: '3 ngày liền', desc: 'Học 3 ngày liên tiếp', test: (s) => s.streak >= 3 },
  { id: 'streak-7', Icon: Zap, name: '1 tuần bền bỉ', desc: 'Học 7 ngày liên tiếp', test: (s) => s.streak >= 7 },
  { id: 'streak-30', Icon: Rocket, name: '1 tháng không nghỉ', desc: 'Học 30 ngày liên tiếp', test: (s) => s.streak >= 30 },
  { id: 'chapter-1', Icon: Award, name: 'Qua chapter', desc: 'Đạt bài kiểm tra chapter đầu tiên', test: (s) => s.chapters >= 1 },
  { id: 'chapter-10', Icon: Medal, name: '10 chapter', desc: 'Đạt 10 bài kiểm tra chapter', test: (s) => s.chapters >= 10 },
  { id: 'words-100', Icon: MessagesSquare, name: '100 từ', desc: 'Có 100 thẻ trong lịch ôn tập', test: (s) => s.cards >= 100 },
  { id: 'words-500', Icon: Brain, name: '500 từ', desc: 'Có 500 thẻ trong lịch ôn tập', test: (s) => s.cards >= 500 },
  { id: 'reviews-100', Icon: Headphones, name: 'Ôn tập đều', desc: 'Ôn 100 thẻ', test: (s) => s.reviews >= 100 },
  { id: 'xp-500', Icon: Star, name: '500 XP', desc: 'Đạt 500 điểm kinh nghiệm', test: (s) => s.xp >= 500 },
  { id: 'xp-5000', Icon: Sparkles, name: '5000 XP', desc: 'Đạt 5000 điểm kinh nghiệm', test: (s) => s.xp >= 5000 },
  { id: 'level-a0', Icon: Trophy, name: 'Xong A0', desc: 'Đạt bài thi cuối A0', test: (s) => s.levelsPassed.includes('A0') },
  { id: 'level-a1', Icon: Trophy, name: 'Xong A1', desc: 'Đạt bài thi cuối A1', test: (s) => s.levelsPassed.includes('A1') },
  { id: 'level-a2', Icon: Trophy, name: 'Xong A2', desc: 'Đạt bài thi cuối A2', test: (s) => s.levelsPassed.includes('A2') },
  { id: 'level-b1', Icon: Crown, name: 'Xong B1', desc: 'Hoàn thành toàn bộ lộ trình', test: (s) => s.levelsPassed.includes('B1') },
]

export const earnedBadges = (s: Stats) => BADGES.filter((b) => b.test(s)).map((b) => b.id)
