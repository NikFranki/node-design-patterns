import { CancelError } from "./cancelError.js";
import { asyncRoutine } from "./asyncRoutine.js";
import { createAsyncCancelable } from "./createAsyncCancelable.js"

const cancelable = createAsyncCancelable(function* generateFunction() {
  const resultA = yield asyncRoutine('A')
  console.log(resultA)
  const resultB = yield asyncRoutine('B')
  console.log(resultB)
  const resultC = yield asyncRoutine('C')
  console.log(resultC)
})

const { promise, cancel } = cancelable()
promise.catch((err) => {
  if (err instanceof CancelError) {
    console.log('Function canceled')
  } else {
    console.error(err)
  }
})

setTimeout(() => {
  cancel()
}, 100)