import { Worker } from 'worker_threads'

export class ThreadPool {
  constructor(file, poolMax) {
    this.file = file // 传入的线程监听文件（需要通过线程运行的程序）
    this.poolMax = poolMax // 最多能支持同时运行的线程数量
    this.pool = [] // 总的线程列表
    this.active = [] // 正在运行的线程列表
    this.waiting = [] // 正在等待的线程列表
  }

  acquire() {
    return new Promise((resolve, reject) => {
      let worker
      if (this.pool.length > 0) {
        worker = this.pool.pop()
        this.active.push(worker)
        return resolve(worker)
      }

      if (this.active.length >= this.poolMax) {
        return this.waiting.push({ resolve, reject })
      }

      worker = new Worker(this.file)
      worker.once('online', () => {
        this.active.push(worker)
        resolve(worker)
      })
      worker.once('exit', code => { // 当前 worker 退出的时候，删除当前 active、pool 的同名线程
        console.log(`Worker exited with code ${code}`)
        this.active = this.active.filter(w => worker !== w)
        this.pool = this.pool.filter(w => worker !== w)
      })
    })
  }

  release(worker) {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift()
      return resolve(worker)
    }

    this.active = this.active.filter(w => worker !== w) // 把已经运行完的线程从 active 里面去掉
    this.pool.push(worker) // 重新放入的总的线程里面，提供给后续的程序使用
  }
}