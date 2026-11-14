# Audit 2 – chấm câu gõ, hiệu năng tải trang

Ngày: 2026-11-15. Phạm vi: toàn bộ 3623 bài tập (script kiểm cấu trúc), chấm đáp án gõ, kích thước bundle và PWA.

| # | Mức độ | Vấn đề | Cách sửa | Trạng thái |
|---|---|---|---|---|
| 1 | Trung bình | Câu dịch/gõ bị chấm sai chỉ vì thiếu dấu phẩy giữa câu (“Leider kann ich nicht, ich muss arbeiten”) hoặc gõ ngoặc kép thường thay cho „“. | `norm()` bỏ mọi dấu câu (. , ! ? ; : „ “ ” « » … –) khi so sánh; vẫn phân biệt đuôi ngữ pháp (dem ≠ den). Thêm unit test. | Đã sửa |
| 2 | Trung bình | Bundle chính 975 kB (gzip 282 kB): mọi trang được nạp ngay lần mở đầu. | Tách code theo route bằng `React.lazy` + `Suspense` (trong Layout để giữ sidebar khi chuyển trang). Bundle chính còn 506 kB (gzip 149 kB); PWA vẫn precache mọi chunk nên học offline không đổi. | Đã sửa |
| 3 | Thông tin | Script kiểm 3623 bài tập: không có lựa chọn trùng, chỉ số đáp án sai, câu điền thiếu `___`, sắp câu không khớp từ, bài thiếu giải thích. | Không cần sửa. | OK |
| 4 | Trung bình | Audio 5601 file (61 MB) chỉ được cache khi đã nghe; giới hạn cache `maxEntries: 5000` nhỏ hơn số file. Kế hoạch có nút “tải trước audio theo cấp độ” nhưng chưa làm, nên không học offline trọn vẹn được. | `collect-audio.ts` sinh `public/audio/levels.json`; Cài đặt có mục “Học offline”: tải từng cấp độ (6 luồng song song, hiện tiến độ, đếm file đã lưu). Tăng `maxEntries` lên 10000. Đã thử trên Chrome: A0 878/878. | Đã sửa |
| 5 | Trung bình | Rà 300+ câu đúng/sai “Đúng” bằng script (từ khóa không có trong đoạn văn): A1-c11-l2 “Tom hat am Montag keine Zeit” không có căn cứ (hội thoại không nhắc thứ Hai); B1-c06-l5 dùng từ chưa học “Azubis”. Các trường hợp khác là diễn đạt lại hợp lệ. | Sửa thành “Tom hat heute keine Zeit” (+ thêm câu “Tom arbeitet morgen” = Sai) và câu về đào tạo nghề kép dùng từ đã học. | Đã sửa |
| 6 | Thấp | Sau khi tách code theo route, test e2e dài vượt 120 giây và chờ trang bài học quá 5 giây trên dev server (biên dịch chunk + parse nội dung lần đầu). Bản build không bị ảnh hưởng. | Tăng timeout test lên 240 giây, timeout `expect` lên 15 giây. | Đã sửa |
