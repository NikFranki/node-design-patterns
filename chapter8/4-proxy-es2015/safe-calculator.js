class StackCalculator {
  constructor() {
    this.stack = []
  }

  putValue(value) {
    this.stack.push(value)
  }

  getValue() {
    return this.stack.pop()
  }

  peekValue() {
    return this.stack[this.stack.length - 1]
  }

  clear() {
    this.stack = []
  }

  divide() {
    const divisor = this.getValue()
    const dividend = this.getValue()
    const result = dividend / divisor
    this.putValue(result)
    return result
  }

  multiply() {
    const multiplicand = this.getValue()
    const multiplier = this.getValue()
    const result = multiplicand * multiplier
    this.putValue(result)
    return result
  }
}

const safeCalculatorHandler = {
  get: (target, property) => {
    if (property === 'divide') {
      return function() {
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw new Error('Division by 0')
        }
        return target.divide()
      }
    }

    return target[property]
  }
}

const calculator = new StackCalculator()
const safeCalculator = new Proxy(calculator, safeCalculatorHandler)

console.log(safeCalculator instanceof StackCalculator)

calculator.putValue(2)
calculator.putValue(3)
console.log(calculator.multiply())

safeCalculator.putValue(2)
console.log(safeCalculator.multiply())

// calculator.putValue(0)
// console.log(calculator.divide())

safeCalculator.clear()
safeCalculator.putValue(4)
safeCalculator.putValue(0)
console.log(safeCalculator.divide())
