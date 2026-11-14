import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c01-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 1,
  title: 'Erlebnisse erzählen',
  titleVi: 'Kể trải nghiệm: Präteritum',
  lessons: [
    lesson({
      id: 'b1-c01-l1',
      title: 'Präteritum: động từ thường và bất quy tắc',
      goals: ['Chia Präteritum cho động từ thường', 'Biết 20 động từ bất quy tắc phổ biến', 'Phân biệt dùng Perfekt và Präteritum'],
      intro: '**Präteritum** là thì quá khứ của **văn viết**: truyện, báo chí, tiểu thuyết, thư từ. Trong văn nói, Perfekt phổ biến hơn, trừ **sein, haben và modal**.',
      vocab: [
        w('erlebnis', 'Erlebnis', 'trải nghiệm', { art: 'das', pl: 'Erlebnisse', e: '🎢', r: 'e-lếp-nít' }), w('erzahlen', 'erzählen', 'kể', { pos: 'động từ', e: '🗣️', r: 'e-tsê-lần' }), w('passieren', 'passieren', 'xảy ra', { pos: 'động từ', e: '❗', r: 'pa-xi-rần' }), w('plotzlich', 'plötzlich', 'đột nhiên', { pos: 'trạng từ', e: '⚡', r: 'plơ-tsờ-lích' }), w('damals', 'damals', 'hồi đó', { pos: 'trạng từ', e: '🕰️', r: 'đa-mals' }), w('einmal', 'einmal', 'một lần, ngày xưa', { pos: 'trạng từ', e: '1️⃣', r: 'ai-n-mal' }), w('kindheit', 'Kindheit', 'thời thơ ấu', { art: 'die', e: '🧒', r: 'kin-t-hai-t' }),
      ],
      grammar: [
        table(['', 'Động từ thường (yếu)', 'Động từ bất quy tắc (mạnh)'], ['Cách tạo', 'gốc + **-te**', 'đổi nguyên âm gốc (+ có khi đổi phụ âm)'], ['ich', 'mach**te**', 'ging, kam, sah'], ['du', 'mach**test**', 'gingst, kamst, sahst'], ['er/sie/es', 'mach**te**', 'ging, kam, sah (không đuôi)'], ['wir', 'mach**ten**', 'gingen, kamen, sahen'], ['ihr', 'mach**tet**', 'gingt, kamt, saht'], ['sie/Sie', 'mach**ten**', 'gingen, kamen, sahen']),
        warn('**ich và er/sie/es giống nhau ở Präteritum:** ich ging / er ging; ich machte / er machte. Động từ mạnh **không có đuôi** ở hai ngôi này.'),
        table(['Nguyên mẫu', 'Präteritum', 'Partizip II'], ['gehen', 'ging', 'ist gegangen'], ['kommen', 'kam', 'ist gekommen'], ['sehen', 'sah', 'hat gesehen'], ['essen', 'aß', 'hat gegessen'], ['trinken', 'trank', 'hat getrunken'], ['schreiben', 'schrieb', 'hat geschrieben'], ['lesen', 'las', 'hat gelesen'], ['sprechen', 'sprach', 'hat gesprochen'], ['nehmen', 'nahm', 'hat genommen'], ['geben', 'gab', 'hat gegeben'], ['finden', 'fand', 'hat gefunden'], ['fahren', 'fuhr', 'ist gefahren'], ['bleiben', 'blieb', 'ist geblieben'], ['denken', 'dachte', 'hat gedacht'], ['bringen', 'brachte', 'hat gebracht'], ['wissen', 'wusste', 'hat gewusst']),
        info('**Khi nào dùng Präteritum?** Truyện kể, báo chí, email trang trọng, bài viết. **Luôn dùng** cho **sein, haben, modal** khi nói: *Ich war müde*, *Ich hatte Hunger*, *Ich musste arbeiten*. Còn lại, khi nói chuyện thường dùng Perfekt.'),
        tip('Động từ tận cùng **-t / -d** thêm **e** trước đuôi: *arbeiten → arbeitete*, *warten → wartete*.'),
      ],
      examples: [ex('Gestern ging ich nach der Arbeit direkt nach Hause.', 'Hôm qua sau giờ làm tôi về nhà ngay.'), ex('Als Kind spielte ich oft im Garten.', 'Hồi nhỏ tôi hay chơi trong vườn.'), ex('Er kam spät und sagte nichts.', 'Anh ấy đến muộn và không nói gì.')],
      ex: [
        fill('Ich ___ gestern nach Hause. (gehen)', 'ging', 'gehen → ging.'),
        fill('Er ___ einen Brief. (schreiben)', 'schrieb', 'schreiben → schrieb.'),
        fill('Wir ___ Pizza. (essen)', 'aßen', 'essen → aß, wir aßen.'),
        fill('Sie ___ im Garten. (spielen)', 'spielte', 'spielen → spielte.'),
        fill('Du ___ das Buch. (nehmen)', 'nahmst', 'nehmen → nahm, du nahmst.'),
        fill('Ich ___ keine Zeit. (haben)', 'hatte', 'haben → hatte.'),
        mc('Präteritum của “kommen”:', ['kam', 'kommte', 'gekommen', 'komm'], 0, 'kommen → kam.'),
        match('Nối nguyên mẫu với Präteritum.', ['sehen', 'sah'], ['fahren', 'fuhr'], ['finden', 'fand'], ['bleiben', 'blieb']),
      ],
      teaches: ['praeteritum'],
      review: '- Thường: **gốc + -te**; mạnh: **đổi nguyên âm**.\n- ich/er giống nhau; mạnh không đuôi.\n- Văn viết/truyện: Präteritum; văn nói: Perfekt (trừ sein/haben/modal).',
    }),
    lesson({
      id: 'b1-c01-l2',
      title: 'Kể một câu chuyện',
      goals: ['Kể câu chuyện bằng Präteritum', 'Dùng als (khi, một lần trong quá khứ)', 'Phân biệt als / wenn / wann'],
      intro: 'Khi kể chuyện quá khứ, bạn cần nối các sự kiện bằng **als**, **nachdem**, **dann**… Hãy học cách phân biệt **als / wenn / wann**.',
      vocab: [
        w('als', 'als', 'khi (quá khứ, một lần)', { pos: 'liên từ phụ', e: '⏮️', r: 'an-x' }), w('wenn', 'wenn', 'khi / nếu (lặp lại)', { pos: 'liên từ phụ', e: '🔁', r: 'ven' }), w('wann', 'wann', 'khi nào (câu hỏi)', { pos: 'từ hỏi', e: '❓', r: 'van' }), w('ploetzlich', 'plötzlich', 'đột nhiên', { pos: 'trạng từ', e: '⚡', r: 'plơ-tsờ-lích' }), w('endlich', 'endlich', 'cuối cùng thì', { pos: 'trạng từ', e: '🎉', r: 'en-đờ-lích' }),
      ],
      grammar: [
        table(['Từ', 'Dùng khi', 'Ví dụ'], ['**als**', 'sự kiện **một lần** trong **quá khứ**', 'Als ich 10 war, zog ich nach Berlin.'], ['**wenn**', 'sự kiện **lặp lại** (quá khứ/hiện tại) hoặc **tương lai**; “nếu”', 'Wenn es regnete, blieb ich zu Hause. • Wenn du kommst, rufe ich dich an.'], ['**wann**', 'câu hỏi “khi nào” hoặc câu phụ gián tiếp', 'Wann kommst du? • Ich weiß nicht, wann er kommt.']),
        warn('Cả **als** và **wenn** đều là liên từ phụ: **động từ chia ở cuối câu phụ**. *Als ich ankam, **regnete** es.* (câu phụ đứng đầu → động từ câu chính đứng ngay sau dấu phẩy).'),
        T('**Mẫu truyện ngắn:**\n*Als ich vor zehn Jahren nach Deutschland **kam**, **sprach** ich kein Wort Deutsch. Am Anfang **war** alles schwer. **Plötzlich** **verstand** ich meine Nachbarin, und ich **freute** mich sehr. **Endlich** **hatte** ich das Gefühl, hier zu Hause zu sein.*'),
        tip('Muốn câu chuyện sống động hãy dùng trạng từ: **plötzlich, auf einmal, endlich, schließlich, zum Glück, leider**.'),
      ],
      examples: [dlg(['Anna', 'Erzähl mir von deiner ersten Zeit in Deutschland!', 'Kể cho tôi về thời gian đầu của bạn ở Đức!'], ['Linh', 'Als ich ankam, verstand ich fast nichts. Aber ich lernte jeden Tag neue Wörter.', 'Khi tôi đến, tôi gần như không hiểu gì. Nhưng tôi học từ mới mỗi ngày.'])],
      ex: [
        fill('___ ich klein war, wohnte ich auf dem Land. (khi, một lần)', 'Als', 'quá khứ, một giai đoạn: als.'),
        fill('___ es regnet, bleibe ich zu Hause. (mỗi khi)', 'Wenn', 'lặp lại/hiện tại: wenn.'),
        fill('Ich weiß nicht, ___ er kommt. (khi nào)', 'wann', 'câu hỏi gián tiếp: wann.'),
        order('Khi tôi đến, trời mưa', 'Als ich ankam, regnete es'),
        mc('Câu nào đúng?', ['Als ich 10 war, zog ich um', 'Wenn ich 10 war, zog ich um', 'Wann ich 10 war, zog ich um', 'Als ich war 10, zog ich um'], 0, 'quá khứ một lần: als.'),
      ],
      teaches: ['als-wenn-wann'],
      review: '- **als** (một lần quá khứ), **wenn** (lặp lại, nếu), **wann** (khi nào).\n- Nối truyện bằng plötzlich, endlich, schließlich.',
    }),
  ],
})
