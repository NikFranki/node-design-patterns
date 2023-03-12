import { spider } from './spider.js'
import { TaskQueue } from './TaskQueue.js'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1
const concurrency = Number.parseInt(process.argv[4], 10) || 2

const spiderQueue = new TaskQueue(concurrency)
spiderQueue.on('error', console.error)
spiderQueue.on('empty', () => console.log('Download complete'))

spider(url || 'http://127.0.0.1:8080/a.html', nesting, spiderQueue)