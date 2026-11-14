import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c04-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 4,
  title: 'Technik und Internet',
  titleVi: 'Công nghệ, Internet và câu bị động',
  lessons: [
    lesson({
      id: 'b1-c04-l1',
      title: 'Passiv: câu bị động',
      goals: ['Tạo Passiv Präsens và Präteritum', 'Dùng von + Dativ để nêu tác nhân', 'Biết khi nào dùng Passiv'],
      intro: '**Passiv** (bị động) nhấn mạnh **hành động** hoặc **đối tượng chịu tác động**, không nhấn mạnh người làm. Rất phổ biến trong văn bản kỹ thuật, tin tức, hướng dẫn.',
      vocab: [
        w('computer', 'Computer', 'máy tính', { art: 'der', pl: 'Computer', r: 'kôm-piu-tơ' }), w('internet', 'Internet', 'Internet', { art: 'das', r: 'in-tơ-nét' }), w('programm', 'Programm', 'chương trình', { art: 'das', pl: 'Programme', r: 'prô-gram' }), w('datei', 'Datei', 'tệp', { art: 'die', pl: 'Dateien', r: 'đa-tai' }), w('passwort', 'Passwort', 'mật khẩu', { art: 'das', pl: 'Passwörter', r: 'pát-vốt' }), w('herunterladen', 'herunterladen', 'tải xuống', { pos: 'động từ tách', r: 'hê-run-tơ-la-đần' }), w('speichern', 'speichern', 'lưu', { pos: 'động từ', r: 'spai-khơn' }), w('erfinden', 'erfinden', 'phát minh', { pos: 'động từ', r: 'e-phin-đần' }), w('benutzen', 'benutzen', 'sử dụng', { pos: 'động từ', r: 'bờ-nu-tsần' }), w('reparieren', 'reparieren', 'sửa chữa', { pos: 'động từ', r: 're-pa-ri-rần' }),
      ],
      grammar: [
        table(['Thì', 'Cấu trúc', 'Ví dụ'], ['Präsens', '**werden** (chia) + **Partizip II**', 'Das Auto **wird** repariert.'], ['Präteritum', '**wurde** + Partizip II', 'Das Auto **wurde** repariert.'], ['Perfekt', '**ist** + Partizip II + **worden**', 'Das Auto **ist** repariert **worden**.'], ['Với modal', 'modal + Partizip II + **werden**', 'Das Auto **muss** repariert **werden**.']),
        table(['', 'werden (Präsens)', 'werden (Präteritum)'], ['ich', 'werde', 'wurde'], ['du', 'wirst', 'wurdest'], ['er/sie/es', 'wird', 'wurde'], ['wir', 'werden', 'wurden'], ['ihr', 'werdet', 'wurdet'], ['sie/Sie', 'werden', 'wurden']),
        T('**Chuyển chủ động → bị động:**\n- Chủ động: *Der Mechaniker repariert das Auto.* (Thợ máy sửa xe.)\n- Bị động: ***Das Auto** wird **vom Mechaniker** repariert.* Tân ngữ Akkusativ (**das Auto**) trở thành **chủ ngữ**; chủ ngữ cũ thành **von + Dativ** (có thể bỏ nếu không quan trọng).'),
        info('**Bỏ tác nhân** khi không biết hoặc không quan trọng: *Hier **wird** Deutsch **gesprochen**.* (Ở đây người ta nói tiếng Đức.) *Das Passwort **wurde** geändert.*'),
        warn('**werden** trong Passiv ≠ **werden** (trở thành). Chủ động: *Er **wird** Arzt.* Bị động: *Das Haus **wird** gebaut.* Nhìn vào **Partizip II** cuối câu để nhận ra Passiv.'),
        tip('**von** + người/tác nhân (*von dem Lehrer = vom Lehrer*), **durch** + phương tiện (*durch einen Fehler*). Với công cụ: **mit** (*mit einem Hammer*).'),
      ],
      examples: [ex('Das Auto wird repariert.', 'Chiếc xe đang được sửa.'), ex('Die Datei wurde gestern gespeichert.', 'Tệp đã được lưu hôm qua.'), ex('Das Internet wurde in den 1990er Jahren populär.', 'Internet trở nên phổ biến vào những năm 1990.'), ex('Hier muss das Passwort eingegeben werden.', 'Ở đây phải nhập mật khẩu.')],
      ex: [
        fill('Das Auto ___ repariert. (Passiv Präsens)', 'wird', 'er/es → wird.'),
        fill('Die Autos ___ repariert. (số nhiều)', 'werden', 'số nhiều → werden.'),
        fill('Das Haus ___ gebaut. (Präteritum)', 'wurde', 'Präteritum → wurde.'),
        fill('Die Datei wird ___ gespeichert. (bởi tôi)', 'von mir', 'von + Dativ: von mir.', 'von mir'),
        order('Chiếc xe được sửa', 'Das Auto wird repariert'),
        order('Ở đây người ta nói tiếng Đức', 'Hier wird Deutsch gesprochen'),
        mc('Câu nào là Passiv?', ['Das Haus wird gebaut', 'Er wird Arzt', 'Ich werde müde', 'Wir werden Freunde'], 0, 'werden + Partizip II.'),
      ],
      teaches: ['passiv'],
      review: '- **werden + Partizip II** (Präsens), **wurde + Partizip II** (Präteritum), **ist … worden** (Perfekt).\n- Chủ động tân ngữ → chủ ngữ bị động; tác nhân: **von + Dativ**.',
    }),
    lesson({
      id: 'b1-c04-l2',
      title: 'Công nghệ trong đời sống',
      goals: ['Thảo luận ưu điểm, nhược điểm của công nghệ', 'Dùng Passiv trong mô tả quy trình'],
      intro: 'Công nghệ là chủ đề thường gặp ở thi B1. Bạn cần mô tả **một quy trình** (Passiv) và nêu **ý kiến**.',
      vocab: [
        w('vorteil', 'Vorteil', 'ưu điểm', { art: 'der', pl: 'Vorteile', r: 'phô-tai-l' }), w('nachteil', 'Nachteil', 'nhược điểm', { art: 'der', pl: 'Nachteile', r: 'nakh-tai-l' }), w('soziale-medien', 'soziale Medien', 'mạng xã hội', { r: 'dô-tsia-lờ mê-đi-ần' }), w('online', 'online', 'trực tuyến', { pos: 'trạng từ', r: 'on-lai-n' }), w('daten', 'Daten', 'dữ liệu', { pos: 'danh từ số nhiều', r: 'đa-tần' }), w('schutzen', 'schützen', 'bảo vệ', { pos: 'động từ', r: 'suyt-sần' }), w('wichtig', 'wichtig', 'quan trọng', { pos: 'tính từ', r: 'vích-tích' }), w('gefahrlich', 'gefährlich', 'nguy hiểm', { pos: 'tính từ', r: 'gờ-phê-lích' }),
      ],
      grammar: [
        T('**Mô tả quy trình bằng Passiv:**\n*Zuerst **wird** das Programm **heruntergeladen**. Dann **wird** es **installiert**. Danach **muss** ein Passwort **eingegeben werden**. Schließlich **werden** die Daten **gespeichert**.*'),
        table(['Ưu điểm', 'Nhược điểm'], ['Man kann schnell kommunizieren.', 'Man verbringt zu viel Zeit online.'], ['Informationen sind überall verfügbar.', 'Persönliche Daten werden nicht immer geschützt.'], ['Das Arbeiten von zu Hause ist möglich.', 'Viele Menschen sind abhängig vom Handy.']),
        info('**man** (người ta) là đại từ bất định, **dùng thay cho Passiv** khi nói chung: *Man spricht hier Deutsch.* = *Hier wird Deutsch gesprochen.* Động từ chia theo **er/sie/es**.'),
        tip('Cấu trúc nêu ý kiến: **Einerseits … andererseits …** (một mặt … mặt khác …), **Der Vorteil/Nachteil ist, dass …**'),
      ],
      examples: [dlg(['Anna', 'Was ist der Vorteil von sozialen Medien?', 'Ưu điểm của mạng xã hội là gì?'], ['Tom', 'Man kann schnell mit Freunden in Kontakt bleiben. Der Nachteil ist, dass viele Daten gesammelt werden.', 'Người ta có thể nhanh chóng giữ liên lạc với bạn bè. Nhược điểm là nhiều dữ liệu bị thu thập.'])],
      ex: [
        order('Đầu tiên chương trình được tải xuống', 'Zuerst wird das Programm heruntergeladen'),
        fill('Hier ___ man Deutsch. (sprechen)', 'spricht', 'man + er-form: spricht.'),
        fill('Der Nachteil ___, dass Daten gesammelt werden. (sein)', 'ist', 'der Nachteil ist.'),
        match('Nối.', ['der Vorteil', 'ưu điểm'], ['der Nachteil', 'nhược điểm'], ['schützen', 'bảo vệ'], ['speichern', 'lưu']),
        mc('“Einerseits … andererseits …” nghĩa là:', ['một mặt … mặt khác …', 'đầu tiên … sau đó …', 'nếu … thì …', 'tuy … nhưng …'], 0, 'Một mặt … mặt khác.'),
      ],
      review: '- Mô tả quy trình: **Zuerst wird… Dann wird… Danach muss… werden.**\n- **man** + động từ ngôi 3.\n- **Einerseits … andererseits.**',
    }),
  ],
})
