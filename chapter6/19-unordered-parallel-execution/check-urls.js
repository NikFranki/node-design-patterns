import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import superagent from 'superagent'
import { ParallelStream } from './parallel-stream.js'

pipeline(
  createReadStream(process.argv[2]), // 1
  split(), // 2
  new ParallelStream( // 3
    async (url, enc, push, done) => {
      if (!url) {
        return done()
      }
      try {
        await superagent.head(url, { timeout: 5 * 1000 })
        push(`${url} is up\n`)
      } catch (error) {
        push(`${url} is down\n`)
      }
      done()
    }
  ),
  createWriteStream('result.txt'), // 4
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('All urls have been checked')
  }
)