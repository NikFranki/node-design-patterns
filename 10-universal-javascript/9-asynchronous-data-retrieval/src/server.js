import react from 'react'
import reactServer from 'react-dom/server.js'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import htm from 'htm'
import { StaticRouter } from 'react-router-dom'

import { App } from './frontend/App.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const html = htm.bind(react.createElement)

// 1 定义模板
const template = ({ content }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>My library</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script type="text/javascript" src="/public/main.js"></script>
    </body>
  </html>
`

// 2 定义一个开启静态服务的服务器
const server = fastify({ logger: true })

// 3 注册一个静态服务器，挂载静态文件
server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

// 4 定义路由，接受请求，并且返回内容
server.get('*', async (req, reply) => {
  const location = req.raw.originalUrl
  const staticContext = {} // 存放服务器状态的相关信息
  // 5 定义服务器渲染的路由结构
  const serverApp = html`
    <${StaticRouter}
      location=${location}
      context=${staticContext}
    >
      <${App} />
    </$>
  `

  // 6 使用 react-dom 的 reactServer 进行服务端渲染，获取解析后的渲染内容
  const content = reactServer.renderToString(serverApp)
  const resonseHtml = template({ content })

  let code = 200
  if (staticContext.statusCode) {
    code = staticContext.statusCode
  }

  reply.code(code).type('text/html').send(resonseHtml)
})

// 7 定义启动服务器的相关参数
const port = Number.parseInt(process.env.PORT) || 3000
const address = process.env.ADDRESS || '127.0.0.1'
server.listen(port, address, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
