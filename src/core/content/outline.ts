import { useEffect, useState } from 'react'
import { OUTLINE } from '@/generated/outline'
import { loadLevel } from './loader'
import type { Chapter, LevelId } from './schema'

/** Mục lục chapter (không có nội dung bài): đủ cho lộ trình, khóa/mở và tiến độ. */
export interface LessonOutline {
  id: string
  title: string
  objectives: string[]
}
export interface ChapterOutline {
  id: string
  levelId: LevelId
  order: number
  title: string
  titleVi: string
  lessons: LessonOutline[]
}

export { OUTLINE }

/** Tải nội dung đầy đủ của một chapter (chỉ level chứa nó). null khi không tồn tại. */
export function useChapter(chapterId: string | undefined): Chapter | null | undefined {
  const levelId = OUTLINE.find((c) => c.id === chapterId)?.levelId
  const [ch, setCh] = useState<Chapter | null | undefined>(undefined)
  useEffect(() => {
    if (!levelId) return
    let alive = true
    loadLevel(levelId).then((list) => alive && setCh(list.find((c) => c.id === chapterId) ?? null))
    return () => {
      alive = false
    }
  }, [chapterId, levelId])
  if (!levelId) return null
  return ch && ch.id === chapterId ? ch : undefined
}
