import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c03-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 3,
  title: 'Reisen und Verkehr',
  titleVi: 'Du lịch, phương tiện và Wechselpräpositionen',
  lessons: [
    lesson({
      id: 'a2-c03-l1',
      title: 'Wechselpräpositionen: Wo? hay Wohin?',
      goals: ['Phân biệt vị trí (Dativ) và hướng (Akkusativ)', 'Dùng 9 giới từ hai cách'],
      intro: 'Chín giới từ này đi với **Dativ khi chỉ vị trí** (hỏi *Wo?*) và **Akkusativ khi chỉ hướng chuyển động** (hỏi *Wohin?*). Đây là điểm ngữ pháp nổi tiếng nhưng rất logic.',
      vocab: [
        w('stellen', 'stellen', 'đặt (đứng)', { pos: 'động từ + Akk', e: '📍', r: 'sờ-té-lần' }), w('legen', 'legen', 'đặt (nằm)', { pos: 'động từ + Akk', e: '🛏️', r: 'lê-gần' }), w('hangen', 'hängen', 'treo', { pos: 'động từ + Akk', e: '🖼️', r: 'heng-ần' }), w('setzen', 'setzen', 'đặt, đặt ngồi', { pos: 'động từ + Akk', e: '🪑', r: 'dé-tsần' }), w('liegen', 'liegen', 'nằm', { pos: 'động từ + Dat', e: '📖', r: 'li-gần' }), w('stehen', 'stehen', 'đứng', { pos: 'động từ + Dat', e: '🧍', r: 'sờ-tê-ần' }), w('sitzen', 'sitzen', 'ngồi', { pos: 'động từ + Dat', e: '🪑', r: 'dít-sần' }), w('koffer', 'Koffer', 'va li', { art: 'der', pl: 'Koffer', e: '🧳', r: 'kô-phơ' }),
      ],
      grammar: [
        T('**9 giới từ hai cách:** **an, auf, hinter, in, neben, über, unter, vor, zwischen**.'),
        table(['Câu hỏi', 'Nghĩa', 'Cách', 'Ví dụ'], ['**Wo?**', 'ở đâu (vị trí, tĩnh)', '**Dativ**', 'Das Buch **liegt auf dem** Tisch.'], ['**Wohin?**', 'đi đâu (hướng, động)', '**Akkusativ**', 'Ich **lege** das Buch **auf den** Tisch.']),
        table(['Wo? (Dativ)', 'Wohin? (Akkusativ)'], ['Die Tasche **liegt** auf dem Sofa.', 'Ich **lege** die Tasche auf das Sofa.'], ['Das Bild **hängt** an der Wand.', 'Ich **hänge** das Bild an die Wand.'], ['Die Flasche **steht** im Kühlschrank.', 'Ich **stelle** die Flasche in den Kühlschrank.'], ['Er **sitzt** auf dem Stuhl.', 'Er **setzt** sich auf den Stuhl.']),
        info('**Cặp động từ:** vị trí (không đổi chỗ, **bất quy tắc**) ↔ đặt (hành động, thường): **liegen / legen**, **stehen / stellen**, **hängen / hängen**, **sitzen / setzen**. “Wo?” → liegen, stehen, hängen, sitzen. “Wohin?” → legen, stellen, hängen, setzen.'),
        warn('Với **gehen, fahren, kommen** (chuyển động): *Ich gehe **in die** Schule.* (Wohin → Akk). *Ich bin **in der** Schule.* (Wo → Dat).'),
        tip('**Rút gọn:** **in das = ins**, **an das = ans**, **auf das = aufs**, **in dem = im**, **an dem = am**. *Ich gehe ins Kino. Ich bin im Kino.*'),
      ],
      examples: [ex('Ich lege das Handy auf den Tisch.', 'Tôi đặt điện thoại lên bàn.'), ex('Das Handy liegt auf dem Tisch.', 'Điện thoại nằm trên bàn.'), ex('Wir gehen ins Kino.', 'Chúng tôi đi xem phim.'), ex('Wir sind im Kino.', 'Chúng tôi đang ở rạp phim.')],
      ex: [
        fill('Ich gehe ___ Kino. (in das)', 'ins', 'Wohin → Akk, in das = ins.'),
        fill('Ich bin ___ Kino. (in dem)', 'im', 'Wo → Dat, in dem = im.'),
        fill('Ich lege das Buch auf ___ Tisch. (der Tisch)', 'den', 'Wohin → Akk: den.'),
        fill('Das Buch liegt auf ___ Tisch.', 'dem', 'Wo → Dat: dem.'),
        fill('Das Bild hängt an ___ Wand. (die Wand)', 'der', 'Wo → Dat cái: der.'),
        fill('Ich hänge das Bild an ___ Wand.', 'die', 'Wohin → Akk cái: die.'),
        mc('Câu hỏi “Wohin?” đi với:', ['Akkusativ', 'Dativ', 'Genitiv', 'Nominativ'], 0, 'Wohin → Akkusativ.'),
        order('Tôi đặt sách lên bàn', 'Ich lege das Buch auf den Tisch'),
      ],
      teaches: ['wechselpraepositionen'],
      review: '- **an, auf, hinter, in, neben, über, unter, vor, zwischen**.\n- **Wo?** → Dativ • **Wohin?** → Akkusativ.\n- liegen/legen, stehen/stellen, sitzen/setzen, hängen.',
    }),
    lesson({
      id: 'a2-c03-l2',
      title: 'Du lịch: đặt vé, khách sạn, sân bay',
      goals: ['Mua vé và đặt phòng', 'Hiểu thông báo ở ga, sân bay'],
      intro: 'Bạn đã có ngữ pháp, giờ dùng nó trong tình huống du lịch thật.',
      vocab: [
        w('reise', 'Reise', 'chuyến đi', { art: 'die', pl: 'Reisen', e: '🧳', r: 'rai-dờ' }), w('urlaub', 'Urlaub', 'kỳ nghỉ', { art: 'der', e: '🏖️', r: 'u-ơ-laop' }), w('hotel', 'Hotel', 'khách sạn', { art: 'das', pl: 'Hotels', e: '🏨', r: 'hô-ten' }), w('zimmer', 'Zimmer', 'phòng', { art: 'das', pl: 'Zimmer', e: '🛏️', r: 'tsi-mơ' }), w('buchen', 'buchen', 'đặt (chỗ)', { pos: 'động từ', e: '📅', r: 'bu-khần' }), w('reservieren', 'reservieren', 'đặt trước', { pos: 'động từ', e: '📝', r: 're-dêc-vi-rần' }), w('flughafen', 'Flughafen', 'sân bay', { art: 'der', pl: 'Flughäfen', e: '🛫', r: 'phlúc-ha-phần' }), w('gleis', 'Gleis', 'sân ga', { art: 'das', pl: 'Gleise', e: '🚉', r: 'glai-x' }), w('verspatung', 'Verspätung', 'sự chậm trễ', { art: 'die', pl: 'Verspätungen', e: '⏰', r: 'phe-spe-tung' }), w('abfahren', 'abfahren', 'khởi hành', { pos: 'động từ tách', e: '🚂', r: 'ap-pha-rần' }), w('ankommen', 'ankommen', 'đến nơi', { pos: 'động từ tách', e: '📍', r: 'an-kô-mần' }),
      ],
      grammar: [
        T('**Các câu cần thiết:**\n- *Ich möchte ein Zimmer für zwei Nächte buchen.* (Tôi muốn đặt một phòng hai đêm.)\n- *Haben Sie ein Einzelzimmer / Doppelzimmer frei?* (Còn phòng đơn/đôi không?)\n- *Wann fährt der Zug nach München ab?* (Khi nào tàu đi München khởi hành?)\n- *Von welchem Gleis fährt der Zug ab?* (Tàu đi từ sân ga nào?)\n- *Der Zug hat zehn Minuten Verspätung.* (Tàu chậm mười phút.)'),
        table(['Tiếng Đức', 'Nghĩa'], ['der Reisepass', 'hộ chiếu'], ['das Gepäck', 'hành lý'], ['hin und zurück', 'khứ hồi'], ['einfach', 'một chiều'], ['die Abfahrt / die Ankunft', 'giờ đi / giờ đến']),
        info('**Động từ tách** như **abfahren**, **ankommen**, **umsteigen** (chuyển tuyến), **einsteigen** (lên xe), **aussteigen** (xuống xe) đều đưa tiền tố xuống cuối: *Der Zug fährt um 8 Uhr **ab**.*'),
      ],
      examples: [dlg(['Gast', 'Guten Tag, haben Sie ein Doppelzimmer frei?', 'Chào, còn phòng đôi không ạ?'], ['Rezeption', 'Ja. Für wie viele Nächte?', 'Còn. Mấy đêm ạ?'], ['Gast', 'Für drei Nächte, vom 10. bis zum 13. Mai.', 'Ba đêm, từ ngày 10 đến 13 tháng 5.'], ['Rezeption', 'Das kostet 90 Euro pro Nacht, mit Frühstück.', 'Giá 90 euro một đêm, kèm bữa sáng.'])],
      ex: [
        order('Tàu khởi hành lúc tám giờ', 'Der Zug fährt um acht Uhr ab'),
        order('Tôi muốn đặt một phòng', 'Ich möchte ein Zimmer buchen'),
        fill('Der Zug hat zehn Minuten ___. (chậm trễ)', 'Verspätung', 'Verspätung = chậm trễ.'),
        mc('“hin und zurück” nghĩa là:', ['khứ hồi', 'một chiều', 'chuyển tuyến', 'chậm trễ'], 0, 'hin und zurück = khứ hồi.'),
        match('Nối.', ['einsteigen', 'lên xe'], ['aussteigen', 'xuống xe'], ['umsteigen', 'chuyển tuyến'], ['ankommen', 'đến nơi']),
      ],
      review: '- Đặt phòng: *Ich möchte … buchen.*\n- Tàu xe: abfahren, ankommen, umsteigen.\n- Verspätung, Gleis, hin und zurück.',
    }),
  ],
})
