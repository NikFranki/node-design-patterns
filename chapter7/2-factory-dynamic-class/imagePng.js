import { Image } from './image.js'

export class ImagePng extends Image {
  constructor(path) {
    if (!/\.png$/.test(path)) {
      throw new Error(`${path} is not a png image`)
    }
    super(path)
  }
}