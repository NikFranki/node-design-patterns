import { Matrix } from './matrix.js'

const matrix = new Matrix([[1, 2], [2, 1]])

console.log('for...of:')
for (const element of matrix) {
  console.log(element)
}

console.log('spread operator:')
const flatenedMatrix = [...matrix]
console.log(flatenedMatrix)

console.log('destructuring assignment:')
const [oneOne, oneTwo, twoOne, twoTwo] = matrix
console.log(oneOne, oneTwo, twoOne, twoTwo)