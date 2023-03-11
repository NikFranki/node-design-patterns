import { readFileSync } from 'fs'

const cache = new Map()

function consistentRead(filename) {
  if (cache.has(filename)) {
    return cache.get(filename);
  } else {
    const data = readFileSync(filename, 'utf8')
    cache.set(filename, data)
    return data
  }
}

export default consistentRead

// 改成纯粹的同步函数
