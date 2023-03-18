// 作为服务器接收方，接受客户端加密压缩后的数据，需要先解密，需要进行解压，并把它放到磁盘中

import { createServer } from 'http'
import { createWriteStream } from 'fs'
import { createGunzip } from 'zlib'
import { basename, join } from 'path'
import { createDecipheriv, randomBytes } from 'crypto'

const secret = randomBytes(24)
console.log(`Generated secret: ${secret.toString('hex')}`)

const server = createServer((req, res) => {
  const filename = basename(req.headers['x-filename'])
  const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex')
  const destFilename = join('receive_files', filename)
  console.log(`File request received: ${filename}`)

  req
    .pipe(createDecipheriv('aes192', secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' })
      res.end('OK\n')
      console.log(`File saved: ${destFilename}`)
    })
})

server.listen(3000, () => console.log('Listening on http://localhost:3000'))