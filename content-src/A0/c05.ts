import { chapter, dict, ex, lesson, listen, mc, table, T, tip, typ, v, info, order } from '../lib'

export default chapter({
  level: 'A0',
  order: 5,
  title: 'Lesen und Silben',
  titleVi: 'Cách ghép âm và đọc từ',
  lessons: [
    lesson({
      id: 'a0-c05-l1',
      title: 'Chia âm tiết và trọng âm',
      goals: ['Chia từ thành âm tiết', 'Biết trọng âm thường rơi vào âm tiết đầu'],
      intro: 'Từ dài trông đáng sợ, nhưng chỉ là nhiều từ ngắn ghép lại. Bí quyết: **chia thành âm tiết** (mỗi âm tiết có đúng một nguyên âm), rồi đọc từng phần.',
      vocab: [
        v('banane', 'Banane', 'quả chuối', { art: 'die', e: '🍌', r: 'ba-na-nờ' }),
        v('kaffee', 'Kaffee', 'cà phê', { art: 'der', e: '☕', r: 'ka-phê' }),
        v('computer', 'Computer', 'máy tính', { art: 'der', e: '💻', r: 'kôm-piu-tơ' }),
        v('familie', 'Familie', 'gia đình', { art: 'die', e: '👨‍👩‍👧', r: 'pha-mi-li-ờ' }),
        v('telefon', 'Telefon', 'điện thoại', { art: 'das', e: '📞', r: 'tê-lê-phôn' }),
        v('student', 'Student', 'sinh viên', { art: 'der', e: '🎓', r: 'sờ-tu-đent' }),
      ],
      grammar: [
        T('**Cách chia âm tiết:** đếm số nguyên âm (hoặc nguyên âm đôi như ei, au). Mỗi nguyên âm là một âm tiết. Ví dụ:\n- Ba-na-ne = 3 âm tiết\n- Fa-mi-li-e = 4 âm tiết\n- Haus = 1 âm tiết (au là một nguyên âm đôi)'),
        table(['Từ', 'Âm tiết', 'Trọng âm'], ['Banane', 'Ba-NA-ne', 'âm giữa (từ vay mượn)'], ['Kaffee', 'KAF-fee hoặc ka-FEE', 'tùy vùng'], ['Computer', 'com-PU-ter', 'âm 2'], ['Familie', 'Fa-MI-li-e', 'âm 2'], ['Telefon', 'Te-le-FON', 'âm cuối'], ['Student', 'Stu-DENT', 'âm cuối']),
        info('**Trọng âm:** với từ tiếng Đức gốc, trọng âm **thường ở âm tiết đầu** (VA-ter, WAS-ser, SCHU-le). Từ vay mượn từ ngôn ngữ khác thường có trọng âm ở nơi khác. Cứ nghe audio là biết.'),
        tip('Tiếng Đức có **nhiều từ vay mượn quốc tế** (Computer, Telefon, Hotel, Taxi, Bank). Bạn sẽ nhận ra rất nhiều từ ngay.'),
      ],
      examples: [ex('Das Telefon', 'cái điện thoại'), ex('Der Computer', 'cái máy tính'), ex('Die Familie', 'gia đình')],
      ex: [
        mc('Từ “Banane” có mấy âm tiết?', ['2', '3', '4', '5'], 1, 'Ba-na-ne: 3 nguyên âm → 3 âm tiết.'),
        mc('Từ “Haus” có mấy âm tiết?', ['1', '2', '3'], 0, 'au là một nguyên âm đôi, nên Haus chỉ có 1 âm tiết.'),
        dict('der Computer'),
      ],
      review: '- Mỗi nguyên âm (hoặc cặp nguyên âm) = 1 âm tiết.\n- Từ gốc Đức thường nhấn **âm đầu**.\n- Nhiều từ vay mượn: Computer, Telefon, Banane…',
    }),
    lesson({
      id: 'a0-c05-l2',
      title: 'Luyện đọc từ và cụm từ',
      goals: ['Đọc to các từ bạn đã học', 'Đọc được cụm hai từ đơn giản'],
      intro: 'Giờ bạn đã biết chữ cái, nguyên âm, và các tổ hợp. Hãy kết hợp tất cả để đọc từ mới. **Nghe, lặp lại, đối chiếu** là cách duy nhất.',
      vocab: [
        v('apfel', 'Apfel', 'quả táo', { art: 'der', e: '🍎', r: 'áp-phồl' }),
        v('brot', 'Brot', 'bánh mì', { art: 'das', e: '🍞', r: 'brốt' }),
        v('tisch', 'Tisch', 'cái bàn', { art: 'der', e: '🪑', r: 'tí-s' }),
        v('katze', 'Katze', 'con mèo', { art: 'die', e: '🐱', r: 'ka-tsờ' }),
        v('hund', 'Hund', 'con chó', { art: 'der', e: '🐶', r: 'hun-t' }),
        v('auto', 'Auto', 'ô tô', { art: 'das', e: '🚗', r: 'ao-tô' }),
      ],
      grammar: [
        T('**Quy trình đọc từ mới (4 bước):**\n- **Bước 1:** nhìn từ, tìm các tổ hợp đã học (ch, sch, ei, ie…).\n- **Bước 2:** chia âm tiết.\n- **Bước 3:** đọc từng âm tiết rồi ghép lại.\n- **Bước 4:** bấm nghe và so sánh.'),
        table(['Từ', 'Phân tích', 'Đọc'], ['Apfel', 'pf = “pf”', 'áp-phồl'], ['Tisch', 'sch = “s”', 'ti-s'], ['Katze', 'tz = “ts”', 'ka-tsờ'], ['Hund', 'd cuối = “t”', 'hun-t'], ['Auto', 'au = “ao”', 'ao-tô']),
        tip('Hãy thử đọc to từng từ trong bảng trước khi bấm nghe. Sai không sao, nghe lại sẽ nhớ.'),
      ],
      examples: [ex('Der Hund ist gut.', 'Con chó ngoan.'), ex('Die Katze und der Hund', 'con mèo và con chó'), ex('Das Brot und der Apfel', 'bánh mì và quả táo')],
      ex: [
        mc('Chữ “tz” trong “Katze” đọc thế nào?', ['“ts”', '“t”', '“z”', '“s”'], 0, 'tz = ts.'),
        order('Con chó và con mèo', 'der Hund und die Katze'),
        dict('die Katze'),
        listen('der Tisch', ['der Tisch', 'der Fisch', 'der Tag', 'der Hund'], 0),
      ],
      review: '- Đọc theo 4 bước: tổ hợp → âm tiết → ghép → nghe đối chiếu.\n- **tz = ts**, **pf = pf**.',
    }),
  ],
})
