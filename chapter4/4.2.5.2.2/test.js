import { TaskQueue } from './TaskQueue.js'

function makeSampleTask(name) {
  return (cb) => {
    console.log(`${name} started`)
    setTimeout(() => {
      console.log(`${name} completed`)
      cb()
    }, Math.random() * 2000)
  }
}

function task1(cb) {
  console.log('task1 started')
  queue
    .pushTask(makeSampleTask('task1 -> subtask1'))
    .pushTask(makeSampleTask('task1 -> subtask2'))

  setTimeout(() => {
    console.log(`task1 completed`)
    cb()
  }, Math.random() * 2000)
}

function task2(cb) {
  console.log('task2 started')
  queue
    .pushTask(makeSampleTask('task2 -> subtask1'))
    .pushTask(makeSampleTask('task2 -> subtask2'))

  setTimeout(() => {
    console.log(`task2 completed`)
    cb()
  }, Math.random() * 2000)
}

const queue = new TaskQueue(2)
queue.on('error', console.error)
queue.on('empty', () => console.log('Queue drained'))

queue
  .pushTask(task1)
  .pushTask(task2)