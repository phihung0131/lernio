import { chapter, dict, ex, fill, info, lesson, listen, mc, pron, table, T, tip, typ, v, warn, illus } from '../lib'
import { MouthNote } from './shared'

export default chapter({
  level: 'A0',
  order: 3,
  title: 'Ä, Ö, Ü, ß',
  titleVi: 'Các ký tự đặc biệt',
  lessons: [
    lesson({
      id: 'a0-c03-l1',
      title: 'Umlaut Ä và Ö',
      goals: ['Nhận ra và đọc ä, ö', 'Biết khi không gõ được ä, ö thì thay bằng ae, oe'],
      intro:
        '**Umlaut** là hai dấu chấm trên nguyên âm: **ä, ö, ü**. Chúng là những chữ cái **riêng**, đọc khác a, o, u. Đây là phần nhiều người Việt thấy lạ nhất, nhưng chỉ cần luyện vài lần là quen.',
      vocab: [
        v('bar', 'Bär', 'con gấu', { art: 'der', e: '🐻', r: 'be-ơ' }),
        v('kase', 'Käse', 'pho mát', { art: 'der', e: '🧀', r: 'kê-dơ' }),
        v('schon', 'schön', 'đẹp', { e: '✨', r: 'sơn (miệng tròn)', pos: 'tính từ' }),
        v('ol', 'Öl', 'dầu ăn', { art: 'das', e: '🫒', r: 'ơ-l' }),
        v('offnen', 'öffnen', 'mở', { e: '🔓', r: 'ơ-phờ-nần', pos: 'động từ' }),
      ],
      grammar: [
        pron('Ä ä', 'ê (mở)', 'Đọc như “e” mở, gần “e” trong “bè”, miệng mở hơn ê thường.', ['Bär', 'Käse', 'Mädchen (bé gái)'], 'Ä'),
        pron('Ö ö', 'ơ (môi tròn)', 'Nói “ê” nhưng **tròn môi** như chuẩn bị nói “ô”. Gần “ơ” miền Nam với môi tròn.', ['schön', 'Öl', 'Köln'], 'Ö'),
        illus('mouth-vowels'),
        MouthNote,
        info('**Mẹo:** Ä giống E trong âm. Chỉ khác ở chỗ viết. Ö là âm mới: đặt môi như nói “ô”, rồi giữ nguyên môi và phát âm “ê”.'),
        tip('**Không gõ được ä/ö?** Dùng **ae** và **oe** thay thế: *Käse = Kaese*, *schön = schoen*. App Lernio chấp nhận cách gõ này.'),
      ],
      examples: [ex('Der Bär ist schön.', 'Con gấu thật đẹp.'), ex('Ich mag Käse.', 'Tôi thích pho mát.'), ex('Öl', 'dầu ăn')],
      ex: [
        mc('Cách gõ thay thế cho chữ “ö” khi không có bàn phím Đức là gì?', ['o', 'oe', 'oo', 'ou'], 1, 'ö thay bằng oe. ä thay bằng ae. ü thay bằng ue.'),
        fill('Käse viết khi không có ä: K___se', 'ae', 'ä = ae → Kaese.'),
        dict('Käse', 'Käse = pho mát.'),
      ],
      review: '- **ä** ≈ “ê” mở. **ö** = “ê” với môi tròn.\n- Không gõ được: **ä=ae**, **ö=oe**.',
    }),
    lesson({
      id: 'a0-c03-l2',
      title: 'Umlaut Ü và chữ ß',
      goals: ['Đọc ü', 'Biết ß là “ss” và khi nào dùng'],
      intro: '**Ü** là âm khó nhất với người Việt. May là bạn có sẵn âm “i”, chỉ cần tròn môi.',
      vocab: [
        v('uber', 'über', 'trên, qua', { e: '⬆️', r: 'uy-bơ', pos: 'giới từ' }),
        v('fruhstuck', 'Frühstück', 'bữa sáng', { art: 'das', e: '🥐', r: 'phruy-stúyc' }),
        v('tur', 'Tür', 'cánh cửa', { art: 'die', e: '🚪', r: 'tuy-ơ' }),
        v('strasse', 'Straße', 'con đường', { art: 'die', e: '🛣️', r: 'sờ-tra-xơ' }),
        v('gruss', 'Gruß', 'lời chào', { art: 'der', e: '👋', r: 'gru-x' }),
      ],
      grammar: [
        pron('Ü ü', 'uy (môi tròn)', 'Nói “i” và **tròn môi** như “u” cùng lúc. Nghe như “uy” kéo dài, không phải “ui”.', ['Tür', 'über', 'Frühstück'], 'Ü'),
        pron('ß', 'x (ss)', 'Gọi là “Eszett”. Đọc như “ss” hoặc “x” trong “xa”. Chỉ xuất hiện sau nguyên âm dài.', ['Straße', 'Gruß', 'heißen'], 'Eszett'),
        table(['Ký tự', 'Khi không gõ được', 'Ví dụ'], ['ä', 'ae', 'Käse → Kaese'], ['ö', 'oe', 'schön → schoen'], ['ü', 'ue', 'Tür → Tuer'], ['ß', 'ss', 'Straße → Strasse']),
        warn('**ß** không bao giờ đứng đầu từ và **không có dạng viết hoa thông thường** trong văn bản. Khi viết hoa toàn bộ, người ta viết SS (STRASSE).'),
        tip('Muốn nói **ü**: nói “i” (như “ti”), giữ lưỡi nguyên rồi chu môi tròn lại. Âm phát ra chính là ü.'),
      ],
      examples: [ex('Die Tür ist offen.', 'Cánh cửa đang mở.'), ex('Gute Straße', 'đường tốt'), ex('Das Frühstück ist gut.', 'Bữa sáng ngon.')],
      ex: [
        mc('Cách viết thay thế cho ß là gì?', ['b', 'ss', 'sz', 'ps'], 1, 'ß = ss.'),
        mc('Chữ ü đọc như thế nào?', ['Như “i” nhưng tròn môi', 'Như “u” thường', 'Như “ô”', 'Như “a”'], 0, 'ü = âm “i” với môi tròn.'),
        listen('die Tür', ['die Tür', 'die Tier', 'das Tor', 'der Tag'], 0),
        dict('die Straße'),
        typ('Gõ “Tür” khi không có chữ ü', ['Tuer', 'tuer'], 'ü = ue, nên Tür = Tuer.'),
      ],
      review: '- **ü** = “i” với môi tròn.\n- **ß** = “ss”, chỉ sau nguyên âm dài.\n- Thay thế: ä=ae, ö=oe, ü=ue, ß=ss.',
    }),
  ],
})
