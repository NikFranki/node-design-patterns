import { EventEmitter } from "events"

class DB extends EventEmitter {
  connected = false
  commandQueue = []

  async query(queryString) {
    if (!this.connected) {
      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString).then(resolve, reject)
        }
        this.commandQueue.push(command)
      })
    }

    console.log(`Query executed: ${queryString}`)
  }

  connect() {
    // 模拟连接延时
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      this.commandQueue.forEach(command => command())
      this.commandQueue = []
    }, 500) 
  }
}

export const db = new DB()