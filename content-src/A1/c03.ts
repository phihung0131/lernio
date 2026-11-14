import { chapter, dict, dlg, ex, fill, info, lesson, listen, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c03-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 3,
  title: 'Zahlen und Alter',
  titleVi: 'Số đếm và tuổi',
  lessons: [
    lesson({
      id: 'a1-c03-l1',
      title: 'Số từ 11 đến 100',
      goals: ['Đếm đến 100', 'Hiểu quy tắc “đơn vị trước, chục sau”'],
      intro: 'Số từ 11 đến 19 có dạng riêng, từ 20 trở đi có **quy tắc đặc biệt**: tiếng Đức đọc **hàng đơn vị trước**, rồi **und**, rồi hàng chục. Ví dụ 21 = *einundzwanzig* (một-và-hai mươi).',
      vocab: [
        w('elf', 'elf', '11', { e: '1️⃣', r: 'elf' }), w('zwolf', 'zwölf', '12', { e: '1️⃣', r: 'tsvơlf' }), w('dreizehn', 'dreizehn', '13', { r: 'đrai-tsên' }), w('zwanzig', 'zwanzig', '20', { r: 'tsvan-tsích' }), w('dreissig', 'dreißig', '30', { r: 'đrai-xích' }), w('vierzig', 'vierzig', '40', { r: 'phia-tsích' }), w('funfzig', 'fünfzig', '50', { r: 'phuynf-tsích' }), w('hundert', 'hundert', '100', { r: 'hun-đơt' }),
      ],
      grammar: [
        table(['Số', 'Tiếng Đức'], ['11', 'elf'], ['12', 'zwölf'], ['13', 'dreizehn'], ['14', 'vierzehn'], ['15', 'fünfzehn'], ['16', 'sechzehn (bỏ s)'], ['17', 'siebzehn (bỏ en)'], ['18', 'achtzehn'], ['19', 'neunzehn']),
        table(['Chục', 'Tiếng Đức'], ['20', 'zwanzig'], ['30', 'dreißig (ß)'], ['40', 'vierzig'], ['50', 'fünfzig'], ['60', 'sechzig (bỏ s)'], ['70', 'siebzig (bỏ en)'], ['80', 'achtzig'], ['90', 'neunzig'], ['100', 'hundert']),
        T('**Số ghép từ 21:** đơn vị + **und** + chục, viết liền một từ.\n- 21 = **ein**und**zwanzig**\n- 34 = **vier**und**dreißig**\n- 99 = **neun**und**neunzig**'),
        warn('Với số 1 trong số ghép, dùng **ein** (không phải eins): **ein**undzwanzig. Chỉ khi đứng một mình mới là **eins**.'),
        tip('Khi nghe số điện thoại hay giá tiền, người Đức đọc **theo cặp hai chữ số** hoặc ghép dài. Cứ ghi nhớ quy tắc “đơn vị trước”.'),
      ],
      examples: [ex('Ich bin einundzwanzig Jahre alt.', 'Tôi hai mươi mốt tuổi.'), ex('Das kostet fünfzig Euro.', 'Cái này giá 50 euro.'), ex('Hundert Prozent', 'một trăm phần trăm')],
      ex: [
        match('Nối số với chữ.', ['11', 'elf'], ['12', 'zwölf'], ['20', 'zwanzig'], ['30', 'dreißig'], ['100', 'hundert']),
        typ('Viết bằng chữ: 21', 'einundzwanzig', '21 = einundzwanzig.'),
        typ('Viết bằng chữ: 34', 'vierunddreißig', '34 = vierunddreißig.'),
        mc('“sechzehn” là số nào?', ['6', '16', '60', '66'], 1, 'sechzehn = 16.'),
        mc('“siebzig” là số nào?', ['17', '27', '70', '77'], 2, 'siebzig = 70.'),
        listen('dreiundvierzig', ['dreiundvierzig', 'vierunddreißig', 'dreiunddreißig', 'vierundvierzig'], 0),
        dict('fünfundzwanzig'),
      ],
      auto: false,
      teaches: ['zahlen-bis-100'],
      review: '- 11 elf, 12 zwölf, 13–19 = số + zehn.\n- Chục: zwanzig, dreißig, vierzig…\n- Số ghép: **đơn vị + und + chục**.',
    }),
    lesson({
      id: 'a1-c03-l2',
      title: 'Tuổi và số điện thoại',
      goals: ['Hỏi và nói tuổi', 'Đọc số điện thoại'],
      intro: 'Hỏi tuổi trong tiếng Đức dùng **sein** (là), không dùng “có”: **Ich bin 25 Jahre alt.** (Tôi là 25 năm tuổi).',
      vocab: [
        w('alt', 'alt', 'tuổi, già', { pos: 'tính từ', e: '🎂', r: 'an-t' }), w('jahr', 'Jahr', 'năm, tuổi', { art: 'das', pl: 'Jahre', e: '📅', r: 'da-r' }), w('telefonnummer', 'Telefonnummer', 'số điện thoại', { art: 'die', pl: 'Telefonnummern', e: '📞', r: 'tê-lê-phôn-nu-mơ' }), w('handy', 'Handy', 'điện thoại di động', { art: 'das', pl: 'Handys', e: '📱', r: 'hen-đi' }), w('email', 'E-Mail', 'thư điện tử', { art: 'die', pl: 'E-Mails', e: '✉️', r: 'i-mêl' }),
      ],
      grammar: [
        table(['Hỏi', 'Trả lời'], ['Wie alt bist du?', 'Ich bin 25 (Jahre alt).'], ['Wie alt ist er?', 'Er ist 30.'], ['Wie ist deine Telefonnummer?', 'Meine Nummer ist 0151 …']),
        info('**Ngữ pháp:** *Wie alt* (bao nhiêu tuổi) + **bist/ist/sind** + chủ ngữ. Không dùng “haben” cho tuổi.'),
        warn('Không nói “Ich habe 25 Jahre” (từ tiếng Pháp/Tây Ban Nha). Tiếng Đức: **Ich bin 25 (Jahre alt)**.'),
        tip('Đọc số điện thoại từng cặp hoặc từng chữ số: 0151 → “null-eins-fünf-eins”. Số 0 đọc **null**.'),
      ],
      examples: [dlg(['Lea', 'Wie alt bist du?', 'Bạn bao nhiêu tuổi?'], ['Tom', 'Ich bin vierundzwanzig. Und du?', 'Tôi 24. Còn bạn?'], ['Lea', 'Ich bin neunundzwanzig.', 'Tôi 29.'])],
      ex: [
        order('Bạn bao nhiêu tuổi?', 'Wie alt bist du?'),
        order('Tôi 25 tuổi', 'Ich bin fünfundzwanzig Jahre alt'),
        fill('Wie ___ bist du?', 'alt', 'Wie alt = bao nhiêu tuổi.'),
        mc('Câu nào đúng?', ['Ich bin 20 Jahre alt', 'Ich habe 20 Jahre', 'Ich bin 20 Jahre haben', 'Ich 20 Jahre bin'], 0, 'Tuổi dùng sein.'),
      ],
      review: '- **Wie alt bist du? – Ich bin … (Jahre alt).**\n- Dùng **sein**, không dùng haben.',
    }),
  ],
})
