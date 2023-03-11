class Log {
  constructor(name) {
    this.name = name
  }

  log() {
    console.log(`${this.name} output`)
  }

  verbose() {
    console.log('verbose log')
  }
}

module.exports = new Log('default')