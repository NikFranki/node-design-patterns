import assert from 'assert'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline, Transform } from 'stream'

const streamA = createReadStream('package.json')
const streamB = new Transform({
  transform(chunk, enc, done) {
    this.push(chunk.toString().toUpperCase())
    done()
  }
})
const streamC = createWriteStream('package-uppercase.json')

const pipelineReturn = pipeline(
  streamA,
  streamB,
  streamC,
  () => {
    // 处理错误
  }
)

assert.strictEqual(streamC, pipelineReturn)

const pipeReturn = streamA.pipe(streamB).pipe(streamC)
assert.strictEqual(streamC, pipeReturn)