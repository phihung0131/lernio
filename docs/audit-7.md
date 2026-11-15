# Audit vòng 7: giao diện mobile và chất lượng lời giải

Phạm vi:
- Chụp màn hình 390×844 (Playwright) cho các trang chính và trình học bài.
- Script kiểm tra nội dung chuyên sâu trên toàn bộ 3.408 bài tập, gồm: câu trùng, cặp ghép trùng, từ đồng nghĩa, lời giải quá ngắn, danh từ viết thường.

## Lỗi và điểm chưa tốt

| # | Mức | Vấn đề | Cách sửa |
|---|---|---|---|
| 1 | Cao | Bài tập từ vựng tự sinh không biết từ đồng nghĩa: “Gõ từ có nghĩa *sau đó*” chỉ nhận `dann`, gõ `danach` bị chấm sai. Bài ghép cặp có hai vế phải cùng là “sau đó”, nên không thể ghép chắc chắn. Tương tự với *Mấy giờ rồi?*, *tạm biệt*. | `autoExercises`: gõ từ chấp nhận mọi từ cùng nghĩa; phương án nhiễu bỏ từ đồng nghĩa; ghép cặp bỏ nghĩa trùng. Id và số bài không đổi (26 bài tập thay đổi nội dung). |
| 2 | Cao | 121 câu đúng/sai chỉ có lời giải “Đúng.”/“Sai.”, không chỉ ra căn cứ. | Lúc build, trích câu căn cứ trong bài đọc/hội thoại của bài. Chấm điểm theo từ hiếm và bỏ stopword. Nếu câu khớp là câu hỏi thì kèm câu trả lời ngay sau. 16 câu viết tay. |
| 3 | Trung bình | Khoảng 170 câu điền/chọn có lời giải chỉ lặp đáp án (“ob.”, “Gen.”, “K II.”, “Gợi ý.”). | Thêm bảng quy tắc theo đáp án (`RULES`) và bảng mở rộng ký hiệu tắt (`EXPAND`). Đã soát từng chỗ áp dụng; sửa riêng `als` (so sánh hoặc quá khứ) và `wird` (Futur hoặc Passiv). |
| 4 | Trung bình | Một số từ không đồng nghĩa nhưng mang cùng nghĩa tiếng Việt, ví dụ nein/nicht đều là “không”, dürfen/erlaubt đều là “được phép”. | Ghi rõ nghĩa: “không (câu trả lời)” / “không (phủ định)”, v.v. |
| 5 | Trung bình | Lỗi đuôi tính từ: `der frühestmöglicher Eintrittstermin`. | Sửa thành `der frühestmögliche Eintrittstermin` và sinh lại audio. |
| 6 | Thấp | Câu ví dụ của từ *stark* lại dùng danh từ *Stärken*. | Thay bằng “Er ist groß und stark.” |
| 7 | Thấp | Mobile: chip của phần đang học không tự cuộn vào khung nhìn, nên ở phần Luyện tập không thấy chip đang chọn. | Chip đang chọn tự `scrollIntoView` ra giữa. |
| 8 | Thấp | Mobile: tên bài ở thẻ “Học tiếp” bị cắt còn 1 dòng. | Cho hiển thị tối đa 2 dòng (`line-clamp-2`). |
| 9 | Thấp | Thẻ từ vựng có hai nút loa giống hệt nhau, không rõ nút nào đọc từ, nút nào đọc câu ví dụ. | Nút loa của câu ví dụ đặt ngay cạnh câu, trong khung riêng. |

## Kiểm thử

- Unit: thêm `content-src/lib.test.ts` (từ đồng nghĩa, trích căn cứ, tách câu sau số thứ tự, quy tắc thay lời giải).
- `validate:content` OK; build OK; e2e toàn bộ.
- Chrome (dev:mock): làm bài a1-c01-l5, trả lời sai câu đúng/sai và thấy bảng phản hồi hiện câu trích hội thoại kèm bản dịch.

## Còn lại

- Lời giải ngắn nhưng vẫn có nghĩa (“e → i”, “du → dir”) được giữ nguyên vì đáp án đúng đã hiển thị ngay bên trên.
- Ngữ pháp và văn phong tiếng Đức vẫn cần người bản ngữ hoặc giáo viên rà lại.
