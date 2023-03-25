import { Image } from './image.js'

function createImage(path) {
  return new Image(path)
}

const image = createImage('xx.png')

console.log(image)