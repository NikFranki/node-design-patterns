import { createServer } from 'http'
import { once } from 'events'
import { cpus } from 'os'
import cluster from 'cluster'

if (cluster.isMaster) {
  const availableCpus = cpus()
  console.log(`Clustering to ${availableCpus.length} processes`)
  availableCpus.forEach(() => cluster.fork())

  cluster.on('exit', (work, code) => {
    if (code !== 0 && !work.exitAfterDisconnect) {
      console.log(`Work ${worker.process.pid} crashed. Starting a new worker`)
      cluster.fork()
    }
  })

  process.on('SIGN2', async () => {
    const workers = Object.keys(cluster.workers)
    for (const worker of workers) {
      console.log(`Stopping worker: ${worker.process.pid}`)
      worker.disconnect()
      await once(worker, 'exit')
      if (!worker.exitAfterDisconnect) continue
      const newWorker = cluster.fork()
      await once(newWorker, 'listening')
    }
  })
} else {
  const { pid } = process
  const server = createServer((req, res) => {
    let i = 1e7; while (i > 0) { i-- }
    console.log(`Handling request from ${pid}`)
    res.end(`Hello from ${pid}\n`)
  })

  server.listen(8080, () => console.log(`Started at ${pid}`))
}