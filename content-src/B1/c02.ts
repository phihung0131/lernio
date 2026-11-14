import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c02-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 2,
  title: 'Vorher und nachher',
  titleVi: 'Plusquamperfekt và câu phụ chỉ thời gian',
  lessons: [
    lesson({
      id: 'b1-c02-l1',
      title: 'Plusquamperfekt: quá khứ hoàn thành',
      goals: ['Tạo Plusquamperfekt', 'Diễn đạt “trước một sự kiện quá khứ khác”'],
      intro: '**Plusquamperfekt** nói về điều **đã xảy ra trước** một sự kiện quá khứ khác. Cấu trúc: **hatte/war + Partizip II**.',
      vocab: [
        w('vorher', 'vorher', 'trước đó', { pos: 'trạng từ', e: '⏪', r: 'phô-he' }), w('nachher', 'nachher', 'sau đó', { pos: 'trạng từ', e: '⏩', r: 'na-khe' }), w('inzwischen', 'inzwischen', 'trong lúc đó', { pos: 'trạng từ', e: '⏳', r: 'in-tsvi-sần' }), w('schon', 'schon', 'đã', { pos: 'trạng từ', e: '✅', r: 'sôn' }), w('noch-nicht', 'noch nicht', 'chưa', { e: '❌', r: 'nôkh nít' }),
      ],
      grammar: [
        table(['', 'haben-Verben', 'sein-Verben'], ['ich', 'hatte gemacht', 'war gegangen'], ['du', 'hattest gemacht', 'warst gegangen'], ['er/sie/es', 'hatte gemacht', 'war gegangen'], ['wir', 'hatten gemacht', 'waren gegangen'], ['ihr', 'hattet gemacht', 'wart gegangen'], ['sie/Sie', 'hatten gemacht', 'waren gegangen']),
        T('**Cấu trúc:** Präteritum của **haben/sein** + **Partizip II ở cuối câu**.\n- *Als ich ankam, **war** der Zug schon **abgefahren**.* (Khi tôi đến, tàu đã chạy rồi.)\n- *Er **hatte** das Buch schon **gelesen**, bevor der Film **begann**.*'),
        info('**Dùng thế nào:** dòng thời gian có hai sự kiện quá khứ. Sự kiện **xảy ra trước** → **Plusquamperfekt**; sự kiện **xảy ra sau** → **Präteritum** (hoặc Perfekt).'),
        warn('Chọn **hatte** hay **war** theo **cùng quy tắc như Perfekt** (haben cho đa số, sein cho chuyển động/đổi trạng thái).'),
      ],
      examples: [ex('Ich hatte schon gegessen, als er anrief.', 'Tôi đã ăn xong khi anh ấy gọi.'), ex('Als wir ankamen, war der Film schon zu Ende.', 'Khi chúng tôi đến, bộ phim đã kết thúc.'), ex('Sie war nie zuvor in Deutschland gewesen.', 'Trước đó cô ấy chưa từng ở Đức.')],
      ex: [
        fill('Ich ___ schon gegessen. (haben, Plusquamperfekt)', 'hatte', 'ich hatte.'),
        fill('Er ___ schon abgefahren. (sein)', 'war', 'abfahren → war abgefahren.'),
        fill('Wir ___ den Film gesehen. (haben)', 'hatten', 'wir hatten.'),
        order('Khi tôi đến, tàu đã chạy rồi', 'Als ich ankam, war der Zug schon abgefahren'),
        mc('Plusquamperfekt diễn tả:', ['điều xảy ra trước một sự kiện quá khứ khác', 'tương lai', 'hiện tại', 'thói quen'], 0, 'Trước một sự kiện quá khứ.'),
      ],
      teaches: ['plusquamperfekt'],
      review: '- **hatte/war + Partizip II** = đã xảy ra trước.\n- Thứ tự: Plusquamperfekt (trước) → Präteritum (sau).',
    }),
    lesson({
      id: 'b1-c02-l2',
      title: 'nachdem, bevor, während, seit(dem)',
      goals: ['Dùng 4 liên từ phụ chỉ thời gian', 'Chọn đúng thì sau nachdem'],
      intro: 'Các liên từ này nối **hai sự kiện theo thời gian**. Chúng là **liên từ phụ**: động từ chia ở **cuối câu phụ**.',
      vocab: [
        w('nachdem', 'nachdem', 'sau khi', { pos: 'liên từ phụ', e: '➡️', r: 'nakh-đêm' }), w('bevor', 'bevor', 'trước khi', { pos: 'liên từ phụ', e: '⬅️', r: 'bờ-phô-ơ' }), w('wahrend', 'während', 'trong khi', { pos: 'liên từ phụ', e: '↔️', r: 'vê-rần-t' }), w('seitdem', 'seitdem', 'từ khi', { pos: 'liên từ phụ', e: '📅', r: 'dai-t-đêm' }), w('sobald', 'sobald', 'ngay khi', { pos: 'liên từ phụ', e: '⚡', r: 'dô-balt' }), w('bis', 'bis', 'cho đến khi', { pos: 'liên từ phụ', e: '🏁', r: 'bis' }),
      ],
      grammar: [
        table(['Liên từ', 'Nghĩa', 'Quy tắc thì', 'Ví dụ'], ['**nachdem**', 'sau khi', 'vế nachdem **xảy ra trước**: vế chính Präsens → vế nachdem **Perfekt**; vế chính Präteritum → vế nachdem **Plusquamperfekt**', 'Nachdem ich gegessen **hatte**, **ging** ich spazieren.'], ['**bevor**', 'trước khi', 'thường cùng thì', 'Ich dusche, bevor ich zur Arbeit gehe.'], ['**während**', 'trong khi', 'hai việc đồng thời', 'Während ich koche, hört er Musik.'], ['**seitdem**', 'từ khi (đến giờ)', 'Präsens/Perfekt', 'Seitdem ich hier wohne, habe ich viele Freunde.'], ['**sobald**', 'ngay khi', '', 'Ich rufe an, sobald ich ankomme.'], ['**bis**', 'cho đến khi', '', 'Ich warte, bis du kommst.']),
        T('**Quy tắc vàng với nachdem:**\n- Câu chính ở **Präteritum/Perfekt** → vế **nachdem** ở **Plusquamperfekt**.\n- Câu chính ở **Präsens** → vế **nachdem** ở **Perfekt**.\n*Nachdem er **gegessen hatte**, **ging** er schlafen.* / *Nachdem er **gegessen hat**, **geht** er schlafen.*'),
        warn('**Động từ ở cuối câu phụ**, và nếu câu phụ đứng đầu, động từ câu chính đứng ngay sau dấu phẩy: *Bevor ich **gehe**, **rufe** ich dich an.*'),
        tip('**bevor/nachdem** chỉ dùng được khi hai vế **có chủ ngữ riêng** hoặc cùng chủ ngữ, không dùng zu + nguyên mẫu. Còn cùng chủ ngữ, bạn cũng có thể dùng giới từ: **vor** + Dativ, **nach** + Dativ: *nach dem Essen*.'),
      ],
      examples: [ex('Nachdem ich geduscht hatte, frühstückte ich.', 'Sau khi tắm, tôi ăn sáng.'), ex('Bevor du gehst, mach das Licht aus!', 'Trước khi đi, hãy tắt đèn!'), ex('Während wir aßen, klingelte das Telefon.', 'Trong lúc chúng tôi ăn, điện thoại reo.'), ex('Ich warte, bis du fertig bist.', 'Tôi chờ cho đến khi bạn xong.')],
      ex: [
        fill('___ er gegessen hatte, ging er schlafen. (sau khi)', 'Nachdem', 'nachdem = sau khi.'),
        fill('___ ich gehe, rufe ich dich an. (trước khi)', 'Bevor', 'bevor = trước khi.'),
        fill('___ ich koche, hört er Musik. (trong khi)', 'Während', 'während = trong khi.'),
        fill('Nachdem ich gegessen ___, ging ich spazieren. (haben, Plusq.)', 'hatte', 'nachdem + Plusquamperfekt.'),
        order('Tôi chờ cho đến khi bạn xong', 'Ich warte, bis du fertig bist'),
        mc('Nachdem + thì nào khi câu chính ở Präteritum?', ['Plusquamperfekt', 'Präsens', 'Futur', 'Imperativ'], 0, 'Plusquamperfekt.'),
      ],
      teaches: ['temporale-nebensaetze'],
      review: '- **nachdem** (sau khi), **bevor** (trước khi), **während** (trong khi), **seitdem**, **sobald**, **bis**.\n- nachdem: câu chính Präteritum → vế nachdem **Plusquamperfekt**.',
    }),
  ],
})
