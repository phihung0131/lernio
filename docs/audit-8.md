# Audit vòng 8: hiệu năng tải, điều hướng và chấm bài dịch

## Lỗi và điểm chưa tốt

| # | Mức | Vấn đề | Cách sửa |
|---|---|---|---|
| 1 | Cao | Trang chủ, Lộ trình, Thi thử, trình học bài và bài kiểm tra đều gọi `loadAllChapters()`. Kết quả là phải tải đủ 43 chunk nội dung (khoảng 3,4 MB JS, khoảng 800 KB gzip) chỉ để lấy tiêu đề và id bài. Lần mở đầu tiên trên điện thoại rất chậm. | `build-content` sinh thêm `src/generated/outline.ts` (mục lục: id, tiêu đề, danh sách bài). Trang chủ, Lộ trình và danh sách Thi thử dùng mục lục này. Trình học bài và bài kiểm tra chỉ tải level chứa bài (`useChapter`). `PassageHint` chỉ tải một level. Ôn tập chỉ tải các level đã học. Đo trên bản build: Trang chủ tải 0 chunk chapter (trước đây 43), bài A0 chỉ tải 10 chapter của A0. |
| 2 | Trung bình | Bản build vẫn kèm Zod trong chunk `loader` dù không dùng tới. | Chỉ import schema động ở chế độ dev. |
| 3 | Trung bình | Chuyển URL từ `/test/A` sang `/test/B` mà không remount thì giữ lại kết quả khóa/mở của A. Hệ quả là mở được bài kiểm tra B dù đang bị khóa (tái hiện được trên Chrome). LessonPlayer cũng giữ trạng thái trang và kết quả của bài trước. | Bọc hai trang và đặt `key` theo id trên URL, để đổi bài là dựng lại từ đầu. |
| 4 | Trung bình | 50/133 bài dịch chỉ nhận một đáp án, nên câu đúng nhưng đảo trật tự hoặc dùng từ đồng nghĩa bị chấm sai. Ví dụ: “Ich rufe dich an, wenn ich fertig bin”, “Ich bin hungrig”, “Ich hoffe, du kommst”. | Thêm đáp án thay thế cho 28 câu. 22 câu còn lại chỉ có một cách nói tự nhiên. |

## Kiểm thử

- Unit: `scripts/outline.test.ts` kiểm tra mục lục khớp đúng nội dung (thứ tự chapter, id bài), để phát hiện mục lục cũ.
- Chrome (dev:mock):
  - Trang chủ, Lộ trình (A0/A1), bài a1-c01-l5, bài thi A0, Ôn tập, Thi thử, Điểm yếu đều hiển thị bình thường.
  - Đi từ `/test/a0-c10` sang `/test/a1-c02` (đang khóa) thì được chuyển về `/path`.
- Playwright: đo số byte JS tải trên bản build; chạy toàn bộ e2e.
