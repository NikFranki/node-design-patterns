import { readFile } from 'fs'

const cache = new Map()

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // 同步执行
    cb(cache.get(filename));
  } else {
    // 异步函数
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}

// 这个函数相当危险，有同步又有异步，会让调用方出现各种情况