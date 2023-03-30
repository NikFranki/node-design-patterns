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
    const diviend = this.getValue()
    const result = diviend / divisor
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

class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator
  }

  putValue(value) {
    this.calculator.putValue(value)
  }

  getValue() {
    return this.calculator.getValue()
  }

  peekValue() {
    return this.calculator.peekValue()
  }

  clear() {
    this.calculator.clear()
  }

  divide() {
    const divisor = this.peekValue()
    if (divisor === 0) {
      throw new Error('Division by 0!')
    }
    this.calculator.divide()
  }

  multiply() {
    return this.calculator.multiply()
  }
}

const stackCalculator = new StackCalculator()
const safeCalculator = new SafeCalculator(stackCalculator)

stackCalculator.putValue(2)
stackCalculator.putValue(3)
console.log(stackCalculator.multiply())

safeCalculator.putValue(2)
console.log(safeCalculator.multiply())

stackCalculator.putValue(0)
console.log(stackCalculator.divide())

safeCalculator.clear()
safeCalculator.putValue(4)
safeCalculator.putValue(0)
console.log(safeCalculator.divide())