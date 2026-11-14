import { chapter, art, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c08-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 8,
  title: 'Essen und Trinken',
  titleVi: 'Ăn uống',
  lessons: [
    lesson({
      id: 'a1-c08-l1',
      title: 'Đồ ăn thức uống',
      goals: ['Gọi tên 14 món', 'Gọi món trong nhà hàng', 'Dùng möchten'],
      intro: 'Khi gọi món, người Đức dùng **ich möchte** (tôi muốn, lịch sự) thay vì “ich will” (nghe hơi cộc).',
      vocab: [
        w('brot', 'Brot', 'bánh mì', { art: 'das', pl: 'Brote', e: '🍞', r: 'brôt' }), w('brotchen', 'Brötchen', 'bánh mì nhỏ', { art: 'das', pl: 'Brötchen', e: '🥖', r: 'brơ-t-khần' }), w('kase', 'Käse', 'pho mát', { art: 'der', e: '🧀', r: 'kê-dờ' }), w('apfel', 'Apfel', 'quả táo', { art: 'der', pl: 'Äpfel', e: '🍎', r: 'áp-phồl' }), w('reis', 'Reis', 'cơm, gạo', { art: 'der', e: '🍚', r: 'rai-x' }), w('fleisch', 'Fleisch', 'thịt', { art: 'das', e: '🥩', r: 'phlai-s' }), w('fisch', 'Fisch', 'cá', { art: 'der', pl: 'Fische', e: '🐟', r: 'phi-s' }), w('gemuse', 'Gemüse', 'rau', { art: 'das', e: '🥦', r: 'gờ-muy-dờ' }), w('wasser', 'Wasser', 'nước', { art: 'das', e: '💧', r: 'va-xơ' }), w('milch', 'Milch', 'sữa', { art: 'die', e: '🥛', r: 'mil-ch' }), w('kaffee', 'Kaffee', 'cà phê', { art: 'der', e: '☕', r: 'ka-phê' }), w('tee', 'Tee', 'trà', { art: 'der', e: '🍵', r: 'tê' }), w('bier', 'Bier', 'bia', { art: 'das', e: '🍺', r: 'bi-ơ' }), w('saft', 'Saft', 'nước ép', { art: 'der', e: '🧃', r: 'daft' }),
      ],
      grammar: [
        table(['möchten', ''], ['ich möchte', 'wir möchten'], ['du möchtest', 'ihr möchtet'], ['er/sie/es möchte', 'sie/Sie möchten']),
        T('**Gọi món:** *Ich möchte einen Kaffee, bitte.* / *Ich möchte ein Brötchen.* **Hỏi giá:** *Was kostet das?*'),
        info('Sau **möchten**, thứ bạn muốn đứng ở **Akkusativ**: der Kaffee → **einen** Kaffee (đực đổi), die Milch → **eine** Milch, das Brot → **ein** Brot. Quy tắc Akkusativ đã học ở chapter Familie.'),
        warn('Với **đồ uống không đếm được** (Wasser, Milch, Kaffee) bạn thường nói không mạo từ hoặc dùng đơn vị: *ein Glas Wasser* (một ly nước), *eine Tasse Kaffee* (một tách cà phê).'),
        tip('Nếu bạn là người ăn chay: **Ich esse kein Fleisch.** (Tôi không ăn thịt.) rất hữu ích ở nhà hàng.'),
      ],
      examples: [dlg(['Kellner', 'Guten Tag! Was möchten Sie?', 'Chào! Bạn muốn dùng gì?'], ['Gast', 'Ich möchte einen Kaffee und ein Brötchen, bitte.', 'Cho tôi một cà phê và một bánh mì nhỏ.'], ['Kellner', 'Gern. Sonst noch etwas?', 'Vâng. Còn gì nữa không?'], ['Gast', 'Nein, danke. Das ist alles.', 'Không, cảm ơn. Vậy thôi.'])],
      ex: [
        fill('Ich möchte ___ Kaffee. (đực Akkusativ)', 'einen', 'der Kaffee → einen Kaffee.'),
        fill('Ich möchte ___ Milch.', 'eine', 'die Milch → eine Milch.'),
        fill('Ich möchte ___ Brot.', 'ein', 'das Brot → ein Brot.'),
        order('Cho tôi một ly nước', 'Ich möchte ein Glas Wasser'),
        order('Tôi không ăn thịt', 'Ich esse kein Fleisch'),
        match('Ghép đồ ăn.', ['Käse', 'pho mát'], ['Reis', 'cơm'], ['Fisch', 'cá'], ['Gemüse', 'rau']),
      ],
      teaches: ['moechten', 'akkusativ-essen'],
      review: '- **Ich möchte + Akkusativ** (einen/eine/ein).\n- **Was kostet das?** hỏi giá.\n- **kein** để phủ định danh từ.',
    }),
    lesson({
      id: 'a1-c08-l2',
      title: 'Mögen, gern và bữa ăn',
      goals: ['Nói thích/không thích', 'Dùng gern, lieber, am liebsten', 'Gọi tên các bữa ăn'],
      intro: 'Nói bạn thích gì bằng **mögen** (thích) hoặc bằng trạng từ **gern** (thích làm gì).',
      vocab: [
        w('fruhstuck', 'Frühstück', 'bữa sáng', { art: 'das', e: '🥐', r: 'phruy-stuýc' }), w('mittagessen', 'Mittagessen', 'bữa trưa', { art: 'das', e: '🍛', r: 'mi-tak-ét-xần' }), w('abendessen', 'Abendessen', 'bữa tối', { art: 'das', e: '🍲', r: 'a-bần-t-ét-xần' }), w('mogen', 'mögen', 'thích', { pos: 'động từ', e: '❤️', r: 'mơ-gần' }), w('gern', 'gern', 'thích (làm gì)', { pos: 'trạng từ', e: '😊', r: 'ghen' }), w('lecker', 'lecker', 'ngon', { pos: 'tính từ', e: '😋', r: 'lé-kơ' }), w('hunger', 'Hunger', 'cơn đói', { art: 'der', e: '🤤', r: 'hun-gơ' }), w('durst', 'Durst', 'cơn khát', { art: 'der', e: '🥵', r: 'đuốc-st' }),
      ],
      grammar: [
        table(['mögen', ''], ['ich mag', 'wir mögen'], ['du magst', 'ihr mögt'], ['er/sie/es mag', 'sie/Sie mögen']),
        T('**Hai cách nói thích:**\n- **mögen + danh từ (Akkusativ):** *Ich mag Käse.* (Tôi thích pho mát.)\n- **động từ + gern:** *Ich esse gern Käse.* (Tôi thích ăn pho mát.)\n- **Không thích:** *Ich mag keinen Fisch.* hoặc *Ich esse nicht gern Fisch.*'),
        table(['Mức độ', 'Cách nói'], ['thích', 'gern'], ['thích hơn', 'lieber'], ['thích nhất', 'am liebsten'], ['không thích', 'nicht gern']),
        info('**Hunger haben** = đói, **Durst haben** = khát (dùng **haben**, không dùng sein): *Ich habe Hunger.* Khác tiếng Việt “tôi đói” và tiếng Anh “I am hungry”.'),
        tip('**Guten Appetit!** (Chúc ăn ngon!) là câu người Đức nói trước khi ăn. Đáp lại: **Danke, gleichfalls!** (Cảm ơn, bạn cũng vậy).'),
      ],
      examples: [dlg(['Anna', 'Magst du Fisch?', 'Bạn có thích cá không?'], ['Tom', 'Nein, ich esse lieber Fleisch. Und du?', 'Không, tôi thích ăn thịt hơn. Còn bạn?'], ['Anna', 'Ich esse am liebsten Reis mit Gemüse.', 'Tôi thích nhất là cơm với rau.'])],
      ex: [
        fill('Du ___ Käse. (mögen)', 'magst', 'du → magst.'),
        fill('Er ___ keinen Fisch. (mögen)', 'mag', 'er → mag.'),
        order('Tôi đói', 'Ich habe Hunger'),
        order('Tôi thích ăn cá', 'Ich esse gern Fisch'),
        mc('“Ich habe Durst” nghĩa là:', ['Tôi khát', 'Tôi đói', 'Tôi mệt', 'Tôi vui'], 0, 'Durst = cơn khát.'),
        mc('Câu nào diễn đạt “thích nhất”?', ['am liebsten', 'lieber', 'gern', 'nicht gern'], 0, 'am liebsten = thích nhất.'),
      ],
      teaches: ['moegen-gern'],
      review: '- **mögen**: ich mag, du magst.\n- **gern › lieber › am liebsten**.\n- **Hunger / Durst haben**.',
    }),
  ],
})
