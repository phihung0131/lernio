import { chapter, dict, dlg, ex, fill, info, lesson, listen, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

export default chapter({
  level: 'A0',
  order: 9,
  title: 'Personalpronomen',
  titleVi: 'Đại từ nhân xưng cơ bản',
  lessons: [
    lesson({
      id: 'a0-c09-l1',
      title: 'ich, du, er, sie, es',
      goals: ['Dùng ich, du, er, sie, es', 'Biết er/sie/es cho người và vật'],
      intro: '**Đại từ nhân xưng** (Personalpronomen) là từ thay cho người hoặc vật: tôi, bạn, anh ấy, cô ấy… Đây là nền tảng để chia động từ ở A1.',
      vocab: [
        v('ich', 'ich', 'tôi', { r: 'ích' }),
        v('du', 'du', 'bạn (thân mật)', { r: 'đu' }),
        v('er', 'er', 'anh ấy / nó (giống đực)', { r: 'e-ơ' }),
        v('sie', 'sie', 'cô ấy / nó (giống cái)', { r: 'di' }),
        v('es', 'es', 'nó (giống trung)', { r: 'ét' }),
      ],
      grammar: [
        table(['Đại từ', 'Nghĩa', 'Dùng khi'], ['ich', 'tôi', 'chính bạn'], ['du', 'bạn', 'nói với một người thân quen'], ['er', 'anh ấy, nó', 'một người nam hoặc vật giống der'], ['sie', 'cô ấy, nó', 'một người nữ hoặc vật giống die'], ['es', 'nó', 'vật giống das, thời tiết, trẻ nhỏ']),
        info('**er/sie/es dùng cả cho vật** theo giống của danh từ: *der Tisch* → **er** (cái bàn). *die Lampe* → **sie** (cái đèn). *das Buch* → **es** (cuốn sách). Khác với tiếng Việt!'),
        warn('**sie** có nhiều nghĩa (cô ấy / họ / Sie lịch sự) ở bài sau. Hiện giờ nhớ: **sie = cô ấy**.'),
        tip('Người Việt có rất nhiều đại từ (anh, chị, em…), còn tiếng Đức dùng **du** với mọi người thân quen, kể cả người lớn tuổi hơn trong nhà.'),
      ],
      examples: [ex('Ich bin Anna.', 'Tôi là Anna.'), ex('Du bist Tom.', 'Bạn là Tom.'), ex('Er ist Max.', 'Anh ấy là Max.'), ex('Sie ist Lea.', 'Cô ấy là Lea.')],
      ex: [
        match('Nối đại từ với nghĩa.', ['ich', 'tôi'], ['du', 'bạn (thân mật)'], ['er', 'anh ấy'], ['sie', 'cô ấy']),
        mc('Cái bàn (der Tisch) được thay bằng đại từ nào?', ['er', 'sie', 'es', 'du'], 0, 'der Tisch → er.'),
        mc('Cuốn sách (das Buch) được thay bằng đại từ nào?', ['er', 'sie', 'es', 'ich'], 2, 'das Buch → es.'),
        typ('Điền đại từ: “___ bin Anna.” (Tôi là Anna)', ['Ich', 'ich'], 'ich = tôi.'),
      ],
      auto: false,
      review: '- ich (tôi), du (bạn), er (anh ấy/nó der), sie (cô ấy/nó die), es (nó das).\n- Đại từ thay cho vật theo **giống** của danh từ.',
    }),
    lesson({
      id: 'a0-c09-l2',
      title: 'wir, ihr, sie (họ), Sie (lịch sự)',
      goals: ['Dùng wir, ihr, sie, Sie', 'Phân biệt du và Sie'],
      intro: 'Bốn đại từ còn lại cho số nhiều và cách xưng hô lịch sự. **Sie** (viết hoa) là điều đặc biệt nhất.',
      vocab: [
        v('wir', 'wir', 'chúng tôi, chúng ta', { r: 'vi-ơ' }),
        v('ihr', 'ihr', 'các bạn', { r: 'i-ơ' }),
        v('sie-pl', 'sie', 'họ', { r: 'di' }),
        v('sie-formal', 'Sie', 'ông/bà/bạn (lịch sự)', { r: 'di' }),
      ],
      grammar: [
        table(['Số ít', 'Số nhiều'], ['ich (tôi)', 'wir (chúng tôi)'], ['du (bạn)', 'ihr (các bạn)'], ['er / sie / es', 'sie (họ)'], ['Sie (lịch sự, số ít và nhiều)', 'Sie (lịch sự)']),
        warn('**Sie** (viết hoa, lịch sự) dùng với người lạ, người lớn tuổi, đồng nghiệp, khách hàng, thầy cô. **du** dùng với bạn bè, người thân, trẻ em. Dùng sai du với người lạ có thể bị coi là bất lịch sự.'),
        info('Cách phân biệt **sie** (cô ấy), **sie** (họ) và **Sie** (lịch sự): nhìn **động từ** đi kèm và **chữ hoa**. Sie lịch sự luôn viết hoa. Ở A1 bạn sẽ học động từ chia theo từng đại từ.'),
        tip('Với người Đức, chuyển từ **Sie** sang **du** là một bước thân thiết. Thường người lớn tuổi sẽ mời trước: “Wir können uns duzen” (Chúng ta xưng du nhé).'),
      ],
      examples: [dlg(['Student', 'Guten Tag! Wie heißen Sie?', 'Chào ông! Ông tên là gì?'], ['Lehrer', 'Ich heiße Müller. Und Sie?', 'Tôi tên là Müller. Còn bạn?']), ex('Wir sind Freunde.', 'Chúng tôi là bạn.'), ex('Ihr seid Studenten.', 'Các bạn là sinh viên.')],
      ex: [
        mc('Bạn nói chuyện với giáo viên lần đầu gặp. Nên dùng đại từ nào?', ['du', 'Sie', 'er', 'wir'], 1, 'Người lạ, người lớn: Sie (lịch sự).'),
        mc('Bạn nói với bạn thân cùng tuổi. Nên dùng:', ['du', 'Sie', 'sie', 'es'], 0, 'Bạn bè: du.'),
        match('Nối đại từ với nghĩa.', ['wir', 'chúng tôi'], ['ihr', 'các bạn'], ['sie (họ)', 'họ'], ['Sie', 'lịch sự']),
        fill('Nhiều người, thân mật: “___ seid Freunde.” (Các bạn là bạn bè)', ['Ihr', 'ihr'], 'ihr = các bạn.'),
      ],
      auto: false,
      review: '- wir (chúng tôi), ihr (các bạn), sie (họ), **Sie** (lịch sự).\n- **du** thân mật, **Sie** lịch sự, nhớ viết hoa.',
    }),
  ],
})
