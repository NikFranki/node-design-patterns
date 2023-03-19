import { randomBytes } from 'crypto'
import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import { createCompressAndEncrypt } from './combined-stream.js'

const [, , password, source] = process.argv
const iv = randomBytes(16)
const destination = `${source}.gz.enc`

pipeline(
  createReadStream(source),
  createCompressAndEncrypt(password, iv),
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(`${destination} created with iv: ${iv.toString('hex')}`)
  }
)