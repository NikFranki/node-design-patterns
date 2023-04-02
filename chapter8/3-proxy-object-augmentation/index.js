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

function patchToSafeCalculator(calculator) {
  const originDivide = calculator.divide
  calculator.divide = function() {
    const divisor = calculator.peekValue()
    // 额外的校验逻辑
    if (divisor === 0) {
      throw new Error('Division by 0')
    }
    // 如果合理的话，委托执行
    return originDivide.apply(calculator)
  }

  return calculator
}

const calculator = new StackCalculator()
const safeCalculator = patchToSafeCalculator(calculator)

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