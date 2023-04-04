import superagent from 'superagent'

export class CheckUrls {
  constructor(urls) {
    this.urls = urls
  }

  [Symbol.asyncIterator]() {
    const urlIterator = this.urls[Symbol.iterator]()

    return {
      async next() {
        const iterationResult = urlIterator.next()

        if (iterationResult.done) {
          return { done: true }
        }

        const url = iterationResult.value
        try {
          const checkResult = await superagent.head(url).redirects(2)

          return { done: false, value: `${url} is up, status: ${checkResult.status}` }
        } catch (error) {
          return { done: false, value: `${url} is down, error: ${error.message}` }
        }
      }
    }
  }
}