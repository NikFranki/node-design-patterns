import { spider } from './4.1.js'

spider(process.argv[2] || 'https://loige.co/', (err, filename, downloaded) => {
  if (err) {
    console.error(err)
  } else if (downloaded) {
    console.log(`Completed the downloaded of "${filename}"`)
  } else {
    console.log(`"${filename}" was already downloaded`)
  }
})