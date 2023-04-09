import { asyncRoutine } from "./asyncRoutine.js";
import { CancelError } from "./cancelError.js";

const cancelObj = {
  cancelRequested: true
}

async function cancelable (cancelObj) {
  const resultA = await asyncRoutine('A')
  console.log(resultA)
  if (cancelObj.cancelRequested) {
    throw new CancelError()
  }

  const resultB = await asyncRoutine('B')
  console.log(resultB)
  if (cancelObj.cancelRequested) {
    throw new CancelError()
  }

  const resultC = await asyncRoutine('C')
  console.log(resultC)
}

cancelable(cancelObj)
  .catch((err) => {
    if (err instanceof CancelError) {
      console.log('Function canceled')
    } else {
      console.error(err)
    }
  })

setTimeout(() => {
  cancelObj.cancelRequested = true
}, 100)