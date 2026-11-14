import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c01-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 1,
  title: 'Dativ',
  titleVi: 'Cách 3 (Dativ) và Akkusativ',
  lessons: [
    lesson({
      id: 'a2-c01-l1',
      title: 'Dativ: tân ngữ gián tiếp',
      goals: ['Hiểu 3 cách: Nominativ, Akkusativ, Dativ', 'Chia mạo từ ở Dativ', 'Dùng helfen, danken, gefallen, gehören'],
      intro: 'Bạn đã biết **Nominativ** (chủ ngữ) và **Akkusativ** (tân ngữ trực tiếp). **Dativ** là cách thứ ba, dùng cho **tân ngữ gián tiếp** (người nhận): *Ich gebe **dem Kind** einen Apfel.* (Tôi đưa quả táo cho đứa trẻ).',
      vocab: [
        w('helfen', 'helfen', 'giúp', { pos: 'động từ + Dativ', e: '🤝', r: 'hen-phần' }), w('danken', 'danken', 'cảm ơn', { pos: 'động từ + Dativ', e: '🙏', r: 'đan-kần' }), w('gehoren', 'gehören', 'thuộc về', { pos: 'động từ + Dativ', e: '🔑', r: 'gờ-hơ-rần' }), w('gefallen', 'gefallen', 'làm hài lòng, thích', { pos: 'động từ + Dativ', e: '👍', r: 'gờ-pha-lần' }), w('schenken', 'schenken', 'tặng', { pos: 'động từ', e: '🎁', r: 'sen-kần' }), w('geben', 'geben', 'đưa, cho', { pos: 'động từ', e: '🤲', r: 'gê-bần' }), w('zeigen', 'zeigen', 'chỉ, cho xem', { pos: 'động từ', e: '👉', r: 'tsai-gần' }), w('erklaren', 'erklären', 'giải thích', { pos: 'động từ', e: '🗣️', r: 'e-clê-rần' }),
      ],
      grammar: [
        table(['', 'Nominativ', 'Akkusativ', 'Dativ'], ['đực', 'der / ein', 'den / einen', '**dem** / **einem**'], ['cái', 'die / eine', 'die / eine', '**der** / **einer**'], ['trung', 'das / ein', 'das / ein', '**dem** / **einem**'], ['số nhiều', 'die', 'die', '**den** (+n)']),
        table(['Đại từ', 'Nominativ', 'Akkusativ', 'Dativ'], ['ich', 'ich', 'mich', '**mir**'], ['du', 'du', 'dich', '**dir**'], ['er', 'er', 'ihn', '**ihm**'], ['sie', 'sie', 'sie', '**ihr**'], ['es', 'es', 'es', '**ihm**'], ['wir', 'wir', 'uns', '**uns**'], ['ihr', 'ihr', 'euch', '**euch**'], ['sie/Sie', 'sie/Sie', 'sie/Sie', '**ihnen / Ihnen**']),
        T('**Câu có hai tân ngữ:** Dativ (người nhận) đứng **trước**, Akkusativ (vật) **sau**.\n- *Ich gebe **dem Mann** **das Buch**.*\n- Khi là đại từ: Akkusativ **trước** Dativ: *Ich gebe **es ihm**.*'),
        info('**Động từ đi với Dativ** (không phải Akkusativ!): **helfen** (Ich helfe **dir**), **danken** (Ich danke **Ihnen**), **gehören** (Das Buch gehört **mir**), **gefallen** (Das gefällt **mir**), **antworten**, **gratulieren**, **schmecken**.'),
        warn('Số nhiều Dativ **thêm -n** vào danh từ: *mit den Kinder**n***, *mit den Freunde**n***. Ngoại lệ: số nhiều kết thúc -n/-s không thêm (*mit den Autos*).'),
      ],
      examples: [ex('Ich helfe dir.', 'Tôi giúp bạn.'), ex('Das Buch gehört mir.', 'Cuốn sách thuộc về tôi.'), ex('Wie gefällt dir die Stadt?', 'Bạn thấy thành phố thế nào?'), ex('Er schenkt seiner Frau Blumen.', 'Anh ấy tặng vợ hoa.')],
      ex: [
        fill('Ich helfe ___. (du)', 'dir', 'helfen + Dativ: du → dir.'),
        fill('Das Buch gehört ___. (ich)', 'mir', 'gehören + Dativ.'),
        fill('Ich gebe ___ Kind einen Apfel. (das Kind)', 'dem', 'Dativ trung: dem.'),
        fill('Ich schenke ___ Frau Blumen. (die Frau)', 'der', 'Dativ cái: der.'),
        fill('Wie geht es ___? (Sie)', 'Ihnen', 'Dativ: Ihnen.'),
        mc('Câu nào đúng?', ['Ich danke dir', 'Ich danke dich', 'Ich danke du', 'Ich danke deiner'], 0, 'danken + Dativ → dir.'),
        order('Tôi giúp bạn', 'Ich helfe dir'),
        match('Nối Nominativ với Dativ.', ['ich', 'mir'], ['du', 'dir'], ['er', 'ihm'], ['wir', 'uns']),
      ],
      teaches: ['dativ'],
      review: '- Dativ: đực/trung **dem/einem**, cái **der/einer**, số nhiều **den**+n.\n- Đại từ: **mir, dir, ihm, ihr, uns, euch, ihnen**.\n- **helfen, danken, gehören, gefallen** + Dativ.',
    }),
    lesson({
      id: 'a2-c01-l2',
      title: 'Giới từ đi với Dativ và Akkusativ',
      goals: ['Thuộc giới từ luôn Dativ: aus, bei, mit, nach, seit, von, zu', 'Giới từ luôn Akkusativ: durch, für, gegen, ohne, um'],
      intro: 'Một số giới từ **luôn** đi với một cách cố định. Hãy học thuộc theo nhóm.',
      vocab: [
        w('seit', 'seit', 'từ khi, đã (thời gian)', { pos: 'giới từ + Dativ', e: '📅', r: 'dai-t' }), w('von', 'von', 'của, từ', { pos: 'giới từ + Dativ', e: '↩️', r: 'phôn' }), w('ohne', 'ohne', 'không có', { pos: 'giới từ + Akkusativ', e: '🚫', r: 'ô-nờ' }), w('fur', 'für', 'cho', { pos: 'giới từ + Akkusativ', e: '🎁', r: 'phuy-ơ' }), w('gegen', 'gegen', 'chống lại, khoảng', { pos: 'giới từ + Akkusativ', e: '⚔️', r: 'gê-gần' }), w('durch', 'durch', 'qua, xuyên', { pos: 'giới từ + Akkusativ', e: '➡️', r: 'đuốc-ch' }),
      ],
      grammar: [
        table(['Luôn Dativ', 'Ví dụ'], ['**aus** (từ, bằng)', 'Ich komme aus dem Haus.'], ['**bei** (ở nhà, ở chỗ)', 'Ich wohne bei meinen Eltern.'], ['**mit** (cùng, bằng)', 'Ich fahre mit dem Bus.'], ['**nach** (sau, đến)', 'nach der Arbeit; nach Berlin'], ['**seit** (từ khi)', 'seit einem Jahr'], ['**von** (của, từ)', 'ein Brief von meiner Mutter'], ['**zu** (đến)', 'Ich gehe zum Arzt.']),
        table(['Luôn Akkusativ', 'Ví dụ'], ['**durch** (qua)', 'durch den Park'], ['**für** (cho)', 'ein Geschenk für meinen Vater'], ['**gegen** (chống, khoảng)', 'gegen den Wind'], ['**ohne** (không có)', 'ohne dich'], ['**um** (quanh, lúc)', 'um die Ecke; um 8 Uhr']),
        info('**Mẹo nhớ nhóm Dativ:** “**aus, bei, mit, nach, seit, von, zu**” (7 từ, hay học thuộc dạng vần). **Nhóm Akkusativ:** “**durch, für, gegen, ohne, um**” (5 từ).'),
        tip('**Rút gọn:** **zu dem = zum**, **zu der = zur**, **bei dem = beim**, **von dem = vom**. Rất thường gặp: *zum Arzt*, *beim Bäcker*, *vom Bahnhof*.'),
      ],
      examples: [ex('Ich wohne seit einem Jahr in Berlin.', 'Tôi sống ở Berlin được một năm.'), ex('Das ist ein Geschenk für dich.', 'Đây là món quà cho bạn.'), ex('Nach dem Essen trinke ich Kaffee.', 'Sau bữa ăn tôi uống cà phê.'), ex('Ich gehe zum Arzt.', 'Tôi đi khám bác sĩ.')],
      ex: [
        fill('Ich fahre mit ___ Auto. (das Auto)', 'dem', 'mit + Dativ.'),
        fill('Das Geschenk ist für ___. (du)', 'dich', 'für + Akkusativ: dich.'),
        fill('Nach ___ Arbeit gehe ich nach Hause. (die Arbeit)', 'der', 'nach + Dativ cái: der.'),
        fill('Ich gehe ___ Arzt. (zu dem)', 'zum', 'zu dem = zum.'),
        mc('Giới từ nào luôn đi với Akkusativ?', ['ohne', 'mit', 'bei', 'seit'], 0, 'ohne + Akkusativ.'),
        mc('Giới từ nào luôn đi với Dativ?', ['mit', 'für', 'durch', 'um'], 0, 'mit + Dativ.'),
        order('Tôi sống ở đây được một năm', 'Ich wohne seit einem Jahr hier'),
      ],
      teaches: ['praepositionen-akk-dat'],
      review: '- **Dativ:** aus, bei, mit, nach, seit, von, zu.\n- **Akkusativ:** durch, für, gegen, ohne, um.\n- zum, zur, beim, vom.',
    }),
  ],
})
