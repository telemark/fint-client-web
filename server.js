const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
  createServer((req, res) => {
    const { query } = parse(req.url, true)
    app.render(req, res, '/', query)
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
