import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c09-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 9,
  title: 'Kultur und Leben',
  titleVi: 'Văn hóa, đời sống và câu hỏi gián tiếp',
  lessons: [
    lesson({
      id: 'b1-c09-l1',
      title: 'Văn hóa, lễ hội, truyền thống',
      goals: ['Nói về văn hóa Đức và văn hóa Việt Nam', 'Dùng câu hỏi gián tiếp', 'Dùng ob và W-từ trong câu phụ'],
      intro: 'Văn hóa là chủ đề giúp bạn kết nối với người bản xứ. Bạn sẽ học cách **hỏi và giải thích** phong tục, bằng cả **câu hỏi gián tiếp** lịch sự.',
      vocab: [
        w('kultur', 'Kultur', 'văn hóa', { art: 'die', pl: 'Kulturen', r: 'kul-tu-ơ' }), w('brauch', 'Brauch', 'phong tục', { art: 'der', pl: 'Bräuche', r: 'brao-kh' }), w('tradition', 'Tradition', 'truyền thống', { art: 'die', pl: 'Traditionen', r: 'tra-đi-tsi-ôn' }), w('fest', 'Fest', 'lễ hội', { art: 'das', pl: 'Feste', r: 'phéxt' }), w('weihnachten', 'Weihnachten', 'Giáng sinh', { art: 'das', r: 'vai-nakh-tần' }), w('ostern', 'Ostern', 'lễ Phục sinh', { art: 'das', r: 'ô-xtơn' }), w('feiern', 'feiern', 'ăn mừng', { pos: 'động từ', r: 'phai-ơn' }), w('typisch', 'typisch', 'điển hình', { pos: 'tính từ', r: 'tuy-pis' }), w('unterschied', 'Unterschied', 'sự khác biệt', { art: 'der', pl: 'Unterschiede', r: 'un-tơ-si-t' }), w('gewohnt', 'gewohnt', 'quen với', { pos: 'tính từ', r: 'gờ-vôn-t' }),
      ],
      grammar: [
        T('**Câu hỏi gián tiếp** (lịch sự): chuyển câu hỏi thành câu phụ, **động từ chia ra cuối**.\n- Trực tiếp: *Wann beginnt das Fest?*\n- Gián tiếp: *Können Sie mir sagen, **wann** das Fest **beginnt**?*\n- Ja/Nein: *Ist das Restaurant geöffnet?* → *Wissen Sie, **ob** das Restaurant geöffnet **ist**?*'),
        table(['Câu hỏi trực tiếp', 'Câu hỏi gián tiếp'], ['Wo ist der Bahnhof?', 'Können Sie mir sagen, **wo** der Bahnhof **ist**?'], ['Was kostet das?', 'Ich möchte wissen, **was** das **kostet**.'], ['Kommst du mit?', 'Ich weiß nicht, **ob** du **mitkommst**.'], ['Hat er Zeit?', 'Weißt du, **ob** er Zeit **hat**?']),
        info('**ob** dùng cho **câu hỏi Ja/Nein** (có hay không); **W-từ** (wann, wo, was, wie, warum) giữ nguyên cho câu hỏi W. Động từ chia luôn ở **cuối**. Hay đi sau: **wissen, fragen, sagen, nicht wissen**, **Können Sie mir sagen, …?**'),
        tip('**Văn hóa Đức hay gặp:** **Pünktlichkeit** (đúng giờ rất quan trọng), **Mülltrennung** (phân loại rác), **Ruhezeiten** (giờ yên tĩnh: nghỉ trưa và sau 22h), **Siezen / Duzen** (xưng Sie hoặc du), **Pfand** (tiền cược vỏ chai).'),
      ],
      examples: [dlg(['Linh', 'Können Sie mir erklären, wie man Weihnachten in Deutschland feiert?', 'Bạn có thể giải thích người Đức đón Giáng sinh thế nào không?'], ['Anna', 'Am 24. Dezember essen wir zusammen und schenken uns Geschenke.', 'Ngày 24 tháng 12 chúng tôi ăn cùng nhau và tặng quà cho nhau.'], ['Linh', 'Bei uns in Vietnam ist Tet das wichtigste Fest.', 'Ở Việt Nam Tết là lễ hội quan trọng nhất.'])],
      ex: [
        order('Bạn có thể nói cho tôi biết ga ở đâu không?', 'Können Sie mir sagen, wo der Bahnhof ist'),
        order('Tôi không biết liệu anh ấy có đến không', 'Ich weiß nicht, ob er kommt'),
        fill('Weißt du, ___ er Zeit hat? (có hay không)', 'ob', 'Ja/Nein → ob.'),
        fill('Ich möchte wissen, ___ das kostet. (cái gì)', 'was', 'W-từ giữ nguyên.'),
        mc('Trong câu hỏi gián tiếp, động từ chia ở:', ['cuối câu', 'vị trí 2', 'đầu câu', 'sau chủ ngữ'], 0, 'Cuối câu.'),
        match('Nối.', ['das Fest', 'lễ hội'], ['der Brauch', 'phong tục'], ['feiern', 'ăn mừng'], ['typisch', 'điển hình']),
      ],
      teaches: ['indirekte-fragen'],
      review: '- Câu hỏi gián tiếp: **W-từ / ob** + … + **động từ cuối**.\n- **Können Sie mir sagen, …?** là cách hỏi lịch sự.\n- Từ vựng văn hóa: Kultur, Brauch, Tradition, Fest.',
    }),
    lesson({
      id: 'b1-c09-l2',
      title: 'Adjektivdeklination không mạo từ và Partizip làm tính từ',
      goals: ['Tính từ không mạo từ', 'Hiểu Partizip I và II làm tính từ'],
      intro: 'Hai điểm cuối cùng của ngữ pháp B1: tính từ **không có mạo từ** và **Partizip** dùng như tính từ.',
      vocab: [
        w('frisch', 'frisch', 'tươi', { pos: 'tính từ', r: 'phrí-s' }), w('warm', 'warm', 'ấm', { pos: 'tính từ', r: 'vam' }), w('interessant', 'interessant', 'thú vị', { pos: 'tính từ', r: 'in-tơ-re-xant' }), w('spannend', 'spannend', 'hấp dẫn, gay cấn', { pos: 'tính từ (Partizip I)', r: 'sờ-pa-nần-t' }), w('geschlossen', 'geschlossen', 'đóng cửa', { pos: 'tính từ (Partizip II)', r: 'gờ-slô-xần' }),
      ],
      grammar: [
        table(['Không mạo từ', 'Nominativ', 'Akkusativ', 'Dativ'], ['đực', 'frisch**er** Kaffee', 'frisch**en** Kaffee', 'frisch**em** Kaffee'], ['cái', 'frisch**e** Milch', 'frisch**e** Milch', 'frisch**er** Milch'], ['trung', 'frisch**es** Brot', 'frisch**es** Brot', 'frisch**em** Brot'], ['số nhiều', 'frisch**e** Brötchen', 'frisch**e** Brötchen', 'frisch**en** Brötchen']),
        info('**Quy tắc:** khi **không có mạo từ**, tính từ **mang đuôi của mạo từ** (**-er, -e, -es, -en, -em**). Vì thế nhìn tính từ cũng biết giống và cách.'),
        T('**Partizip làm tính từ:**\n- **Partizip I** (nguyên mẫu + **d**): đang làm, chủ động: *ein **spannender** Film* (phim hấp dẫn), *der **schlafende** Hund* (con chó đang ngủ).\n- **Partizip II**: bị động/hoàn thành: *die **geschlossene** Tür* (cánh cửa đã đóng), *das **gekochte** Ei* (quả trứng luộc).'),
        tip('Khi tính từ đứng **trước danh từ**, nó vẫn phải **đổi đuôi** như bình thường: *ein spannend**er** Film*, *die geschlossen**e** Tür*.'),
      ],
      examples: [ex('Ich trinke frischen Kaffee.', 'Tôi uống cà phê tươi.'), ex('Wir hatten ein spannendes Gespräch.', 'Chúng tôi có một cuộc trò chuyện hấp dẫn.'), ex('Die Tür ist geschlossen.', 'Cánh cửa đang đóng.'), ex('Ich mag warme Suppe.', 'Tôi thích súp nóng.')],
      ex: [
        fill('Ich trinke ___ Kaffee. (frisch, đực Akk, không mạo từ)', 'frischen', 'đực Akk không mạo từ: -en.'),
        fill('Ich esse ___ Brot. (frisch, trung Akk)', 'frisches', 'trung: -es.'),
        fill('Sie kocht ___ Suppe. (warm, cái Akk)', 'warme', 'cái: -e.'),
        fill('Ich mag ___ Filme. (spannend, số nhiều)', 'spannende', 'số nhiều: -e.'),
        mc('Partizip I tạo bằng:', ['nguyên mẫu + d', 'ge- + gốc + t', 'zu + nguyên mẫu', 'werden + nguyên mẫu'], 0, 'Partizip I = nguyên mẫu + d.'),
        match('Nối.', ['spannend', 'hấp dẫn'], ['geschlossen', 'đã đóng'], ['frisch', 'tươi'], ['interessant', 'thú vị']),
      ],
      auto: false,
      teaches: ['adjektiv-ohne-artikel', 'partizip-adjektiv'],
      review: '- Không mạo từ: tính từ mang đuôi **-er, -e, -es, -en, -em**.\n- **Partizip I** (+d), **Partizip II** dùng như tính từ và đổi đuôi.',
    }),
  ],
})
