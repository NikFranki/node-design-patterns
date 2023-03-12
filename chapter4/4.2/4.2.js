import fs from 'fs'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename } from './utils.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function saveFile(filename, contents, cb) {
  mkdirp(__dirname, err => { // (3)
    if (err) {
      return cb(err)
    }
    fs.writeFile(filename, contents, cb)
  })
}

function download(url, filename, cb) {
  console.log(`Downloading ${url} into ${filename}`)
  superagent.get(url).end((err, res) => { // (2)
    if (err) {
      return cb(err)
    }
    saveFile(filename, res.text, err => {
      if (err) {
        return cb(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      cb(null, res.text)
    })
  })
}

export function spider(url, cb) {
  const filename = `${__dirname}/${urlToFilename(url)}`
  fs.access(filename, err => { // (1)
    if (!err || err.code !== 'ENOENT') {
      return cb(null, filename, false)
    }

    download(url, filename, err => {
      if (err) {
        return cb(err)
      }
      cb(null, filename, true)
    })
  })
}

// 检查这个文件是否存在，存在立即退出
// 把相应的回调以命名的形式，更加模块化
// 有错误及早退出
