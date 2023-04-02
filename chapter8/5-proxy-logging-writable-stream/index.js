import { createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createLoggingWritable } from './logging-writable.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const writable = createWriteStream(`${__dirname}/test.txt`)
const writableProxy = createLoggingWritable(writable)

writableProxy.write('First chunk')
writableProxy.write('Second chunk')
writable.write('This is not logged')
writableProxy.end()