const A_CHAR_CODE = 65
const Z_CHAR_CODE = 90

function createAlphabetIterator() {
  let currCode = A_CHAR_CODE

  return {
    next() {
      const currChar = String.fromCharCode(currCode)
      if (currCode > Z_CHAR_CODE) {
        return { done: true }
      }

      currCode++
      return { done: false, value: currChar }
    }
  }
}

const iterator = createAlphabetIterator()
let iterationResult = iterator.next()
while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = iterator.next()
}