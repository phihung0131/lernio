import { chapter, dlg, ex, fill, info, lesson, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

const w = (id: string, de: string, vi: string, o = {}) => v(`a1c12-${id}`, de, vi, o)

export default chapter({
  level: 'A1',
  order: 12,
  title: 'Unterwegs',
  titleVi: 'Đi lại và hỏi đường',
  lessons: [
    lesson({
      id: 'a1-c12-l1',
      title: 'Phương tiện và địa điểm',
      goals: ['Gọi tên phương tiện', 'Dùng mit + Dativ', 'Hỏi đường cơ bản'],
      intro: 'Đi lại là phần thiết yếu khi sống ở nước ngoài. Bạn sẽ học các phương tiện và cách hỏi đường.',
      vocab: [
        w('bus', 'Bus', 'xe buýt', { art: 'der', pl: 'Busse', r: 'bút-x' }), w('zug', 'Zug', 'tàu hỏa', { art: 'der', pl: 'Züge', r: 'tsuk' }), w('ubahn', 'U-Bahn', 'tàu điện ngầm', { art: 'die', pl: 'U-Bahnen', r: 'u-ban' }), w('fahrrad', 'Fahrrad', 'xe đạp', { art: 'das', pl: 'Fahrräder', r: 'pha-rát' }), w('flugzeug', 'Flugzeug', 'máy bay', { art: 'das', pl: 'Flugzeuge', r: 'phlúc-tsoik' }), w('bahnhof', 'Bahnhof', 'nhà ga', { art: 'der', pl: 'Bahnhöfe', r: 'ban-hôf' }), w('haltestelle', 'Haltestelle', 'trạm dừng', { art: 'die', pl: 'Haltestellen', r: 'hal-tờ-stê-lờ' }), w('fahrkarte', 'Fahrkarte', 'vé', { art: 'die', pl: 'Fahrkarten', r: 'phar-kar-tờ' }), w('fahren', 'fahren', 'đi (xe)', { pos: 'động từ', r: 'pha-rần' }), w('gehen', 'gehen', 'đi bộ', { pos: 'động từ', r: 'gê-ần' }),
      ],
      grammar: [
        T('**Đi bằng gì:** dùng **mit** + phương tiện (Dativ): *Ich fahre **mit dem** Bus.* (đực: dem), *Ich fahre **mit der** U-Bahn.* (cái: der), *Ich fahre **mit dem** Auto.* (trung: dem). **Đi bộ:** *Ich gehe **zu Fuß**.*'),
        table(['', 'fahren (a→ä)', 'gehen'], ['ich', 'fahre', 'gehe'], ['du', 'fährst', 'gehst'], ['er/sie/es', 'fährt', 'geht'], ['wir', 'fahren', 'gehen'], ['ihr', 'fahrt', 'geht'], ['sie/Sie', 'fahren', 'gehen']),
        info('**fahren** = đi bằng phương tiện, **gehen** = đi bộ; **fliegen** = bay. Hỏi cách đi: *Wie kommst du zur Arbeit?* (Bạn đến chỗ làm bằng cách nào?)'),
        warn('**zu** (đến) + Dativ: **zum** (zu dem) Bahnhof, **zur** (zu der) Schule. **nach** + thành phố/nước không mạo từ: *Ich fahre **nach** Berlin.*'),
      ],
      examples: [ex('Ich fahre mit dem Bus zur Arbeit.', 'Tôi đi làm bằng xe buýt.'), ex('Wir fliegen nach Wien.', 'Chúng tôi bay đến Wien.'), ex('Er geht zu Fuß zur Schule.', 'Anh ấy đi bộ đến trường.')],
      ex: [
        fill('Ich fahre ___ dem Bus.', 'mit', 'mit + Dativ.'),
        fill('Du ___ nach Berlin. (fahren)', 'fährst', 'du fährst.'),
        fill('Wir gehen ___ Fuß.', 'zu', 'zu Fuß = đi bộ.'),
        fill('Ich fahre ___ Bahnhof. (zu dem)', 'zum', 'zu dem = zum.'),
        order('Tôi đi làm bằng xe buýt', 'Ich fahre mit dem Bus zur Arbeit'),
        mc('“Ich fahre mit der U-Bahn” — vì sao dùng der?', ['U-Bahn giống cái, mit + Dativ', 'U-Bahn giống đực', 'U-Bahn số nhiều', 'vì Akkusativ'], 0, 'die U-Bahn → Dativ der.'),
      ],
      teaches: ['mit-dativ', 'zu-nach'],
      review: '- **mit dem/der/dem** + phương tiện; **zu Fuß**.\n- **fahren**: du fährst, er fährt.\n- **zum, zur, nach**.',
    }),
    lesson({
      id: 'a1-c12-l2',
      title: 'Hỏi đường và mệnh lệnh',
      goals: ['Hỏi đường', 'Hiểu chỉ dẫn: links, rechts, geradeaus', 'Nhận biết Imperativ cơ bản'],
      intro: 'Khi hỏi đường, bạn sẽ nghe câu **mệnh lệnh** (Imperativ): *Gehen Sie geradeaus!* (Hãy đi thẳng). Chỉ cần nhận ra ở A1.',
      vocab: [
        w('links', 'links', 'bên trái', { pos: 'trạng từ', r: 'linh-x' }), w('rechts', 'rechts', 'bên phải', { pos: 'trạng từ', r: 'rếch-ts' }), w('geradeaus', 'geradeaus', 'thẳng', { pos: 'trạng từ', r: 'gờ-ra-đờ-ao-x' }), w('weit', 'weit', 'xa', { pos: 'tính từ', r: 'vai-t' }), w('nah', 'nah', 'gần', { pos: 'tính từ', r: 'na' }), w('ecke', 'Ecke', 'góc', { art: 'die', r: 'é-kờ' }), w('kreuzung', 'Kreuzung', 'ngã tư', { art: 'die', r: 'kroi-tsung' }), w('entschuldigung', 'Entschuldigung', 'xin lỗi', { r: 'ent-sun-đi-gung' }),
      ],
      grammar: [
        T('**Hỏi đường:**\n- *Entschuldigung, wo ist der Bahnhof?* (Xin lỗi, nhà ga ở đâu?)\n- *Wie komme ich zum Bahnhof?* (Tôi đến nhà ga bằng cách nào?)\n- *Ist es weit von hier?* (Có xa đây không?)'),
        table(['Chỉ dẫn (lịch sự, Sie)', 'Nghĩa'], ['Gehen Sie geradeaus.', 'Đi thẳng.'], ['Gehen Sie links / rechts.', 'Rẽ trái / phải.'], ['Nehmen Sie die erste Straße links.', 'Rẽ vào con đường đầu tiên bên trái.'], ['An der Kreuzung gehen Sie rechts.', 'Ở ngã tư rẽ phải.'], ['Es ist neben der Bank.', 'Nó ở cạnh ngân hàng.']),
        info('**Imperativ lịch sự (Sie):** động từ nguyên mẫu **đứng đầu**, rồi **Sie**: *Gehen Sie…*, *Nehmen Sie…*, *Fahren Sie…*. Imperativ thân mật (du) học ở A2.'),
        tip('Nghe hiểu là chính: nếu không hiểu, hỏi lại: **Können Sie das bitte wiederholen?** (Bạn nhắc lại được không?) hoặc **Langsamer, bitte.** (Chậm hơn, làm ơn).'),
      ],
      examples: [dlg(['Tourist', 'Entschuldigung, wie komme ich zum Bahnhof?', 'Xin lỗi, tôi đến nhà ga như thế nào?'], ['Passant', 'Gehen Sie geradeaus und dann links.', 'Đi thẳng rồi rẽ trái.'], ['Tourist', 'Ist es weit?', 'Có xa không?'], ['Passant', 'Nein, nur fünf Minuten zu Fuß.', 'Không, chỉ năm phút đi bộ.'])],
      ex: [
        match('Nối chỉ dẫn.', ['links', 'bên trái'], ['rechts', 'bên phải'], ['geradeaus', 'thẳng'], ['weit', 'xa']),
        order('Nhà ga ở đâu?', 'Wo ist der Bahnhof?'),
        order('Đi thẳng', 'Gehen Sie geradeaus'),
        mc('“Rechts” nghĩa là:', ['bên phải', 'bên trái', 'thẳng', 'phía sau'], 0, 'rechts = bên phải.'),
        fill('Gehen Sie ___ und dann links. (thẳng)', 'geradeaus', 'geradeaus = thẳng.'),
      ],
      teaches: ['imperativ-sie-intro', 'wegbeschreibung'],
      review: '- **Wo ist …? / Wie komme ich zu …?**\n- **links, rechts, geradeaus**.\n- Imperativ lịch sự: **Gehen Sie…**',
    }),
  ],
})
