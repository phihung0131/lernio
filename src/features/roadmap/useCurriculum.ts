import { useEffect, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/core/db/db'
import { loadAllChapters } from '@/core/content/loader'
import type { Chapter } from '@/core/content/schema'
import type { Progress } from '@/core/content/unlock'

export function useChapters() {
  const [chapters, setChapters] = useState<Chapter[] | null>(null)
  useEffect(() => {
    let alive = true
    loadAllChapters().then((c) => alive && setChapters(c))
    return () => {
      alive = false
    }
  }, [])
  return chapters
}

export function useProgress(): Progress | undefined {
  return useLiveQuery(async () => {
    const [ls, cs] = await Promise.all([db.lessonProgress.toArray(), db.chapterResults.toArray()])
    return {
      lessons: Object.fromEntries(ls.map((l) => [l.lessonId, l.status])),
      chaptersPassed: Object.fromEntries(cs.map((c) => [c.chapterId, c.passed])),
    }
  }, [])
}
