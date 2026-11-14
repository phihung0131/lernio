import { Award, BookOpen, Flame, Footprints, MessagesSquare, Star, Zap, type LucideIcon } from 'lucide-react'

export interface Stats {
  streak: number
  lessons: number
  cards: number
  chapters: number
  xp: number
}
export const BADGES = [
  { id: 'first-lesson', Icon: Footprints as LucideIcon, name: 'Bước đầu tiên', desc: 'Hoàn thành bài học đầu tiên', test: (s: Stats) => s.lessons >= 1 },
  { id: 'ten-lessons', Icon: BookOpen as LucideIcon, name: 'Chăm chỉ', desc: 'Hoàn thành 10 bài học', test: (s: Stats) => s.lessons >= 10 },
  { id: 'streak-3', Icon: Flame as LucideIcon, name: '3 ngày liền', desc: 'Học 3 ngày liên tiếp', test: (s: Stats) => s.streak >= 3 },
  { id: 'streak-7', Icon: Zap as LucideIcon, name: '7 ngày liền', desc: 'Học 7 ngày liên tiếp', test: (s: Stats) => s.streak >= 7 },
  { id: 'chapter-1', Icon: Award as LucideIcon, name: 'Qua chapter', desc: 'Đạt bài kiểm tra chapter đầu tiên', test: (s: Stats) => s.chapters >= 1 },
  { id: 'words-100', Icon: MessagesSquare as LucideIcon, name: '100 từ', desc: 'Học 100 từ và thẻ', test: (s: Stats) => s.cards >= 100 },
  { id: 'xp-500', Icon: Star as LucideIcon, name: '500 XP', desc: 'Đạt 500 điểm kinh nghiệm', test: (s: Stats) => s.xp >= 500 },
] as const
export const earnedBadges = (s: Stats) => BADGES.filter((b) => b.test(s)).map((b) => b.id as string)
