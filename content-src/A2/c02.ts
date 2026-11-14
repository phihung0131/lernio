import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c02-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 2,
  title: 'Perfekt',
  titleVi: 'Thì quá khứ hoàn thành (Perfekt)',
  lessons: [
    lesson({
      id: 'a2-c02-l1',
      title: 'Perfekt với haben',
      goals: ['Nói về quá khứ bằng Perfekt', 'Tạo Partizip II (phân từ quá khứ)', 'Biết đặt Partizip II cuối câu'],
      intro: '**Perfekt** là thì quá khứ dùng nhiều nhất khi **nói** tiếng Đức hằng ngày. Cấu trúc: **haben/sein (chia) + Partizip II (cuối câu)**.',
      vocab: [
        w('gestern', 'gestern', 'hôm qua', { pos: 'trạng từ', e: '⬅️', r: 'ghét-xtơn' }), w('letzte', 'letzte Woche', 'tuần trước', { e: '📆', r: 'lét-tsờ vô-khờ' }), w('gemacht', 'gemacht', 'đã làm', { pos: 'Partizip II', e: '✅', r: 'gờ-ma-kht' }), w('gekauft', 'gekauft', 'đã mua', { pos: 'Partizip II', e: '🛒', r: 'gờ-kaoft' }), w('gelernt', 'gelernt', 'đã học', { pos: 'Partizip II', e: '📚', r: 'gờ-lẹc-nt' }), w('gegessen', 'gegessen', 'đã ăn', { pos: 'Partizip II (bất quy tắc)', e: '🍽️', r: 'gờ-ghé-xần' }), w('getrunken', 'getrunken', 'đã uống', { pos: 'Partizip II (bất quy tắc)', e: '🥤', r: 'gờ-trun-kần' }), w('gesehen', 'gesehen', 'đã thấy', { pos: 'Partizip II (bất quy tắc)', e: '👀', r: 'gờ-dê-ần' }),
      ],
      grammar: [
        T('**Cấu trúc Perfekt:** *Ich **habe** gestern Fußball **gespielt**.* (haben ở vị trí 2, Partizip II ở **cuối câu**).'),
        table(['Loại', 'Công thức Partizip II', 'Ví dụ'], ['Động từ **thường** (yếu)', '**ge** + gốc + **t**', 'machen → **ge**mach**t**; lernen → **ge**lern**t**; kaufen → **ge**kauf**t**'], ['Động từ **bất quy tắc** (mạnh)', '**ge** + gốc (có thể đổi nguyên âm) + **en**', 'essen → **ge**ess**en**; trinken → **ge**trunk**en**; sehen → **ge**seh**en**'], ['Động từ **tách**', 'tiền tố + **ge** + gốc + t/en', 'einkaufen → **ein**ge**kauf**t; aufstehen → **auf**ge**stand**en'], ['Động từ **không tách** (be-, ge-, ver-, er-, ent-)', 'KHÔNG thêm ge-', 'besuchen → besucht; verstehen → verstanden; bekommen → bekommen'], ['Động từ tận cùng **-ieren**', 'KHÔNG thêm ge-', 'studieren → studiert; telefonieren → telefoniert']),
        info('**Phải học thuộc** Partizip II của động từ bất quy tắc. Cứ học 3 dạng: **nguyên mẫu – Präteritum – Partizip II**, nhưng ở A2 chỉ cần nguyên mẫu và Partizip II: essen – gegessen, trinken – getrunken, sehen – gesehen, schreiben – geschrieben, lesen – gelesen, nehmen – genommen, sprechen – gesprochen, finden – gefunden.'),
        warn('Vị trí: **Partizip II ở cuối câu**. *Ich habe gestern einen Kuchen **gebacken**.* Có trạng từ thời gian ở đầu thì động từ chia vẫn ở vị trí 2: *Gestern **habe** ich einen Kuchen gebacken.*'),
        tip('**Dấu hiệu dùng Perfekt:** gestern, letzte Woche, vor zwei Tagen, am Wochenende (đã qua). Văn nói dùng Perfekt; văn viết dùng Präteritum (học ở B1).'),
      ],
      examples: [ex('Ich habe gestern Deutsch gelernt.', 'Hôm qua tôi đã học tiếng Đức.'), ex('Wir haben Pizza gegessen.', 'Chúng tôi đã ăn pizza.'), ex('Hast du das Buch gelesen?', 'Bạn đã đọc cuốn sách đó chưa?'), ex('Sie hat eingekauft.', 'Cô ấy đã đi mua sắm.')],
      ex: [
        fill('Ich habe Fußball ___. (spielen)', 'gespielt', 'spielen → gespielt.'),
        fill('Wir haben Pizza ___. (essen)', 'gegessen', 'essen → gegessen.'),
        fill('Er hat ein Buch ___. (lesen)', 'gelesen', 'lesen → gelesen.'),
        fill('Sie hat gestern ___. (einkaufen)', 'eingekauft', 'tách: ein + ge + kauf + t.'),
        fill('Ich habe die Stadt ___. (besuchen)', 'besucht', 'be- không thêm ge-.'),
        order('Hôm qua tôi đã học tiếng Đức', 'Gestern habe ich Deutsch gelernt'),
        mc('Partizip II của “trinken” là:', ['getrunken', 'getrinkt', 'trunken', 'getrunkt'], 0, 'trinken → getrunken.'),
        match('Nối nguyên mẫu với Partizip II.', ['machen', 'gemacht'], ['essen', 'gegessen'], ['sehen', 'gesehen'], ['verstehen', 'verstanden']),
      ],
      teaches: ['perfekt-haben'],
      review: '- **haben + Partizip II (cuối câu)**.\n- Thường: **ge-…-t**; bất quy tắc: **ge-…-en**; tách: tiền tố + ge.\n- **be-, ver-, er-, ent-, -ieren** không thêm ge-.',
    }),
    lesson({
      id: 'a2-c02-l2',
      title: 'Perfekt với sein',
      goals: ['Biết động từ chuyển động và thay đổi trạng thái dùng sein', 'Thuộc Partizip II của gehen, fahren, kommen…'],
      intro: 'Một nhóm động từ dùng **sein** thay vì haben trong Perfekt: động từ **chuyển động** (gehen, fahren, kommen, fliegen) và **thay đổi trạng thái** (aufstehen, einschlafen, werden), cùng với **sein, bleiben, passieren**.',
      vocab: [
        w('gegangen', 'gegangen', 'đã đi', { pos: 'Partizip II', e: '🚶', r: 'gờ-gang-ần' }), w('gefahren', 'gefahren', 'đã đi (xe)', { pos: 'Partizip II', e: '🚗', r: 'gờ-pha-rần' }), w('gekommen', 'gekommen', 'đã đến', { pos: 'Partizip II', e: '🏃', r: 'gờ-kô-mần' }), w('geflogen', 'geflogen', 'đã bay', { pos: 'Partizip II', e: '✈️', r: 'gờ-phlô-gần' }), w('gewesen', 'gewesen', 'đã ở, đã là', { pos: 'Partizip II (sein)', e: '📍', r: 'gờ-vê-dần' }), w('geblieben', 'geblieben', 'đã ở lại', { pos: 'Partizip II', e: '🏠', r: 'gờ-bli-bần' }), w('aufgestanden', 'aufgestanden', 'đã thức dậy', { pos: 'Partizip II', e: '⏰', r: 'ao-f-gờ-stan-đần' }),
      ],
      grammar: [
        T('**Perfekt với sein:** *Ich **bin** nach Berlin **gefahren**.* (sein chia ở vị trí 2, Partizip II ở cuối câu)'),
        table(['Nguyên mẫu', 'Partizip II', 'Ví dụ'], ['gehen', 'gegangen', 'Ich bin ins Kino gegangen.'], ['fahren', 'gefahren', 'Wir sind nach Wien gefahren.'], ['kommen', 'gekommen', 'Er ist spät gekommen.'], ['fliegen', 'geflogen', 'Sie ist nach Paris geflogen.'], ['sein', 'gewesen', 'Ich bin in Italien gewesen.'], ['bleiben', 'geblieben', 'Wir sind zu Hause geblieben.'], ['aufstehen', 'aufgestanden', 'Ich bin um 6 Uhr aufgestanden.']),
        warn('**Quy tắc chọn:** sein dùng khi động từ **không có tân ngữ Akkusativ** và diễn tả **đi từ nơi này đến nơi khác** hoặc **thay đổi trạng thái**. Haben dùng cho phần lớn động từ còn lại. **Ngoại lệ phải nhớ:** sein, bleiben, passieren dùng sein.'),
        info('**Perfekt của sein và haben:** ở văn nói người ta thường dùng **Präteritum** của hai động từ này thay Perfekt: *Ich **war** in Berlin* (thay vì *Ich bin in Berlin gewesen*), *Ich **hatte** Hunger*. Xem bài tiếp theo.'),
      ],
      examples: [dlg(['Anna', 'Was hast du am Wochenende gemacht?', 'Cuối tuần bạn đã làm gì?'], ['Tom', 'Ich bin nach Hamburg gefahren und habe meine Freunde besucht.', 'Tôi đã đi Hamburg và thăm bạn bè.'], ['Anna', 'Und wie war es?', 'Và thế nào?'], ['Tom', 'Super! Wir sind viel gelaufen und haben viel gegessen.', 'Tuyệt! Chúng tôi đã đi bộ nhiều và ăn nhiều.'])],
      ex: [
        fill('Ich ___ nach Berlin gefahren. (haben/sein)', 'bin', 'fahren (di chuyển) → sein.'),
        fill('Wir ___ Pizza gegessen. (haben/sein)', 'haben', 'essen → haben.'),
        fill('Er ___ spät aufgestanden. (haben/sein)', 'ist', 'aufstehen → sein.'),
        fill('Sie ist nach Paris ___. (fliegen)', 'geflogen', 'fliegen → geflogen.'),
        order('Cuối tuần tôi đã ở nhà', 'Am Wochenende bin ich zu Hause geblieben'),
        mc('Động từ nào dùng sein ở Perfekt?', ['gehen', 'machen', 'kaufen', 'lernen'], 0, 'gehen = chuyển động → sein.'),
      ],
      teaches: ['perfekt-sein'],
      review: '- **sein + Partizip II** cho chuyển động và thay đổi trạng thái.\n- **sein, bleiben, passieren** dùng sein.\n- gegangen, gefahren, gekommen, geflogen, gewesen, geblieben.',
    }),
    lesson({
      id: 'a2-c02-l3',
      title: 'Präteritum của sein và haben',
      goals: ['Dùng war, hatte thay Perfekt'],
      intro: 'Với **sein** và **haben** (và các modal), người Đức nói bằng **Präteritum** (không dùng Perfekt) vì nó ngắn gọn.',
      grammar: [
        table(['', 'sein', 'haben'], ['ich', 'war', 'hatte'], ['du', 'warst', 'hattest'], ['er/sie/es', 'war', 'hatte'], ['wir', 'waren', 'hatten'], ['ihr', 'wart', 'hattet'], ['sie/Sie', 'waren', 'hatten']),
        info('Dùng cho cả nói và viết: *Gestern **war** ich müde.* (Hôm qua tôi mệt.), *Ich **hatte** keine Zeit.* (Tôi đã không có thời gian.), *Wir **waren** im Urlaub.*'),
        warn('**ich** và **er/sie/es** có dạng **giống nhau** ở Präteritum: ich war / er war; ich hatte / er hatte (không có đuôi).'),
        tip('Với modal: **konnte, musste, wollte, durfte**: *Ich musste arbeiten.* (Tôi phải làm việc rồi.) Cũng nên dùng Präteritum thay vì Perfekt.'),
      ],
      examples: [ex('Gestern war ich im Kino.', 'Hôm qua tôi ở rạp phim.'), ex('Wir hatten keine Zeit.', 'Chúng tôi đã không có thời gian.'), ex('Er war krank.', 'Anh ấy đã ốm.')],
      ex: [
        fill('Gestern ___ ich müde. (sein)', 'war', 'ich → war.'),
        fill('Wir ___ im Urlaub. (sein)', 'waren', 'wir → waren.'),
        fill('Sie ___ keine Zeit. (haben)', 'hatte', 'sie (cô ấy) → hatte.'),
        fill('Du ___ Hunger. (haben)', 'hattest', 'du → hattest.'),
        order('Hôm qua tôi mệt', 'Gestern war ich müde'),
      ],
      auto: false,
      teaches: ['praeteritum-sein-haben'],
      review: '- **war, warst, war, waren, wart, waren**; **hatte, hattest, hatte, hatten, hattet, hatten**.',
    }),
  ],
})
