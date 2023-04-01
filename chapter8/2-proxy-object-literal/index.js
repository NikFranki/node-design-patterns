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

function createSafeCalculator(calculator) {
  return {
    divide() {
      const top = calculator.peekValue()
      if (top === 0) {
        throw new Error('Division by 0')
      }
      return calculator.divide()
    },
    putValue(value) {
      calculator.putValue(value)
    },
    getValue() {
      return calculator.getValue()
    },
    peekValue() {
      return calculator.peekValue()
    },
    multiply() {
      return calculator.multiply()
    },
    clear() {
      calculator.clear()
    }
  }
}

const stackCalculator = new StackCalculator()
const safeCalculator = createSafeCalculator(stackCalculator)

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