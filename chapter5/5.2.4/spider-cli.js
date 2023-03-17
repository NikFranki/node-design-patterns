import { spider } from './spider.js'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1


spider(url || 'http://127.0.0.1:8080/a.html', nesting)
  .then(() => console.log('Download complete'))
  .catch(err => console.error(err))