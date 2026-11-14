import { chapter, dict, dlg, ex, fill, info, lesson, listen, match, mc, order, table, T, tip, typ, v, warn } from '../lib'

export default chapter({
  level: 'A0',
  order: 8,
  title: 'Zahlen 0–10',
  titleVi: 'Số đếm từ 0 đến 10',
  lessons: [
    lesson({
      id: 'a0-c08-l1',
      title: 'Số từ 0 đến 5',
      goals: ['Đọc, nghe và viết số 0 đến 5'],
      intro: 'Số đếm là từ vựng bạn sẽ dùng mỗi ngày: số điện thoại, giá tiền, giờ giấc. Bắt đầu với 0 đến 5.',
      vocab: [
        v('null', 'null', 'số 0', { r: 'nul' }),
        v('eins', 'eins', 'số 1', { r: 'ai-nx' }),
        v('zwei', 'zwei', 'số 2', { r: 'tsvai' }),
        v('drei', 'drei', 'số 3', { r: 'đrai' }),
        v('vier', 'vier', 'số 4', { r: 'phi-ơ' }),
        v('funf', 'fünf', 'số 5', { r: 'phuynf' }),
      ],
      grammar: [
        table(['Số', 'Tiếng Đức', 'Đọc'], ['0', 'null', 'nul'], ['1', 'eins', 'ai-nx'], ['2', 'zwei', 'tsvai'], ['3', 'drei', 'đrai'], ['4', 'vier', 'phi-ơ'], ['5', 'fünf', 'phuynf']),
        tip('**zwei** (hai) và **drei** (ba) dễ nhầm vì cùng kết thúc “-ei”. Nhớ: zw- bắt đầu giống “ts-”, dr- giống “đr-”.'),
        warn('**Số 2** đôi khi đọc là “zwo” trên điện thoại để khỏi nhầm với “drei”. Cả hai đều đúng.'),
      ],
      examples: [ex('Eins, zwei, drei!', 'Một, hai, ba!'), ex('Ich habe zwei Katzen.', 'Tôi có hai con mèo.'), ex('Vier und eins ist fünf.', '4 cộng 1 là 5.')],
      ex: [
        match('Nối số với chữ.', ['0', 'null'], ['1', 'eins'], ['2', 'zwei'], ['3', 'drei']),
        listen('drei', ['zwei', 'drei', 'vier', 'fünf'], 1),
        listen('fünf', ['vier', 'fünf', 'eins', 'null'], 1),
        typ('Viết bằng chữ: 4', ['vier'], '4 = vier.'),
      ],
      review: '- 0 null, 1 eins, 2 zwei, 3 drei, 4 vier, 5 fünf.',
    }),
    lesson({
      id: 'a0-c08-l2',
      title: 'Số từ 6 đến 10',
      goals: ['Đọc, nghe và viết số 6 đến 10', 'Đếm 0 đến 10'],
      intro: 'Nửa sau của dãy số. Chú ý **sechs, sieben** (s đầu từ đọc “z” rung) và **acht** (ch = “kh”).',
      vocab: [
        v('sechs', 'sechs', 'số 6', { r: 'dếch-x' }),
        v('sieben', 'sieben', 'số 7', { r: 'di-bần' }),
        v('acht', 'acht', 'số 8', { r: 'a-kht' }),
        v('neun', 'neun', 'số 9', { r: 'noin' }),
        v('zehn', 'zehn', 'số 10', { r: 'tsên' }),
      ],
      grammar: [
        table(['Số', 'Tiếng Đức', 'Đọc'], ['6', 'sechs', 'dếch-x'], ['7', 'sieben', 'di-bần'], ['8', 'acht', 'a-kht'], ['9', 'neun', 'noin'], ['10', 'zehn', 'tsên']),
        warn('**neun** (9) đọc “noin” (eu = oi), còn **nein** (không) đọc “nai-n”. Hai từ này rất dễ nhầm. Nghe kỹ!'),
        info('Mẹo nhớ: **drei** (3) – **zehn** (10) – **zwei** (2) đều có âm đầu khác nhau: đr-, ts-, tsv-.'),
      ],
      examples: [ex('Sechs, sieben, acht, neun, zehn!', 'Sáu, bảy, tám, chín, mười!'), ex('Ich bin neun Jahre alt.', 'Tôi chín tuổi.'), ex('Zehn Euro, bitte.', 'Mười euro, làm ơn.')],
      ex: [
        match('Nối số với chữ.', ['6', 'sechs'], ['7', 'sieben'], ['8', 'acht'], ['9', 'neun'], ['10', 'zehn']),
        listen('neun', ['nein', 'neun', 'nun', 'zehn'], 1),
        listen('sieben', ['sechs', 'sieben', 'acht', 'zehn'], 1),
        mc('“nein” khác “neun” thế nào?', ['nein = không, neun = chín', 'giống hệt nhau', 'nein = chín, neun = không', 'đều là số'], 0, 'nein (không) đọc “nai-n”; neun (9) đọc “noin”.'),
        dict('zehn'),
        order('Tôi có hai con mèo', 'Ich habe zwei Katzen', 'habe = có. zwei Katzen = hai con mèo.'),
      ],
      review: '- 6 sechs, 7 sieben, 8 acht, 9 neun, 10 zehn.\n- Đừng nhầm **neun** (9) với **nein** (không).',
    }),
  ],
})
