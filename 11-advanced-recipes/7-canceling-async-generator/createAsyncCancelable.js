import { CancelError } from './cancelError.js'

export function createAsyncCancelable(generateFunction) {
  return function asyncCancelable(...args) {
    const generateObject = generateFunction(...args)
    let cancelRequested = false

    function cancel() {
      cancelRequested = true
    }

    const promise = new Promise((resolve, reject) => {
      async function nextStep(prevResult) {
        if (cancelRequested) {
          return reject(new CancelError())
        }
  
        if (prevResult.done) {
          return resolve(prevResult.value)
        }

        try {
          nextStep(generateObject.next(await prevResult.value))
        } catch (error) {
          try {
            nextStep(generateObject.throw(error))
          } catch (error2) {
            reject(error2)
          }
        }
      }

      nextStep({})
    })

    return { cancel, promise }
  }
}