import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c06-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 6,
  title: 'Menschen beschreiben',
  titleVi: 'Miêu tả người, so sánh',
  lessons: [
    lesson({
      id: 'a2-c06-l1',
      title: 'Tính từ miêu tả người',
      goals: ['Miêu tả ngoại hình và tính cách', 'Dùng tính từ sau sein'],
      intro: 'Tính từ đứng **sau sein** không đổi đuôi: *Er ist groß.* Khi đứng **trước danh từ** thì đổi đuôi (xem bài sau).',
      vocab: [
        w('gross', 'groß', 'cao, to', { pos: 'tính từ', r: 'grô-x' }), w('klein', 'klein', 'nhỏ, thấp', { pos: 'tính từ', r: 'klai-n' }), w('jung', 'jung', 'trẻ', { pos: 'tính từ', r: 'dung' }), w('alt', 'alt', 'già, cũ', { pos: 'tính từ', r: 'an-t' }), w('schlank', 'schlank', 'mảnh mai', { pos: 'tính từ', r: 'slang-k' }), w('nett', 'nett', 'dễ mến', { pos: 'tính từ', r: 'nét' }), w('freundlich', 'freundlich', 'thân thiện', { pos: 'tính từ', r: 'phroin-lích' }), w('lustig', 'lustig', 'vui tính', { pos: 'tính từ', r: 'lu-xtích' }), w('fleissig', 'fleißig', 'chăm chỉ', { pos: 'tính từ', r: 'phlai-xích' }), w('schuchtern', 'schüchtern', 'nhút nhát', { pos: 'tính từ', r: 'suyc-tơn' }), w('haare', 'Haare', 'tóc', { pos: 'danh từ số nhiều', r: 'ha-rờ' }), w('blond', 'blond', 'vàng', { pos: 'tính từ', r: 'blôn-t' }), w('dunkel', 'dunkel', 'tối, sẫm', { pos: 'tính từ', r: 'đun-kồl' }),
      ],
      grammar: [
        T('**Hỏi:** *Wie sieht er aus?* (Anh ấy trông thế nào?) • *Wie ist sie?* (Cô ấy là người thế nào?)\n**Miêu tả:** *Er ist groß und schlank.* • *Sie hat lange, dunkle Haare.* • *Er sieht jung aus.* (aussehen = trông có vẻ)'),
        table(['Tính từ', 'Trái nghĩa'], ['groß', 'klein'], ['jung', 'alt'], ['nett / freundlich', 'unfreundlich'], ['fleißig', 'faul'], ['lustig', 'ernst'], ['schlank', 'dick'], ['lang', 'kurz']),
        info('**Thêm un-** để tạo trái nghĩa: *freundlich → unfreundlich*, *glücklich → unglücklich*, *möglich → unmöglich*.'),
        warn('**sehen → aussehen** (động từ tách): *Er **sieht** gut **aus**.* Khác với **sehen** (nhìn thấy).'),
      ],
      examples: [dlg(['Anna', 'Wie sieht dein Bruder aus?', 'Anh trai của bạn trông thế nào?'], ['Tom', 'Er ist groß und hat dunkle Haare. Er ist sehr lustig.', 'Anh ấy cao và có tóc đen. Anh ấy rất vui tính.'])],
      ex: [
        match('Nối trái nghĩa.', ['groß', 'klein'], ['jung', 'alt'], ['nett', 'unfreundlich'], ['fleißig', 'faul']),
        order('Anh ấy cao và mảnh mai', 'Er ist groß und schlank'),
        order('Cô ấy có tóc dài', 'Sie hat lange Haare'),
        fill('Er ___ jung ___. (aussehen)', ['sieht aus'], 'Chỉ cần gõ: sieht aus.', 'gõ: sieht aus'),
        mc('Thêm tiền tố “un-” để tạo:', ['trái nghĩa', 'số nhiều', 'quá khứ', 'danh từ'], 0, 'un- tạo trái nghĩa.'),
      ],
      teaches: ['adjektive-sein'],
      review: '- Tính từ sau **sein** không đổi đuôi.\n- **aussehen** (tách) • **un-** tạo trái nghĩa.',
    }),
    lesson({
      id: 'a2-c06-l2',
      title: 'So sánh hơn và so sánh nhất',
      goals: ['Tạo Komparativ (-er) và Superlativ (am -sten)', 'Dùng als, so…wie'],
      intro: 'Bạn so sánh hai thứ bằng **Komparativ** (đuôi **-er**), và so sánh nhất bằng **Superlativ** (**am … -sten**).',
      vocab: [
        w('als', 'als', 'hơn (so sánh)', { pos: 'liên từ', r: 'an-x' }), w('wie', 'wie', 'như', { pos: 'liên từ', r: 'vi' }), w('besser', 'besser', 'tốt hơn', { pos: 'Komparativ', r: 'bé-xơ' }), w('am-besten', 'am besten', 'tốt nhất', { pos: 'Superlativ', r: 'am bé-xtần' }), w('mehr', 'mehr', 'nhiều hơn', { pos: 'Komparativ', r: 'mê-ơ' }), w('lieber', 'lieber', 'thích hơn', { pos: 'Komparativ', r: 'li-bơ' }),
      ],
      grammar: [
        table(['Cơ bản', 'Komparativ (hơn)', 'Superlativ (nhất)'], ['klein', 'klein**er**', 'am klein**sten**'], ['schnell', 'schnell**er**', 'am schnell**sten**'], ['alt', 'ält**er** (umlaut)', 'am ält**esten**'], ['groß', 'größ**er** (umlaut)', 'am größ**ten**'], ['jung', 'jüng**er**', 'am jüng**sten**'], ['**gut**', '**besser**', 'am **besten**'], ['**viel**', '**mehr**', 'am **meisten**'], ['**gern**', '**lieber**', 'am **liebsten**'], ['hoch', 'höher', 'am höchsten']),
        T('**Cấu trúc:**\n- **Hơn:** *Er ist **größer als** ich.* (als + Nominativ)\n- **Bằng:** *Er ist **so groß wie** ich.* (so…wie)\n- **Nhất:** *Er ist **am größten**.*'),
        info('**Tính từ ngắn một âm tiết với a, o, u thường thêm umlaut:** alt → älter, groß → größer, jung → jünger, kurz → kürzer. Bất quy tắc phải nhớ: **gut – besser – am besten**, **viel – mehr – am meisten**, **gern – lieber – am liebsten**, **hoch – höher – am höchsten**.'),
        warn('Dùng **als** để so sánh hơn kém, **wie** để so sánh bằng. Sai: *größer wie ich*. Đúng: *größer **als** ich*.'),
      ],
      examples: [ex('Mein Bruder ist größer als ich.', 'Anh trai tôi cao hơn tôi.'), ex('Sie ist so alt wie ich.', 'Cô ấy bằng tuổi tôi.'), ex('Berlin ist größer als Hamburg.', 'Berlin lớn hơn Hamburg.'), ex('Das ist der beste Kuchen!', 'Đó là chiếc bánh ngon nhất!')],
      ex: [
        fill('Er ist ___ als ich. (groß)', 'größer', 'groß → größer.'),
        fill('Sie ist ___ als ihr Bruder. (jung)', 'jünger', 'jung → jünger.'),
        fill('Er spricht ___ Deutsch als ich. (gut → hơn)', 'besser', 'gut → besser.'),
        fill('Ich esse ___ Fisch. (gern → hơn)', 'lieber', 'gern → lieber.'),
        fill('Er ist so alt ___ ich.', 'wie', 'so…wie = bằng.'),
        fill('Er ist ___ größten. (nhất)', 'am', 'am + -sten.'),
        mc('Komparativ của “viel” là:', ['mehr', 'vieler', 'besser', 'größer'], 0, 'viel → mehr.'),
      ],
      teaches: ['komparativ-superlativ'],
      review: '- **-er** (Komparativ), **am -sten** (Superlativ); umlaut cho alt/groß/jung.\n- **gut – besser – am besten**, **viel – mehr – am meisten**, **gern – lieber – am liebsten**.\n- **als** (hơn), **so…wie** (bằng).',
    }),
  ],
})
