import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn, art } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c05-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 5,
  title: 'Berufe',
  titleVi: 'Nghề nghiệp',
  lessons: [
    lesson({
      id: 'a1-c05-l1',
      title: 'Các nghề nghiệp phổ biến',
      goals: ['Gọi tên 10 nghề', 'Dùng đuôi -in cho nữ', 'Nói “Tôi là…” và “Tôi làm việc ở…”'],
      intro: 'Nói nghề nghiệp bằng cấu trúc: **Ich bin + nghề** (không có mạo từ). Danh từ nghề có **dạng nam** và **dạng nữ**: thêm **-in** cho nữ.',
      vocab: [
        w('lehrer', 'Lehrer', 'giáo viên (nam)', { art: 'der', pl: 'Lehrer', r: 'lê-rơ' }), w('lehrerin', 'Lehrerin', 'giáo viên (nữ)', { art: 'die', pl: 'Lehrerinnen', r: 'lê-rơ-rin' }), w('arzt', 'Arzt', 'bác sĩ (nam)', { art: 'der', pl: 'Ärzte', r: 'a-tst' }), w('arztin', 'Ärztin', 'bác sĩ (nữ)', { art: 'die', pl: 'Ärztinnen', r: 'e-tstin' }), w('student', 'Student', 'sinh viên (nam)', { art: 'der', pl: 'Studenten', r: 'sờ-tu-đent' }), w('studentin', 'Studentin', 'sinh viên (nữ)', { art: 'die', pl: 'Studentinnen', r: 'sờ-tu-đen-tin' }), w('koch', 'Koch', 'đầu bếp (nam)', { art: 'der', pl: 'Köche', r: 'kôkh' }), w('kochin', 'Köchin', 'đầu bếp (nữ)', { art: 'die', pl: 'Köchinnen', r: 'kơ-khin' }), w('ingenieur', 'Ingenieur', 'kỹ sư', { art: 'der', pl: 'Ingenieure', r: 'in-gie-niơ' }), w('verkaufer', 'Verkäufer', 'nhân viên bán hàng', { art: 'der', pl: 'Verkäufer', r: 'phe-koi-phơ' }),
      ],
      grammar: [
        T('**Cấu trúc:** *Ich bin Lehrer.* / *Sie ist Ärztin.* (không có mạo từ trước nghề).\n**Hỏi:** *Was bist du von Beruf?* hoặc *Was machst du beruflich?* (Bạn làm nghề gì?)'),
        table(['Nam', 'Nữ'], ['der Lehrer', 'die Lehrerin'], ['der Student', 'die Studentin'], ['der Arzt', 'die Ärztin (thêm umlaut)'], ['der Koch', 'die Köchin (thêm umlaut)'], ['der Ingenieur', 'die Ingenieurin']),
        info('**Dạng nữ** = dạng nam + **-in** (số nhiều **-innen**). Một số từ đổi nguyên âm thành umlaut: Arzt → Ärztin, Koch → Köchin.'),
        warn('Khi có **tính từ** đi kèm, mạo từ **xuất hiện**: *Er ist **ein** guter Lehrer.* Không có tính từ thì bỏ: *Er ist Lehrer.*'),
      ],
      examples: [dlg(['Tom', 'Was bist du von Beruf?', 'Bạn làm nghề gì?'], ['Linh', 'Ich bin Studentin.', 'Tôi là sinh viên.'], ['Tom', 'Ich bin Ingenieur.', 'Tôi là kỹ sư.'])],
      ex: [
        match('Nối nam với nữ.', ['Lehrer', 'Lehrerin'], ['Arzt', 'Ärztin'], ['Koch', 'Köchin'], ['Student', 'Studentin']),
        fill('Sie ist ___. (bác sĩ, nữ)', 'Ärztin', 'Arzt → Ärztin.'),
        order('Tôi là giáo viên', 'Ich bin Lehrer'),
        order('Bạn làm nghề gì?', 'Was bist du von Beruf?'),
      ],
      teaches: ['berufe-in'],
      review: '- **Ich bin + nghề** (không mạo từ).\n- Nữ = nam + **-in**; có khi thêm umlaut.\n- Hỏi: *Was bist du von Beruf?*',
    }),
    lesson({
      id: 'a1-c05-l2',
      title: 'Nơi làm việc và công việc',
      goals: ['Nói nơi làm việc', 'Dùng arbeiten, als, bei'],
      intro: 'Nơi làm việc nói bằng **arbeiten** (làm việc) kèm giới từ **bei** (ở công ty), **in** (ở trong), **als** (với vai trò).',
      vocab: [
        w('arbeiten', 'arbeiten', 'làm việc', { pos: 'động từ', r: 'ar-bai-tần' }), w('firma', 'Firma', 'công ty', { art: 'die', pl: 'Firmen', r: 'phiếc-ma' }), w('buro', 'Büro', 'văn phòng', { art: 'das', pl: 'Büros', r: 'buy-rô' }), w('krankenhaus', 'Krankenhaus', 'bệnh viện', { art: 'das', pl: 'Krankenhäuser', r: 'krang-kần-hao-x' }), w('restaurant', 'Restaurant', 'nhà hàng', { art: 'das', pl: 'Restaurants', r: 'rét-to-rang' }), w('arbeitslos', 'arbeitslos', 'thất nghiệp', { pos: 'tính từ', r: 'ar-bai-ts-lô-x' }),
      ],
      grammar: [
        T('**Cấu trúc:**\n- *Ich arbeite als Koch.* (Tôi làm việc với vai trò đầu bếp)\n- *Ich arbeite bei Siemens.* (Tôi làm ở công ty Siemens)\n- *Ich arbeite im Krankenhaus.* (Tôi làm ở bệnh viện)'),
        table(['', 'arbeiten'], ['ich', 'arbeite'], ['du', 'arbeitest'], ['er/sie/es', 'arbeitet'], ['wir', 'arbeiten'], ['ihr', 'arbeitet'], ['sie/Sie', 'arbeiten']),
        info('**Động từ có gốc kết thúc bằng -t hoặc -d** (arbeiten, arbeit-, warten, finden) thêm **e** trước đuôi -st/-t cho dễ đọc: du arbeit**e**st, er arbeit**e**t.'),
        tip('**im** = **in dem**: im Krankenhaus (ở bệnh viện), im Büro (ở văn phòng). Bạn sẽ học Dativ kỹ hơn ở A2.'),
      ],
      examples: [dlg(['Anna', 'Wo arbeitest du?', 'Bạn làm việc ở đâu?'], ['Tom', 'Ich arbeite bei einer Firma. Ich bin Ingenieur.', 'Tôi làm ở một công ty. Tôi là kỹ sư.'])],
      ex: [
        fill('Du ___ im Büro. (arbeiten)', 'arbeitest', 'gốc -t → thêm e: arbeitest.'),
        fill('Er ___ als Koch. (arbeiten)', 'arbeitet', 'er → arbeitet.'),
        order('Tôi làm việc ở bệnh viện', 'Ich arbeite im Krankenhaus'),
        mc('“Wo arbeitest du?” hỏi gì?', ['Bạn làm việc ở đâu?', 'Bạn làm nghề gì?', 'Bạn bao nhiêu tuổi?', 'Bạn sống ở đâu?'], 0, 'Wo = ở đâu.'),
      ],
      review: '- **arbeiten** chia thêm **e** (du arbeitest, er arbeitet).\n- **als** + nghề; **bei** + công ty; **im** + nơi.',
    }),
  ],
})
