import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import request from 'request-promise'
import ParallelStream from 'parallel-transform'

pipeline(
  createReadStream(process.argv[2]), // 1
  split(), // 2
  ParallelStream( // 3
    10,
    async function(url, done) {
      if (!url) {
        return done()
      }
      try {
        await request.head(url, { timeout: 5 * 1000 })
        this.push(`${url} is up\n`)
      } catch (error) {
        this.push(`${url} is down\n`)
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