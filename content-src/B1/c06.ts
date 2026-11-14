import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c06-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 6,
  title: 'Bildung und Beruf',
  titleVi: 'Giáo dục, nghề nghiệp và câu phức',
  lessons: [
    lesson({
      id: 'b1-c06-l1',
      title: 'Nebensätze: obwohl, damit, falls, sodass',
      goals: ['Dùng 4 liên từ phụ nâng cao', 'Phân biệt damit và um … zu'],
      intro: 'Câu phức giúp bạn diễn đạt **ý kiến, mục đích, điều kiện, hệ quả** một cách chính xác. Tất cả đều là **liên từ phụ**: động từ chia ở **cuối câu phụ**.',
      vocab: [
        w('obwohl', 'obwohl', 'mặc dù', { pos: 'liên từ phụ', e: '↔️', r: 'óp-vôl' }), w('damit', 'damit', 'để (mục đích)', { pos: 'liên từ phụ', e: '🎯', r: 'đa-mít' }), w('falls', 'falls', 'phòng khi, nếu', { pos: 'liên từ phụ', e: '☔', r: 'phan-ls' }), w('sodass', 'sodass', 'đến nỗi, vì vậy', { pos: 'liên từ phụ', e: '➡️', r: 'dô-đát' }), w('ausbildung', 'Ausbildung', 'đào tạo nghề', { art: 'die', pl: 'Ausbildungen', e: '🛠️', r: 'ao-s-bil-đung' }), w('abschluss', 'Abschluss', 'bằng, kết thúc', { art: 'der', pl: 'Abschlüsse', e: '🎓', r: 'ap-slu-x' }), w('weiterbildung', 'Weiterbildung', 'bồi dưỡng thêm', { art: 'die', e: '📈', r: 'vai-tơ-bil-đung' }),
      ],
      grammar: [
        table(['Liên từ', 'Nghĩa', 'Ví dụ'], ['**obwohl**', 'mặc dù (đối lập)', 'Ich gehe zur Arbeit, **obwohl** ich krank **bin**.'], ['**damit**', 'để (mục đích, **hai chủ ngữ khác nhau** hoặc giống)', 'Ich erkläre es dir, **damit** du es **verstehst**.'], ['**falls**', 'phòng khi, trong trường hợp', 'Ruf mich an, **falls** du Hilfe **brauchst**.'], ['**sodass**', 'đến nỗi, nên', 'Es regnete stark, **sodass** wir zu Hause **blieben**.']),
        warn('**damit** hay **um … zu**? Nếu **chủ ngữ hai vế giống nhau** → thường dùng **um … zu**: *Ich lerne, **um** Arzt **zu werden**.* Nếu **chủ ngữ khác nhau** → dùng **damit**: *Ich spreche langsam, **damit** du mich **verstehst**.*'),
        info('**obwohl** (mặc dù) cho thấy **đối lập bất ngờ**; **weil** cho **lý do**. So sánh: *Ich bleibe zu Hause, **weil** ich krank bin.* (vì ốm) / *Ich gehe arbeiten, **obwohl** ich krank bin.* (dù ốm).'),
        tip('**Từ đối lập (trạng từ):** **trotzdem** (dù vậy), **deshalb / deswegen** (vì vậy), **außerdem** (ngoài ra), **dagegen** (ngược lại). Sau chúng, động từ ở **vị trí 2**: *Er war krank. **Trotzdem ging** er zur Arbeit.*'),
      ],
      examples: [ex('Ich gehe zur Arbeit, obwohl ich krank bin.', 'Tôi đi làm dù bị ốm.'), ex('Ich spreche langsam, damit du mich verstehst.', 'Tôi nói chậm để bạn hiểu tôi.'), ex('Ruf mich an, falls du Hilfe brauchst.', 'Hãy gọi tôi phòng khi bạn cần giúp.'), ex('Er war krank. Trotzdem ging er zur Arbeit.', 'Anh ấy ốm. Dù vậy anh ấy vẫn đi làm.')],
      ex: [
        fill('Ich gehe zur Arbeit, ___ ich krank bin. (mặc dù)', 'obwohl', 'obwohl = mặc dù.'),
        fill('Ich erkläre es dir, ___ du es verstehst. (để)', 'damit', 'damit = để.'),
        fill('Ruf mich an, ___ du Hilfe brauchst. (phòng khi)', 'falls', 'falls.'),
        fill('Ich lerne, ___ Arzt zu werden. (um…zu)', 'um', 'cùng chủ ngữ → um…zu.'),
        order('Mặc dù tôi mệt, tôi vẫn học', 'Obwohl ich müde bin, lerne ich'),
        mc('Câu nào đúng?', ['Ich spreche langsam, damit du mich verstehst', 'Ich spreche langsam, um du mich zu verstehen', 'Ich spreche langsam damit du verstehst mich', 'Ich spreche langsam, damit du verstehst mich'], 0, 'damit + động từ cuối.'),
      ],
      teaches: ['nebensaetze-erweitert'],
      review: '- **obwohl** (mặc dù), **damit** (để), **falls** (phòng khi), **sodass** (nên).\n- Cùng chủ ngữ → **um … zu**; khác chủ ngữ → **damit**.\n- **trotzdem, deshalb** → động từ vị trí 2.',
    }),
    lesson({
      id: 'b1-c06-l2',
      title: 'Học tập, nghề nghiệp và kế hoạch tương lai',
      goals: ['Nói về hệ thống giáo dục và nghề nghiệp', 'Dùng Futur I với werden', 'Nói về kế hoạch'],
      intro: 'Đây là chủ đề trọng tâm trong thi B1. Bạn sẽ nói về **học tập, công việc và kế hoạch**.',
      vocab: [
        w('schule', 'Schule', 'trường học', { art: 'die', pl: 'Schulen', e: '🏫', r: 'su-lờ' }), w('ausbilder', 'Ausbilder', 'người hướng dẫn nghề', { art: 'der', e: '👷', r: 'ao-s-bil-đơ' }), w('praktikum', 'Praktikum', 'kỳ thực tập', { art: 'das', pl: 'Praktika', e: '🧑‍💼', r: 'prắc-ti-kum' }), w('zukunft', 'Zukunft', 'tương lai', { art: 'die', e: '🔮', r: 'tsu-kuýnft' }), w('plan', 'Plan', 'kế hoạch', { art: 'der', pl: 'Pläne', e: '🗺️', r: 'plan' }), w('ziel', 'Ziel', 'mục tiêu', { art: 'das', pl: 'Ziele', e: '🎯', r: 'tsi-l' }), w('hoffen', 'hoffen', 'hy vọng', { pos: 'động từ', e: '🤞', r: 'hô-phần' }), w('planen', 'planen', 'lên kế hoạch', { pos: 'động từ', e: '📝', r: 'pla-nần' }),
      ],
      grammar: [
        table(['', 'werden + nguyên mẫu (Futur I)'], ['ich', 'werde machen'], ['du', 'wirst machen'], ['er/sie/es', 'wird machen'], ['wir', 'werden machen'], ['ihr', 'werdet machen'], ['sie/Sie', 'werden machen']),
        info('**Futur I** dùng cho **dự đoán, ý định mạnh, lời hứa**. Nhưng người Đức thường dùng **Präsens + trạng từ tương lai** thay thế: *Ich fahre **morgen** nach Berlin.* (thay vì *Ich werde … fahren.*).'),
        T('**Nói về kế hoạch:**\n- *Ich habe vor, …zu …* (Tôi dự định …)\n- *Ich möchte … werden.* (Tôi muốn trở thành …)\n- *Nächstes Jahr werde ich eine Ausbildung anfangen.*\n- *Ich hoffe, dass ich die Prüfung bestehe.*'),
        warn('**hoffen, dass** + câu phụ: *Ich hoffe, dass es klappt.* Hoặc **hoffen + zu**: *Ich hoffe, die Prüfung zu bestehen.* (cùng chủ ngữ).'),
      ],
      examples: [dlg(['Berater', 'Was haben Sie nach der Schule vor?', 'Sau khi học xong bạn dự định làm gì?'], ['Schüler', 'Ich werde eine Ausbildung als Mechaniker machen, weil ich gern mit den Händen arbeite.', 'Tôi sẽ học nghề thợ máy vì tôi thích làm việc bằng tay.'], ['Berater', 'Und später?', 'Còn sau này?'], ['Schüler', 'Ich hoffe, dass ich später eine eigene Werkstatt eröffnen kann.', 'Tôi hy vọng sau này có thể mở xưởng riêng.'])],
      ex: [
        fill('Ich ___ nächstes Jahr studieren. (werden)', 'werde', 'ich werde.'),
        fill('Er ___ Arzt werden. (wollen, Präsens)', 'will', 'er will.'),
        order('Tôi hy vọng rằng tôi đỗ kỳ thi', 'Ich hoffe, dass ich die Prüfung bestehe'),
        order('Tôi dự định học nghề', 'Ich habe vor, eine Ausbildung zu machen'),
        mc('Futur I tạo bằng:', ['werden + nguyên mẫu', 'sein + Partizip II', 'haben + Partizip II', 'würde + Partizip II'], 0, 'werden + nguyên mẫu.'),
      ],
      teaches: ['futur1'],
      review: '- **werden + nguyên mẫu** = Futur I; thường thay bằng Präsens + trạng từ tương lai.\n- *Ich habe vor, … zu …* / *Ich hoffe, dass …*',
    }),
  ],
})
