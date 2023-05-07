import Redis from 'ioredis'
import { generateTasks } from './generateTasks.js'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const BATCH_SIZE = 10000
const redisClient = new Redis()

const [, , maxLength, searchHash] = process.argv

async function main() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createConfirmChannel()
  await channel.assertQueue('tasks_queue')

  const generatorObj = generateTasks(searchHash, ALPHABET, maxLength, BATCH_SIZE)
  for (const task of generatorObj) {
    await redisClient.xadd('tasks_stream', '*', 'task', JSON.stringify(task))
  }

  await redisClient.disconnect()
}

main().catch(err => console.error(err))