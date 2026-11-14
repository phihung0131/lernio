# Lernio

App học tiếng Đức từ số 0 đến B1. PWA (React + Vite), đăng nhập và đồng bộ qua Supabase, học offline.

## Chạy local
1. `npm install`
2. Tạo project tại supabase.com, chạy `supabase/migrations/0001_init.sql` trong SQL editor.
3. Authentication > Providers: bật Email; bật Google nếu muốn (cần Google OAuth client).
4. Authentication > URL Configuration: thêm `http://localhost:5173` vào Redirect URLs.
5. Copy `.env.example` thành `.env`, điền `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`.
6. `npm run dev`

## Lệnh
- `npm test` chạy unit test
- `npm run validate:content` kiểm tra file nội dung trong `content/`
- `npm run build` build + service worker

Lưu ý: gói free Supabase tạm dừng project sau 1 tuần không hoạt động.
