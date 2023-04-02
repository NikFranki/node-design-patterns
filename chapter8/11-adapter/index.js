import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import level from 'level'
import { createAdapter } from './fs-adapter.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dbPath = join(__dirname, 'db')
const db = level(dbPath, { valueEncoding: 'binary' })

const fs = createAdapter(db)

fs.writeFile(`${__dirname}/file.txt`, 'Hello', function() {
  fs.readFile(`${__dirname}/file.txt`, { encoding: 'utf8' }, function(err, res) {
    if (err) {
      return console.error(err)
    }

    console.log(res)
  })
})

fs.readFile('miss.txt', { encoding: 'utf8' }, (err, res) => {
  console.log(err)
})