# Audit 4 – luồng người dùng mới

Ngày: 2026-11-15. Cách kiểm: xóa IndexedDB của tài khoản dev, đi lại từ đầu trên Chrome: trang chủ → bài đầu tiên (trả lời đúng lẫn sai) → kết quả → lộ trình → Ôn tập.

| # | Mức độ | Vấn đề | Cách sửa | Trạng thái |
|---|---|---|---|---|
| 1 | Cao | Sau khi chọn đáp án ở câu trắc nghiệm (bài tập, kiểm tra, thi thử, Ôn tập), lựa chọn đúng/sai **không được tô xanh/đỏ**. Nguyên nhân: `.btn-secondary` là CSS ngoài layer nên đè lên tiện ích Tailwind v4 (`border-ok`, `bg-ok-bg`); thêm nữa nút bị khóa mờ 55%. | Đưa `.field`, `.btn-*`, `.card` vào `@layer components` để tiện ích ghi đè được; nút đã chấm đúng/sai giữ độ rõ 100%. Đã kiểm trên Chrome ở Ôn tập: đáp án sai viền đỏ, đáp án đúng viền xanh. | Đã sửa |
| 2 | Thấp | Nút “Xem đoạn văn” hiện cả ở bài nối cặp, sắp xếp câu… vốn không hỏi về đoạn văn. | Chỉ hiện cho câu đúng/sai và trắc nghiệm (không phải bài từ vựng tự sinh). | Đã sửa |
| 3 | Thông tin | Luồng chính hoạt động: trả lời 3/14 câu đúng vẫn hoàn thành được bài (khóa nằm ở bài kiểm tra chapter 80%), nhận 26 XP, streak 1 ngày, huy hiệu “Bước đầu tiên”, chapter 1 hiện 20%, Ôn tập có 8 thẻ từ bài vừa học, trang chủ hiện “8 thẻ đến hạn”, “Điểm yếu: 3 mục”. | Không cần sửa. | OK |
