export interface Stats {
  streak: number
  lessons: number
  cards: number
  chapters: number
  xp: number
}
export const BADGES = [
  { id: 'first-lesson', emoji: '🌱', name: 'Bước đầu tiên', desc: 'Hoàn thành bài học đầu tiên', test: (s: Stats) => s.lessons >= 1 },
  { id: 'ten-lessons', emoji: '📚', name: 'Chăm chỉ', desc: 'Hoàn thành 10 bài học', test: (s: Stats) => s.lessons >= 10 },
  { id: 'streak-3', emoji: '🔥', name: '3 ngày liền', desc: 'Học 3 ngày liên tiếp', test: (s: Stats) => s.streak >= 3 },
  { id: 'streak-7', emoji: '⚡', name: '7 ngày liền', desc: 'Học 7 ngày liên tiếp', test: (s: Stats) => s.streak >= 7 },
  { id: 'chapter-1', emoji: '🏆', name: 'Qua chapter', desc: 'Đạt bài kiểm tra chapter đầu tiên', test: (s: Stats) => s.chapters >= 1 },
  { id: 'words-100', emoji: '💬', name: '100 từ', desc: 'Học 100 từ và thẻ', test: (s: Stats) => s.cards >= 100 },
  { id: 'xp-500', emoji: '⭐', name: '500 XP', desc: 'Đạt 500 điểm kinh nghiệm', test: (s: Stats) => s.xp >= 500 },
] as const
export const earnedBadges = (s: Stats) => BADGES.filter((b) => b.test(s)).map((b) => b.id as string)
