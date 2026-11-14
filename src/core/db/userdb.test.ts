import { describe, expect, it } from 'vitest'
import { closeUserDb, openUserDb } from './db'
import * as dbMod from './db'

describe('per-user DB', () => {
  it('keeps data of different users separate', async () => {
    await openUserDb('user-a')
    await dbMod.db.lessonProgress.put({ lessonId: 'l1', status: 'completed', updatedAt: 'x' })
    await openUserDb('user-b')
    expect(await dbMod.db.lessonProgress.count()).toBe(0)
    await openUserDb('user-a')
    expect(await dbMod.db.lessonProgress.get('l1')).toMatchObject({ status: 'completed' })
    closeUserDb()
  })
  it('status index exists (no DexieError on where status)', async () => {
    await openUserDb('user-c')
    await dbMod.db.lessonProgress.put({ lessonId: 'l2', status: 'completed', updatedAt: 'x' })
    expect(await dbMod.db.lessonProgress.where('status').equals('completed').count()).toBe(1)
    closeUserDb()
  })
})
