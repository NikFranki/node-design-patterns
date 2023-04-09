import { EventEmitter } from 'events'

class DB extends EventEmitter {
  connected = false

  connect() {
    // 模拟链接延时
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
    }, 500)
  }

  query(queryString) {
    if (!this.connected) {
      throw new Error('Not connnected yet')
    }

    console.log(`Query executed: ${queryString}`)
  }
}

export const db = new DB()