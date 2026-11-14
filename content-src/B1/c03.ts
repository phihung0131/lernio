import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c03-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 3,
  title: 'Beziehungen',
  titleVi: 'Các mối quan hệ và câu quan hệ',
  lessons: [
    lesson({
      id: 'b1-c03-l1',
      title: 'Câu quan hệ (Relativsätze)',
      goals: ['Tạo câu quan hệ với der/die/das', 'Chọn đúng đại từ quan hệ theo giống và cách'],
      intro: '**Câu quan hệ** bổ sung thông tin cho một danh từ: *Das ist der Mann, **der** neben mir wohnt.* (Đó là người đàn ông sống cạnh tôi.) Đại từ quan hệ **mang giống và số** của danh từ đứng trước, và **cách** theo vai trò trong câu phụ.',
      vocab: [
        w('beziehung', 'Beziehung', 'mối quan hệ', { art: 'die', pl: 'Beziehungen', e: '💞', r: 'bờ-tsi-ung' }), w('nachbar', 'Nachbar', 'hàng xóm', { art: 'der', pl: 'Nachbarn', e: '🏘️', r: 'nakh-ba' }), w('bekannte', 'Bekannte', 'người quen', { art: 'der', e: '🙂', r: 'bờ-kan-tờ' }), w('verwandte', 'Verwandte', 'họ hàng', { art: 'der', e: '👨‍👩‍👧', r: 'phe-van-tờ' }), w('streit', 'Streit', 'cãi nhau', { art: 'der', e: '💥', r: 'sờ-trai-t' }), w('vertrauen', 'vertrauen', 'tin tưởng', { pos: 'động từ + Dativ', e: '🤝', r: 'phe-trao-ần' }), w('vermissen', 'vermissen', 'nhớ (ai)', { pos: 'động từ', e: '😢', r: 'phe-mi-dần' }), w('kennenlernen', 'kennenlernen', 'làm quen', { pos: 'động từ tách', e: '👋', r: 'ken-nần-lé-nần' }),
      ],
      grammar: [
        table(['', 'Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], ['đực', '**der**', '**den**', '**dem**', '**dessen**'], ['cái', '**die**', '**die**', '**der**', '**deren**'], ['trung', '**das**', '**das**', '**dem**', '**dessen**'], ['số nhiều', '**die**', '**die**', '**denen**', '**deren**']),
        T('**Cách tạo:**\n1. Tìm danh từ cần bổ sung (**der Mann**: giống đực).\n2. Xác định vai trò của đại từ trong câu phụ (chủ ngữ → Nominativ; tân ngữ → Akkusativ; …).\n3. Chọn từ trong bảng: giống đực + chủ ngữ → **der**.\n4. Động từ ở **cuối** câu phụ. Có **dấu phẩy** ở hai bên.'),
        table(['Câu chính + câu phụ', 'Vì sao'], ['Das ist der Mann, **der** neben mir wohnt.', 'der Mann (đực) = chủ ngữ của “wohnt” → Nominativ **der**'], ['Das ist der Mann, **den** ich gestern gesehen habe.', 'der Mann = tân ngữ của “gesehen” → Akkusativ **den**'], ['Das ist die Frau, **der** ich geholfen habe.', 'die Frau = tân ngữ Dativ của “helfen” → **der**'], ['Das sind die Kinder, **denen** ich helfe.', 'số nhiều Dativ → **denen**']),
        info('**Genitiv** (**dessen/deren**) chỉ sở hữu: *Das ist der Mann, **dessen** Auto gestohlen wurde.* (người đàn ông mà chiếc xe của ông ấy bị mất). Chỉ cần nhận ra ở mức B1.'),
        warn('**Giống và số** lấy theo **danh từ đứng trước**, **cách** lấy theo **chức năng trong câu phụ**. Đây là lỗi hay gặp nhất.'),
        info('**Giới từ + đại từ quan hệ:** giới từ đứng **trước** đại từ: *Das ist die Frau, **mit der** ich arbeite.* (die Frau + mit + Dativ cái = der). *Das ist das Haus, **in dem** ich wohne.*'),
      ],
      examples: [ex('Der Mann, der neben mir wohnt, ist sehr nett.', 'Người đàn ông sống cạnh tôi rất tốt bụng.'), ex('Die Frau, die ich gestern getroffen habe, heißt Anna.', 'Người phụ nữ mà tôi gặp hôm qua tên Anna.'), ex('Das Buch, das ich lese, ist spannend.', 'Cuốn sách tôi đang đọc rất hấp dẫn.'), ex('Das sind die Freunde, mit denen ich reise.', 'Đó là những người bạn đi du lịch cùng tôi.')],
      ex: [
        fill('Das ist der Mann, ___ neben mir wohnt.', 'der', 'đực + Nominativ.'),
        fill('Das ist die Frau, ___ ich gestern getroffen habe.', 'die', 'cái + Akkusativ: die.'),
        fill('Das ist das Kind, ___ ich helfe. (helfen + Dativ)', 'dem', 'trung + Dativ: dem.'),
        fill('Das sind die Kinder, mit ___ ich spiele.', 'denen', 'số nhiều Dativ: denen.'),
        fill('Das ist der Freund, ___ ich vertraue. (Dativ)', 'dem', 'vertrauen + Dativ → dem.'),
        order('Đó là người đàn ông sống cạnh tôi', 'Das ist der Mann, der neben mir wohnt'),
        mc('Giống và số của đại từ quan hệ lấy theo:', ['danh từ đứng trước', 'động từ', 'chủ ngữ câu chính', 'tính từ'], 0, 'Theo danh từ đứng trước.'),
      ],
      teaches: ['relativsaetze'],
      review: '- Đại từ quan hệ: der/die/das (Nom), den/die/das (Akk), dem/der/dem/denen (Dat).\n- **Giống/số** theo danh từ trước; **cách** theo chức năng trong câu phụ.\n- Động từ cuối câu phụ; giới từ đứng trước đại từ.',
    }),
    lesson({
      id: 'b1-c03-l2',
      title: 'Mô tả mối quan hệ và tình cảm',
      goals: ['Nói về bạn bè, gia đình, tình cảm', 'Dùng động từ đi kèm giới từ: sich verlieben in, streiten über'],
      intro: 'Nhiều động từ trong tiếng Đức đi **kèm giới từ cố định**. Phải học thuộc cả cụm **động từ + giới từ + cách**.',
      vocab: [
        w('sich-verlieben', 'sich verlieben', 'phải lòng', { pos: 'động từ phản thân', e: '😍', r: 'zích phe-li-bần' }), w('sich-streiten', 'sich streiten', 'cãi nhau', { pos: 'động từ phản thân', e: '💢', r: 'zích sờ-trai-tần' }), w('sich-kummern', 'sich kümmern', 'chăm sóc', { pos: 'động từ phản thân', e: '🤱', r: 'zích kuy-mơn' }), w('sich-verstehen', 'sich verstehen', 'hợp nhau', { pos: 'động từ phản thân', e: '🤝', r: 'zích phe-sờ-tê-ần' }), w('warten-auf', 'warten auf', 'chờ', { pos: 'động từ + Akk', e: '⏳', r: 'var-tần ao-f' }), w('denken-an', 'denken an', 'nghĩ về', { pos: 'động từ + Akk', e: '💭', r: 'đen-kần an' }),
      ],
      grammar: [
        table(['Động từ + giới từ', 'Cách', 'Ví dụ'], ['sich verlieben **in**', 'Akk', 'Er hat sich in sie verliebt.'], ['sich streiten **über**', 'Akk', 'Wir streiten uns über Geld.'], ['sich kümmern **um**', 'Akk', 'Ich kümmere mich um meine Oma.'], ['warten **auf**', 'Akk', 'Ich warte auf dich.'], ['denken **an**', 'Akk', 'Ich denke oft an dich.'], ['sich freuen **auf** / **über**', 'Akk', 'Ich freue mich auf das Treffen.'], ['sich unterhalten **mit**', 'Dat', 'Ich unterhalte mich mit meiner Freundin.'], ['sprechen **mit** / **über**', 'Dat / Akk', 'Wir sprechen mit dem Chef über das Projekt.'], ['vertrauen', 'Dat', 'Ich vertraue meinem Freund.']),
        info('**Câu hỏi và đại từ thay thế:** hỏi người: **auf wen? mit wem?**; hỏi vật: **worauf? womit?** (wo + giới từ). *Worauf wartest du? – Auf den Bus. / Auf wen wartest du? – Auf meine Freundin.*'),
        T('**Da-Wörter** thay cho “giới từ + vật”: *Ich warte **darauf**.* (đợi nó), *Ich freue mich **darauf**.* (da + giới từ; nếu giới từ bắt đầu bằng nguyên âm thì **dar-**: **dar**auf, **dar**an, **dar**über).'),
        warn('Học **cả cụm** cùng với **cách**: sai giới từ là lỗi rất phổ biến. Lập flashcard cho từng cụm.'),
      ],
      examples: [dlg(['Anna', 'Worauf wartest du?', 'Bạn đang chờ gì?'], ['Tom', 'Auf meine Freundin. Wir haben uns lange nicht gesehen.', 'Chờ bạn gái tôi. Đã lâu chúng tôi chưa gặp.']), ex('Ich freue mich auf das Wochenende.', 'Tôi mong chờ cuối tuần.'), ex('Wir verstehen uns sehr gut.', 'Chúng tôi rất hợp nhau.')],
      ex: [
        fill('Ich warte ___ dich. (auf)', 'auf', 'warten auf + Akk.'),
        fill('Er hat sich ___ sie verliebt.', 'in', 'sich verlieben in.'),
        fill('Ich kümmere mich ___ meine Oma.', 'um', 'sich kümmern um.'),
        fill('Wir streiten uns ___ Geld.', 'über', 'sich streiten über.'),
        fill('Ich unterhalte mich ___ meiner Freundin.', 'mit', 'sich unterhalten mit + Dativ.'),
        mc('Câu hỏi cho vật “Worauf wartest du?” trả lời:', ['Auf den Bus.', 'Auf wen?', 'Mit dem Bus.', 'Über den Bus.'], 0, 'warten auf + Akk.'),
        order('Tôi mong chờ cuối tuần', 'Ich freue mich auf das Wochenende'),
      ],
      teaches: ['verben-mit-praepositionen'],
      review: '- Học cả cụm: **warten auf, denken an, sich freuen auf/über, sich kümmern um, sich verlieben in, sich streiten über**.\n- **wo + giới từ** (vật), **giới từ + wen/wem** (người), **da + giới từ**.',
    }),
  ],
})
