import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c08-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 8,
  title: 'Formelle E-Mails',
  titleVi: 'Viết email và thư trang trọng',
  lessons: [
    lesson({
      id: 'b1-c08-l1',
      title: 'Cấu trúc email trang trọng',
      goals: ['Viết email trang trọng đúng cấu trúc', 'Dùng lời chào và lời kết đúng', 'Chuyển từ thân mật sang trang trọng'],
      intro: 'Email trang trọng có **cấu trúc cố định**: chào, lý do viết, nội dung, kết thúc. Thi B1 thường yêu cầu viết một email như vậy.',
      vocab: [
        w('betreff', 'Betreff', 'tiêu đề', { art: 'der', r: 'bờ-tréf' }), w('anrede', 'Anrede', 'lời chào đầu thư', { art: 'die', r: 'an-rê-đờ' }), w('gruss', 'Gruß', 'lời chào', { art: 'der', pl: 'Grüße', r: 'gru-x' }), w('anfrage', 'Anfrage', 'yêu cầu hỏi', { art: 'die', pl: 'Anfragen', r: 'an-phra-gờ' }), w('beschwerde', 'Beschwerde', 'khiếu nại', { art: 'die', pl: 'Beschwerden', r: 'bờ-svê-đờ' }), w('termin', 'Termin', 'cuộc hẹn', { art: 'der', pl: 'Termine', r: 'tec-min' }), w('anhang', 'Anhang', 'tệp đính kèm', { art: 'der', pl: 'Anhänge', r: 'an-hang' }), w('rucksprache', 'Rücksprache', 'trao đổi lại', { art: 'die', r: 'ruýc-spra-khờ' }), w('antwort', 'Antwort', 'câu trả lời', { art: 'die', pl: 'Antworten', r: 'an-tvoát' }),
      ],
      grammar: [
        table(['Phần', 'Trang trọng', 'Thân mật'], ['**Chào**', 'Sehr geehrte Frau Müller, / Sehr geehrter Herr Schmidt, / Sehr geehrte Damen und Herren,', 'Liebe Anna, / Hallo Tom,'], ['**Lý do**', 'ich schreibe Ihnen, weil … • Ich beziehe mich auf Ihre Anzeige … • Ich möchte mich über … beschweren.', 'ich wollte dich fragen, …'], ['**Yêu cầu**', 'Könnten Sie mir bitte … schicken? • Ich wäre Ihnen dankbar, wenn …', 'Kannst du mir … schicken?'], ['**Kết thúc**', 'Vielen Dank im Voraus. • Ich freue mich auf Ihre Antwort.', 'Danke schon mal!'], ['**Lời kết**', '**Mit freundlichen Grüßen** + tên đầy đủ', 'Viele Grüße / Liebe Grüße / Bis bald'], ['**Xưng hô**', '**Sie / Ihnen / Ihr** (viết hoa)', 'du / dir / dein']),
        warn('Trong thư trang trọng **luôn viết hoa** Sie, Ihnen, Ihr, Ihre. Trong thư thân mật, **du/dein** viết thường (theo quy tắc mới). Sau dấu phẩy ở lời chào, dòng tiếp theo viết **chữ thường** (trừ danh từ).'),
        T('**Mẫu email xin thông tin:**\n\n*Betreff: Anfrage zum Deutschkurs*\n\n*Sehr geehrte Damen und Herren,*\n\n*ich interessiere mich für Ihren Deutschkurs auf Niveau B1. Könnten Sie mir bitte mitteilen, wann der nächste Kurs beginnt und wie viel er kostet?*\n\n*Vielen Dank im Voraus.*\n\n*Mit freundlichen Grüßen*\n*Linh Nguyen*'),
        info('**Cụm lịch sự thông dụng:** **Ich würde mich freuen, wenn …** (tôi sẽ rất vui nếu …), **Ich möchte Sie bitten, …** (tôi muốn nhờ bạn …), **Leider muss ich Ihnen mitteilen, dass …** (rất tiếc phải thông báo …), **Entschuldigen Sie bitte die Störung.**'),
      ],
      examples: [ex('Sehr geehrte Frau Weber, ich schreibe Ihnen wegen der Wohnung.', 'Kính gửi bà Weber, tôi viết cho bà về căn hộ.'), ex('Ich wäre Ihnen dankbar, wenn Sie mir die Unterlagen schicken könnten.', 'Tôi sẽ rất biết ơn nếu bà gửi cho tôi tài liệu.'), ex('Mit freundlichen Grüßen, Linh Nguyen', 'Trân trọng, Linh Nguyen')],
      ex: [
        mc('Lời chào cho người nữ chưa biết tên là:', ['Sehr geehrte Damen und Herren', 'Hallo!', 'Liebe Frau', 'Hi'], 0, 'Chưa biết tên: Sehr geehrte Damen und Herren.'),
        mc('Lời kết trang trọng là:', ['Mit freundlichen Grüßen', 'Bis bald', 'Tschüss', 'Liebe Grüße'], 0, 'Mit freundlichen Grüßen.'),
        fill('Sehr ___ Herr Schmidt,', 'geehrter', 'Sehr geehrter Herr…'),
        fill('Könnten ___ mir bitte helfen? (Sie, viết hoa)', 'Sie', 'Sie viết hoa.'),
        order('Tôi sẽ rất biết ơn nếu bạn giúp tôi', 'Ich wäre Ihnen dankbar, wenn Sie mir helfen könnten'),
        match('Nối.', ['der Betreff', 'tiêu đề'], ['der Anhang', 'đính kèm'], ['die Anfrage', 'yêu cầu hỏi'], ['die Beschwerde', 'khiếu nại']),
      ],
      teaches: ['formelle-email'],
      review: '- Chào: **Sehr geehrte/r …**; kết: **Mit freundlichen Grüßen**.\n- **Sie, Ihnen, Ihr** viết hoa.\n- Lịch sự: **Könnten Sie … ? Ich wäre dankbar, wenn …**',
    }),
    lesson({
      id: 'b1-c08-l2',
      title: 'Viết email phàn nàn và đặt hẹn',
      goals: ['Viết email khiếu nại lịch sự', 'Đặt lại hoặc huỷ cuộc hẹn'],
      intro: 'Hai loại email thực tế nhất: **khiếu nại** (hàng hỏng, dịch vụ tệ) và **đặt/đổi hẹn** (bác sĩ, văn phòng).',
      vocab: [
        w('bestellung', 'Bestellung', 'đơn hàng', { art: 'die', pl: 'Bestellungen', r: 'bờ-sté-lung' }), w('kaputt', 'kaputt', 'hỏng', { pos: 'tính từ', r: 'ka-pút' }), w('erstatten', 'erstatten', 'hoàn lại', { pos: 'động từ', r: 'e-sta-tần' }), w('absagen', 'absagen', 'huỷ', { pos: 'động từ tách', r: 'ap-za-gần' }), w('verschieben', 'verschieben', 'dời lại', { pos: 'động từ', r: 'phe-si-bần' }), w('entschuldigen', 'entschuldigen', 'xin lỗi, bào chữa', { pos: 'động từ', r: 'ent-sun-đi-gần' }), w('unzufrieden', 'unzufrieden', 'không hài lòng', { pos: 'tính từ', r: 'un-tsu-phri-đần' }),
      ],
      grammar: [
        T('**Mẫu email khiếu nại:**\n\n*Sehr geehrte Damen und Herren,*\n*am 5. Mai habe ich bei Ihnen einen Laptop bestellt. Leider ist das Gerät defekt angekommen. **Ich bitte Sie daher, mir** den Kaufpreis **zu erstatten** oder das Gerät **zu ersetzen**. Ich **wäre Ihnen dankbar, wenn** Sie sich bis Freitag **melden könnten**.*\n*Mit freundlichen Grüßen*'),
        T('**Mẫu đổi lịch hẹn:**\n*Leider kann ich den Termin am Montag nicht wahrnehmen, weil ich krank bin. **Könnten wir** den Termin **auf** nächste Woche **verschieben**? Entschuldigen Sie bitte die Unannehmlichkeiten.*'),
        info('**Phương pháp viết:** (1) **Lý do** viết ngay câu đầu; (2) **Nêu vấn đề** rõ ràng, có ngày tháng; (3) **Nêu yêu cầu** cụ thể; (4) **Kết thúc lịch sự** kèm kỳ vọng phản hồi.'),
        tip('**Từ lịch sự** làm email mềm hơn: **leider** (tiếc là), **bitte** (làm ơn), **könnten** (có thể), **wäre … dankbar** (sẽ biết ơn).'),
      ],
      examples: [dlg(['Kunde', 'Ich möchte mich über meine Bestellung beschweren.', 'Tôi muốn khiếu nại về đơn hàng của tôi.'], ['Service', 'Was ist das Problem?', 'Vấn đề là gì ạ?'], ['Kunde', 'Das Gerät ist kaputt angekommen. Ich bitte um Erstattung.', 'Thiết bị đến nơi bị hỏng. Tôi yêu cầu hoàn tiền.'])],
      ex: [
        order('Tôi muốn dời cuộc hẹn', 'Ich möchte den Termin verschieben'),
        order('Thiết bị đến nơi bị hỏng', 'Das Gerät ist kaputt angekommen'),
        fill('Könnten wir den Termin ___? (dời)', 'verschieben', 'verschieben = dời lại.'),
        fill('Ich bitte Sie, mir das Geld zu ___. (hoàn)', 'erstatten', 'erstatten = hoàn lại.'),
        mc('“Ich bin unzufrieden” nghĩa là:', ['Tôi không hài lòng', 'Tôi rất vui', 'Tôi mệt', 'Tôi đang bận'], 0, 'unzufrieden = không hài lòng.'),
      ],
      review: '- Khiếu nại: nêu **vấn đề + ngày + yêu cầu cụ thể**.\n- Đổi hẹn: **Könnten wir den Termin verschieben?**\n- Lịch sự: leider, bitte, könnten, wäre dankbar.',
    }),
  ],
})
