import { Matrix } from './matrix.js'

const matrix = new Matrix([[1, 2], [2, 1]])

const iterator = matrix[Symbol.iterator]()
let iterationResult = iterator.next()
while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = iterator.next()
}