import { createServer } from 'http'
import { cpus } from 'os'
import cluster from 'cluster'

if (cluster.isPrimary) {
  const availableCpus = cpus()
  console.log(`Clustering to ${availableCpus.length} processes`)
  availableCpus.forEach(() => cluster.fork())
} else {
  const { pid } = process

  const server = createServer((req, res) => {
    // 模拟 CPU 密集型工作
    let i = 1e7; while (i > 0) { i-- }
    console.log(`Handing request from ${pid}`)
    res.end(`Hello from ${pid}\n`)
  })

  server.listen(8080, () => console.log(`Started at ${pid}`))
}
