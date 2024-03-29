import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import level from 'level'
import { levelSubscribe } from "./level-subscribe.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

const dbPath = join(__dirname, 'db')
const db = level(dbPath, { valueEncoding: 'json' }) // 1
levelSubscribe(db) // 2

db.subscribe( // 3
  { doctype: 'tweet', language: 'en' },
  (k, val) => console.log(val)
)

db.put('1', { // 4
  doctype: 'tweet',
  text: 'Hi',
  language: 'en'
})

db.put('2', {
  doctype: 'company',
  name: 'ACME Co.'
})