import zmq from 'zeromq'
import { processTask } from './processTask.js'

async function main() {
  const fromVentialtor = new zmq.Pull()
  const toSink = new zmq.Push()

  fromVentialtor.connect('tcp://localhost:5016')
  toSink.connect('tcp://localhost:5017')

  for await (const rawMessage of fromVentialtor) {
    const found = processTask(JSON.parse(rawMessage.toString()))
    if (found) {
      console.log(`Found! => ${found}`)
      await toSink.send(`Found: ${found}`)
    }
  }
}

main().catch(err => console.error(err))