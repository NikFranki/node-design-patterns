function makeSampleTask(name) {
  return (cb) => {
    console.log(`${name} started`)
    setTimeout(() => {
      console.log(`${name} completed`)
      cb()
    }, Math.random() * 2000)
  }
}

const tasks = [
  makeSampleTask('task1'),
  makeSampleTask('task2'),
  makeSampleTask('task3'),
  makeSampleTask('task4'),
  makeSampleTask('task5')
]

const concurrency = 2
let running = 0
let index = 0
let completed = 0

function next() { // [1]
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++]
    task(() => { // [2]
      if (++completed === tasks.length) {
        return finish()
      }
      running--;
      next()
    })
    running++
  }
}

next()

function finish() {
  // all the tasks completed
  console.log('All tasks executed!')
}