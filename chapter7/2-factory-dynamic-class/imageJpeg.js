import { Image } from './image.js'

export class ImageJpeg extends Image {
  constructor(path) {
    if (!/\.jpe?g$/.test(path)) {
      throw new Error(`${path} is not a jp(e)g image`)
    }
    super(path)
  }
}