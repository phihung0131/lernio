import sharp from 'sharp'
const svg = 'public/icon.svg'
await sharp(svg).resize(192, 192).png().toFile('public/icon-192.png')
await sharp(svg).resize(512, 512).png().toFile('public/icon-512.png')
await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png')
// maskable: thêm vùng an toàn 10%
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#2f6bff' } })
  .composite([{ input: await sharp(svg).resize(410, 410).png().toBuffer(), gravity: 'center' }])
  .png()
  .toFile('public/icon-maskable.png')
console.log('✓ PWA icons')
