import { Transform } from 'stream'

const searchStr = 'World'
const replaceStr = 'Node.js'
let tail = ''

const replaceStream = new Transform({
  defaultEncoding: 'utf8',

  transform(chunk, encoding, callback) {
    const pieces = (tail + chunk).split(searchStr)
    const lastPiece = pieces[pieces.length - 1]
    const tailLen = searchStr.length - 1
    tail = lastPiece.slice(-tailLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)

    this.push(pieces.join(replaceStr))
    callback()
  },

  _flush(callback) {
    this.push(tail)
    callback()
  }
})

replaceStream.on('data', chunk => console.log(chunk.toString()))
replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.end()