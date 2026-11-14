import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn, art, illus } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c04-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 4,
  title: 'Familie',
  titleVi: 'Gia đình',
  lessons: [
    lesson({
      id: 'a1-c04-l1',
      title: 'Thành viên gia đình và giống của danh từ',
      goals: ['Gọi tên thành viên gia đình', 'Hiểu 3 giống der/die/das', 'Học danh từ kèm mạo từ'],
      intro: 'Mỗi danh từ tiếng Đức có **một giống** (Genus): **der** (đực), **die** (cái), **das** (trung). Giống phải **học cùng với từ**, không đoán được hoàn toàn từ nghĩa. May là có vài quy luật hữu ích.',
      vocab: [
        w('vater', 'Vater', 'bố', { art: 'der', pl: 'Väter', e: '👨', r: 'pha-tơ' }), w('mutter', 'Mutter', 'mẹ', { art: 'die', pl: 'Mütter', e: '👩', r: 'mu-tơ' }), w('eltern', 'Eltern', 'bố mẹ', { pos: 'danh từ số nhiều', e: '👪', r: 'el-tơn' }), w('bruder', 'Bruder', 'anh/em trai', { art: 'der', pl: 'Brüder', e: '👦', r: 'bru-đơ' }), w('schwester', 'Schwester', 'chị/em gái', { art: 'die', pl: 'Schwestern', e: '👧', r: 'své-xtơ' }), w('kind', 'Kind', 'đứa trẻ, con', { art: 'das', pl: 'Kinder', e: '🧒', r: 'kin-t' }), w('oma', 'Oma', 'bà', { art: 'die', pl: 'Omas', e: '👵', r: 'ô-ma' }), w('opa', 'Opa', 'ông', { art: 'der', pl: 'Opas', e: '👴', r: 'ô-pa' }),
      ],
      grammar: [
        T('**Mạo từ xác định (bestimmter Artikel)** dùng cho vật đã biết: **der** Mann, **die** Frau, **das** Kind. **Mạo từ không xác định (unbestimmter Artikel)** dùng cho vật mới nhắc: **ein** Mann, **eine** Frau, **ein** Kind.'),
        illus('genders'),
        table(['Giống', 'Xác định', 'Không xác định', 'Màu'], ['Đực (maskulin)', 'der', 'ein', '🔵'], ['Cái (feminin)', 'die', 'eine', '🔴'], ['Trung (neutral)', 'das', 'ein', '🟢']),
        info('**Quy luật hay gặp:** người đàn ông → **der** (der Vater), người phụ nữ → **die** (die Mutter), nhưng **das Kind**, **das Mädchen** (bé gái) là giống **trung**! Danh từ đuôi **-ung, -heit, -keit, -schaft, -ion** → **die**. Đuôi **-chen, -lein** → **das**.'),
        warn('Đừng cố đoán giống theo nghĩa. **das Mädchen** (cô gái) là giống trung, **die Person** (người) luôn là giống cái dù đó là đàn ông. Cứ học cả cụm: **der Vater**, **die Mutter**.'),
        tip('Dùng **màu** để nhớ: der = xanh dương, die = đỏ, das = xanh lá. Lernio dùng màu này ở khắp nơi.'),
      ],
      examples: [ex('Der Vater ist alt.', 'Người bố già.'), ex('Die Mutter ist nett.', 'Người mẹ tốt bụng.'), ex('Das Kind spielt.', 'Đứa trẻ đang chơi.'), ex('Ich habe einen Bruder und eine Schwester.', 'Tôi có một anh trai và một chị gái.')],
      ex: [
        art('Vater', 'der'), art('Mutter', 'die'), art('Kind', 'das'), art('Schwester', 'die'), art('Opa', 'der'),
        fill('___ Mutter ist nett. (xác định)', 'Die', 'Mutter là giống cái → die.'),
        fill('Ich habe ___ Bruder. (không xác định, giống đực, dùng sau haben ở Akkusativ)', 'einen', 'Akkusativ giống đực: einen. Bạn sẽ học ở bài sau.'),
        match('Ghép với mạo từ.', ['Vater', 'der'], ['Mutter', 'die'], ['Kind', 'das'], ['Eltern', 'pl. (số nhiều)']),
      ],
      teaches: ['artikel-genus'],
      review: '- Ba giống: **der / die / das** (xác định); **ein / eine / ein** (không xác định).\n- **Học danh từ kèm mạo từ.**\n- Đuôi **-ung, -heit, -keit** = die; **-chen** = das.',
    }),
    lesson({
      id: 'a1-c04-l2',
      title: 'Sở hữu: mein, dein, sein, ihr',
      goals: ['Dùng mạo từ sở hữu mein/dein', 'Nói “gia đình của tôi”'],
      intro: 'Khi nói “bố của tôi”, tiếng Đức dùng **mạo từ sở hữu** (Possessivartikel) đặt **trước** danh từ: **mein Vater**. Nó đổi đuôi giống mạo từ **ein**.',
      vocab: [
        w('mein', 'mein', 'của tôi', { pos: 'mạo từ sở hữu', e: '🙋', r: 'mai-n' }), w('dein', 'dein', 'của bạn', { pos: 'mạo từ sở hữu', e: '🫵', r: 'đai-n' }), w('sein', 'sein', 'của anh ấy', { pos: 'mạo từ sở hữu', e: '👨', r: 'dai-n' }), w('ihr', 'ihr', 'của cô ấy', { pos: 'mạo từ sở hữu', e: '👩', r: 'i-ơ' }), w('unser', 'unser', 'của chúng tôi', { pos: 'mạo từ sở hữu', e: '👥', r: 'un-dơ' }), w('verheiratet', 'verheiratet', 'đã kết hôn', { pos: 'tính từ', e: '💍', r: 'phe-hai-ra-tết' }), w('ledig', 'ledig', 'độc thân', { pos: 'tính từ', e: '🙂', r: 'lê-đích' }),
      ],
      grammar: [
        table(['Đại từ', 'Sở hữu', 'Ví dụ'], ['ich', 'mein', 'mein Vater'], ['du', 'dein', 'deine Mutter'], ['er / es', 'sein', 'sein Bruder'], ['sie', 'ihr', 'ihre Schwester'], ['wir', 'unser', 'unsere Familie'], ['ihr', 'euer', 'eure Eltern'], ['sie / Sie', 'ihr / Ihr', 'Ihre Adresse']),
        T('**Đuôi theo danh từ (Nominativ):**\n- giống đực & trung, số ít: **mein** Vater, **mein** Kind (không đuôi)\n- giống cái & số nhiều: **meine** Mutter, **meine** Eltern (thêm **-e**)'),
        warn('**sein** (động từ “là”) và **sein** (mạo từ “của anh ấy”) viết giống nhau nhưng khác chức năng. Ngữ cảnh sẽ cho biết: *Er **ist** ... sein Vater **ist** ...*'),
        info('Mạo từ sở hữu thay đổi theo **người sở hữu**, đuôi thay đổi theo **vật được sở hữu**. *Ihre* (của cô ấy) + giống cái → *ihre Mutter*.'),
      ],
      examples: [dlg(['Anna', 'Das ist meine Familie.', 'Đây là gia đình tôi.'], ['Anna', 'Mein Vater heißt Peter, meine Mutter heißt Eva.', 'Bố tôi tên Peter, mẹ tôi tên Eva.'], ['Anna', 'Ich habe einen Bruder. Er heißt Tim.', 'Tôi có một anh trai. Anh ấy tên Tim.'])],
      ex: [
        fill('Das ist ___ Mutter. (mein)', 'meine', 'Mutter giống cái → meine.'),
        fill('Das ist ___ Vater. (dein)', 'dein', 'Vater giống đực → dein.'),
        fill('Das sind ___ Eltern. (mein)', 'meine', 'Số nhiều → meine.'),
        fill('Das ist ___ Kind. (unser)', 'unser', 'Kind giống trung → unser.'),
        mc('Câu nào đúng?', ['Das ist meine Schwester', 'Das ist mein Schwester', 'Das ist meinen Schwester', 'Das ist meins Schwester'], 0, 'die Schwester → meine.'),
        order('Mẹ tôi tên là Eva', 'Meine Mutter heißt Eva'),
      ],
      teaches: ['possessivartikel'],
      review: '- mein, dein, sein, ihr, unser, euer, ihr/Ihr.\n- Danh từ **giống cái và số nhiều** thêm **-e**: meine Mutter, meine Eltern.',
    }),
    lesson({
      id: 'a1-c04-l3',
      title: 'haben và Akkusativ: Ich habe einen Bruder',
      goals: ['Chia động từ haben', 'Biết Akkusativ đổi mạo từ giống đực: ein → einen'],
      intro: 'Khi nói **có** cái gì (haben), thứ được “có” đứng ở **Akkusativ** (cách 4). Khác biệt duy nhất ở giống đực: **ein → einen**, **der → den**.',
      vocab: [
        w('haben', 'haben', 'có', { pos: 'động từ', e: '🤲', r: 'ha-bần' }), w('geschwister', 'Geschwister', 'anh chị em', { pos: 'danh từ số nhiều', e: '👫', r: 'gờ-sví-xtơ' }), w('keine', 'keine', 'không có', { pos: 'từ phủ định', e: '🚫', r: 'kai-nờ' }), w('einzelkind', 'Einzelkind', 'con một', { art: 'das', e: '1️⃣', r: 'ain-tsồl-kin-t' }),
      ],
      grammar: [
        table(['haben', ''], ['ich habe', 'wir haben'], ['du hast', 'ihr habt'], ['er/sie/es hat', 'sie/Sie haben']),
        table(['', 'Nominativ (chủ ngữ)', 'Akkusativ (tân ngữ trực tiếp)'], ['đực', 'der / ein Bruder', 'den / **einen** Bruder'], ['cái', 'die / eine Schwester', 'die / eine Schwester'], ['trung', 'das / ein Kind', 'das / ein Kind'], ['số nhiều', 'die / — Geschwister', 'die / — Geschwister']),
        info('**Chỉ có giống đực thay đổi** ở Akkusativ: **der → den**, **ein → einen**, **mein → meinen**. Giống cái, trung, số nhiều giữ nguyên.'),
        T('**Phủ định với kein:** dùng **kein** thay cho **ein**: *Ich habe **keinen** Bruder.* (đực Akkusativ), *Ich habe **keine** Schwester.*, *Ich habe **kein** Kind.*'),
        warn('Chủ ngữ ở **Nominativ**, tân ngữ ở **Akkusativ**. Sai: *Ich habe ein Bruder.* Đúng: *Ich habe **einen** Bruder.*'),
      ],
      examples: [ex('Ich habe einen Bruder.', 'Tôi có một anh trai.'), ex('Ich habe keine Schwester.', 'Tôi không có chị gái.'), ex('Hast du Geschwister?', 'Bạn có anh chị em không?'), ex('Sie hat ein Kind.', 'Cô ấy có một đứa con.')],
      ex: [
        fill('Ich ___ einen Bruder. (haben)', 'habe', 'ich → habe.'),
        fill('Du ___ eine Schwester. (haben)', 'hast', 'du → hast.'),
        fill('Er ___ ein Kind. (haben)', 'hat', 'er → hat.'),
        fill('Ich habe ___ Bruder. (ein)', 'einen', 'Akkusativ đực.'),
        fill('Ich habe ___ Schwester. (ein)', 'eine', 'cái giữ nguyên.'),
        fill('Ich habe ___ Bruder. (kein)', 'keinen', 'kein + đực Akkusativ = keinen.'),
        order('Tôi không có chị gái', 'Ich habe keine Schwester'),
        order('Bạn có anh chị em không?', 'Hast du Geschwister?'),
      ],
      teaches: ['haben', 'akkusativ-intro', 'kein'],
      review: '- ich habe, du hast, er hat, wir haben, ihr habt, sie haben.\n- **Akkusativ giống đực:** der → **den**, ein → **einen**, kein → **keinen**.\n- Phủ định danh từ bằng **kein**.',
    }),
  ],
})
