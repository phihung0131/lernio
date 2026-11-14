import { useEffect, useMemo, useState } from 'react'
import { Eye, EyeOff, Gauge, Pause, Play } from 'lucide-react'
import { LEVELS } from '@/core/content/loader'
import { isChapterUnlocked } from '@/core/content/unlock'
import { exercisePool, sample } from '@/core/content/pool'
import type { Block, Exercise, LevelId } from '@/core/content/schema'
import { speak, speakSequence, stopAudio } from '@/core/audio/player'
import ExerciseRunner from '@/features/exercises/ExerciseRunner'
import { useChapters, useProgress } from '@/features/roadmap/useCurriculum'

type Dlg = Extract<Block, { kind: 'dialogue' }>
type Rd = Extract<Block, { kind: 'reading' }>

function DialogueCard({ d, title, rate }: { d: Dlg; title: string; rate: number }) {
  const [showVi, setShowVi] = useState(false)
  const [playing, setPlaying] = useState(false)
  return (
    <article className="card p-4">
      <header className="mb-3 flex items-center gap-2">
        <h3 className="flex-1 font-bold">{d.title ?? title}</h3>
        <button type="button" aria-label={showVi ? 'Ẩn bản dịch' : 'Hiện bản dịch'} className="rounded-full p-2 text-muted hover:bg-surface-2" onClick={() => setShowVi(!showVi)}>
          {showVi ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        <button
          type="button"
          className="btn-primary !min-h-9 !px-3 !py-1 inline-flex items-center gap-1"
          onClick={async () => {
            if (playing) {
              stopAudio()
              setPlaying(false)
              return
            }
            setPlaying(true)
            await speakSequence(d.lines.map((l) => ({ text: l.de, voice: l.voice })), rate)
            setPlaying(false)
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? 'Dừng' : 'Phát'}
        </button>
      </header>
      <ul className="space-y-2">
        {d.lines.map((l, i) => (
          <li key={i}>
            <button type="button" className="w-full rounded-xl p-2 text-left hover:bg-surface-2" onClick={() => void speak(l.de, { voice: l.voice, rate })}>
              <span className={`mr-2 text-xs font-bold ${l.voice === 'f' ? 'text-rose-500' : 'text-sky-600'}`}>{l.speaker}</span>
              <span lang="de">{l.de}</span>
              {showVi && <span className="block text-sm text-muted">{l.vi}</span>}
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function ListeningPage() {
  const chapters = useChapters()
  const progress = useProgress()
  const [level, setLevel] = useState<LevelId | null>(null)
  const [tab, setTab] = useState<'dialogues' | 'readings' | 'dictation'>('dialogues')
  const [rate, setRate] = useState(1)
  const [round, setRound] = useState(0)
  useEffect(() => () => stopAudio(), [])

  const open = useMemo(() => (chapters && progress ? chapters.filter((_c, i) => isChapterUnlocked(chapters, i, progress)) : []), [chapters, progress])
  const lv = level ?? (open.length ? open[open.length - 1].levelId : 'A0')
  const inLevel = open.filter((c) => c.levelId === lv)
  const dialogues = inLevel.flatMap((c) => c.lessons.flatMap((l) => Object.values(l.sections).flat().filter((b): b is Dlg => b.kind === 'dialogue').map((d) => ({ d, title: l.title }))))
  const readings = inLevel.flatMap((c) => c.lessons.flatMap((l) => Object.values(l.sections).flat().filter((b): b is Rd => b.kind === 'reading')))
  const dictation: Exercise[] = useMemo(
    () => sample(exercisePool(inLevel, { skills: ['listening'] }).map((p) => p.ex), 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lv, round, open.length],
  )
  if (!chapters || !progress) return <p className="p-6 text-center text-muted">Đang tải…</p>

  return (
    <div>
      <h1 className="mb-3 text-2xl font-extrabold">Luyện nghe</h1>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {LEVELS.filter((l) => open.some((c) => c.levelId === l.id)).map((l) => (
          <button key={l.id} type="button" aria-pressed={lv === l.id} onClick={() => setLevel(l.id)} className={`rounded-full border-2 px-4 py-1 text-sm font-bold ${lv === l.id ? 'border-brand bg-brand-soft text-brand' : 'border-line'}`}>
            {l.id}
          </button>
        ))}
        <button type="button" className="ml-auto inline-flex items-center gap-1 rounded-full border-2 border-line px-3 py-1 text-sm font-bold" onClick={() => setRate(rate === 1 ? 0.75 : 1)} aria-label="Đổi tốc độ phát">
          <Gauge size={16} /> {rate === 1 ? '1×' : '0.75×'}
        </button>
      </div>
      <div role="tablist" className="mb-4 grid grid-cols-3 gap-2">
        {([['dialogues', 'Hội thoại'], ['readings', 'Bài đọc'], ['dictation', 'Chính tả']] as const).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => { setTab(id); if (id === 'dictation') setRound(round + 1) }} className={tab === id ? 'btn-primary' : 'btn-secondary'}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'dialogues' && (
        <div className="space-y-3">
          {dialogues.length ? dialogues.map(({ d, title }, i) => <DialogueCard key={i} d={d} title={title} rate={rate} />) : <p className="card p-5 text-center text-muted">Chưa có hội thoại ở cấp độ này.</p>}
        </div>
      )}
      {tab === 'readings' && (
        <div className="space-y-3">
          {readings.length ? (
            readings.map((r, i) => (
              <article key={i} className="card p-4">
                <header className="mb-2 flex items-center gap-2">
                  <h3 className="flex-1 font-bold">{r.title}</h3>
                  <button type="button" className="btn-primary !min-h-9 !px-3 !py-1 inline-flex items-center gap-1" onClick={() => void speakSequence(r.de.split(/\n+/).filter(Boolean).map((t) => ({ text: t })), rate)}>
                    <Play size={16} /> Nghe
                  </button>
                </header>
                {r.de.split(/\n+/).map((p, j) => <p key={j} lang="de" className="mb-2">{p}</p>)}
              </article>
            ))
          ) : (
            <p className="card p-5 text-center text-muted">Chưa có bài đọc ở cấp độ này.</p>
          )}
        </div>
      )}
      {tab === 'dictation' && (dictation.length ? <ExerciseRunner key={round} exercises={dictation} onFinish={() => {}} /> : <p className="card p-5 text-center text-muted">Chưa có bài nghe ở cấp độ này.</p>)}
    </div>
  )
}
