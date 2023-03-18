export class TaskQueuePC {
  constructor(concurrency) {
    this.taskQueue = []
    this.consumerQueue = []

    // spawn consumers
    for (let i = 0; i < concurrency; i++) {
      this.consumer()
    }
  }

  /**
   * 一直寻找可以执行的任务，异步无限循环
   */
  async consumer() {
    while (true) {
      try {
        const task = await this.getNextTask()
        await task()
      } catch (error) {
          console.error(error)
      }
    }
  }

  /**
   * 如果任务队列里面有值，那么每次取出队头的任务，否则，消费者队列加入一个睡眠
   * @returns 返回任务队列的队头任务
   */
  getNextTask() {
    return new Promise((resolve) => {
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift())
      }

      this.consumerQueue.push(resolve)
    })
  }

  /**
   * 如果消费者不为空，说明还有消费者是空闲的，那么可以直接取出来执行任务，否则，就把任务先放入任务队列，等待消费者有空闲的时候来执行
   * @param {*} task 要执行的任务
   * @returns 返回运行任务后的值
   */
  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task()
        taskPromise.then(resolve, reject)
        return taskPromise
      }
      if (this.consumerQueue.length !== 0) {
        // 有睡眠中的消费者，需要唤醒，去执行任务
        const consumer = this.consumerQueue.shift()
        consumer(taskWrapper)
      } else {
        // 没有可用的消费者，那就入队任务队列
        this.taskQueue.push(taskWrapper)
      }
    })
  }
}

// 