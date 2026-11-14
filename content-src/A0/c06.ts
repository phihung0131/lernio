import { chapter, dict, dlg, ex, fill, info, lesson, listen, mc, order, table, T, tip, typ, v, warn } from '../lib'

const greet = [
  v('hallo-informal', 'Hallo', 'xin chào (thân mật)', { r: 'ha-lô' }),
  v('guten-morgen', 'Guten Morgen', 'chào buổi sáng', { r: 'gu-tần mo-gần' }),
  v('guten-tag', 'Guten Tag', 'chào (ban ngày)', { r: 'gu-tần ta-k' }),
  v('guten-abend', 'Guten Abend', 'chào buổi tối', { r: 'gu-tần a-bần-t' }),
  v('gute-nacht', 'Gute Nacht', 'chúc ngủ ngon', { r: 'gu-tờ na-kht' }),
  v('tschuss', 'Tschüss', 'tạm biệt (thân mật)', { r: 'chuýt-x' }),
  v('auf-wiedersehen', 'Auf Wiedersehen', 'tạm biệt (lịch sự)', { r: 'ao-phờ vi-đơ-dê-hần' }),
]

export default chapter({
  level: 'A0',
  order: 6,
  title: 'Begrüßung',
  titleVi: 'Chào hỏi',
  lessons: [
    lesson({
      id: 'a0-c06-l1',
      title: 'Chào theo thời điểm trong ngày',
      goals: ['Chào đúng lúc: sáng, ngày, tối', 'Biết chào lịch sự và thân mật'],
      intro: 'Người Đức chào theo **thời điểm trong ngày**. Đây là câu đầu tiên bạn nói khi gặp bất kỳ ai, nên hãy thuộc nằm lòng.',
      vocab: greet,
      grammar: [
        table(
          ['Thời điểm', 'Lời chào'],
          ['Sáng sớm đến khoảng 10h', 'Guten Morgen'],
          ['Cả ngày (khoảng 10h đến chiều)', 'Guten Tag'],
          ['Chiều tối', 'Guten Abend'],
          ['Trước khi đi ngủ', 'Gute Nacht'],
        ),
        warn('Hallo dùng với **người quen**, bạn bè, người cùng tuổi. Với người lớn tuổi hoặc trong công việc, nên dùng **Guten Tag**. Tạm biệt cũng vậy: **Tschüss** (thân mật) và **Auf Wiedersehen** (lịch sự).'),
        info('Ở miền Nam nước Đức và Áo, người ta hay nói **Grüß Gott** (chào) và **Servus**. Ở miền Bắc có **Moin** (chào bất kỳ lúc nào). Chỉ cần nhận ra, chưa cần dùng.'),
        tip('Chữ “Guten” (với -n) dùng trước Morgen/Tag/Abend, còn “Gute” (không -n) dùng với Nacht. Bạn sẽ hiểu lý do ở bài sau (giống của danh từ).'),
      ],
      examples: [
        dlg(['Anna', 'Guten Morgen!', 'Chào buổi sáng!'], ['Tom', 'Guten Morgen, Anna!', 'Chào buổi sáng, Anna!']),
        dlg(['Lea', 'Hallo, Max!', 'Chào Max!'], ['Max', 'Hallo, Lea! Tschüss!', 'Chào Lea! Tạm biệt!']),
      ],
      ex: [
        mc('Bạn gặp thầy giáo lúc 8h sáng. Câu nào phù hợp nhất?', ['Guten Morgen', 'Gute Nacht', 'Guten Abend', 'Tschüss'], 0, 'Sáng sớm: Guten Morgen.'),
        mc('Trước khi đi ngủ bạn nói gì?', ['Guten Tag', 'Gute Nacht', 'Guten Morgen', 'Hallo'], 1, 'Gute Nacht = chúc ngủ ngon.'),
        fill('Lúc 7 giờ tối, bạn nói: Guten ___', 'Abend', 'Buổi tối: Guten Abend.'),
      ],
      review: '- Morgen (sáng), Tag (ngày), Abend (tối), Nacht (đêm).\n- Thân mật: **Hallo / Tschüss**. Lịch sự: **Guten Tag / Auf Wiedersehen**.',
    }),
    lesson({
      id: 'a0-c06-l2',
      title: 'Hỏi thăm sức khỏe',
      goals: ['Hỏi “Bạn khỏe không?” và trả lời'],
      intro: 'Sau khi chào, người Đức thường hỏi thăm. Bạn sẽ học cách hỏi và trả lời bằng ba mức: tốt, bình thường, không tốt.',
      vocab: [
        v('wie-gehts', 'Wie geht’s?', 'Bạn khỏe không?', { r: 'vi gê-ts' }),
        v('gut', 'gut', 'tốt', { r: 'gu-t', pos: 'tính từ' }),
        v('sehr-gut', 'sehr gut', 'rất tốt', { r: 'dê-r gu-t' }),
        v('es-geht', 'es geht', 'tạm được', { r: 'ét gê-t' }),
        v('schlecht', 'schlecht', 'tệ', { r: 'slếch-t', pos: 'tính từ' }),
        v('und-dir', 'Und dir?', 'Còn bạn?', { r: 'un-t đi-ơ' }),
      ],
      grammar: [
        T('**Hỏi:** *Wie geht’s?* (thân mật) hoặc *Wie geht es Ihnen?* (lịch sự).\n\n**Trả lời:** *Gut, danke!* (Tốt, cảm ơn!) rồi hỏi lại: *Und dir?* (Còn bạn?).'),
        table(['Mức', 'Tiếng Đức', 'Nghĩa'], ['Rất tốt', 'Sehr gut!', 'Rất tốt'], ['Tốt', 'Gut, danke.', 'Tốt, cảm ơn'], ['Bình thường', 'Es geht.', 'Tạm được'], ['Không tốt', 'Nicht so gut. / Schlecht.', 'Không tốt lắm / Tệ']),
        tip('Người Đức thường trả lời thật lòng. “Es geht” (tạm được) rất phổ biến, và không bị coi là bất lịch sự.'),
      ],
      examples: [dlg(['Anna', 'Hallo! Wie geht’s?', 'Chào! Bạn khỏe không?'], ['Tom', 'Gut, danke. Und dir?', 'Tốt, cảm ơn. Còn bạn?'], ['Anna', 'Es geht.', 'Tạm được.'])],
      ex: [
        mc('Câu nào có nghĩa “Tạm được”?', ['Es geht', 'Sehr gut', 'Schlecht', 'Danke'], 0, 'Es geht = tạm được.'),
        order('Tốt, cảm ơn', 'Gut, danke', 'Gut, danke = Tốt, cảm ơn.'),
        order('Còn bạn thì sao', 'Und dir?'),
        dict('Wie geht’s?'),
      ],
      review: '- **Wie geht’s?** Bạn khỏe không?\n- **Gut, danke. Und dir?** Tốt, cảm ơn. Còn bạn?\n- Các mức: sehr gut, gut, es geht, schlecht.',
    }),
  ],
})
