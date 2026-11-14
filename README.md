# Lernio

App học tiếng Đức từ số 0 đến B1. PWA (React + Vite), đăng nhập và đồng bộ qua Supabase, học offline.

- Nội dung: A0 (10 chapter), A1 (13), A2 (10), B1 (10), kèm audio giọng Đức (Piper TTS).
- Lộ trình khóa chặt tuần tự; cần đạt từ 80% bài kiểm tra cuối chapter để mở chapter tiếp.
- Ôn tập lặp lại FSRS, XP, streak, huy hiệu, thu âm giọng so sánh, thư viện ngữ pháp, luyện nghe.

## Chạy local
1. `npm install`
2. Tạo project tại supabase.com, chạy `supabase/migrations/0001_init.sql` trong SQL editor.
3. Authentication > Providers: bật Email; bật Google nếu muốn (cần Google OAuth client).
4. Authentication > URL Configuration: thêm `http://localhost:5173` vào Redirect URLs.
5. Copy `.env.example` thành `.env`, điền `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` (publishable key).
6. `npm run dev` rồi mở http://localhost:5173

## Soạn nội dung
Nguồn nằm ở `content-src/<LEVEL>/cNN.ts` (dùng DSL trong `content-src/lib.ts`).
- `npm run build:content` biên dịch sang `content/**/*.json` (kiểm tra bằng Zod)
- `npm run validate:content` kiểm tra id trùng, tham chiếu sai, đủ số câu hỏi test
- `npm run audio` gom câu cần phát âm; sau đó sinh MP3:
  `python scripts/gen_audio.py path/to/de_DE-thorsten-medium.onnx` (cần `pip install piper-tts` và `ffmpeg`)

## Test
- `npm test` unit test (Vitest)
- `npx playwright test` e2e (Supabase được mock, dùng Chrome hệ thống)

Lưu ý: gói free Supabase tạm dừng project sau 1 tuần không hoạt động.
