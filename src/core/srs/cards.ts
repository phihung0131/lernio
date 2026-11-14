import type { Lesson } from '@/core/content/schema'
import { canonVocabId } from '@/generated/vocabCanon'
import { addCardIfMissing } from './fsrs'

/** Khi hoàn thành bài: thêm mọi từ vựng và chủ đề ngữ pháp của bài vào hàng đợi ôn tập.
 *  Từ đã xuất hiện ở bài trước dùng chung thẻ với lần đầu (id gốc). */
export async function seedCards(lesson: Lesson) {
  for (const v of lesson.vocab) await addCardIfMissing(`vocab:${canonVocabId(v.id)}`, 'vocab')
  for (const g of lesson.teaches) await addCardIfMissing(`grammar:${g}`, 'grammar')
}
