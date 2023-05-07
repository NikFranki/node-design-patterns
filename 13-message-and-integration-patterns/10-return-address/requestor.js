import { AMQPRequest } from './amqpRequest.js'
import delay from 'delay'

async function main() {
  const request = new AMQPRequest()
  await request.initialize()

  async function sendRandomRequst() {
    const a = Math.round(Math.random() * 100)
    const b = Math.round(Math.random() * 100)
    const reply = await request.send('request_queue', { a, b })
    console.log(`${a} + ${b} = ${reply.sum}`)
  }

  for (let i = 0; i < 20; i++) {
    await sendRandomRequst()
    await delay(1000)
  }

  request.destroy()
}

main().catch(err => console.error(err))