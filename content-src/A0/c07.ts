import { chapter, dict, dlg, ex, fill, info, lesson, listen, mc, order, table, T, tip, typ, v, warn } from '../lib'

export default chapter({
  level: 'A0',
  order: 7,
  title: 'Erste Sätze',
  titleVi: 'Những câu giao tiếp đầu tiên',
  lessons: [
    lesson({
      id: 'a0-c07-l1',
      title: 'Cảm ơn, xin lỗi, làm ơn',
      goals: ['Dùng bitte, danke, Entschuldigung', 'Trả lời Ja/Nein một cách lịch sự'],
      intro: 'Ba từ lịch sự quan trọng nhất: **danke**, **bitte**, **Entschuldigung**. Người Đức dùng rất nhiều.',
      vocab: [
        v('danke-2', 'Danke', 'cảm ơn (lịch sự)', { e: '🙏', r: 'đan-kờ' }),
        v('bitte', 'Bitte', 'làm ơn / không có gì', { e: '🤲', r: 'bí-tờ' }),
        v('danke-schon', 'Danke schön', 'cảm ơn nhiều', { e: '💐', r: 'đan-kờ sơn' }),
        v('entschuldigung', 'Entschuldigung', 'xin lỗi / xin phép', { e: '🙇', r: 'ent-sun-đi-gung' }),
        v('es-tut-mir-leid', 'Es tut mir leid', 'tôi rất tiếc', { e: '😔', r: 'ét tu-t mia lai-t' }),
        v('ja-2', 'ja', 'vâng (đồng ý)', { e: '✅', r: 'da' }),
        v('nein-2', 'nein', 'không (từ chối)', { e: '❌', r: 'nai-n' }),
      ],
      grammar: [
        T('**Bitte** có nhiều nghĩa tùy hoàn cảnh:\n- Làm ơn: *Ein Wasser, bitte.* (Cho tôi một ly nước.)\n- Không có gì (đáp lại “danke”): *Danke! – Bitte!*\n- Xin mời: khi đưa đồ cho ai.'),
        table(['Tình huống', 'Nói'], ['Muốn gọi ai / xin lỗi vì làm phiền', 'Entschuldigung!'], ['Nhận đồ, được giúp', 'Danke! / Danke schön!'], ['Đáp lại lời cảm ơn', 'Bitte! / Gern geschehen!'], ['Gây lỗi nặng hơn', 'Es tut mir leid.']),
        tip('Trong cửa hàng, nhà hàng, luôn thêm **bitte** khi yêu cầu. Thiếu “bitte” bị coi là hơi cộc lốc.'),
      ],
      examples: [dlg(['Kunde', 'Ein Kaffee, bitte.', 'Cho tôi một cà phê.'], ['Kellner', 'Bitte schön.', 'Đây ạ.'], ['Kunde', 'Danke!', 'Cảm ơn!'], ['Kellner', 'Bitte!', 'Không có gì!'])],
      ex: [
        mc('Khi ai đó cảm ơn bạn, bạn đáp thế nào?', ['Bitte', 'Hallo', 'Nein', 'Tschüss'], 0, 'Đáp lại danke bằng bitte.'),
        mc('Muốn gọi người phục vụ, bạn nói:', ['Entschuldigung', 'Gute Nacht', 'Es geht', 'Tschüss'], 0, 'Entschuldigung dùng để xin phép, gọi người.'),
        fill('Ein Kaffee, ___.', 'bitte', 'Ein Kaffee, bitte = cho tôi một cà phê.'),
      ],
      review: '- **Danke** (cảm ơn), **Bitte** (làm ơn/không có gì), **Entschuldigung** (xin lỗi/xin phép).',
    }),
    lesson({
      id: 'a0-c07-l2',
      title: 'Giới thiệu tên: Ich heiße…',
      goals: ['Hỏi và nói tên', 'Làm quen cấu trúc câu: Wie heißt du? / Ich heiße…'],
      intro: 'Bạn sẽ học câu đầy đủ đầu tiên: tự giới thiệu tên mình.',
      vocab: [
        v('ich-heisse', 'Ich heiße…', 'Tôi tên là…', { e: '🙋', r: 'ích hai-xờ' }),
        v('wie-heisst-du', 'Wie heißt du?', 'Bạn tên là gì?', { e: '❓', r: 'vi hai-xt đu' }),
        v('mein-name-ist', 'Mein Name ist…', 'Tên tôi là…', { e: '🏷️', r: 'main na-mờ ist' }),
        v('freut-mich', 'Freut mich', 'Rất vui được gặp', { e: '🤝', r: 'phroi-t mích' }),
        v('name', 'Name', 'tên', { art: 'der', e: '🏷️', r: 'na-mờ' }),
      ],
      grammar: [
        T('**Hai cách nói tên:**\n- *Ich heiße Anna.* = Tôi tên là Anna. (heißen = tên là)\n- *Mein Name ist Anna.* = Tên tôi là Anna.'),
        T('**Hỏi tên:**\n- *Wie heißt du?* (thân mật, với bạn bè)\n- *Wie heißen Sie?* (lịch sự, với người lớn)'),
        info('**Lưu ý động từ đổi đuôi:** ich heiß**e**, du heiß**t**. Chữ cuối thay đổi theo người nói. Bạn sẽ học kỹ ở A1.'),
        warn('**Tên người viết hoa** như mọi danh từ: *Anna*, *Max*. Còn “ich” (tôi) thì **không viết hoa** trừ đầu câu.'),
      ],
      examples: [dlg(['Anna', 'Hallo! Wie heißt du?', 'Chào! Bạn tên là gì?'], ['Tom', 'Ich heiße Tom. Und du?', 'Tôi tên là Tom. Còn bạn?'], ['Anna', 'Ich heiße Anna. Freut mich!', 'Tôi tên là Anna. Rất vui!'])],
      ex: [
        mc('Cách hỏi tên thân mật là:', ['Wie heißt du?', 'Wie geht’s?', 'Wo bist du?', 'Was ist das?'], 0, 'Wie heißt du? = Bạn tên là gì?'),
        order('Tôi tên là Anna', 'Ich heiße Anna', 'Cấu trúc: Ich heiße + tên.'),
        order('Bạn tên là gì', 'Wie heißt du?'),
        fill('Ich ___ Anna.', 'heiße', 'ich + heiße.'),
        dict('Ich heiße Anna.'),
      ],
      auto: { mc: 3 },
      review: '- **Ich heiße …** = Tôi tên là …\n- **Wie heißt du?** = Bạn tên là gì?\n- **Freut mich!** = Rất vui!',
    }),
  ],
})
