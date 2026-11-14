import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c09-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 9,
  title: 'Einkaufen',
  titleVi: 'Mua sắm',
  lessons: [
    lesson({
      id: 'a1-c09-l1',
      title: 'Số nhiều của danh từ',
      goals: ['Nhận biết 5 kiểu số nhiều', 'Học danh từ kèm dạng số nhiều'],
      intro: 'Số nhiều tiếng Đức **không theo một quy tắc duy nhất**. Có khoảng 5 kiểu. Học từ mới luôn học kèm dạng số nhiều: *das Buch, die Bücher*.',
      vocab: [
        w('buch', 'Buch', 'sách', { art: 'das', pl: 'Bücher', r: 'bukh' }), w('tasche', 'Tasche', 'túi', { art: 'die', pl: 'Taschen', r: 'ta-sờ' }), w('hose', 'Hose', 'quần', { art: 'die', pl: 'Hosen', r: 'hô-dờ' }), w('hemd', 'Hemd', 'áo sơ mi', { art: 'das', pl: 'Hemden', r: 'hemt' }), w('schuh', 'Schuh', 'giày', { art: 'der', pl: 'Schuhe', r: 'su' }), w('apfel2', 'Apfel', 'quả táo', { art: 'der', pl: 'Äpfel', r: 'áp-phồl' }), w('auto', 'Auto', 'ô tô', { art: 'das', pl: 'Autos', r: 'ao-tô' }), w('euro', 'Euro', 'đồng euro', { art: 'der', pl: 'Euro', r: 'oi-rô' }),
      ],
      grammar: [
        table(['Kiểu', 'Ví dụ'], ['-e', 'der Schuh → die Schuh**e**; der Tag → die Tag**e**'], ['-e + umlaut', 'der Apfel → die Äpfel; die Hand → die Hände'], ['-er (+umlaut)', 'das Buch → die Bücher; das Kind → die Kinder'], ['-(e)n', 'die Tasche → die Taschen; die Frau → die Frauen'], ['-s (từ vay mượn)', 'das Auto → die Autos; das Handy → die Handys'], ['không đổi (nhiều từ -er, -el)', 'der Lehrer → die Lehrer; der Koffer → die Koffer']),
        info('**Mạo từ số nhiều luôn là die**, bất kể giống nào: *der Schuh → die Schuhe*, *das Buch → die Bücher*, *die Tasche → die Taschen*. Mạo từ không xác định số nhiều **không có**: *Ich habe Bücher.*'),
        tip('**Hầu hết danh từ giống cái** dùng **-n/-en**; **giống đực & trung** hay dùng **-e / -er / umlaut**. Đây là mẹo, không phải luật: cứ học kèm số nhiều.'),
      ],
      examples: [ex('Das ist ein Buch. Das sind zwei Bücher.', 'Đây là một cuốn sách. Đây là hai cuốn sách.'), ex('Ich brauche zwei Hemden.', 'Tôi cần hai cái áo sơ mi.'), ex('Die Schuhe sind neu.', 'Đôi giày mới.')],
      ex: [
        fill('das Buch → die ___', 'Bücher', 'Buch → Bücher.'),
        fill('die Tasche → die ___', 'Taschen', 'Tasche → Taschen.'),
        fill('der Apfel → die ___', 'Äpfel', 'Apfel → Äpfel.'),
        fill('das Auto → die ___', 'Autos', 'từ vay mượn → -s.'),
        fill('der Schuh → die ___', 'Schuhe', 'Schuh → Schuhe.'),
        mc('Mạo từ số nhiều xác định là:', ['die', 'der', 'das', 'den'], 0, 'Số nhiều: die.'),
        match('Ghép số ít với số nhiều.', ['das Hemd', 'die Hemden'], ['die Hose', 'die Hosen'], ['das Kind', 'die Kinder'], ['der Euro', 'die Euro']),
      ],
      teaches: ['plural'],
      review: '- 5 kiểu: **-e, -e+¨, -er(+¨), -(e)n, -s**.\n- Số nhiều xác định luôn **die**.\n- Học danh từ kèm số nhiều.',
    }),
    lesson({
      id: 'a1-c09-l2',
      title: 'Hỏi giá, trả tiền, quần áo',
      goals: ['Hỏi giá', 'Nói giá tiền', 'Dùng brauchen, kaufen, kosten'],
      intro: 'Đi mua sắm bạn cần hỏi giá và hiểu giá tiền. **Was kostet…?** dùng cho một vật, **Was kosten…?** dùng cho nhiều vật.',
      vocab: [
        w('kosten', 'kosten', 'có giá', { pos: 'động từ', r: 'kô-xtần' }), w('kaufen', 'kaufen', 'mua', { pos: 'động từ', r: 'kao-phần' }), w('brauchen', 'brauchen', 'cần', { pos: 'động từ', r: 'brao-khần' }), w('bezahlen', 'bezahlen', 'trả tiền', { pos: 'động từ', r: 'bờ-tsa-lần' }), w('teuer', 'teuer', 'đắt', { pos: 'tính từ', r: 'toi-ơ' }), w('billig', 'billig', 'rẻ', { pos: 'tính từ', r: 'bi-lích' }), w('geschaft', 'Geschäft', 'cửa hàng', { art: 'das', pl: 'Geschäfte', r: 'gờ-sếp-ft' }), w('supermarkt', 'Supermarkt', 'siêu thị', { art: 'der', pl: 'Supermärkte', r: 'du-pơ-mác-kt' }), w('kasse', 'Kasse', 'quầy thu ngân', { art: 'die', r: 'ka-dờ' }),
      ],
      grammar: [
        T('**Hỏi giá:** *Was kostet das Hemd?* / *Wie viel kostet das?* (một vật) • *Was kosten die Schuhe?* (nhiều vật)\n**Trả lời:** *Das Hemd kostet 25 Euro.* / *Die Schuhe kosten 60 Euro.*'),
        table(['Tiền', 'Đọc'], ['2,50 €', 'zwei Euro fünfzig'], ['10 €', 'zehn Euro'], ['0,99 €', 'neunundneunzig Cent'], ['15,30 €', 'fünfzehn Euro dreißig']),
        info('**Đơn vị:** 1 Euro = 100 Cent. Số tiền đọc “**Euro**” (không thêm s) rồi số Cent. Nói giá thường không đọc “Cent”.'),
        T('**brauchen** và **kaufen** + tân ngữ Akkusativ: *Ich brauche **einen** Mantel.* (đực: einen), *Ich kaufe **eine** Hose.* (cái: eine), *Ich kaufe **ein** Hemd.* (trung: ein).'),
        tip('**Kann ich mit Karte zahlen?** (Tôi trả bằng thẻ được không?) và **Bar oder mit Karte?** (Tiền mặt hay thẻ?) là hai câu rất hay gặp ở quầy thu ngân.'),
      ],
      examples: [dlg(['Verkäufer', 'Guten Tag! Kann ich Ihnen helfen?', 'Chào! Tôi giúp gì được ạ?'], ['Kunde', 'Ja, ich suche eine Hose. Was kostet die?', 'Vâng, tôi tìm một cái quần. Cái này giá bao nhiêu?'], ['Verkäufer', 'Die kostet neunundvierzig Euro.', 'Cái này giá 49 euro.'], ['Kunde', 'Das ist ein bisschen teuer. Haben Sie eine billigere?', 'Hơi đắt. Bạn có cái rẻ hơn không?'])],
      ex: [
        fill('Was ___ das Hemd? (kosten)', 'kostet', 'một vật → kostet.'),
        fill('Was ___ die Schuhe? (kosten)', 'kosten', 'nhiều vật → kosten.'),
        fill('Ich brauche ___ Mantel. (đực Akkusativ)', 'einen', 'der Mantel → einen Mantel.'),
        order('Tôi trả bằng thẻ được không?', 'Kann ich mit Karte zahlen?'),
        mc('“zwei Euro fünfzig” là bao nhiêu?', ['2,50 €', '25 €', '2,05 €', '52 €'], 0, '2,50 €.'),
      ],
      teaches: ['preise'],
      review: '- **Was kostet …? / Was kosten …?**\n- Giá: *zwei Euro fünfzig*.\n- brauchen / kaufen + Akkusativ.',
    }),
  ],
})
