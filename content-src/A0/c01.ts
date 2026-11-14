import { chapter, dlg, ex, fill, info, lesson, mc, order, T, tip, v, warn, table, typ } from '../lib'

export default chapter({
  level: 'A0',
  order: 1,
  title: 'Willkommen',
  titleVi: 'Giới thiệu tiếng Đức và cách học',
  lessons: [
    lesson({
      id: 'a0-c01-l1',
      title: 'Tiếng Đức là gì và vì sao học',
      goals: ['Biết tiếng Đức được nói ở đâu', 'Biết tiếng Đức giống và khác tiếng Việt thế nào', 'Biết 3 từ đầu tiên: Hallo, Ja, Nein'],
      intro:
        'Chào mừng bạn đến với Lernio. Bạn **không cần biết gì** về tiếng Đức hay tiếng Anh. Mọi thứ đều được giải thích bằng tiếng Việt, từng bước một.\n\nTiếng Đức (**Deutsch**) là ngôn ngữ chính thức của Đức, Áo và Thụy Sĩ (cùng với các ngôn ngữ khác ở Thụy Sĩ), và Liechtenstein. Hơn 100 triệu người dùng nó làm tiếng mẹ đẻ. Học tiếng Đức giúp bạn đi du học, làm việc và sống ở các nước này.',
      vocab: [
        v('hallo', 'Hallo', 'xin chào', { r: 'ha-lô', pos: 'lời chào' }),
        v('ja', 'ja', 'vâng, có', { r: 'da', pos: 'từ' }),
        v('nein', 'nein', 'không', { r: 'nai-n', pos: 'từ' }),
        v('deutsch', 'Deutsch', 'tiếng Đức', { r: 'đoi-ts', pos: 'danh từ' }),
        v('danke', 'danke', 'cảm ơn', { r: 'đan-kờ', pos: 'từ' }),
      ],
      grammar: [
        T('Tiếng Đức dùng **bảng chữ cái Latinh** giống tiếng Việt, nên bạn đã biết đọc hầu hết các chữ cái. Điểm khác nhau quan trọng:'),
        table(
          ['', 'Tiếng Việt', 'Tiếng Đức'],
          ['Thanh điệu', 'Có 6 thanh (ma, má, mà…)', 'Không có thanh điệu'],
          ['Dấu', 'Dấu thanh và dấu mũ', 'Chỉ có ä, ö, ü, ß'],
          ['Danh từ', 'Viết thường', 'Luôn **viết hoa** chữ cái đầu'],
          ['Giống', 'Không có', 'Danh từ có giống: der, die, das'],
          ['Động từ', 'Giữ nguyên', 'Biến đổi theo người'],
        ),
        warn('Mọi danh từ trong tiếng Đức đều viết hoa, ví dụ: **Deutsch**, **Hund** (con chó). Hãy tập thói quen này ngay từ đầu.'),
      ],
      examples: [ex('Hallo!', 'Xin chào!'), ex('Ja, danke.', 'Vâng, cảm ơn.'), ex('Nein, danke.', 'Không, cảm ơn.')],
      ex: [
        mc('Tiếng Đức KHÔNG có điều gì sau đây?', ['Danh từ viết hoa', 'Thanh điệu như tiếng Việt', 'Chữ ä, ö, ü', 'Giống der/die/das'], 1, 'Tiếng Đức không có thanh điệu. Cách đọc quyết định bởi chữ cái, không phải cao độ.'),
        fill('Danh từ trong tiếng Đức luôn viết ___ chữ cái đầu.', ['hoa', 'viết hoa'], 'Mọi danh từ tiếng Đức viết hoa chữ đầu.', 'viết hoa hay thường?'),
      ],
      review:
        '- Tiếng Đức nói ở Đức, Áo, Thụy Sĩ.\n- Dùng bảng chữ Latinh, không có thanh điệu.\n- Danh từ luôn viết hoa.\n- 5 từ đầu tiên: **Hallo, ja, nein, Deutsch, danke**.',
    }),
    lesson({
      id: 'a0-c01-l2',
      title: 'Cách học hiệu quả với Lernio',
      goals: ['Hiểu cách app hoạt động: bài học, ôn tập, kiểm tra', 'Biết cách nghe và lặp lại', 'Lập thói quen học mỗi ngày'],
      intro:
        'Học ngôn ngữ giống tập thể thao: **ít nhưng đều mỗi ngày** hiệu quả hơn nhiều so với học dồn. 15 đến 20 phút mỗi ngày là đủ để tiến bộ rõ rệt.',
      grammar: [
        T('**Mỗi bài học có 6 phần:** Giới thiệu, Từ vựng, Ngữ pháp, Ví dụ, Luyện tập, Tổng kết. Hãy đọc kỹ phần giải thích trước khi làm bài tập.'),
        T('**Bốn thói quen vàng:**\n- **Nghe trước, đọc sau.** Bấm biểu tượng loa để nghe rồi lặp lại thành tiếng.\n- **Học danh từ kèm mạo từ.** Luôn học *der Hund*, không học riêng *Hund*.\n- **Ôn tập mỗi ngày.** Mục Ôn tập dùng thuật toán lặp lại ngắt quãng, nhắc bạn đúng lúc sắp quên.\n- **Nói to.** Đừng chỉ đọc thầm. Miệng cần quen với âm mới.'),
        info('**Cách mở khóa:** bạn phải hoàn thành bài học theo thứ tự. Cuối mỗi chapter có bài kiểm tra, cần đạt từ **80%** để sang chapter tiếp theo. Nếu chưa đạt, bạn xem lại bài và làm lại thoải mái.'),
        tip('Phiên âm tiếng Việt trong app chỉ là **gần đúng** để giúp bạn bắt đầu. Hãy luôn nghe audio để bắt chước chính xác.'),
      ],
      examples: [dlg(['Lernio', 'Hallo!', 'Xin chào!'], ['Du', 'Hallo!', 'Xin chào!'])],
      ex: [
        mc('Phần nào của app giúp bạn nhớ từ lâu bằng cách nhắc đúng lúc sắp quên?', ['Kiểm tra chapter', 'Ôn tập', 'Cài đặt', 'Lộ trình'], 1, 'Mục Ôn tập dùng lặp lại ngắt quãng (FSRS).'),
        mc('Cần đạt bao nhiêu phần trăm bài kiểm tra chapter để mở chapter tiếp theo?', ['50%', '60%', '80%', '100%'], 2, 'Ngưỡng là 80%.'),
        typ('Gõ chữ “Hallo” để chào bạn (thử gõ nhé)', ['Hallo', 'hallo'], 'Hallo = xin chào. Chữ H viết hoa vì đứng đầu câu.'),
      ],
      auto: false,
      review: '- Học 15–20 phút mỗi ngày.\n- Nghe, lặp lại thành tiếng, học danh từ kèm mạo từ.\n- Đạt 80% bài kiểm tra để mở khóa chapter kế tiếp.',
    }),
  ],
})
