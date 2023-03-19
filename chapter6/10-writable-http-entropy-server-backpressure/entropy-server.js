import { createServer } from 'http'
import Chance from 'chance'

const chance = new Chance()

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  function generateMore() { // 1
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = chance.string({ length: (16 * 1024) - 1 }) // 2
      const shouldContinue = res.write(`${randomChunk}\n`) // 3
      if (!shouldContinue) {
        console.log('back-pressure')
        return res.once('drain', generateMore)
      }
    }
    res.end('\n\n') // 4
  }

  generateMore()

  res.on('finish', () => { // 5
    console.log('All data sent')
  })
})

server.listen(8020, () => console.log(`Listen at http://localhost:8020`))