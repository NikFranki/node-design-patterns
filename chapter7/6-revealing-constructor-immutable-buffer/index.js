import { ImutableBuffer } from './immutableBuffer.js'

const hello = 'Hello!'
const immutable = new ImutableBuffer(hello.length, ({ write }) => {
  write(hello)
})

console.log(String.fromCharCode(immutable.readInt8(0)))

// 下面这句代码，执行的时候会报 TypeError: immutable.write is not a functio
// immutable.write('Hello?')