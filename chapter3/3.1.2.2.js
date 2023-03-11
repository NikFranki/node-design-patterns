import inconsistentRead from './3.1.2.1.js'

function createFileReader(filename) {
  const listeners = [];

  inconsistentRead(filename, value => {
    listeners.forEach(listener => listener(value))
  })

  return {
    onDataReady: listener => listeners.push(listener)
  }
}

// 调用 onDataReady 创建多个监听器，监控这份文件的读取的操作

const reader1 = createFileReader('data.txt')
reader1.onDataReady(data => {
  console.log(`File call data: ${data}`)

  // 接着继续读取
  const reader2 = createFileReader('data.txt')
  reader2.onDataReady(data => {
    console.log(`Second call data: ${data}`)
  })
})
