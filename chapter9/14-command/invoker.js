import superagent from 'superagent'

export class Invoker {
  constructor() {
    this.history = []
  }

  run(cmd) {
    this.history.push(cmd)
    cmd.run()
    console.log('Command executed', cmd.serialize())
  }

  delay(cmd, delay) {
    setTimeout(() => {
      console.log('Executing delayed command', cmd.serialize())
    }, delay)
  }

  undo() {
    const cmd = this.history.pop()
    cmd.undo()
    console.log('Command undone', cmd.serialize())
  }

  async runRemote(cmd) {
    await superagent
      .post('http://localhost:3000/cmd')
      .send({ json: cmd.serialize() })

    console.log('Command execute remotely', cmd.serialize())
  }
}