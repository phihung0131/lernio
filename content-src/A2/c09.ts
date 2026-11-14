import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c09-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 9,
  title: 'Verabredungen',
  titleVi: 'Hẹn gặp, lên kế hoạch, Infinitiv mit zu',
  lessons: [
    lesson({
      id: 'a2-c09-l1',
      title: 'Mời, nhận lời, từ chối',
      goals: ['Mời ai đó', 'Nhận lời và từ chối lịch sự', 'Hẹn thời gian và địa điểm'],
      intro: 'Hẹn gặp bạn bè hay đồng nghiệp là kỹ năng giao tiếp quan trọng. Bạn sẽ học các mẫu câu mời và trả lời.',
      vocab: [
        w('einladen', 'einladen', 'mời', { pos: 'động từ tách', e: '💌', r: 'ain-la-đần' }), w('einladung', 'Einladung', 'lời mời', { art: 'die', pl: 'Einladungen', e: '✉️', r: 'ain-la-đung' }), w('treffen', 'treffen', 'gặp', { pos: 'động từ', e: '🤝', r: 'tré-phần' }), w('verabredung', 'Verabredung', 'cuộc hẹn', { art: 'die', pl: 'Verabredungen', e: '📅', r: 'phe-ap-rê-đung' }), w('zeit-haben', 'Zeit haben', 'có thời gian', { e: '⏳', r: 'tsai-t ha-bần' }), w('leider', 'leider', 'tiếc là', { pos: 'trạng từ', e: '😔', r: 'lai-đơ' }), w('gern', 'gern', 'rất sẵn lòng', { pos: 'trạng từ', e: '😊', r: 'ghen' }), w('vorschlag', 'Vorschlag', 'đề nghị', { art: 'der', pl: 'Vorschläge', e: '💡', r: 'phô-sláck' }), w('treffpunkt', 'Treffpunkt', 'điểm hẹn', { art: 'der', e: '📍', r: 'tréf-punkt' }),
      ],
      grammar: [
        table(['Mục đích', 'Mẫu câu'], ['Mời', 'Hast du Lust, ins Kino zu gehen? • Möchtest du mit mir essen gehen? • Ich lade dich zum Essen ein.'], ['Nhận lời', 'Ja, gern! • Das ist eine gute Idee. • Sehr gern, wann?'], ['Từ chối', 'Leider habe ich keine Zeit. • Tut mir leid, ich kann nicht. • Ich muss leider arbeiten.'], ['Hẹn giờ', 'Wann treffen wir uns? • Um 18 Uhr? • Wo treffen wir uns? • Vor dem Kino.'], ['Đề xuất khác', 'Wie wäre es mit Samstag? • Passt dir Freitag?']),
        info('**Wann passt es dir?** = Khi nào thuận tiện với bạn? Dùng **passen** + Dativ: *Der Termin passt mir nicht.* (Cuộc hẹn không hợp với tôi.)'),
        tip('Từ chối lịch sự luôn kèm **lý do**: *Leider kann ich nicht, ich muss lernen. Aber vielleicht nächste Woche?*'),
      ],
      examples: [dlg(['Anna', 'Hast du am Samstag Zeit? Wir könnten ins Kino gehen.', 'Thứ Bảy bạn có rảnh không? Chúng ta có thể đi xem phim.'], ['Tom', 'Leider muss ich arbeiten. Aber am Sonntag habe ich Zeit.', 'Tiếc là tôi phải làm việc. Nhưng Chủ nhật tôi rảnh.'], ['Anna', 'Perfekt! Um 15 Uhr vor dem Kino?', 'Tuyệt! Lúc 15 giờ trước rạp phim nhé?'], ['Tom', 'Gut, bis dann!', 'Được, hẹn gặp!'])],
      ex: [
        order('Bạn có thời gian vào thứ Bảy không?', 'Hast du am Samstag Zeit?'),
        order('Tiếc là tôi không có thời gian', 'Leider habe ich keine Zeit'),
        fill('Wann ___ wir uns? (treffen)', 'treffen', 'wir → treffen.'),
        mc('Câu nào là lời nhận lời?', ['Ja, gern!', 'Leider nicht.', 'Tut mir leid.', 'Ich muss arbeiten.'], 0, 'Ja, gern = nhận lời.'),
        match('Nối.', ['einladen', 'mời'], ['treffen', 'gặp'], ['leider', 'tiếc là'], ['Treffpunkt', 'điểm hẹn']),
      ],
      teaches: ['verabredung'],
      review: '- Mời: *Hast du Lust …?* • Nhận: *Ja, gern!* • Từ chối: *Leider …*\n- Hẹn: *Wann/Wo treffen wir uns?*',
    }),
    lesson({
      id: 'a2-c09-l2',
      title: 'Infinitiv mit zu và um … zu',
      goals: ['Dùng zu + nguyên mẫu', 'Dùng um … zu để chỉ mục đích'],
      intro: 'Nhiều động từ và cấu trúc đòi hỏi **zu + động từ nguyên mẫu ở cuối câu**.',
      grammar: [
        T('**Cấu trúc:** *Ich habe Lust, ins Kino **zu gehen**.* / *Es ist wichtig, pünktlich **zu sein**.* / *Ich versuche, jeden Tag **zu lernen**.*'),
        table(['Mẫu', 'Ví dụ'], ['**Lust haben** + zu', 'Ich habe keine Lust, heute zu arbeiten.'], ['**Zeit haben** + zu', 'Hast du Zeit, mir zu helfen?'], ['**versuchen** + zu', 'Ich versuche, früh aufzustehen.'], ['**anfangen / aufhören** + zu', 'Es fängt an zu regnen.'], ['**Es ist + tính từ** + zu', 'Es ist schwer, Deutsch zu lernen.']),
        warn('**Động từ tách + zu:** zu chen vào **giữa** tiền tố và gốc, viết liền: *auf**zu**stehen*, *an**zu**rufen*, *ein**zu**kaufen*. *Ich habe vergessen, dich **anzurufen**.*'),
        T('**um … zu** = “để…” (mục đích): *Ich lerne Deutsch, **um** in Deutschland **zu arbeiten**.* (Tôi học tiếng Đức để làm việc ở Đức.) Chủ ngữ của hai vế phải **giống nhau**.'),
        info('**Không dùng zu** sau **modal** và **một vài động từ**: *Ich **kann** schwimmen.* (không có zu), *Ich **gehe** schwimmen.* **Phân biệt:** Modal → không zu. Động từ khác → có zu.'),
      ],
      examples: [ex('Ich habe keine Lust, heute zu kochen.', 'Hôm nay tôi không có hứng nấu ăn.'), ex('Ich lerne Deutsch, um in Deutschland zu studieren.', 'Tôi học tiếng Đức để học ở Đức.'), ex('Es ist schön, dich zu sehen.', 'Thật vui khi gặp bạn.'), ex('Vergiss nicht, mich anzurufen!', 'Đừng quên gọi cho tôi!')],
      ex: [
        order('Tôi học tiếng Đức để làm việc ở Đức', 'Ich lerne Deutsch, um in Deutschland zu arbeiten'),
        order('Tôi không có hứng đi làm', 'Ich habe keine Lust zu arbeiten'),
        fill('Ich habe vergessen, dich ___. (anrufen, có zu)', 'anzurufen', 'an + zu + rufen.'),
        fill('Es ist wichtig, pünktlich ___ sein.', 'zu', 'zu + nguyên mẫu.'),
        mc('Sau modal (können) có zu không?', ['không', 'có', 'tùy', 'chỉ ở Perfekt'], 0, 'Modal không zu.'),
      ],
      auto: false,
      teaches: ['infinitiv-zu'],
      review: '- **zu + nguyên mẫu** ở cuối câu; động từ tách: **an-zu-rufen**.\n- **um … zu** = để.\n- Modal không dùng zu.',
    }),
  ],
})
