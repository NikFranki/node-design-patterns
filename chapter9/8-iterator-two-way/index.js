function* twoWayIterator() {
  try {
    const what = yield null

    yield 'hello ' + what
  } catch(err) {
    yield 'hello error: ' + err.message
  }
}

console.log('Passing a value back to the generator:')
const twoWay = twoWayIterator()
twoWay.next()
console.log(twoWay.next('world'))

console.log('Using throw():')
const twoWayException = twoWayIterator()
twoWayException.next()
console.log(twoWayException.next('boom!'))

console.log('Using return:')
const twoWayReturn = twoWayIterator()
console.log(twoWayReturn.return('myReturnValue'))