import { fork } from 'child_process'
import { connect } from 'net'

function multiplexChannels(sources, destination) {
  let openChannels = sources.length

  for (let i = 0; i < sources.length; i++) {
    sources[i]
      .on('readable', function() { // 1
        let chunk
        while ((chunk = this.read()) !== null) {
          const outBuff = Buffer.alloc(1 + 4 + chunk.length) // 2
          outBuff.writeUint8(i, 0)
          outBuff.writeUInt32BE(chunk.length, 1)
          chunk.copy(outBuff, 5)
          console.log(`Sending packet to channel: ${i}`)
          destination.write(outBuff) // 3
        }
      })
      .on('end', () => { // 4
        if (--openChannels === 0) {
            destination.end()
        }
      })
  }
}

const socket = connect(3000, () => { // 1
  const child = fork( // 2
    process.argv[2],
    process.argv.slice(3),
    { silent: true }
  )
  multiplexChannels([child.stdout, child.stderr], socket) // 3
})

// 实现多路复用