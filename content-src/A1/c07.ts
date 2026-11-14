import { chapter, dict, dlg, ex, fill, info, lesson, listen, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c07-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 7,
  title: 'Uhrzeit und Datum',
  titleVi: 'Thời gian, ngày tháng',
  lessons: [
    lesson({
      id: 'a1-c07-l1',
      title: 'Giờ giấc',
      goals: ['Hỏi và nói giờ', 'Phân biệt giờ chính thức và thân mật'],
      intro: 'Khi hỏi giờ: **Wie spät ist es?** hoặc **Wie viel Uhr ist es?** Có hai cách nói giờ: **thân mật** (hằng ngày) và **chính thức** (đọc 24 giờ, dùng trên đài, lịch tàu).',
      vocab: [
        w('uhr', 'Uhr', 'giờ, đồng hồ', { art: 'die', pl: 'Uhren', e: '🕐', r: 'u-ơ' }), w('stunde', 'Stunde', 'tiếng (60 phút)', { art: 'die', pl: 'Stunden', e: '⌛', r: 'sờ-tun-đờ' }), w('minute', 'Minute', 'phút', { art: 'die', pl: 'Minuten', e: '⏱️', r: 'mi-nu-tờ' }), w('halb', 'halb', 'rưỡi (nửa giờ trước)', { e: '🕧', pos: 'từ', r: 'halp' }), w('viertel', 'Viertel', 'một phần tư (15 phút)', { art: 'das', e: '🕒', r: 'phiếc-tồl' }), w('vor', 'vor', 'kém', { e: '⬅️', pos: 'giới từ', r: 'phô-ơ' }), w('nach', 'nach', 'qua, hơn', { e: '➡️', pos: 'giới từ', r: 'nakh' }),
      ],
      grammar: [
        table(['Giờ', 'Thân mật', 'Chính thức'], ['8:00', 'acht Uhr', 'acht Uhr'], ['8:15', 'Viertel nach acht', 'acht Uhr fünfzehn'], ['8:30', 'halb neun (nửa giờ **trước** 9)', 'acht Uhr dreißig'], ['8:45', 'Viertel vor neun', 'acht Uhr fünfundvierzig'], ['8:10', 'zehn nach acht', 'acht Uhr zehn'], ['8:50', 'zehn vor neun', 'acht Uhr fünfzig']),
        warn('**Bẫy lớn nhất:** **halb neun = 8:30** (không phải 9:30!). “Halb” nghĩa là “nửa giờ **trước** giờ 9”. Nhìn giờ **sắp tới**, không phải giờ vừa qua.'),
        info('Hỏi và đáp: *Wie spät ist es?* – *Es ist halb drei.* (2:30). Hỏi lúc mấy giờ: *Um wie viel Uhr …?* – *Um acht Uhr.* (lúc 8 giờ).'),
        T('**Buổi trong ngày:** **morgens** (buổi sáng), **mittags** (giữa trưa), **nachmittags** (chiều), **abends** (tối), **nachts** (đêm). Dùng 24 giờ khi nói chính thức: 15 Uhr = 3 giờ chiều.'),
      ],
      examples: [dlg(['Anna', 'Entschuldigung, wie spät ist es?', 'Xin lỗi, mấy giờ rồi?'], ['Tom', 'Es ist Viertel nach drei.', 'Ba giờ mười lăm.'], ['Anna', 'Danke! Und um wie viel Uhr beginnt der Kurs?', 'Cảm ơn! Và khóa học bắt đầu lúc mấy giờ?'], ['Tom', 'Um halb vier.', 'Lúc ba giờ rưỡi.'])],
      ex: [
        mc('“halb neun” là mấy giờ?', ['8:30', '9:30', '9:00', '8:00'], 0, 'halb neun = 8:30.'),
        mc('“Viertel vor zehn” là mấy giờ?', ['9:45', '10:15', '10:45', '9:15'], 0, 'Viertel vor zehn = 9:45.'),
        mc('“zehn nach zwei” là:', ['2:10', '1:50', '2:50', '12:10'], 0, '10 phút sau 2 giờ.'),
        order('Mấy giờ rồi?', 'Wie spät ist es?'),
        fill('Es ist ___ vier. (3:30)', 'halb', '3:30 = halb vier (nửa giờ trước 4 giờ).'),
        typ('Viết 7:00 bằng thân mật (“bảy giờ”)', ['sieben Uhr'], '7:00 = sieben Uhr.'),
        listen('halb neun', ['halb neun', 'neun Uhr', 'Viertel neun', 'zehn nach neun'], 0),
      ],
      teaches: ['uhrzeit'],
      review: '- **halb neun = 8:30**, Viertel nach/vor, zehn nach/vor.\n- *Wie spät ist es?* – *Es ist …*\n- *Um wie viel Uhr …?* – *Um … Uhr.*',
    }),
    lesson({
      id: 'a1-c07-l2',
      title: 'Ngày trong tuần, tháng, ngày tháng',
      goals: ['Gọi tên 7 ngày và 12 tháng', 'Hỏi và nói ngày tháng'],
      intro: 'Ngày và tháng đều có **mạo từ der** (ngày trong tuần, tháng là giống đực). Ngày tháng được viết theo thứ tự **ngày. tháng. năm**.',
      vocab: [
        w('montag', 'Montag', 'thứ Hai', { art: 'der', e: '1️⃣', r: 'môn-tak' }), w('dienstag', 'Dienstag', 'thứ Ba', { art: 'der', e: '2️⃣', r: 'đin-xtak' }), w('mittwoch', 'Mittwoch', 'thứ Tư', { art: 'der', e: '3️⃣', r: 'mít-vô-kh' }), w('donnerstag', 'Donnerstag', 'thứ Năm', { art: 'der', e: '4️⃣', r: 'đô-nơ-xtak' }), w('freitag', 'Freitag', 'thứ Sáu', { art: 'der', e: '5️⃣', r: 'phrai-tak' }), w('samstag', 'Samstag', 'thứ Bảy', { art: 'der', e: '6️⃣', r: 'dam-xtak' }), w('sonntag', 'Sonntag', 'Chủ nhật', { art: 'der', e: '7️⃣', r: 'dôn-tak' }), w('heute', 'heute', 'hôm nay', { pos: 'trạng từ', e: '📍', r: 'hoi-tờ' }), w('morgen', 'morgen', 'ngày mai', { pos: 'trạng từ', e: '➡️', r: 'mo-gần' }), w('gestern', 'gestern', 'hôm qua', { pos: 'trạng từ', e: '⬅️', r: 'ghét-xtơn' }),
      ],
      grammar: [
        table(['Tháng', 'Tiếng Đức', 'Tháng', 'Tiếng Đức'], ['1', 'Januar', '7', 'Juli'], ['2', 'Februar', '8', 'August'], ['3', 'März', '9', 'September'], ['4', 'April', '10', 'Oktober'], ['5', 'Mai', '11', 'November'], ['6', 'Juni', '12', 'Dezember']),
        T('**Hỏi ngày:** *Welcher Tag ist heute?* – *Heute ist Montag.*\n**Hỏi ngày tháng:** *Der Wievielte ist heute?* – *Heute ist der 15. November.*\n**Trong ngày/ tháng:** dùng **am** (ngày trong tuần, ngày cụ thể): *am Montag*, *am 15. November*; dùng **im** (tháng): *im November*.'),
        info('**Số thứ tự:** viết số + dấu chấm: **15.** = *der fünfzehnte*. Từ 1 đến 19 thêm **-te**, từ 20 thêm **-ste**. Ngoại lệ: **1. = erste, 3. = dritte, 7. = siebte**.'),
        tip('Ngày viết theo thứ tự **ngày. tháng. năm**: 15.11.2026 = ngày 15 tháng 11 năm 2026. Tuần của người Đức **bắt đầu từ thứ Hai** (Montag).'),
      ],
      examples: [ex('Heute ist Montag.', 'Hôm nay là thứ Hai.'), ex('Am Freitag habe ich Deutschkurs.', 'Vào thứ Sáu tôi có lớp tiếng Đức.'), ex('Mein Geburtstag ist am 3. Mai.', 'Sinh nhật tôi là ngày 3 tháng 5.'), ex('Im Dezember ist es kalt.', 'Vào tháng 12 trời lạnh.')],
      ex: [
        match('Nối ngày với nghĩa.', ['Montag', 'thứ Hai'], ['Mittwoch', 'thứ Tư'], ['Freitag', 'thứ Sáu'], ['Sonntag', 'Chủ nhật']),
        fill('___ Montag habe ich Unterricht.', 'Am', 'ngày trong tuần: am.'),
        fill('___ Mai ist es warm.', 'Im', 'tháng: im.'),
        mc('“der dritte Mai” là ngày nào?', ['3/5', '5/3', '13/5', '30/5'], 0, 'dritte = thứ 3.'),
        order('Hôm nay là thứ Hai', 'Heute ist Montag'),
        typ('Viết “thứ Sáu” bằng tiếng Đức (có mạo từ der)', ['der Freitag', 'Freitag'], 'der Freitag.'),
      ],
      teaches: ['datum-wochentage'],
      review: '- Tháng và ngày đều giống **der**.\n- **am** + ngày, **im** + tháng.\n- Thứ tự ngày tháng: ngày.tháng.năm.',
    }),
  ],
})
