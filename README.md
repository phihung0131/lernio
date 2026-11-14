# Lernio

App học tiếng Đức từ số 0 đến B1 cho người Việt. PWA (React + Vite), đăng nhập và đồng bộ qua Supabase, học được offline.

- Nội dung: A0 (10 chapter × 4 bài), A1 (13 × 5), A2 (10 × 5), B1 (10 × 5): 205 bài, khoảng 2.100 từ vựng có câu ví dụ, bài đọc, hội thoại, nhiệm vụ viết/nói.
- Audio giọng Đức 2 vai (Piper TTS: nam Thorsten, nữ Kerstin), phát offline.
- Lộ trình khóa chặt tuần tự; cần đạt từ 80% bài kiểm tra cuối chapter để mở chapter tiếp.
- Ôn tập lặp lại FSRS (từ vựng + ngữ pháp), điểm yếu, luyện tập tổng hợp, thi thử A1/A2/B1.
- XP, mục tiêu ngày, streak, huy hiệu, thu âm giọng để so sánh, thư viện ngữ pháp, luyện nghe, giao diện sáng/tối.

## Chạy local
1. `npm install`
2. Tạo project tại supabase.com, chạy `supabase/migrations/*.sql` trong SQL editor.
3. Authentication > Providers: bật Email; bật Google nếu muốn (cần Google OAuth client, đặt `VITE_GOOGLE_ENABLED=1`).
4. Authentication > URL Configuration: thêm `http://localhost:5173` vào Redirect URLs.
5. Copy `.env.example` thành `.env`, điền `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` (publishable key).
6. `npm run dev` rồi mở http://localhost:5173

Chạy thử không cần Supabase: `npm run dev:mock` (cổng 5174, có nút "Dev: vào nhanh"; chế độ này không có trong bản build).

## Soạn nội dung
Nguồn nằm ở `content-src/<LEVEL>/cNN.ts` (DSL trong `content-src/lib.ts`).
- `npm run build:content` biên dịch sang `content/**/*.json` (kiểm tra bằng Zod), sinh danh sách icon và bảng gộp từ lặp (`src/generated/`).
- `npm run validate:content` kiểm tra id trùng, đáp án hợp lệ, cấm emoji, và ngưỡng nội dung (số từ, số bài tập, bài đọc, nhiệm vụ viết/nói).
- Audio: `VOICE_M=…/de_DE-thorsten-medium.onnx VOICE_F=…/de_DE-kerstin-low.onnx PIPER_PY=…/python ./scripts/audio.sh`
  (cần `pip install piper-tts` và `ffmpeg`; chỉ sinh câu còn thiếu, tự xóa file thừa).

## Test
- `npm test`: unit test (Vitest + fake-indexeddb)
- `npx playwright test`: e2e (Supabase được mock, dùng Chrome hệ thống)

Lưu ý: gói free Supabase tạm dừng project sau 1 tuần không hoạt động.
