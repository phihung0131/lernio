import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c05-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 5,
  title: 'Ratschläge und Wünsche',
  titleVi: 'Lời khuyên, ước muốn và Konjunktiv II',
  lessons: [
    lesson({
      id: 'b1-c05-l1',
      title: 'Konjunktiv II: lịch sự, ước muốn, giả định',
      goals: ['Tạo Konjunktiv II với würde + nguyên mẫu', 'Dùng dạng đặc biệt: wäre, hätte, könnte, müsste', 'Đưa lời khuyên và nói điều ước'],
      intro: '**Konjunktiv II** dùng để nói điều **không có thật, ước muốn, giả định, lời khuyên và yêu cầu lịch sự**. Bạn đã gặp rồi: **ich möchte** chính là Konjunktiv II của *mögen*!',
      vocab: [
        w('wunsch', 'Wunsch', 'điều ước', { art: 'der', pl: 'Wünsche', e: '🌠', r: 'vun-s' }), w('ratschlag', 'Ratschlag', 'lời khuyên', { art: 'der', pl: 'Ratschläge', e: '💡', r: 'rát-sláck' }), w('vielleicht', 'vielleicht', 'có lẽ', { pos: 'trạng từ', e: '🤷', r: 'phi-lai-sht' }), w('eigentlich', 'eigentlich', 'thực ra', { pos: 'trạng từ', e: '🤔', r: 'ai-gần-t-lích' }), w('traum', 'Traum', 'giấc mơ', { art: 'der', pl: 'Träume', e: '💭', r: 'trao-m' }), w('raten', 'raten', 'khuyên', { pos: 'động từ + Dativ', e: '🗣️', r: 'ra-tần' }),
      ],
      grammar: [
        table(['Nguyên mẫu', 'Konjunktiv II', 'Nghĩa'], ['sein', 'ich **wäre**, du wärst, er wäre, wir wären', 'sẽ là'], ['haben', 'ich **hätte**, du hättest, er hätte', 'sẽ có'], ['können', 'ich **könnte**, du könntest', 'có thể'], ['müssen', 'ich **müsste**', 'sẽ phải'], ['dürfen', 'ich **dürfte**', 'được phép'], ['wollen', 'ich **wollte**', 'muốn'], ['werden', 'ich **würde**, du würdest, er würde, wir würden', 'sẽ']),
        T('**Cách dễ nhất:** **würde + nguyên mẫu** cho hầu hết động từ: *Ich **würde** gern reisen.* (Tôi muốn đi du lịch), *Ich **würde** an deiner Stelle zum Arzt **gehen**.* (Nếu là bạn, tôi sẽ đi khám bác sĩ.)'),
        table(['Mục đích', 'Mẫu câu'], ['**Yêu cầu lịch sự**', 'Könnten Sie mir bitte helfen? • Würden Sie bitte das Fenster schließen?'], ['**Lời khuyên**', 'Du solltest mehr schlafen. • An deiner Stelle würde ich …'], ['**Ước muốn**', 'Ich hätte gern einen Kaffee. • Ich wäre gern reich.'], ['**Giả định không thật (hiện tại)**', 'Wenn ich Zeit hätte, würde ich reisen.'], ['**Ước (tiếc nuối)**', 'Wenn ich nur mehr Zeit hätte! • Hätte ich doch …!']),
        info('**Câu điều kiện không thật:** *Wenn ich Zeit **hätte**, **würde** ich ins Kino **gehen**.* (Nếu có thời gian, tôi sẽ đi xem phim; nhưng thực tế tôi không có). Vế **wenn**: Konjunktiv II; vế chính: **würde + nguyên mẫu** hoặc dạng riêng.'),
        warn('Với **sein, haben, modal** dùng **dạng riêng** (wäre, hätte, könnte, müsste), không nói *würde sein*. Còn lại dùng **würde + nguyên mẫu**.'),
        tip('**hätte gern** / **möchte** rất tự nhiên khi gọi món và mua hàng: *Ich hätte gern ein Glas Wasser.*'),
      ],
      examples: [ex('Könnten Sie mir bitte helfen?', 'Bạn có thể giúp tôi được không ạ?'), ex('Ich würde gern nach Deutschland reisen.', 'Tôi muốn đi Đức.'), ex('Wenn ich Zeit hätte, würde ich mehr lesen.', 'Nếu tôi có thời gian, tôi sẽ đọc nhiều hơn.'), ex('An deiner Stelle würde ich mit ihm sprechen.', 'Nếu là bạn, tôi sẽ nói chuyện với anh ấy.')],
      ex: [
        fill('Wenn ich Zeit ___, würde ich reisen. (haben)', 'hätte', 'haben → hätte.'),
        fill('Wenn ich reich ___, würde ich ein Haus kaufen. (sein)', 'wäre', 'sein → wäre.'),
        fill('___ Sie mir bitte helfen? (können, lịch sự)', 'Könnten', 'Könnten Sie…'),
        fill('Ich ___ gern nach Berlin fahren. (werden)', 'würde', 'würde + nguyên mẫu.'),
        fill('Du ___ mehr schlafen. (sollen, khuyên)', 'solltest', 'du solltest.'),
        order('Nếu tôi có thời gian, tôi sẽ đi du lịch', 'Wenn ich Zeit hätte, würde ich reisen'),
        order('Cho tôi một cà phê (lịch sự)', 'Ich hätte gern einen Kaffee'),
        mc('Konjunktiv II dùng để:', ['ước muốn, giả định, lịch sự', 'kể chuyện quá khứ', 'ra lệnh', 'nói tương lai chắc chắn'], 0, 'Ước muốn, giả định, lịch sự.'),
      ],
      teaches: ['konjunktiv2'],
      review: '- **wäre, hätte, könnte, müsste** (dạng riêng); các động từ khác **würde + nguyên mẫu**.\n- **Wenn ich … hätte, würde ich …** (giả định).\n- Lịch sự: **Könnten Sie…? Ich hätte gern…**',
    }),
    lesson({
      id: 'b1-c05-l2',
      title: 'Cho lời khuyên và đưa ra gợi ý',
      goals: ['Dùng sollte, an deiner Stelle, Ich schlage vor', 'Viết một lời khuyên ngắn cho bạn bè'],
      intro: 'Khuyên ai đó một cách **nhẹ nhàng, không ra lệnh** là kỹ năng quan trọng. Konjunktiv II giúp bạn làm điều đó.',
      vocab: [
        w('empfehlen', 'empfehlen', 'giới thiệu, khuyên', { pos: 'động từ', e: '👍', r: 'em-pha-lần' }), w('vorschlagen', 'vorschlagen', 'đề nghị', { pos: 'động từ tách', e: '💬', r: 'phô-sla-gần' }), w('stelle', 'Stelle', 'vị trí, chỗ', { art: 'die', pl: 'Stellen', e: '📍', r: 'sờ-té-lờ' }), w('lieber', 'lieber', 'thà … hơn', { pos: 'trạng từ', e: '❤️', r: 'li-bơ' }), w('besser', 'besser', 'tốt hơn', { pos: 'trạng từ', e: '👌', r: 'bé-xơ' }),
      ],
      grammar: [
        table(['Cách khuyên', 'Ví dụ'], ['**Du solltest** + nguyên mẫu', 'Du solltest mehr Wasser trinken.'], ['**An deiner Stelle würde ich** + nguyên mẫu', 'An deiner Stelle würde ich zum Arzt gehen.'], ['**Ich würde dir raten,** zu + nguyên mẫu', 'Ich würde dir raten, früher ins Bett zu gehen.'], ['**Warum + nicht** …?', 'Warum fragst du ihn nicht?'], ['**Vielleicht + solltest du** …', 'Vielleicht solltest du ihn anrufen.'], ['**Ich schlage vor, dass** …', 'Ich schlage vor, dass wir uns morgen treffen.']),
        info('**sollte** (Konjunktiv II của sollen) = nên: *Du solltest …* là cách khuyên **mềm nhất**, dễ nghe hơn *Du musst …* (bắt buộc).'),
        tip('Hãy kết hợp với **vielleicht**, **eigentlich**, **mal** để nghe tự nhiên: *Du könntest ihn **mal** anrufen.* (Bạn thử gọi cho anh ấy xem).'),
      ],
      examples: [dlg(['Anna', 'Ich bin immer müde. Was soll ich tun?', 'Tôi lúc nào cũng mệt. Tôi nên làm gì?'], ['Tom', 'Du solltest früher ins Bett gehen. An deiner Stelle würde ich auch weniger Kaffee trinken.', 'Bạn nên đi ngủ sớm hơn. Nếu là bạn tôi cũng uống ít cà phê hơn.'], ['Anna', 'Gute Idee! Vielleicht mache ich auch mehr Sport.', 'Ý hay! Có lẽ tôi cũng tập thể thao nhiều hơn.'])],
      ex: [
        order('Bạn nên đi ngủ sớm hơn', 'Du solltest früher ins Bett gehen'),
        order('Nếu là bạn, tôi sẽ đi khám bác sĩ', 'An deiner Stelle würde ich zum Arzt gehen'),
        fill('Vielleicht ___ du ihn anrufen. (können, Konjunktiv II)', 'könntest', 'du könntest.'),
        fill('Du ___ mehr Obst essen. (sollen, Konjunktiv II)', 'solltest', 'du solltest.'),
        mc('Cách khuyên nhẹ nhàng nhất:', ['Du solltest …', 'Du musst …', 'Mach das!', 'Du darfst nicht …'], 0, 'Du solltest = nên.'),
      ],
      auto: false,
      review: '- **Du solltest … / An deiner Stelle würde ich … / Ich würde dir raten, … zu …**\n- Khuyên nhẹ bằng Konjunktiv II.',
    }),
  ],
})
