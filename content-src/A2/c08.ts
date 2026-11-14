import { chapter, art, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c08-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 8,
  title: 'Stadtleben',
  titleVi: 'Cuộc sống thành phố và đuôi tính từ',
  lessons: [
    lesson({
      id: 'a2-c08-l1',
      title: 'Đuôi tính từ trước danh từ',
      goals: ['Biết khi nào tính từ đổi đuôi', 'Dùng đuôi -e và -en sau mạo từ xác định và ein'],
      intro: 'Khi tính từ đứng **trước danh từ**, nó **thêm đuôi**: *der **große** Mann*. Đuôi phụ thuộc vào **mạo từ, giống, cách**. Bắt đầu với dạng phổ biến nhất.',
      vocab: [
        w('schon', 'schön', 'đẹp', { pos: 'tính từ', e: '✨', r: 'sơn' }), w('neu', 'neu', 'mới', { pos: 'tính từ', e: '🆕', r: 'noi' }), w('gross', 'groß', 'to, lớn', { pos: 'tính từ', e: '📏', r: 'grô-x' }), w('modern', 'modern', 'hiện đại', { pos: 'tính từ', e: '🏙️', r: 'mô-đéc-n' }), w('ruhig', 'ruhig', 'yên tĩnh', { pos: 'tính từ', e: '🤫', r: 'ru-ích' }), w('laut', 'laut', 'ồn ào', { pos: 'tính từ', e: '🔊', r: 'laot' }), w('billig', 'billig', 'rẻ', { pos: 'tính từ', e: '📉', r: 'bi-lích' }), w('teuer', 'teuer', 'đắt', { pos: 'tính từ', e: '📈', r: 'toi-ơ' }),
      ],
      grammar: [
        table(['', 'Nominativ', 'Akkusativ', 'Dativ'], ['đực', 'der groß**e** Mann', 'den groß**en** Mann', 'dem groß**en** Mann'], ['cái', 'die schön**e** Stadt', 'die schön**e** Stadt', 'der schön**en** Stadt'], ['trung', 'das neu**e** Haus', 'das neu**e** Haus', 'dem neu**en** Haus'], ['số nhiều', 'die neu**en** Häuser', 'die neu**en** Häuser', 'den neu**en** Häusern']),
        T('**Quy tắc đơn giản sau mạo từ xác định (der/die/das):** đuôi là **-e** ở **Nominativ số ít** và **Akkusativ cái/trung**; còn lại là **-en**.'),
        table(['Sau “ein” (không xác định)', 'Nominativ', 'Akkusativ'], ['đực', 'ein groß**er** Mann', 'einen groß**en** Mann'], ['cái', 'eine schön**e** Stadt', 'eine schön**e** Stadt'], ['trung', 'ein neu**es** Haus', 'ein neu**es** Haus']),
        info('Sau **ein/eine/ein**, tính từ **mang dấu hiệu giống** vì mạo từ “ein” không cho thấy giống: đực **-er**, trung **-es**, cái **-e** (ở Nominativ).'),
        warn('**Tính từ đứng sau sein không đổi đuôi:** *Die Stadt ist **schön**.* Chỉ đổi khi đứng **trước danh từ**: *die **schöne** Stadt*.'),
        tip('Mẹo nhớ nhanh: sau **der/die/das**, hầu hết đuôi là **-en**; chỉ **-e** ở Nominativ số ít và Akkusativ cái/trung.'),
      ],
      examples: [ex('Das ist ein großes Haus.', 'Đây là một ngôi nhà lớn.'), ex('Ich kaufe den roten Pullover.', 'Tôi mua chiếc áo len đỏ.'), ex('Wir wohnen in einer ruhigen Straße.', 'Chúng tôi sống ở một con đường yên tĩnh.'), ex('Die neue Wohnung ist sehr schön.', 'Căn hộ mới rất đẹp.')],
      ex: [
        fill('der ___ Mann (groß)', 'große', 'Nominativ đực sau der: -e.'),
        fill('Ich sehe den ___ Mann. (groß)', 'großen', 'Akkusativ đực: -en.'),
        fill('Das ist ein ___ Haus. (neu)', 'neues', 'ein + trung: -es.'),
        fill('Das ist eine ___ Stadt. (schön)', 'schöne', 'eine + cái: -e.'),
        fill('Wir wohnen in einer ___ Straße. (ruhig, Dativ cái)', 'ruhigen', 'Dativ: -en.'),
        mc('“Die Stadt ist schön” — vì sao không có đuôi?', ['tính từ sau sein', 'số nhiều', 'Akkusativ', 'Dativ'], 0, 'Sau sein không đổi.'),
      ],
      teaches: ['adjektivendungen'],
      review: '- Sau **der/die/das**: **-e** (Nom. số ít, Akk. cái/trung), còn lại **-en**.\n- Sau **ein**: đực **-er**, trung **-es**, cái **-e**.\n- Sau **sein**: không đổi.',
    }),
    lesson({
      id: 'a2-c08-l2',
      title: 'Thành phố: địa điểm và dịch vụ',
      goals: ['Gọi tên địa điểm trong thành phố', 'Hỏi và chỉ đường nâng cao'],
      intro: 'Bạn sẽ học từ vựng của **thành phố** và cách mô tả nơi mình sống.',
      vocab: [
        w('stadtzentrum', 'Stadtzentrum', 'trung tâm', { art: 'das', e: '🏙️', r: 'sờ-tát-tsen-trum' }), w('bibliothek', 'Bibliothek', 'thư viện', { art: 'die', pl: 'Bibliotheken', e: '📚', r: 'bi-blio-tek' }), w('post', 'Post', 'bưu điện', { art: 'die', e: '📮', r: 'pôxt' }), w('bank', 'Bank', 'ngân hàng', { art: 'die', pl: 'Banken', e: '🏦', r: 'bang-k' }), w('apotheke', 'Apotheke', 'hiệu thuốc', { art: 'die', pl: 'Apotheken', e: '💊', r: 'a-pô-tê-kờ' }), w('park', 'Park', 'công viên', { art: 'der', pl: 'Parks', e: '🌳', r: 'pác-k' }), w('museum', 'Museum', 'bảo tàng', { art: 'das', pl: 'Museen', e: '🏛️', r: 'mu-dê-um' }), w('kino', 'Kino', 'rạp chiếu phim', { art: 'das', pl: 'Kinos', e: '🎬', r: 'ki-nô' }), w('markt', 'Markt', 'chợ', { art: 'der', pl: 'Märkte', e: '🛍️', r: 'mác-kt' }), w('brucke', 'Brücke', 'cây cầu', { art: 'die', pl: 'Brücken', e: '🌉', r: 'bruy-kờ' }),
      ],
      grammar: [
        T('**Mô tả thành phố:** *Meine Stadt ist klein, aber **schön**. Es gibt **einen** großen Park, **ein** Museum und **viele** Restaurants.* Dùng **es gibt + Akkusativ**.'),
        table(['Hỏi', 'Đáp'], ['Gibt es hier eine Apotheke?', 'Ja, dort neben der Bank.'], ['Wo finde ich die Post?', 'Gegenüber dem Bahnhof.'], ['Wie komme ich zum Museum?', 'Gehen Sie die erste Straße links.']),
        info('**Giới từ chỉ vị trí hữu ích:** **gegenüber** (đối diện, + Dativ), **neben** (cạnh), **zwischen** (giữa), **an der Ecke** (ở góc), **um die Ecke** (quanh góc), **hinter** / **vor**.'),
        tip('Hỏi và đáp lại bằng Dativ sau giới từ vị trí: *Die Apotheke ist **neben der** Bank.* (die Bank → der Bank).'),
      ],
      examples: [dlg(['Tourist', 'Entschuldigung, gibt es hier eine Apotheke?', 'Xin lỗi, ở đây có hiệu thuốc không?'], ['Passant', 'Ja, die Apotheke ist neben der Bank, gegenüber dem Park.', 'Có, hiệu thuốc ở cạnh ngân hàng, đối diện công viên.'])],
      ex: [
        order('Hiệu thuốc ở cạnh ngân hàng', 'Die Apotheke ist neben der Bank'),
        fill('Das Museum ist ___ dem Bahnhof. (đối diện)', 'gegenüber', 'gegenüber + Dativ.'),
        fill('Es gibt ___ großen Park. (đực Akk)', 'einen', 'es gibt + Akk.'),
        match('Nối.', ['die Bibliothek', 'thư viện'], ['die Post', 'bưu điện'], ['der Markt', 'chợ'], ['das Kino', 'rạp phim']),
      ],
      review: '- **es gibt + Akk.**\n- **gegenüber, neben, zwischen** + Dativ.\n- Địa điểm: Bibliothek, Post, Bank, Apotheke, Park, Museum, Kino, Markt.',
    }),
  ],
})
