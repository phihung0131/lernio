// Xóa MP3 trong public/audio không còn được nội dung tham chiếu.
import { readdirSync, readFileSync, unlinkSync } from 'node:fs'
const keep = new Set(Object.keys(JSON.parse(readFileSync('.audio-manifest.json', 'utf8'))))
let n = 0
for (const f of readdirSync('public/audio')) if (f.endsWith('.mp3') && !keep.has(f.slice(0, -4))) (unlinkSync(`public/audio/${f}`), n++)
console.log(`Đã xóa ${n} file audio thừa`)
