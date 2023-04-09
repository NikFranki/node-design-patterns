import { createCancelWrapper } from "./cancelWrapper.js";
import { CancelError } from "./cancelError.js";
import { asyncRoutine } from "./asyncRoutine.js";

async function cancelable() {
  const resultA = await cancelWrapper(asyncRoutine, 'A')
  console.log(resultA)
  const resultB = await cancelWrapper(asyncRoutine, 'B')
  console.log(resultB)
  const resultC = await cancelWrapper(asyncRoutine, 'C')
  console.log(resultC)
}

const { cancel, cancelWrapper } = createCancelWrapper()

cancelable()
  .catch((err) => {
    if (err instanceof CancelError) {
      console.log('Function canceled')
    } else {
      console.error(err)
    }
  })

setTimeout(() => {
  cancel()
}, 100)