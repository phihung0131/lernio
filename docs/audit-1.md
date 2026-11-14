# Audit 1 – sau khi viết lại toàn bộ nội dung A0–B1 (v2)

Ngày: 2026-11-15. Phạm vi: nội dung 205 bài, lộ trình, trình học bài, kiểm tra chapter, thi thử, ôn tập.
Cách kiểm: script rà nội dung (`content/**/*.json`), Chrome (dev:mock, desktop 1568px), unit + Playwright.

| # | Mức độ | Vấn đề | Cách sửa | Trạng thái |
|---|---|---|---|---|
| 1 | Cao | Câu hỏi về bài đọc/hội thoại (đúng/sai, “Họ gặp nhau lúc mấy giờ?”) được đưa vào ngân hàng kiểm tra chapter, thi thử, luyện tập, nhưng không hiển thị đoạn văn. Câu đúng/sai chỉ hiện nhãn như “Email của Lea”, người học không thể trả lời. | Thêm `PassageHint`: mọi bài tập (trừ bài từ vựng tự sinh) thuộc bài có đoạn đọc/hội thoại có nút “Xem đoạn văn”, mở đúng đoạn văn của bài gốc. Dùng ở mọi nơi hiển thị bài tập. | Đã sửa |
| 2 | Trung bình | 442 từ vựng xuất hiện lại ở nhiều bài (ví dụ *der Bus* ở 4 bài) tạo nhiều thẻ ôn tập trùng và nhiều dòng trùng trong trang Từ vựng. | `gen-icons.ts` sinh `src/generated/vocabCanon.ts`: id lặp → id lần đầu (chỉ gộp khi nghĩa tiếng Việt có từ chung, nên từ đồng âm như *Sie* = ông/bà ≠ họ, *vor* = kém ≠ trước, *Karte* = thẻ ≠ vé được giữ riêng). `seedCards` và trang Từ vựng dùng id gốc. | Đã sửa |
| 3 | Trung bình | Lộ trình mất khoảng 8 giây ở dev mới hiện, do parse Zod 3 MB nội dung mỗi lần tải và tải tuần tự từng level. | Bản build bỏ parse Zod (JSON đã kiểm lúc build), tải 4 level song song. | Đã sửa |
| 4 | Thấp | Bài đã hoàn thành không nhảy được tới các phần phía sau (tab phần bị khóa). | Bài đã hoàn thành: mọi tab phần bấm được. | Đã sửa |
| 5 | Thấp | Nút “Xem đoạn văn” trong kiểm tra cũng hiện bản dịch hội thoại, có thể lộ đáp án. | Chấp nhận ở vòng này (app học, không phải thi chính thức). | Theo dõi |
| 6 | Thấp | Phần Hören của thi thử chỉ gồm câu nghe từ đơn lẻ, chưa có nghe hội thoại dài như đề thật. | Thêm tối đa 4 câu từ bài “Luyện nghe” của chapter Gesamttest, gắn `mode:listen`: chỉ có nút “Nghe đoạn hội thoại”, không hiện chữ. | Đã sửa |
| 8 | Cao | Lựa chọn của câu trắc nghiệm và câu kiểm tra nhanh ngữ pháp hiển thị đúng thứ tự trong dữ liệu: đáp án đúng gần như không bao giờ ở vị trí 4 (931/914/748/6 cho vị trí 1/2/3/4), dễ đoán. | `ExerciseView` và `StepQuiz` xáo lựa chọn mỗi lần hiển thị, chấm theo chỉ số gốc. | Đã sửa |
| 7 | Trung bình | Thi thử có thể lặp cùng một câu trong một phần (so sánh đối tượng thay vì id khi bù câu từ level dưới) và giữa các phần. | `buildMock` lọc theo id, theo dõi câu đã dùng giữa các phần; thêm unit test. | Đã sửa |

| 9 | Thấp | Test e2e “cài đặt” thỉnh thoảng hỏng: tải lại trang trước khi IndexedDB lưu xong. | Đợi giao diện phản ánh giá trị đã lưu rồi mới reload. | Đã sửa |
| 10 | Thấp | Chưa có kiểm tra tự động cho màn hình điện thoại. | Thêm e2e “mobile 390px”: 11 trang chính không tràn ngang. | Đã sửa |

## Đã kiểm trên Chrome
- Mở khóa giả tới B1 (ghi tiến độ vào IndexedDB của tài khoản dev): lộ trình B1 hiển thị đúng, bài b1-c01-l1 đi qua giới thiệu, từ vựng, ngữ pháp từng bước (câu kiểm tra nhanh chấm đúng), bài đọc, luyện tập.
- Thi thử A2 mở, đồng hồ chạy, câu nghe phát được.
- Kiểm tra chapter A1-c12: câu hỏi có nút “Xem đoạn văn”, mở ra hội thoại đúng của bài.
