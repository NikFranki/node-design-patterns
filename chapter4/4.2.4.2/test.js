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
  makeSampleTask('task4')
]

let completed = 0
tasks.forEach(task => {
  task(() => {
    if (++completed === tasks.length) {
      finish()
    }
  })
})

function finish() {
  // all the tasks completed
  console.log('All tasks executed!')
}