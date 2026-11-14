import { chapter, art, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c10-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 10,
  title: 'Wohnen',
  titleVi: 'Nhà cửa',
  lessons: [
    lesson({
      id: 'a1-c10-l1',
      title: 'Căn nhà và các phòng',
      goals: ['Gọi tên các phòng', 'Dùng es gibt', 'Mô tả nhà'],
      intro: 'Bạn sẽ học các phòng và đồ vật trong nhà, cùng cấu trúc **es gibt** (có) rất tiện để nói “có cái gì”.',
      vocab: [
        w('wohnung', 'Wohnung', 'căn hộ', { art: 'die', pl: 'Wohnungen', r: 'vô-nung' }), w('haus', 'Haus', 'ngôi nhà', { art: 'das', pl: 'Häuser', r: 'hao-x' }), w('zimmer', 'Zimmer', 'phòng', { art: 'das', pl: 'Zimmer', r: 'tsi-mơ' }), w('kuche', 'Küche', 'bếp', { art: 'die', pl: 'Küchen', r: 'khuy-khờ' }), w('bad', 'Bad', 'phòng tắm', { art: 'das', pl: 'Bäder', r: 'bat' }), w('schlafzimmer', 'Schlafzimmer', 'phòng ngủ', { art: 'das', pl: 'Schlafzimmer', r: 'sláp-tsi-mơ' }), w('wohnzimmer', 'Wohnzimmer', 'phòng khách', { art: 'das', pl: 'Wohnzimmer', r: 'vôn-tsi-mơ' }), w('balkon', 'Balkon', 'ban công', { art: 'der', pl: 'Balkone', r: 'bal-kông' }), w('tisch', 'Tisch', 'cái bàn', { art: 'der', pl: 'Tische', r: 'ti-s' }), w('stuhl', 'Stuhl', 'cái ghế', { art: 'der', pl: 'Stühle', r: 'sờ-tul' }), w('bett', 'Bett', 'cái giường', { art: 'das', pl: 'Betten', r: 'bét' }), w('lampe', 'Lampe', 'cái đèn', { art: 'die', pl: 'Lampen', r: 'lam-pờ' }),
      ],
      grammar: [
        T('**es gibt + Akkusativ** = có (tồn tại): *In meiner Wohnung gibt es **einen** Balkon.* (đực: einen), *Es gibt **eine** Küche.*, *Es gibt **ein** Bad.*, *Es gibt **zwei** Zimmer.*'),
        info('**es gibt** luôn dùng **es** và **gibt** (không đổi theo số nhiều). Thứ được “có” đứng ở **Akkusativ**: nên giống đực dùng **einen**.'),
        table(['Hỏi', 'Trả lời'], ['Wie viele Zimmer hast du?', 'Ich habe drei Zimmer.'], ['Gibt es einen Balkon?', 'Ja, es gibt einen Balkon.'], ['Wie groß ist die Wohnung?', 'Sie ist 60 Quadratmeter groß.']),
        tip('**Wohnung** là căn hộ, **Haus** là nhà riêng. Khi thuê nhà, bạn gặp **Miete** (tiền thuê) và **Nebenkosten** (phí phụ). **Kaltmiete** không gồm phí, **Warmmiete** có gồm.'),
      ],
      examples: [dlg(['Makler', 'Die Wohnung hat zwei Zimmer, eine Küche und ein Bad.', 'Căn hộ có hai phòng, một bếp và một phòng tắm.'], ['Kunde', 'Gibt es einen Balkon?', 'Có ban công không?'], ['Makler', 'Ja, es gibt einen kleinen Balkon.', 'Có, có một ban công nhỏ.'])],
      ex: [
        fill('Es gibt ___ Balkon. (đực Akkusativ)', 'einen', 'der Balkon → einen.'),
        fill('Es gibt ___ Küche.', 'eine', 'die Küche → eine.'),
        fill('Es gibt ___ Bad.', 'ein', 'das Bad → ein.'),
        order('Căn hộ có hai phòng', 'Die Wohnung hat zwei Zimmer'),
        mc('“Wohnzimmer” là phòng nào?', ['phòng khách', 'phòng ngủ', 'bếp', 'phòng tắm'], 0, 'wohnen + Zimmer = phòng khách.'),
      ],
      teaches: ['es-gibt'],
      review: '- **es gibt + Akkusativ** = có.\n- Phòng: Küche, Bad, Schlafzimmer, Wohnzimmer, Balkon.',
    }),
    lesson({
      id: 'a1-c10-l2',
      title: 'Giới từ chỉ vị trí: in, auf, an, neben',
      goals: ['Mô tả vị trí đồ vật', 'Dùng giới từ với Dativ cơ bản'],
      intro: 'Để nói “cái gì ở đâu”, dùng **giới từ vị trí** + danh từ ở **Dativ** (cách 3). Ở A1 bạn chỉ cần nhớ các dạng thông dụng, phần Dativ đầy đủ học ở A2.',
      vocab: [
        w('auf', 'auf', 'trên (bề mặt)', { pos: 'giới từ', r: 'ao-f' }), w('unter', 'unter', 'dưới', { pos: 'giới từ', r: 'un-tơ' }), w('neben', 'neben', 'bên cạnh', { pos: 'giới từ', r: 'nê-bần' }), w('vor2', 'vor', 'trước', { pos: 'giới từ', r: 'phô-ơ' }), w('hinter', 'hinter', 'sau', { pos: 'giới từ', r: 'hin-tơ' }), w('zwischen', 'zwischen', 'giữa', { pos: 'giới từ', r: 'tsvi-sần' }), w('wo', 'wo', 'ở đâu', { pos: 'từ hỏi', r: 'vô' }),
      ],
      grammar: [
        table(['Giới từ', 'Nghĩa', 'Ví dụ'], ['in', 'trong', 'Das Buch ist **in der** Tasche.'], ['auf', 'trên', 'Das Buch liegt **auf dem** Tisch.'], ['an', 'ở sát (tường, cạnh)', 'Das Bild hängt **an der** Wand.'], ['unter', 'dưới', 'Die Katze ist **unter dem** Tisch.'], ['neben', 'bên cạnh', 'Der Stuhl steht **neben dem** Tisch.'], ['vor / hinter', 'trước / sau', 'Das Auto steht **vor dem** Haus.'], ['zwischen', 'giữa', 'Der Tisch steht **zwischen** …']),
        T('**Rút gọn thường gặp:** **in dem = im**, **an dem = am**, **zu dem = zum**, **zu der = zur**.'),
        info('**Dativ của mạo từ (cho trả lời “Wo?”):** der → **dem**, die → **der**, das → **dem**, die (số nhiều) → **den**. Ví dụ: *auf dem Tisch* (đực), *in der Küche* (cái), *auf dem Sofa* (đực/trung: dem).'),
        warn('Động từ vị trí: **liegen** (nằm), **stehen** (đứng), **hängen** (treo), **sitzen** (ngồi). Vị trí = **Wo?** → Dativ.'),
        tip('Chỉ cần thuộc 4 mẫu: **dem** (đực, trung), **der** (cái), **den** (số nhiều). Bạn sẽ thấy lại trong A2.'),
      ],
      examples: [ex('Das Buch liegt auf dem Tisch.', 'Cuốn sách nằm trên bàn.'), ex('Die Katze ist unter dem Bett.', 'Con mèo ở dưới gầm giường.'), ex('Der Stuhl steht neben der Lampe.', 'Cái ghế đứng cạnh cái đèn.'), ex('Ich bin in der Küche.', 'Tôi ở trong bếp.')],
      ex: [
        fill('Das Buch liegt auf ___ Tisch. (der Tisch)', 'dem', 'đực → dem.'),
        fill('Ich bin in ___ Küche. (die Küche)', 'der', 'cái → der.'),
        fill('Die Katze ist unter ___ Bett. (das Bett)', 'dem', 'trung → dem.'),
        mc('“im” là viết gọn của:', ['in dem', 'in der', 'in den', 'ihm'], 0, 'im = in dem.'),
        order('Cuốn sách nằm trên bàn', 'Das Buch liegt auf dem Tisch'),
      ],
      teaches: ['praepositionen-dativ-intro'],
      review: '- **Wo?** → giới từ + **Dativ**: dem / der / dem / den.\n- **in dem = im**, **an dem = am**.\n- liegen, stehen, hängen, sitzen.',
    }),
  ],
})
