import { chapter, dlg, ex, fill, info, lesson, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c02-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 2,
  title: 'Sich vorstellen',
  titleVi: 'Giới thiệu bản thân',
  lessons: [
    lesson({
      id: 'a1-c02-l1',
      title: 'Nơi ở và thông tin cá nhân',
      goals: ['Nói tên, nơi ở, ngôn ngữ', 'Điền thông tin cá nhân', 'Dùng wohnen, heißen, kommen'],
      intro: 'Đây là bài “giới thiệu bản thân” hoàn chỉnh: tên, quê, nơi ở. Bạn sẽ ghép các động từ đã học thành một đoạn tự giới thiệu.',
      vocab: [
        w('wohnen', 'wohnen', 'sống, ở', { pos: 'động từ', e: '🏡', r: 'vô-nần' }),
        w('stadt', 'Stadt', 'thành phố', { art: 'die', pl: 'Städte', e: '🏙️', r: 'sờ-tát' }),
        w('land', 'Land', 'đất nước', { art: 'das', pl: 'Länder', e: '🗺️', r: 'lant' }),
        w('adresse', 'Adresse', 'địa chỉ', { art: 'die', pl: 'Adressen', e: '📮', r: 'a-đre-xờ' }),
        w('nachname', 'Nachname', 'họ', { art: 'der', pl: 'Nachnamen', e: '🏷️', r: 'nakh-na-mờ' }),
        w('vorname', 'Vorname', 'tên', { art: 'der', pl: 'Vornamen', e: '🔤', r: 'phô-na-mờ' }),
        w('in', 'in', 'ở, trong', { pos: 'giới từ', e: '📍', r: 'in' }),
        w('hier', 'hier', 'ở đây', { pos: 'trạng từ', e: '📌', r: 'hi-ơ' }),
      ],
      grammar: [
        T('**Hỏi nơi ở:** *Wo wohnst du?* (Bạn sống ở đâu?). **Trả lời:** *Ich wohne in Berlin.* (giới từ **in** + thành phố).'),
        table(['Câu hỏi', 'Trả lời'], ['Wie heißt du?', 'Ich heiße Linh.'], ['Woher kommst du?', 'Ich komme aus Vietnam.'], ['Wo wohnst du?', 'Ich wohne in Berlin.'], ['Welche Sprachen sprichst du?', 'Ich spreche Vietnamesisch und Deutsch.']),
        info('Thêm **und** (và) để nối hai ngôn ngữ hoặc hai thông tin: *Ich spreche Vietnamesisch **und** ein bisschen Deutsch.* **ein bisschen** = một chút.'),
        warn('Chữ “**Wo**” (ở đâu) khác “**Woher**” (từ đâu) và “**Wohin**” (đi đâu). Chữ **wohnen** (sống) chỉ gần giống chứ không liên quan.'),
        tip('Khi giới thiệu, nói theo thứ tự: tên → quê → nơi ở → ngôn ngữ/nghề. Lặp đi lặp lại thành tiếng đến khi trôi chảy.'),
      ],
      examples: [dlg(['Linh', 'Hallo, ich heiße Linh.', 'Chào, tôi tên là Linh.'], ['Linh', 'Ich komme aus Vietnam, aber ich wohne in Berlin.', 'Tôi đến từ Việt Nam nhưng tôi sống ở Berlin.'], ['Linh', 'Ich spreche Vietnamesisch und ein bisschen Deutsch.', 'Tôi nói tiếng Việt và một chút tiếng Đức.'])],
      ex: [
        fill('Wo ___ du? (wohnen)', 'wohnst', 'du → wohnst.'),
        fill('Ich ___ in Hanoi.', 'wohne', 'ich → wohne.'),
        order('Tôi sống ở Berlin', 'Ich wohne in Berlin'),
        order('Bạn sống ở đâu?', 'Wo wohnst du?'),
        typ('Hoàn thành: “Ich komme ___ Vietnam.” (từ)', 'aus', 'kommen + aus + nước.'),
      ],
      teaches: ['wo-wohin-woher'],
      review: '- **Wo wohnst du? – Ich wohne in …**\n- Nối bằng **und / aber**.\n- Đủ để tự giới thiệu 4 câu.',
    }),
    lesson({
      id: 'a1-c02-l2',
      title: 'Bài tự giới thiệu hoàn chỉnh',
      goals: ['Viết và nói đoạn tự giới thiệu 5–6 câu'],
      intro: 'Dùng mọi thứ đã học để viết **một đoạn giới thiệu bản thân**. Dưới đây là hai mẫu, bạn thay thông tin bằng của mình.',
      grammar: [
        T('**Mẫu đoạn giới thiệu:**\n\n*Hallo! Ich heiße ___. Ich komme aus ___. Ich wohne in ___. Ich spreche ___ und ___. Ich lerne Deutsch.*'),
        info('**lernen** (học) chia như động từ thường: ich lerne, du lernst, er lernt…'),
      ],
      examples: [dlg(['Max', 'Hallo! Ich bin Max. Ich komme aus München.', 'Chào! Tôi là Max. Tôi đến từ München.'], ['Max', 'Ich wohne jetzt in Hamburg. Ich spreche Deutsch und Englisch.', 'Bây giờ tôi sống ở Hamburg. Tôi nói tiếng Đức và tiếng Anh.']), ex('Ich lerne Deutsch.', 'Tôi học tiếng Đức.')],
      ex: [
        order('Tôi học tiếng Đức', 'Ich lerne Deutsch'),
        order('Tôi nói tiếng Việt và tiếng Đức', 'Ich spreche Vietnamesisch und Deutsch'),
        fill('Er ___ Deutsch. (lernen)', 'lernt', 'er → lernt.'),
        mc('Câu nào là câu hỏi “Bạn học gì?” đúng cấu trúc W-Frage?', ['Was lernst du?', 'Du lernst was?', 'Lernst was du?', 'Was du lernst?'], 0, 'W-từ + động từ + chủ ngữ.'),
      ],
      auto: false,
      review: '- Bạn đã có đủ công cụ để **tự giới thiệu** bằng tiếng Đức.',
    }),
  ],
})
