import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c06-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 6,
  title: 'Alltag',
  titleVi: 'Cuộc sống hằng ngày',
  lessons: [
    lesson({
      id: 'a1-c06-l1',
      title: 'Hoạt động hằng ngày',
      goals: ['Nói về thói quen', 'Chia động từ thường ở Präsens', 'Dùng trạng từ tần suất'],
      intro: 'Thì **Präsens** (hiện tại) dùng cho cả hiện tại lẫn thói quen. Hãy học các động từ hằng ngày và cách chia.',
      vocab: [
        w('aufstehen', 'aufstehen', 'thức dậy', { pos: 'động từ tách', e: '⏰', r: 'ao-f-sờ-tê-ần' }), w('essen', 'essen', 'ăn', { pos: 'động từ', e: '🍽️', r: 'ét-xần' }), w('trinken', 'trinken', 'uống', { pos: 'động từ', e: '🥤', r: 'trin-kần' }), w('lernen', 'lernen', 'học', { pos: 'động từ', e: '📚', r: 'léc-nần' }), w('schlafen', 'schlafen', 'ngủ', { pos: 'động từ', e: '😴', r: 'sla-phần' }), w('arbeiten', 'arbeiten', 'làm việc', { pos: 'động từ', e: '💼', r: 'ar-bai-tần' }), w('immer', 'immer', 'luôn luôn', { pos: 'trạng từ', e: '♾️', r: 'i-mơ' }), w('oft', 'oft', 'thường', { pos: 'trạng từ', e: '🔁', r: 'ốpht' }), w('manchmal', 'manchmal', 'thỉnh thoảng', { pos: 'trạng từ', e: '〰️', r: 'man-ch-mal' }), w('nie', 'nie', 'không bao giờ', { pos: 'trạng từ', e: '🚫', r: 'ni' }),
      ],
      grammar: [
        table(['', 'lernen (thường)', 'essen (e→i)', 'schlafen (a→ä)'], ['ich', 'lerne', 'esse', 'schlafe'], ['du', 'lernst', 'isst', 'schläfst'], ['er/sie/es', 'lernt', 'isst', 'schläft'], ['wir', 'lernen', 'essen', 'schlafen'], ['ihr', 'lernt', 'esst', 'schlaft'], ['sie/Sie', 'lernen', 'essen', 'schlafen']),
        warn('**Động từ đổi nguyên âm ở du và er/sie/es:** **essen** (e→i: du isst), **sprechen** (du sprichst), **schlafen** (a→ä: du schläfst), **fahren** (du fährst), **lesen** (du liest). Các dạng wir/ihr/sie giữ nguyên.'),
        info('**Trạng từ tần suất** đứng sau động từ chia: *Ich esse **immer** um 12 Uhr.* Mức độ: **immer** (100%) › **oft** › **manchmal** › **selten** › **nie** (0%).'),
        tip('Nói với “nie” là phủ định hoàn toàn nên **không** cần “nicht” hay “kein”: *Ich trinke nie Kaffee.*'),
      ],
      examples: [ex('Ich stehe um sechs Uhr auf.', 'Tôi dậy lúc sáu giờ.'), ex('Er isst oft Reis.', 'Anh ấy thường ăn cơm.'), ex('Wir lernen jeden Tag Deutsch.', 'Chúng tôi học tiếng Đức mỗi ngày.'), ex('Sie schläft nie früh.', 'Cô ấy không bao giờ ngủ sớm.')],
      ex: [
        fill('Du ___ viel. (essen)', 'isst', 'essen: du isst.'),
        fill('Er ___ lange. (schlafen)', 'schläft', 'schlafen: er schläft.'),
        fill('Ich ___ Wasser. (trinken)', 'trinke', 'ich → trinke.'),
        fill('Wir ___ Deutsch. (lernen)', 'lernen', 'wir → lernen.'),
        order('Tôi luôn học vào buổi tối', 'Ich lerne immer am Abend'),
        mc('Trạng từ “nie” nghĩa là:', ['không bao giờ', 'luôn luôn', 'thường', 'thỉnh thoảng'], 0, 'nie = không bao giờ.'),
      ],
      teaches: ['verben-vokalwechsel', 'haeufigkeit'],
      review: '- Động từ đổi nguyên âm: **isst, spricht, schläft, fährt, liest**.\n- **immer › oft › manchmal › nie** đứng sau động từ.',
    }),
    lesson({
      id: 'a1-c06-l2',
      title: 'Động từ tách: aufstehen, einkaufen',
      goals: ['Nhận biết động từ tách', 'Đặt tiền tố ở cuối câu'],
      intro: 'Nhiều động từ tiếng Đức có **tiền tố tách ra** khi chia và đứng **cuối câu**. Ví dụ: **aufstehen** (thức dậy) → *Ich **stehe** um 7 Uhr **auf**.*',
      vocab: [
        w('einkaufen', 'einkaufen', 'đi mua sắm', { pos: 'động từ tách', e: '🛍️', r: 'ain-kao-phần' }), w('anrufen', 'anrufen', 'gọi điện', { pos: 'động từ tách', e: '📞', r: 'an-ru-phần' }), w('fernsehen', 'fernsehen', 'xem tivi', { pos: 'động từ tách', e: '📺', r: 'phe-n-dê-ần' }), w('aufraumen', 'aufräumen', 'dọn dẹp', { pos: 'động từ tách', e: '🧹', r: 'ao-f-roi-mần' }), w('mitkommen', 'mitkommen', 'đi cùng', { pos: 'động từ tách', e: '🚶', r: 'mít-kô-mần' }),
      ],
      grammar: [
        T('**Quy tắc:** động từ tách (trennbares Verb) = **tiền tố** + **động từ gốc**.\n- Khi chia: động từ gốc ở vị trí 2, **tiền tố xuống cuối câu**.\n- *aufstehen*: Ich **stehe** um 7 Uhr **auf**.\n- *einkaufen*: Wir **kaufen** im Supermarkt **ein**.'),
        table(['Nguyên mẫu', 'Câu'], ['aufstehen', 'Ich stehe um 7 Uhr auf.'], ['einkaufen', 'Sie kauft am Samstag ein.'], ['anrufen', 'Ich rufe meine Mutter an.'], ['fernsehen', 'Er sieht abends fern.'], ['mitkommen', 'Kommst du mit?']),
        info('**Tiền tố tách thường gặp:** **auf-, an-, ein-, aus-, mit-, fern-, zu-, ab-**. Tiền tố **không tách:** be-, ge-, ver-, er-, zer-, ent- (ví dụ: *besuchen*: Ich besuche dich).'),
        tip('Với **câu hỏi Ja/Nein**, động từ gốc đứng đầu và tiền tố vẫn ở cuối: *Kommst du mit?* (Bạn đi cùng không?)'),
      ],
      examples: [dlg(['Anna', 'Wann stehst du auf?', 'Bạn thức dậy lúc mấy giờ?'], ['Tom', 'Ich stehe um sieben Uhr auf. Und danach kaufe ich ein.', 'Tôi dậy lúc bảy giờ. Rồi sau đó tôi đi mua sắm.'])],
      ex: [
        order('Tôi dậy lúc bảy giờ', 'Ich stehe um sieben Uhr auf'),
        order('Cô ấy gọi điện cho mẹ', 'Sie ruft ihre Mutter an'),
        fill('Wir kaufen im Supermarkt ___. (einkaufen)', 'ein', 'Tiền tố ein xuống cuối câu.'),
        fill('Kommst du ___? (mitkommen)', 'mit', 'mit ở cuối câu.'),
        mc('Câu nào đúng?', ['Er sieht abends fern', 'Er fernsieht abends', 'Er sieht fern abends', 'Er fern sieht abends'], 0, 'sehen → sieht, fern cuối câu.'),
      ],
      teaches: ['trennbare-verben'],
      review: '- Động từ tách: **chia ở vị trí 2, tiền tố xuống cuối câu**.\n- aufstehen, einkaufen, anrufen, fernsehen, mitkommen.',
    }),
  ],
})
