import { createProfiler } from './profiler.js'

function getAllFactors(inputNumber) {
  const profiler = createProfiler(`Finding all factors off ${inputNumber}`)

  profiler.start()
  const factors = []
  for (let factor = 2; factor <= inputNumber; factor++) {
    while ((inputNumber % factor) === 0) {
      factors.push(factor)
      inputNumber = inputNumber / factor
    }
  }
  profiler.end()

  return factors
}

const myNumber = process.argv[2]
const myFactors = getAllFactors(myNumber)
console.log(`Factors of ${myNumber} are: `, myFactors)