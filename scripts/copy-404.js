const fs = require('fs')
const path = require('path')

const dist = path.resolve(__dirname, '..', 'dist')
const index = path.join(dist, 'index.html')
const dest = path.join(dist, '404.html')

if (fs.existsSync(index)) {
  fs.copyFileSync(index, dest)
  console.log('Copied index.html to 404.html')

  // ensure a small favicon exists to prevent /favicon.ico 404s
  const faviconPath = path.join(dist, 'favicon.ico')
  if (!fs.existsSync(faviconPath)) {
    // a tiny 16x16 PNG (green) - written as favicon.ico (browsers accept PNG data)
    const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAHUlEQVR4AWOAgf8z8D8GhgYGBgYGBgYGAD0qAQBV7wE03w2YcQAAAABJRU5ErkJggg=='
    const png = Buffer.from(pngBase64, 'base64')
    fs.writeFileSync(faviconPath, png)
    console.log('Wrote small favicon.ico (PNG data)')
  }

  // ensure a stub exists at /src/main.tsx to silence absolute path 404s
  const srcDir = path.join(dist, 'src')
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir)
  const mainStub = path.join(srcDir, 'main.tsx')
  if (!fs.existsSync(mainStub)) {
    fs.writeFileSync(mainStub, '// stub to satisfy /src/main.tsx requests (no-op)')
    console.log('Wrote stub dist/src/main.tsx')
  }
} else {
  console.error('dist/index.html not found - run build first')
  process.exit(1)
}