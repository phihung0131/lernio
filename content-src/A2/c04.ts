import { chapter, art, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c04-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 4,
  title: 'Gesundheit',
  titleVi: 'Sức khỏe, cơ thể và động từ phản thân',
  lessons: [
    lesson({
      id: 'a2-c04-l1',
      title: 'Cơ thể và triệu chứng',
      goals: ['Gọi tên bộ phận cơ thể', 'Nói đau ở đâu', 'Đi khám bác sĩ'],
      intro: 'Khi ốm, bạn cần nói được **đau ở đâu** và **cảm thấy thế nào**. Đây là kỹ năng sinh tồn khi sống ở Đức.',
      vocab: [
        w('kopf', 'Kopf', 'đầu', { art: 'der', pl: 'Köpfe', e: '🧠', r: 'kôpf' }), w('hals', 'Hals', 'cổ họng', { art: 'der', pl: 'Hälse', e: '🗣️', r: 'hal-x' }), w('bauch', 'Bauch', 'bụng', { art: 'der', pl: 'Bäuche', e: '🤰', r: 'bao-kh' }), w('rucken', 'Rücken', 'lưng', { art: 'der', pl: 'Rücken', e: '🔙', r: 'ruy-kần' }), w('arm', 'Arm', 'cánh tay', { art: 'der', pl: 'Arme', e: '💪', r: 'am' }), w('bein', 'Bein', 'chân', { art: 'das', pl: 'Beine', e: '🦵', r: 'bai-n' }), w('hand', 'Hand', 'bàn tay', { art: 'die', pl: 'Hände', e: '✋', r: 'han-t' }), w('zahn', 'Zahn', 'răng', { art: 'der', pl: 'Zähne', e: '🦷', r: 'tsan' }), w('auge', 'Auge', 'mắt', { art: 'das', pl: 'Augen', e: '👁️', r: 'ao-gờ' }), w('krank', 'krank', 'ốm', { pos: 'tính từ', e: '🤒', r: 'krang-k' }), w('fieber', 'Fieber', 'sốt', { art: 'das', e: '🌡️', r: 'phi-bơ' }), w('husten', 'Husten', 'ho', { art: 'der', e: '😷', r: 'hu-xần' }), w('schmerzen', 'Schmerzen', 'cơn đau', { pos: 'danh từ số nhiều', e: '😣', r: 'smec-tsần' }), w('arzt', 'Arzt', 'bác sĩ', { art: 'der', pl: 'Ärzte', e: '👨‍⚕️', r: 'a-tst' }), w('medikament', 'Medikament', 'thuốc', { art: 'das', pl: 'Medikamente', e: '💊', r: 'mê-đi-ka-ment' }),
      ],
      grammar: [
        T('**Nói đau:** *Ich habe **Kopfschmerzen**.* (đau đầu) • *Mir tut **der Kopf** weh.* (Đầu tôi đau) • *Ich habe **Fieber**.* (Tôi bị sốt) • *Ich bin **erkältet**.* (Tôi bị cảm).'),
        table(['Cách nói', 'Ví dụ'], ['Ich habe + ...schmerzen', 'Ich habe Bauchschmerzen. Halsschmerzen. Zahnschmerzen.'], ['**Mir tut/tun … weh**', 'Mir tut der Rücken weh. Mir tun die Beine weh.'], ['Ich habe + bệnh', 'Ich habe Fieber / Husten / eine Erkältung.']),
        info('**Dativ ở “Mir tut … weh”:** người bị đau ở **Dativ** (mir, dir, ihm…). *Tut dir etwas weh?* (Bạn có bị đau chỗ nào không?). Bộ phận cơ thể (Nominativ) quyết định **tut** (số ít) hay **tun** (số nhiều).'),
        tip('**Ở bác sĩ:** *Was fehlt Ihnen?* (Bạn bị sao?) • *Seit wann haben Sie die Schmerzen?* (Bạn đau từ khi nào?) • *Nehmen Sie dreimal täglich eine Tablette.* (Uống một viên ba lần mỗi ngày.)'),
        warn('Với **Termin** (cuộc hẹn): *Ich möchte einen Termin vereinbaren.* (Tôi muốn đặt lịch hẹn). Ở Đức bạn thường phải **đặt hẹn trước** để gặp bác sĩ.'),
      ],
      examples: [dlg(['Arzt', 'Guten Tag. Was fehlt Ihnen?', 'Chào. Bạn bị sao?'], ['Patient', 'Ich habe Kopfschmerzen und Fieber.', 'Tôi đau đầu và sốt.'], ['Arzt', 'Seit wann?', 'Từ khi nào?'], ['Patient', 'Seit zwei Tagen.', 'Từ hai ngày nay.'], ['Arzt', 'Nehmen Sie diese Tabletten und bleiben Sie im Bett.', 'Uống những viên thuốc này và nằm nghỉ.'])],
      ex: [
        fill('Mir tut der Kopf ___. ', 'weh', 'weh tun = đau.'),
        fill('Mir ___ die Beine weh. (số nhiều)', 'tun', 'số nhiều → tun.'),
        fill('Ich habe ___ . (Bauch + Schmerzen)', 'Bauchschmerzen', 'Bauch + Schmerzen.'),
        order('Tôi bị sốt', 'Ich habe Fieber'),
        mc('“Was fehlt Ihnen?” hỏi gì?', ['Bạn bị sao?', 'Bạn tên là gì?', 'Bạn bao nhiêu tuổi?', 'Bạn ở đâu?'], 0, 'Bác sĩ hỏi bạn bị gì.'),
        match('Nối bộ phận cơ thể.', ['der Kopf', 'đầu'], ['der Bauch', 'bụng'], ['das Bein', 'chân'], ['die Hand', 'bàn tay']),
      ],
      teaches: ['schmerzen-dativ'],
      review: '- **Ich habe …schmerzen** / **Mir tut … weh** (Dativ).\n- Bộ phận: Kopf, Hals, Bauch, Rücken, Arm, Bein, Hand, Zahn, Auge.',
    }),
    lesson({
      id: 'a2-c04-l2',
      title: 'Động từ phản thân (reflexive Verben)',
      goals: ['Nhận biết sich + động từ', 'Chia đại từ phản thân'],
      intro: '**Động từ phản thân** là động từ có tân ngữ **chính là chủ ngữ**: *Ich wasche **mich**.* (Tôi tắm rửa cho mình). Rất nhiều hành động hằng ngày dùng cấu trúc này.',
      vocab: [
        w('sich-waschen', 'sich waschen', 'rửa/tắm cho mình', { pos: 'động từ phản thân', e: '🧼', r: 'zích va-sần' }), w('sich-freuen', 'sich freuen', 'vui, mong đợi', { pos: 'động từ phản thân', e: '😊', r: 'zích phroi-ần' }), w('sich-erinnern', 'sich erinnern', 'nhớ lại', { pos: 'động từ phản thân', e: '💭', r: 'zích e-i-nơn' }), w('sich-treffen', 'sich treffen', 'gặp nhau', { pos: 'động từ phản thân', e: '🤝', r: 'zích tré-phần' }), w('sich-fuhlen', 'sich fühlen', 'cảm thấy', { pos: 'động từ phản thân', e: '❤️', r: 'zích phuy-lần' }), w('sich-setzen', 'sich setzen', 'ngồi xuống', { pos: 'động từ phản thân', e: '🪑', r: 'zích dé-tsần' }), w('sich-ausruhen', 'sich ausruhen', 'nghỉ ngơi', { pos: 'động từ phản thân', e: '🛌', r: 'zích ao-s-ru-ần' }), w('sich-beeilen', 'sich beeilen', 'nhanh lên', { pos: 'động từ phản thân', e: '💨', r: 'zích bờ-ai-lần' }),
      ],
      grammar: [
        table(['', 'sich waschen', 'sich freuen'], ['ich', 'wasche **mich**', 'freue **mich**'], ['du', 'wäschst **dich**', 'freust **dich**'], ['er/sie/es', 'wäscht **sich**', 'freut **sich**'], ['wir', 'waschen **uns**', 'freuen **uns**'], ['ihr', 'wascht **euch**', 'freut **euch**'], ['sie/Sie', 'waschen **sich**', 'freuen **sich**']),
        info('**Đại từ phản thân** (Akkusativ): **mich, dich, sich, uns, euch, sich**. Giống đại từ Akkusativ, chỉ khác ở ngôi thứ ba là **sich**.'),
        T('**Vị trí:** *Ich **freue** **mich** auf das Wochenende.* (Tôi mong chờ cuối tuần.) **sich freuen auf** + Akk (mong đợi), **sich freuen über** + Akk (vui vì cái đã có).'),
        warn('**Vị trí trong câu có động từ tách hoặc modal:** *Ich muss **mich** beeilen.* (Tôi phải nhanh lên.) Đại từ phản thân đứng sau động từ chia.'),
        tip('Nhiều động từ phản thân **không** có nghĩa phản thân trong tiếng Việt, ví dụ **sich freuen** (vui), **sich erinnern** (nhớ). Học thuộc cả cụm.'),
      ],
      examples: [ex('Ich wasche mich jeden Morgen.', 'Mỗi sáng tôi tắm rửa.'), ex('Wir treffen uns am Samstag.', 'Chúng ta gặp nhau vào thứ Bảy.'), ex('Er freut sich auf den Urlaub.', 'Anh ấy mong chờ kỳ nghỉ.'), ex('Ich fühle mich nicht gut.', 'Tôi cảm thấy không khỏe.')],
      ex: [
        fill('Ich freue ___ auf das Wochenende.', 'mich', 'ich → mich.'),
        fill('Du fühlst ___ nicht gut.', 'dich', 'du → dich.'),
        fill('Er beeilt ___ .', 'sich', 'er → sich.'),
        fill('Wir treffen ___ um acht Uhr.', 'uns', 'wir → uns.'),
        order('Tôi cảm thấy không khỏe', 'Ich fühle mich nicht gut'),
        mc('Đại từ phản thân của “sie” (họ) là:', ['sich', 'sie', 'ihnen', 'uns'], 0, 'sie → sich.'),
      ],
      teaches: ['reflexive-verben'],
      review: '- **mich, dich, sich, uns, euch, sich**.\n- sich freuen auf/über, sich treffen, sich fühlen, sich beeilen.',
    }),
    lesson({
      id: 'a2-c04-l3',
      title: 'Imperativ: ra lệnh, khuyên bảo',
      goals: ['Tạo Imperativ cho du, ihr, Sie', 'Dùng bitte để lịch sự'],
      intro: '**Imperativ** (mệnh lệnh) dùng để ra lệnh, khuyên nhủ, chỉ dẫn. Có ba dạng theo người nghe: **du**, **ihr**, **Sie**.',
      grammar: [
        table(['Nguyên mẫu', 'du', 'ihr', 'Sie'], ['kommen', 'Komm!', 'Kommt!', 'Kommen Sie!'], ['machen', 'Mach!', 'Macht!', 'Machen Sie!'], ['warten', 'Warte!', 'Wartet!', 'Warten Sie!'], ['fahren (a→ä)', 'Fahr!', 'Fahrt!', 'Fahren Sie!'], ['nehmen (e→i)', 'Nimm!', 'Nehmt!', 'Nehmen Sie!'], ['sein', 'Sei!', 'Seid!', 'Seien Sie!'], ['aufstehen', 'Steh auf!', 'Steht auf!', 'Stehen Sie auf!']),
        T('**Quy tắc:**\n- **du:** gốc động từ (bỏ -st): *Du kommst → Komm!* Động từ đổi e→i giữ dạng đổi: *Du nimmst → Nimm!*; **a→ä không giữ umlaut**: *Fahr!*\n- **ihr:** giống ihr trong Präsens: *Ihr macht → Macht!*\n- **Sie:** động từ **đầu câu** + **Sie**: *Machen Sie!*'),
        info('Thêm **bitte** để lịch sự: *Komm bitte her!* / *Setzen Sie sich bitte.* Imperativ phản thân: *Setz dich!* *Beeil dich!* *Setzen Sie sich!*'),
        warn('Động từ tách: tiền tố cuối câu: *Steh auf!* *Ruf mich an!* *Kauf Milch ein!*'),
      ],
      examples: [ex('Komm bitte schnell!', 'Làm ơn đến nhanh!'), ex('Nehmen Sie diese Tabletten dreimal täglich.', 'Hãy uống những viên này ba lần mỗi ngày.'), ex('Sei ruhig!', 'Hãy im lặng!'), ex('Setzen Sie sich, bitte.', 'Mời bạn ngồi.')],
      ex: [
        fill('___ bitte hierher! (kommen, du)', 'Komm', 'du → Komm!'),
        fill('___ Sie bitte langsam! (sprechen)', 'Sprechen', 'Sie → Sprechen Sie!'),
        fill('___ mir bitte! (helfen, du)', 'Hilf', 'helfen: e→i → Hilf!'),
        fill('___ ruhig! (sein, du)', 'Sei', 'sein → Sei!'),
        order('Hãy ngồi xuống (Sie)', 'Setzen Sie sich bitte'),
        order('Dậy đi (du)', 'Steh auf'),
      ],
      auto: false,
      teaches: ['imperativ'],
      review: '- du: **Komm!** (bỏ -st) • ihr: **Kommt!** • Sie: **Kommen Sie!**\n- nehmen → Nimm! • fahren → Fahr! • sein → Sei!',
    }),
  ],
})
