import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c05-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 5,
  title: 'Arbeit und Studium',
  titleVi: 'Công việc, học tập và câu phụ weil/dass',
  lessons: [
    lesson({
      id: 'a2-c05-l1',
      title: 'Câu phụ với weil và dass',
      goals: ['Tạo câu phụ với động từ ở cuối', 'Dùng weil (vì) và dass (rằng)'],
      intro: '**Câu phụ** (Nebensatz) bổ sung thông tin cho câu chính. Quy tắc vàng của tiếng Đức: trong câu phụ, **động từ chia đứng ở CUỐI câu**.',
      vocab: [
        w('weil', 'weil', 'bởi vì', { pos: 'liên từ phụ', r: 'vai-l' }), w('dass', 'dass', 'rằng', { pos: 'liên từ phụ', r: 'đát' }), w('wenn', 'wenn', 'khi, nếu', { pos: 'liên từ phụ', r: 'ven' }), w('obwohl', 'obwohl', 'mặc dù', { pos: 'liên từ phụ', r: 'óp-vôl' }), w('denn', 'denn', 'vì (câu chính)', { pos: 'liên từ chính', r: 'đen' }), w('grund', 'Grund', 'lý do', { art: 'der', pl: 'Gründe', r: 'grun-t' }), w('deshalb', 'deshalb', 'vì vậy', { pos: 'trạng từ', r: 'đét-halp' }), w('glauben', 'glauben', 'tin, nghĩ', { pos: 'động từ', r: 'glao-bần' }), w('wissen', 'wissen', 'biết', { pos: 'động từ', r: 'vi-dần' }),
      ],
      grammar: [
        T('**Câu chính:** *Ich lerne Deutsch.* Động từ ở vị trí 2.\n**Câu phụ với weil:** *Ich lerne Deutsch, **weil** ich in Deutschland **arbeiten will**.* → Động từ chia **ở cuối câu phụ**. Trước liên từ có **dấu phẩy**.'),
        table(['Liên từ', 'Nghĩa', 'Ví dụ'], ['**weil**', 'bởi vì (lý do)', 'Ich bin müde, weil ich wenig geschlafen habe.'], ['**dass**', 'rằng', 'Ich glaube, dass er recht hat.'], ['**wenn**', 'khi / nếu', 'Wenn ich Zeit habe, lese ich.'], ['**obwohl**', 'mặc dù', 'Ich gehe raus, obwohl es regnet.']),
        info('**Câu phụ đứng đầu:** động từ ở cuối câu phụ, **động từ câu chính đứng ngay sau dấu phẩy** (vị trí 1 vì cả câu phụ là thành phần đầu): *Weil ich müde bin, **gehe** ich ins Bett.* (Vì tôi mệt nên tôi đi ngủ.) Chú ý: sau dấu phẩy là **động từ**, không phải chủ ngữ.'),
        warn('**Với thì Perfekt hoặc modal** trong câu phụ: động từ chia nằm **cuối cùng**, sau Partizip/nguyên mẫu: *…weil ich nicht kommen **konnte**.* / *…weil er gestern nicht **gekommen ist**.*'),
        tip('**weil** (câu phụ, động từ cuối) và **denn** (câu chính, động từ vị trí 2) cùng nghĩa “vì”: *Ich bleibe zu Hause, **denn** ich bin krank.*'),
        info('**dass** thường sau các động từ: **glauben, wissen, sagen, denken, hoffen, finden, meinen**. *Ich weiß, dass du Recht hast.* (Tôi biết rằng bạn đúng.)'),
      ],
      examples: [dlg(['Anna', 'Warum lernst du Deutsch?', 'Vì sao bạn học tiếng Đức?'], ['Linh', 'Ich lerne Deutsch, weil ich in Deutschland studieren möchte.', 'Tôi học tiếng Đức vì tôi muốn học ở Đức.']), ex('Ich glaube, dass er morgen kommt.', 'Tôi nghĩ rằng ngày mai anh ấy đến.'), ex('Wenn es regnet, bleibe ich zu Hause.', 'Khi trời mưa, tôi ở nhà.')],
      ex: [
        order('Tôi học tiếng Đức vì tôi muốn làm việc ở Đức', 'Ich lerne Deutsch, weil ich in Deutschland arbeiten will'),
        order('Tôi nghĩ rằng anh ấy mệt', 'Ich glaube, dass er müde ist'),
        order('Vì tôi mệt nên tôi đi ngủ', 'Weil ich müde bin, gehe ich ins Bett'),
        fill('Ich bleibe zu Hause, ___ ich krank bin. (vì, câu phụ)', 'weil', 'weil + động từ cuối.'),
        fill('Er sagt, ___ er keine Zeit hat. (rằng)', 'dass', 'dass + động từ cuối.'),
        mc('Trong câu phụ, động từ chia đứng ở:', ['cuối câu phụ', 'vị trí 2', 'đầu câu', 'sau chủ ngữ'], 0, 'Cuối câu phụ.'),
        mc('“Weil ich müde bin, ___ ich ins Bett.”', ['gehe', 'ich gehe', 'gehen', 'ginge'], 0, 'Câu chính sau câu phụ: động từ đứng đầu.'),
      ],
      teaches: ['nebensatz-weil-dass'],
      review: '- **Câu phụ: động từ chia ở CUỐI.**\n- weil, dass, wenn, obwohl.\n- Câu phụ đứng đầu → động từ câu chính đứng ngay sau dấu phẩy.',
    }),
    lesson({
      id: 'a2-c05-l2',
      title: 'Học tập và công việc',
      goals: ['Nói về trường học, đại học, công việc', 'Viết CV ngắn và nói về kế hoạch'],
      intro: 'Dùng câu phụ để nói **lý do**, **mong muốn**, **kế hoạch**. Đây là từ vựng bạn dùng khi ứng tuyển hoặc làm thủ tục.',
      vocab: [
        w('universitat', 'Universität', 'đại học', { art: 'die', pl: 'Universitäten', r: 'u-ni-vé-di-tét' }), w('studium', 'Studium', 'việc học đại học', { art: 'das', r: 'stu-đi-um' }), w('kurs', 'Kurs', 'khóa học', { art: 'der', pl: 'Kurse', r: 'kua-x' }), w('prufung', 'Prüfung', 'kỳ thi', { art: 'die', pl: 'Prüfungen', r: 'pruy-phung' }), w('bewerbung', 'Bewerbung', 'đơn xin việc', { art: 'die', pl: 'Bewerbungen', r: 'bờ-vé-bung' }), w('lebenslauf', 'Lebenslauf', 'sơ yếu lý lịch', { art: 'der', r: 'lê-bần-s-laof' }), w('erfahrung', 'Erfahrung', 'kinh nghiệm', { art: 'die', pl: 'Erfahrungen', r: 'e-pha-rung' }), w('kollege', 'Kollege', 'đồng nghiệp', { art: 'der', pl: 'Kollegen', r: 'kô-lê-gờ' }), w('chef', 'Chef', 'sếp', { art: 'der', pl: 'Chefs', r: 'sép' }), w('gehalt', 'Gehalt', 'lương', { art: 'das', pl: 'Gehälter', r: 'gờ-halt' }), w('vertrag', 'Vertrag', 'hợp đồng', { art: 'der', pl: 'Verträge', r: 'phe-trak' }),
      ],
      grammar: [
        T('**Mẫu câu hữu ích khi xin việc/học:**\n- *Ich möchte mich um die Stelle **bewerben**.* (Tôi muốn ứng tuyển vị trí này.)\n- *Ich habe drei Jahre Erfahrung als Verkäufer.* (Tôi có ba năm kinh nghiệm bán hàng.)\n- *Ich studiere Informatik, **weil** ich Programmierer werden **möchte**.*\n- *Wann **haben** Sie Zeit für ein Gespräch?*'),
        table(['Phần trong CV', 'Tiếng Đức'], ['Họ tên', 'Name'], ['Ngày sinh', 'Geburtsdatum'], ['Địa chỉ', 'Anschrift / Adresse'], ['Học vấn', 'Ausbildung / Schulbildung'], ['Kinh nghiệm', 'Berufserfahrung'], ['Kỹ năng', 'Kenntnisse / Fähigkeiten'], ['Ngôn ngữ', 'Sprachkenntnisse']),
        info('**werden** (trở thành): *Ich werde Lehrer.* (Tôi sẽ trở thành giáo viên.) ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden. Bất quy tắc: du **wirst**, er **wird**.'),
        tip('Email xin việc ngắn: *Sehr geehrte Damen und Herren, … Mit freundlichen Grüßen*. Kết thúc thư trang trọng: **Mit freundlichen Grüßen** (Trân trọng).'),
      ],
      examples: [dlg(['Chef', 'Warum möchten Sie bei uns arbeiten?', 'Vì sao bạn muốn làm việc ở công ty chúng tôi?'], ['Bewerber', 'Ich möchte bei Ihnen arbeiten, weil ich gern mit Menschen arbeite.', 'Tôi muốn làm việc ở chỗ ông vì tôi thích làm việc với con người.'])],
      ex: [
        order('Tôi muốn trở thành giáo viên', 'Ich möchte Lehrer werden'),
        fill('Du ___ Lehrer. (werden)', 'wirst', 'du wirst.'),
        fill('Er ___ Arzt. (werden)', 'wird', 'er wird.'),
        match('Nối.', ['die Bewerbung', 'đơn xin việc'], ['der Lebenslauf', 'CV'], ['der Chef', 'sếp'], ['die Prüfung', 'kỳ thi']),
        mc('“Mit freundlichen Grüßen” dùng khi:', ['kết thúc thư trang trọng', 'mở đầu thư', 'chào hỏi bạn bè', 'tạm biệt thân mật'], 0, 'Kết thư trang trọng.'),
      ],
      teaches: ['werden-bewerbung'],
      review: '- Từ vựng: Universität, Kurs, Prüfung, Bewerbung, Lebenslauf.\n- **werden**: du wirst, er wird.\n- Câu phụ để giải thích lý do.',
    }),
  ],
})
