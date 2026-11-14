import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`b1c07-${id}`, de, vi, o)

export default chapter({
  level: 'B1',
  order: 7,
  title: 'Meinungen und Diskussion',
  titleVi: 'Nêu quan điểm, thảo luận, môi trường và xã hội',
  lessons: [
    lesson({
      id: 'b1-c07-l1',
      title: 'Nêu ý kiến và lập luận',
      goals: ['Nêu ý kiến bằng nhiều cách', 'Đồng ý, phản đối, thỏa hiệp', 'Dùng liên từ nối ý lập luận'],
      intro: 'Ở trình độ B1 bạn không chỉ nói “tôi thích” mà còn phải **nêu quan điểm và bảo vệ nó**. Bạn sẽ học các mẫu câu để **thảo luận lịch sự**.',
      vocab: [
        w('meinung', 'Meinung', 'ý kiến', { art: 'die', pl: 'Meinungen', e: '💬', r: 'mai-nung' }), w('argument', 'Argument', 'lập luận', { art: 'das', pl: 'Argumente', e: '🧩', r: 'ar-gu-ment' }), w('thema', 'Thema', 'chủ đề', { art: 'das', pl: 'Themen', e: '📌', r: 'tê-ma' }), w('zustimmen', 'zustimmen', 'đồng ý', { pos: 'động từ tách + Dativ', e: '👍', r: 'tsu-sờ-ti-mần' }), w('widersprechen', 'widersprechen', 'phản đối', { pos: 'động từ + Dativ', e: '👎', r: 'vi-đơ-spre-khần' }), w('meiner-meinung-nach', 'meiner Meinung nach', 'theo ý kiến tôi', { e: '🗨️', r: 'mai-nơ mai-nung nakh' }), w('einerseits', 'einerseits', 'một mặt', { pos: 'trạng từ', e: '1️⃣', r: 'ai-nơ-zai-ts' }), w('andererseits', 'andererseits', 'mặt khác', { pos: 'trạng từ', e: '2️⃣', r: 'an-đơ-rơ-zai-ts' }), w('deshalb', 'deshalb', 'vì vậy', { pos: 'trạng từ', e: '➡️', r: 'đét-halp' }), w('trotzdem', 'trotzdem', 'dù vậy', { pos: 'trạng từ', e: '↔️', r: 'trốt-đêm' }),
      ],
      grammar: [
        table(['Chức năng', 'Mẫu câu'], ['**Nêu ý kiến**', 'Ich denke / glaube / finde, dass … • Meiner Meinung nach … • Ich bin der Meinung, dass … • Für mich ist es wichtig, dass …'], ['**Đồng ý**', 'Da stimme ich dir zu. • Das sehe ich auch so. • Genau! • Da hast du recht.'], ['**Đồng ý một phần**', 'Einerseits ja, aber andererseits … • Das stimmt, aber … • Ja, aber bedenke, dass …'], ['**Phản đối**', 'Das sehe ich anders. • Da bin ich nicht deiner Meinung. • Ich bin dagegen, weil …'], ['**Hỏi ý kiến**', 'Was denkst du darüber? • Wie siehst du das? • Bist du dafür oder dagegen?']),
        T('**Cấu trúc một lập luận ngắn:** (1) **Ý kiến**, (2) **Lý do (weil …)**, (3) **Ví dụ (zum Beispiel …)**, (4) **Kết luận (deshalb / also …)**.\n*Ich finde, dass man mehr Rad fahren sollte. **Erstens** ist es gesund, **zweitens** schont es die Umwelt. **Zum Beispiel** spart man Geld für Benzin. **Deshalb** bin ich dafür.*'),
        info('**Từ nối ý (Konnektoren):** **erstens, zweitens, außerdem** (ngoài ra), **allerdings** (tuy nhiên), **dagegen** (ngược lại), **trotzdem**, **deshalb**, **also**, **schließlich**. Sau trạng từ nối ở đầu câu, **động từ vẫn ở vị trí 2**.'),
        warn('**zustimmen** và **widersprechen** đi với **Dativ**: *Ich stimme **dir** zu.* *Ich widerspreche **ihm**.*'),
      ],
      examples: [dlg(['Anna', 'Was denkst du über Elektroautos?', 'Bạn nghĩ gì về ô tô điện?'], ['Tom', 'Ich finde, dass sie gut für die Umwelt sind. Allerdings sind sie noch teuer.', 'Tôi thấy chúng tốt cho môi trường. Tuy nhiên chúng vẫn còn đắt.'], ['Anna', 'Da stimme ich dir zu. Aber auf lange Sicht lohnt es sich.', 'Tôi đồng ý. Nhưng về lâu dài thì đáng.'])],
      ex: [
        order('Theo ý kiến tôi, điều này quan trọng', 'Meiner Meinung nach ist das wichtig'),
        order('Tôi nghĩ rằng chúng ta nên đi xe đạp nhiều hơn', 'Ich finde, dass wir mehr Rad fahren sollten'),
        fill('Da stimme ich dir ___. (zustimmen)', 'zu', 'zustimmen: tách.'),
        fill('Das sehe ich ___. (khác)', 'anders', 'Das sehe ich anders = phản đối.'),
        match('Nối.', ['zustimmen', 'đồng ý'], ['widersprechen', 'phản đối'], ['außerdem', 'ngoài ra'], ['trotzdem', 'dù vậy']),
        mc('Sau “Deshalb” ở đầu câu, động từ ở:', ['vị trí 2', 'cuối câu', 'đầu câu', 'sau chủ ngữ'], 0, 'Trạng từ nối: động từ vị trí 2.'),
      ],
      teaches: ['meinung-argument'],
      review: '- Nêu ý kiến: **Ich finde, dass … / Meiner Meinung nach …**\n- Đồng ý: **Da stimme ich dir zu.** • Phản đối: **Das sehe ich anders.**\n- Lập luận: ý kiến → lý do → ví dụ → kết luận.',
    }),
    lesson({
      id: 'b1-c07-l2',
      title: 'Môi trường và xã hội',
      goals: ['Thảo luận chủ đề môi trường', 'Dùng từ vựng xã hội', 'Dùng Genitiv cơ bản'],
      intro: 'Môi trường và xã hội là những chủ đề thảo luận quen thuộc trong thi B1. Bạn cần từ vựng và khả năng **nêu ý kiến**.',
      vocab: [
        w('umwelt', 'Umwelt', 'môi trường', { art: 'die', e: '🌍', r: 'um-vélt' }), w('mull', 'Müll', 'rác', { art: 'der', e: '🗑️', r: 'muýl' }), w('recycling', 'Recycling', 'tái chế', { art: 'das', e: '♻️', r: 'ri-xai-kling' }), w('klima', 'Klima', 'khí hậu', { art: 'das', e: '🌡️', r: 'kli-ma' }), w('energie', 'Energie', 'năng lượng', { art: 'die', e: '⚡', r: 'ê-nờ-gi' }), w('verkehr', 'Verkehr', 'giao thông', { art: 'der', e: '🚦', r: 'phe-kê-ơ' }), w('gesellschaft', 'Gesellschaft', 'xã hội', { art: 'die', e: '👥', r: 'gờ-dél-sa-ft' }), w('zukunft', 'Zukunft', 'tương lai', { art: 'die', e: '🔮', r: 'tsu-kuýnft' }), w('verschmutzung', 'Verschmutzung', 'ô nhiễm', { art: 'die', e: '🏭', r: 'phe-smu-tsung' }),
      ],
      grammar: [
        table(['Genitiv (sở hữu)', 'Ví dụ'], ['**des** + đực/trung (+ -s/-es)', 'die Probleme **des** Verkehr**s**'], ['**der** + cái/số nhiều', 'die Lösung **der** Umweltprobleme'], ['**von + Dativ** (văn nói)', 'die Probleme von dem Verkehr'], ['**wegen + Genitiv** (vì)', 'wegen des schlechten Wetters'], ['**trotz + Genitiv** (bất chấp)', 'trotz des Regens'], ['**während + Genitiv** (trong)', 'während des Urlaubs']),
        info('**Genitiv** diễn đạt **sở hữu**: *das Auto **meines Vaters*** (xe của bố tôi). Trong văn nói thường thay bằng **von + Dativ**: *das Auto **von meinem** Vater*. Ở B1 cần **hiểu** và dùng được cơ bản.'),
        T('**Mẫu câu nêu giải pháp:** *Man sollte weniger Müll produzieren.* • *Jeder kann etwas für die Umwelt tun.* • *Der Staat muss mehr Geld in erneuerbare Energien investieren.*'),
        tip('**Từ hữu ích khi nói về môi trường:** **Mülltrennung** (phân loại rác), **Klimawandel** (biến đổi khí hậu), **erneuerbare Energien** (năng lượng tái tạo), **öffentliche Verkehrsmittel** (giao thông công cộng).'),
      ],
      examples: [dlg(['Anna', 'Was kann jeder für die Umwelt tun?', 'Mỗi người có thể làm gì cho môi trường?'], ['Tom', 'Man sollte den Müll trennen und öfter mit dem Rad fahren.', 'Người ta nên phân loại rác và đi xe đạp thường xuyên hơn.'], ['Anna', 'Außerdem würde ich weniger Plastik benutzen.', 'Ngoài ra tôi sẽ dùng ít nhựa hơn.'])],
      ex: [
        fill('wegen ___ schlechten Wetters (das Wetter, Genitiv)', 'des', 'Genitiv trung: des (+ -s).'),
        fill('trotz ___ Regens (der Regen, Genitiv)', 'des', 'Genitiv đực: des Regens.'),
        order('Người ta nên phân loại rác', 'Man sollte den Müll trennen'),
        match('Nối.', ['die Umwelt', 'môi trường'], ['der Müll', 'rác'], ['das Klima', 'khí hậu'], ['die Energie', 'năng lượng']),
        mc('Genitiv dùng để:', ['chỉ sở hữu', 'chỉ hướng', 'chỉ thời gian quá khứ', 'ra lệnh'], 0, 'Genitiv = sở hữu.'),
      ],
      teaches: ['genitiv-umwelt'],
      review: '- **Genitiv:** des + đực/trung (+s), der + cái/số nhiều; **wegen, trotz, während + Genitiv**.\n- Từ vựng: Umwelt, Müll, Klima, Energie, Verkehr.',
    }),
  ],
})
