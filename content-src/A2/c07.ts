import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a2c07-${id}`, de, vi, o)

export default chapter({
  level: 'A2',
  order: 7,
  title: 'Urlaub erzählen',
  titleVi: 'Kể về kỳ nghỉ, thời tiết',
  lessons: [
    lesson({
      id: 'a2-c07-l1',
      title: 'Thời tiết và mùa',
      goals: ['Nói về thời tiết', 'Dùng es + động từ thời tiết'],
      intro: 'Nói chuyện thời tiết là cách mở đầu hội thoại phổ biến nhất ở Đức. Chủ ngữ thời tiết luôn là **es**.',
      vocab: [
        w('wetter', 'Wetter', 'thời tiết', { art: 'das', r: 'vé-tơ' }), w('sonne', 'Sonne', 'mặt trời', { art: 'die', r: 'dô-nờ' }), w('regen', 'Regen', 'mưa', { art: 'der', r: 'rê-gần' }), w('schnee', 'Schnee', 'tuyết', { art: 'der', r: 'snê' }), w('wind', 'Wind', 'gió', { art: 'der', r: 'vin-t' }), w('warm', 'warm', 'ấm', { pos: 'tính từ', r: 'vam' }), w('kalt', 'kalt', 'lạnh', { pos: 'tính từ', r: 'kan-t' }), w('heiss', 'heiß', 'nóng', { pos: 'tính từ', r: 'hai-x' }), w('fruhling', 'Frühling', 'mùa xuân', { art: 'der', r: 'phruy-ling' }), w('sommer', 'Sommer', 'mùa hè', { art: 'der', r: 'dô-mơ' }), w('herbst', 'Herbst', 'mùa thu', { art: 'der', r: 'héc-pst' }), w('winter', 'Winter', 'mùa đông', { art: 'der', r: 'vin-tơ' }),
      ],
      grammar: [
        T('**Dạng nói thời tiết (chủ ngữ es):**\n- *Es regnet.* (Trời mưa.) • *Es schneit.* (Có tuyết.) • *Es ist warm / kalt / heiß.* • *Die Sonne scheint.* (Trời nắng.) • *Es ist windig / sonnig / bewölkt.*\n**Hỏi:** *Wie ist das Wetter?* / *Wie warm ist es?*'),
        table(['Mùa', 'Tháng ở Đức'], ['der Frühling', 'März – Mai'], ['der Sommer', 'Juni – August'], ['der Herbst', 'September – November'], ['der Winter', 'Dezember – Februar']),
        info('**Mùa** dùng **im**: *im Sommer*, *im Winter*. **Nhiệt độ**: *Es sind 20 Grad.* (20 độ). Nhiệt độ âm: *minus fünf Grad*.'),
        tip('Chuyển ngữ cảnh: **Wetterbericht** (dự báo thời tiết), **Gewitter** (giông), **Nebel** (sương mù).'),
      ],
      examples: [dlg(['Anna', 'Wie ist das Wetter heute?', 'Hôm nay thời tiết thế nào?'], ['Tom', 'Es regnet, aber es ist nicht kalt.', 'Trời mưa nhưng không lạnh.'], ['Anna', 'Im Sommer ist es hier sehr heiß.', 'Vào mùa hè ở đây rất nóng.'])],
      ex: [
        order('Hôm nay trời mưa', 'Heute regnet es'),
        fill('Im ___ ist es kalt und es schneit. (mùa đông)', 'Winter', 'Winter = mùa đông.'),
        match('Nối.', ['die Sonne', 'mặt trời'], ['der Regen', 'mưa'], ['der Schnee', 'tuyết'], ['der Wind', 'gió']),
        mc('Chủ ngữ của “regnen” luôn là:', ['es', 'ich', 'der Regen', 'sie'], 0, 'Es regnet.'),
      ],
      teaches: ['wetter'],
      review: '- **Es regnet / schneit / ist warm.**\n- **im** Sommer/Winter.\n- *Wie ist das Wetter?*',
    }),
    lesson({
      id: 'a2-c07-l2',
      title: 'Kể về kỳ nghỉ đã qua',
      goals: ['Kể lại bằng Perfekt', 'Dùng trạng từ thời gian: zuerst, dann, danach, am Ende'],
      intro: 'Khi kể chuyện, bạn nối các sự kiện bằng **trạng từ thứ tự**. Kết hợp với Perfekt và Präteritum (war/hatte) bạn kể được một kỳ nghỉ hoàn chỉnh.',
      vocab: [
        w('zuerst', 'zuerst', 'đầu tiên', { pos: 'trạng từ', r: 'tsu-e-st' }), w('dann', 'dann', 'sau đó', { pos: 'trạng từ', r: 'đan' }), w('danach', 'danach', 'sau đó', { pos: 'trạng từ', r: 'đa-nakh' }), w('spater', 'später', 'muộn hơn', { pos: 'trạng từ', r: 'spê-tơ' }), w('schliesslich', 'schließlich', 'cuối cùng', { pos: 'trạng từ', r: 'slis-lích' }), w('strand', 'Strand', 'bãi biển', { art: 'der', pl: 'Strände', r: 'sờ-trant' }), w('berge', 'Berge', 'núi', { pos: 'danh từ số nhiều', r: 'béc-gờ' }), w('meer', 'Meer', 'biển', { art: 'das', pl: 'Meere', r: 'mê-ơ' }), w('sehenswurdigkeit', 'Sehenswürdigkeit', 'danh lam', { art: 'die', pl: 'Sehenswürdigkeiten', r: 'dê-ần-vuy-đích-kai-t' }),
      ],
      grammar: [
        T('**Mẫu kể chuyện:**\n*Letzten Sommer **war** ich in Italien. **Zuerst** **sind** wir nach Rom **gefahren**. **Dann** **haben** wir die Stadt **besichtigt**. **Danach** **sind** wir ans Meer **gegangen**. Das Wetter **war** super! **Schließlich** **sind** wir nach Hause **geflogen**.*'),
        info('**Trạng từ ở đầu câu** → động từ chia vẫn ở **vị trí 2**, chủ ngữ ra sau: *Dann **haben** **wir** …*. Đây là **đảo ngữ** (Inversion), cực kỳ phổ biến.'),
        table(['Trạng từ', 'Nghĩa'], ['zuerst / zunächst', 'đầu tiên'], ['dann / danach', 'sau đó'], ['später', 'muộn hơn'], ['schließlich / zum Schluss', 'cuối cùng'], ['am Anfang / am Ende', 'lúc đầu / lúc cuối']),
        tip('Dùng **war** (sein) và **hatte** (haben) cho trạng thái và mô tả, **Perfekt** cho các hành động liên tiếp.'),
      ],
      examples: [dlg(['Anna', 'Wo warst du im Urlaub?', 'Bạn đã đi nghỉ ở đâu?'], ['Tom', 'Ich war in Spanien. Zuerst bin ich nach Barcelona geflogen.', 'Tôi ở Tây Ban Nha. Đầu tiên tôi bay đến Barcelona.'], ['Anna', 'Und was hast du dort gemacht?', 'Và bạn làm gì ở đó?'], ['Tom', 'Danach habe ich die Stadt besichtigt und am Strand gelegen.', 'Sau đó tôi tham quan thành phố và nằm trên bãi biển.'])],
      ex: [
        order('Đầu tiên chúng tôi đã đến Rom', 'Zuerst sind wir nach Rom gefahren'),
        order('Sau đó chúng tôi đã tham quan thành phố', 'Danach haben wir die Stadt besichtigt'),
        fill('Das Wetter ___ super. (sein, Präteritum)', 'war', 'sein → war.'),
        fill('Wir ___ am Strand gelegen. (haben, Perfekt)', 'haben', 'liegen (Perfekt) → haben.'),
        mc('“schließlich” nghĩa là:', ['cuối cùng', 'đầu tiên', 'sau đó', 'bây giờ'], 0, 'schließlich = cuối cùng.'),
      ],
      teaches: ['erzaehlen-reihenfolge'],
      review: '- **zuerst → dann/danach → später → schließlich.**\n- Đảo ngữ: động từ vị trí 2.\n- war/hatte cho mô tả; Perfekt cho hành động.',
    }),
  ],
})
