import {spider} from './spider.js'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 2

spider(url || 'https://loige.co/', nesting, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Download complete')
})