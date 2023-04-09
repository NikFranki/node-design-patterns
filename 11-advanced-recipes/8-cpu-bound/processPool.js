import { fork } from 'child_process'

export class ProcessPool {
  constructor(file, poolMax) {
    this.file = file // 传入的进程监听文件（需要通过进程运行的程序）
    this.poolMax = poolMax // 最多能支持同时运行的进程数量
    this.pool = [] // 总的进程列表
    this.active = [] // 正在运行的进程列表
    this.waiting = [] // 正在等待的进程列表
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

      worker = fork(this.file)
      worker.once('message', message => {
        if (message === 'ready') { // 进程准备好的时候，把 worker 放入 active 进程列表中
          this.active.push(worker)
          return resolve(worker)
        }
        worker.kill()
        reject(new Error('Improper process start'))
      })
      worker.once('exit', code => { // 当前 worker 退出的时候，删除当前 active、pool 的同名进程
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

    this.active = this.active.filter(w => worker !== w) // 把已经运行完的进程从 active 里面去掉
    this.pool.push(worker) // 重新放入的总的进程里面，提供给后续的程序使用
  }
}