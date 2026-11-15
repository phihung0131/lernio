# Audit 6 – học offline và đồng bộ lại

Ngày: 2026-11-15. Trước đây chưa có kiểm tra tự động nào cho chế độ offline (service worker chỉ có ở bản build, e2e chạy trên dev server).

| # | Mức độ | Vấn đề | Cách sửa | Trạng thái |
|---|---|---|---|---|
| 1 | Trung bình | Không có test cho yêu cầu cốt lõi “học được offline”. | Playwright chạy thêm bản build thật (`vite build --outDir dist-e2e` + `vite preview` cổng 4173, Supabase giả). Test mới `e2e/offline.spec.ts`: đăng nhập, đợi service worker điều khiển trang, tắt mạng, tải lại → trang chủ, lộ trình, học trọn bài 1 vẫn chạy; bài 2 được mở; outbox có bản ghi chờ. Bật mạng lại → outbox tự đẩy lên và trống. | Đã thêm, qua |
| 2 | Thông tin | Service worker dạng `prompt` không tự điều khiển trang lần đầu: lần mở đầu tiên chỉ cài đặt, từ lần tải lại thứ hai mới chạy offline. | Đúng thiết kế (tránh đổi phiên bản giữa chừng khi đang học). Thêm chỉ báo trong Cài đặt > Học offline: “Bài học đã sẵn sàng dùng offline” hoặc hướng dẫn mở lại app một lần khi có mạng. | Đã cải thiện |
| 3 | Thông tin | Route giả của Playwright vẫn trả lời khi `setOffline(true)`, nên test phải cho REST lỗi mạng để mô phỏng mất kết nối thật. | Đã xử lý trong test. | OK |
