import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c11-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 11,
  title: 'Freizeit',
  titleVi: 'Thời gian rảnh và động từ khuyết thiếu',
  lessons: [
    lesson({
      id: 'a1-c11-l1',
      title: 'Sở thích và nicht/kein',
      goals: ['Nói về sở thích', 'Phân biệt nicht và kein'],
      intro: 'Thời gian rảnh là chủ đề tuyệt vời để thực hành. Bạn cũng sẽ học cách **phủ định**: **nicht** hay **kein**?',
      vocab: [
        w('hobby', 'Hobby', 'sở thích', { art: 'das', pl: 'Hobbys', e: '🎨', r: 'hô-bi' }), w('musik', 'Musik', 'âm nhạc', { art: 'die', e: '🎵', r: 'mu-dik' }), w('sport', 'Sport', 'thể thao', { art: 'der', e: '⚽', r: 'spoất' }), w('fussball', 'Fußball', 'bóng đá', { art: 'der', e: '⚽', r: 'phu-x-bal' }), w('schwimmen', 'schwimmen', 'bơi', { pos: 'động từ', e: '🏊', r: 'svi-mần' }), w('lesen', 'lesen', 'đọc', { pos: 'động từ', e: '📖', r: 'lê-dần' }), w('kochen', 'kochen', 'nấu ăn', { pos: 'động từ', e: '🍳', r: 'kô-khần' }), w('tanzen', 'tanzen', 'nhảy', { pos: 'động từ', e: '💃', r: 'tan-tsần' }), w('reisen', 'reisen', 'du lịch', { pos: 'động từ', e: '✈️', r: 'rai-dần' }), w('spielen', 'spielen', 'chơi', { pos: 'động từ', e: '🎮', r: 'spi-lần' }),
      ],
      grammar: [
        table(['Phủ định', 'Dùng khi', 'Ví dụ'], ['**nicht**', 'phủ định động từ, tính từ, câu', 'Ich schwimme **nicht**. Er ist **nicht** müde.'], ['**kein**', 'phủ định danh từ có **ein/không mạo từ**', 'Ich habe **keinen** Hund. Ich habe **kein** Auto.']),
        T('**Cách chọn nhanh:**\n- Danh từ đứng sau **ein/eine** hoặc **không mạo từ** → **kein** (keinen, keine, kein).\n- Danh từ đứng sau **der/die/das/mein** hoặc phủ định động từ/tính từ → **nicht**.'),
        table(['Câu khẳng định', 'Phủ định'], ['Ich habe **ein** Auto.', 'Ich habe **kein** Auto.'], ['Ich habe Zeit.', 'Ich habe **keine** Zeit.'], ['Ich spiele Fußball.', 'Ich spiele **nicht** Fußball.'], ['Das ist **mein** Buch.', 'Das ist **nicht** mein Buch.'], ['Ich gehe heute.', 'Ich gehe heute **nicht**.']),
        info('**Vị trí của nicht:** thường đứng **cuối câu** khi phủ định toàn câu (*Ich schlafe **nicht**.*) hoặc **ngay trước** từ bị phủ định (*Ich bin **nicht** müde.*).'),
        warn('Sai: *Ich habe nicht ein Auto.* Đúng: *Ich habe **kein** Auto.*'),
      ],
      examples: [ex('Ich spiele gern Fußball.', 'Tôi thích chơi bóng đá.'), ex('Ich habe heute keine Zeit.', 'Hôm nay tôi không có thời gian.'), ex('Er tanzt nicht gern.', 'Anh ấy không thích nhảy.')],
      ex: [
        fill('Ich habe ___ Zeit. (phủ định)', 'keine', 'Zeit (cái) → keine Zeit.'),
        fill('Ich habe ___ Auto. (phủ định)', 'kein', 'das Auto → kein.'),
        fill('Ich habe ___ Hund. (phủ định, der Hund)', 'keinen', 'Akkusativ đực → keinen.'),
        fill('Ich schwimme ___. (phủ định động từ)', 'nicht', 'phủ định động từ dùng nicht.'),
        mc('Câu nào đúng?', ['Er hat kein Auto', 'Er hat nicht ein Auto', 'Er hat nicht Auto', 'Er nicht hat ein Auto'], 0, 'ein Auto → kein Auto.'),
        order('Tôi không có thời gian', 'Ich habe keine Zeit'),
      ],
      teaches: ['negation'],
      review: '- **kein** phủ định danh từ có ein/không mạo từ; **nicht** cho các trường hợp còn lại.\n- Hobbys: schwimmen, lesen, kochen, tanzen, reisen, spielen.',
    }),
    lesson({
      id: 'a1-c11-l2',
      title: 'Động từ khuyết thiếu: können, müssen, wollen, dürfen',
      goals: ['Chia 5 động từ khuyết thiếu', 'Đặt động từ nguyên mẫu ở cuối câu'],
      intro: '**Modalverben** (động từ khuyết thiếu) diễn đạt khả năng, bắt buộc, mong muốn, cho phép. Chúng luôn đi với **một động từ nguyên mẫu ở cuối câu**.',
      vocab: [
        w('konnen', 'können', 'có thể, biết (làm)', { pos: 'động từ khuyết thiếu', e: '💪', r: 'kơ-nần' }), w('mussen', 'müssen', 'phải', { pos: 'động từ khuyết thiếu', e: '⚠️', r: 'muy-dần' }), w('wollen', 'wollen', 'muốn', { pos: 'động từ khuyết thiếu', e: '🎯', r: 'vô-lần' }), w('durfen', 'dürfen', 'được phép', { pos: 'động từ khuyết thiếu', e: '✅', r: 'đuy-phần' }), w('sollen', 'sollen', 'nên, được bảo phải', { pos: 'động từ khuyết thiếu', e: '📋', r: 'dô-lần' }),
      ],
      grammar: [
        table(['', 'können', 'müssen', 'wollen', 'dürfen'], ['ich', 'kann', 'muss', 'will', 'darf'], ['du', 'kannst', 'musst', 'willst', 'darfst'], ['er/sie/es', 'kann', 'muss', 'will', 'darf'], ['wir', 'können', 'müssen', 'wollen', 'dürfen'], ['ihr', 'könnt', 'müsst', 'wollt', 'dürft'], ['sie/Sie', 'können', 'müssen', 'wollen', 'dürfen']),
        T('**Cấu trúc:** Chủ ngữ + **Modalverb** (vị trí 2) + … + **động từ nguyên mẫu** (cuối câu).\n- *Ich **kann** gut **schwimmen**.* (Tôi bơi giỏi.)\n- *Du **musst** heute **arbeiten**.* (Hôm nay bạn phải làm việc.)\n- *Wir **wollen** ins Kino **gehen**.* (Chúng tôi muốn đi xem phim.)'),
        info('**Ý nghĩa:** **können** = có khả năng / có thể; **müssen** = bắt buộc; **wollen** = muốn (mạnh); **dürfen** = được phép; **möchten** = muốn (lịch sự, đã học); **sollen** = nên/được yêu cầu.'),
        warn('**ich và er/sie/es có dạng giống nhau** ở modal (ich kann, er kann; ich muss, er muss). Dạng **ich** **không** có đuôi -e. Đây là điểm khác động từ thường.'),
        warn('**Động từ tách** + modal: bỏ tách. *Ich will heute einkaufen.* (einkaufen giữ nguyên ở cuối).'),
        tip('**Câu hỏi:** *Kannst du mir helfen?* (Bạn giúp tôi được không?) • **Từ chối:** *Das darfst du nicht.* (Bạn không được phép làm thế.)'),
      ],
      examples: [dlg(['Anna', 'Kannst du Fußball spielen?', 'Bạn chơi bóng đá được không?'], ['Tom', 'Ja, ich kann gut spielen. Willst du mitkommen?', 'Có, tôi chơi giỏi. Bạn muốn đi cùng không?'], ['Anna', 'Leider kann ich nicht. Ich muss heute arbeiten.', 'Tiếc là tôi không đi được. Hôm nay tôi phải làm việc.'])],
      ex: [
        fill('Ich ___ gut schwimmen. (können)', 'kann', 'ich kann.'),
        fill('Du ___ heute arbeiten. (müssen)', 'musst', 'du musst.'),
        fill('Er ___ Pizza essen. (wollen)', 'will', 'er will.'),
        fill('Wir ___ hier nicht rauchen. (dürfen)', 'dürfen', 'wir dürfen.'),
        order('Tôi có thể bơi', 'Ich kann schwimmen'),
        order('Hôm nay tôi phải làm việc', 'Heute muss ich arbeiten'),
        mc('Vị trí động từ nguyên mẫu trong câu có modal:', ['cuối câu', 'đầu câu', 'sau chủ ngữ', 'vị trí 3'], 0, 'Động từ nguyên mẫu ở cuối câu.'),
      ],
      teaches: ['modalverben'],
      review: '- ich/er **kann, muss, will, darf** (không đuôi).\n- **Modal ở vị trí 2, động từ nguyên mẫu cuối câu.**',
    }),
  ],
})
