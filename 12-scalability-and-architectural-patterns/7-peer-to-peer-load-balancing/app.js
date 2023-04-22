import { createServer } from 'http'

const { pid } = process

const server = createServer(() => {
  let i = 1e7; while (i > 0) { i-- }
  console.log(`Handling request from ${pid}`)
  console.log(`Hello from ${pid}\n`)
})

const port = parseInt(process.env.PORT || process.argv[2]) || 8080
server.listen(port, () => {
  console.log(`Started at ${pid}`)
})