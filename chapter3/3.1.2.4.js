import { readFileSync } from 'fs'

const cache = new Map()

function consistentRead(filename, cb) {
  if (cache.has(filename)) {
    // 推迟回调的执行时机
    process.nextTick(() => cb(cache.get(filename)))
  } else {
    // 异步函数
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}

export default consistentRead

// 改成全部都是异步函数
// process.nextTick 是微任务，会把任务推向时间循环的最顶端
// setTimeout、IO、setImediately 是三个宏任务，顺序依次递减
