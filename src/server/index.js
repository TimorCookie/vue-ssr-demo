const Vue = require('vue')
const server = require('express')()

const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data() {
      return {
        req: req.url
      }
    },
    template: `<h1>访问的地址是：{{req}}</h1>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.writeHead(200, {
      'content-type': 'text/html;charset=utf8'
    })
    res.end(html)
  })
})

server.listen('9001')