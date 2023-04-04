export class Matrix {
  constructor(data) {
    this.data = data
  }

  set(row, col, value) {
    if (row >= this.data.length || col >= this.data[row].length) {
      throw new RangeError('Out of bounds')
    }

    this.data[row][col] = value
  }

  get(row, col) {
    if (row >= this.data.length || col >= this.data[row].length) {
      throw new RangeError('Out of bounds')
    }

    return this.data[row][col]
  }

  [Symbol.iterator]() {
    let nextRow = 0
    let nextCol = 0

    return {
      next: () => {
        if (nextRow === this.data.length) {
          return { done: true }
        }

        const currValue = this.data[nextRow][nextCol]
        if (nextCol === this.data[nextRow].length - 1) {
          nextRow++
          nextCol = 0
        } else {
          nextCol++
        }

        return { done: false, value: currValue }
      }
    }
  }
}