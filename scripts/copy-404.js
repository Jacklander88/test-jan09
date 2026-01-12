const fs = require('fs')
const path = require('path')

const dist = path.resolve(__dirname, '..', 'dist')
const index = path.join(dist, 'index.html')
const dest = path.join(dist, '404.html')

if (fs.existsSync(index)) {
  fs.copyFileSync(index, dest)
  console.log('Copied index.html to 404.html')
} else {
  console.error('dist/index.html not found - run build first')
  process.exit(1)
}