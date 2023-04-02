export function createLoggingWritable(writable) {
  return new Proxy(
    writable,
    { // 1
      get(target, propKey, receiver) { // 2
        if (propKey === 'write') { // 3
          return function(...args) { // 4
            const [chunk] = args
            console.log('Writing', chunk)
            return writable.write(...args)
          }
        }

        return target[propKey] // 5
      }
    }
  )
}