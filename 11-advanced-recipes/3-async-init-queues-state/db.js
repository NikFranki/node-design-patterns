import { EventEmitter } from 'events'

class InializedState {
  async query(queryString) {
    console.log(`Query Executed: ${queryString}`)
  }
}

const METHOD_REQUIRING_CONNECTION = ['query']
const deactivate = Symbol('deactivate')

class QueuingState {
  commandQueue = []

  constructor(db) {
    this.db = db
    METHOD_REQUIRING_CONNECTION.forEach(methodName => {
      this[methodName] = function(...args) {
        console.log('Command queued: ', methodName, args)
        return new Promise((resolve, reject) => {
          const command = () => {
            db[methodName](...args).then(resolve, reject)
          }
          this.commandQueue.push(command)
        })
      }
    });
  }

  [deactivate]() {
    this.commandQueue.forEach(command => command())
    this.commandQueue = []
  }
}

class DB extends EventEmitter {
  connected = false

  constructor() {
    super()
    this.state = new QueuingState(this)
  }

  async query(queryString) {
    return this.state.query(queryString)
  }

  connect() {
    // 模拟连接延时
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      const oldState = this.state
      this.state = new InializedState(this)
      oldState[deactivate] && oldState[deactivate]()
    }, 500)
  }
}

export const db = new DB()
